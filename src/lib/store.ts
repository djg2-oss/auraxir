import { create } from "zustand";
import { persist } from "zustand/middleware";
import { BRAND } from "./brand";
import {
  buildDefaultSections,
  emptyNeeds,
  getHostPlan,
  type HostPlanId,
  type NeedsAnswers,
  type SiteProject,
  type SiteSection,
  type SiteTypeId,
  type ThemeTokens,
  SITE_TYPES,
} from "./catalog";
import type { BuilderId } from "./builders";
import { emptyLookFeel, runG2P, applyG2PTheme, type StyleSystem } from "./g2p-ai";
import { hydrateNeeds, runElitePipeline } from "./pipeline";
import type { AnmosCopy } from "./anmos";
import { blankSection } from "./sections";
import { getTieIn, projectTieInIds } from "./tie-in";
import { isAdultProject } from "./content-responsibility";
import { resolveAlwaysOnTier, alwaysOnMonthlyAddOn } from "./always-on";
import { boostProjectForProduction } from "./production";
import { uid } from "./utils";

interface BuilderState {
  needs: NeedsAnswers;
  projects: SiteProject[];
  activeProjectId: string | null;
  past: SiteProject[];
  future: SiteProject[];
  setNeeds: (partial: Partial<NeedsAnswers>) => void;
  setLookFeel: (partial: Partial<NeedsAnswers["lookFeel"]>) => void;
  resetNeeds: () => void;
  createProjectFromNeeds: (override?: {
    siteTypeId?: SiteTypeId;
    hostPlanId?: HostPlanId;
    builderId?: BuilderId;
    styleId?: string;
  }) => SiteProject;
  updateProject: (id: string, partial: Partial<SiteProject>) => void;
  updateSection: (projectId: string, sectionId: string, partial: Partial<SiteSection>) => void;
  reorderSections: (projectId: string, from: number, to: number) => void;
  setTheme: (projectId: string, theme: Partial<ThemeTokens>) => void;
  applyG2P: (id: string, system?: StyleSystem) => void;
  applyAnmosCopy: (id: string, copy: AnmosCopy) => void;
  addSection: (id: string, type: SiteSection["type"]) => void;
  removeSection: (id: string, sectionId: string) => void;
  duplicateSection: (id: string, sectionId: string) => void;
  undo: (id: string) => boolean;
  redo: (id: string) => boolean;
  deleteProject: (id: string) => void;
  setActiveProject: (id: string | null) => void;
  getProject: (id: string) => SiteProject | undefined;
  boostProduction: (id: string) => void;
  publishProject: (id: string) => void;
  runQualityPass: (id: string) => void;
  applyTieIn: (id: string, moduleId: string) => void;
  removeTieIn: (id: string, moduleId: string) => void;
}

const LEGACY_HOST_MAP: Record<string, BuilderId> = {
  spark: "squarespace",
  forge: "wix-studio",
  engine: "webflow",
  fleet: "bubble",
};

function resolveBuilderId(raw: string | undefined): BuilderId {
  if (!raw) return "webflow";
  if (LEGACY_HOST_MAP[raw]) return LEGACY_HOST_MAP[raw]!;
  return raw as BuilderId;
}

function normalizeProject(proj: SiteProject): SiteProject {
  const builderId = resolveBuilderId(proj.builderId ?? proj.hostPlanId);
  const host = getHostPlan(builderId);
  const needs = {
    ...emptyNeeds(),
    ...proj.needs,
    productIntent: proj.needs?.productIntent ?? null,
    needsSecureNetwork: proj.needs?.needsSecureNetwork ?? false,
    needsAlwaysOn: proj.needs?.needsAlwaysOn ?? false,
    contentResponsibilityAccepted: proj.needs?.contentResponsibilityAccepted ?? false,
    lookFeel: { ...emptyLookFeel(), ...proj.needs?.lookFeel },
  };
  return {
    ...proj,
    needs,
    builderId,
    hostPlanId: builderId,
    priceMonthly: proj.priceMonthly ?? host.priceMonthly,
    setupFee: proj.setupFee ?? BRAND.setupFee,
    qualityPassed: proj.qualityPassed ?? false,
    secureNetworkEnabled: proj.secureNetworkEnabled ?? false,
  };
}

function cloneProject(p: SiteProject): SiteProject {
  return JSON.parse(JSON.stringify(p)) as SiteProject;
}

export const useBuilderStore = create<BuilderState>()(
  persist(
    (set, get) => {
      const remember = (id: string) => {
        const p = get().projects.find((x) => x.id === id);
        if (!p) return;
        set((s) => ({ past: [...s.past, cloneProject(p)].slice(-40), future: [] }));
      };
      return {
      needs: emptyNeeds(),
      projects: [],
      activeProjectId: null,
      past: [] as SiteProject[],
      future: [] as SiteProject[],

      setNeeds: (partial) => set((s) => ({ needs: { ...s.needs, ...partial } })),

      setLookFeel: (partial) =>
        set((s) => ({
          needs: {
            ...s.needs,
            lookFeel: { ...s.needs.lookFeel, ...partial },
          },
        })),

      resetNeeds: () => set({ needs: emptyNeeds() }),

      createProjectFromNeeds: (override) => {
        // Unified success pipeline — single structure for every project create
        const raw = get().needs;
        const needs = hydrateNeeds(raw, "full");
        const plan = runElitePipeline(needs, "full");
        const siteTypeId = override?.siteTypeId ?? plan.match.siteType.id;
        const builderId =
          override?.builderId ?? override?.hostPlanId ?? plan.match.builder.id;
        const siteType =
          SITE_TYPES.find((t) => t.id === siteTypeId) ?? plan.match.siteType;
        const host = getHostPlan(builderId);
        const name = needs.businessName.trim() || "Untitled project";
        const theme = applyG2PTheme(plan.g2p.system);
        const project: SiteProject = {
          id: uid("proj"),
          name,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          needs: {
            ...needs,
            lookFeel: { ...emptyLookFeel(), ...needs.lookFeel },
          },
          siteTypeId,
          hostPlanId: builderId,
          builderId,
          theme,
          sections: buildDefaultSections(siteType, name, needs.description, {
            heroSubtitle: plan.g2p.system.tone.heroSubtitle,
            ctaDefault: plan.g2p.system.tone.ctaDefault,
          }),
          domain: `${name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "") || "site"}.${BRAND.domain}`,
          published: false,
          priceMonthly: host.priceMonthly + plan.match.alwaysOnAddOnMonthly + plan.match.shieldAddOnMonthly,
          setupFee: BRAND.setupFee,
          qualityPassed: false,
          secureNetworkEnabled: plan.match.secureNetwork,
          alwaysOnTier: plan.match.alwaysOnTier,
          alwaysOnAddOnMonthly: plan.match.alwaysOnAddOnMonthly,
          adultVertical: isAdultProject({
            businessType: needs.businessType,
            features: needs.features,
            siteTypeId: siteTypeId,
          }),
          contentResponsibilityAccepted: needs.contentResponsibilityAccepted,
          shieldTier: plan.match.shieldTier,
          shieldAddOnMonthly: plan.match.shieldAddOnMonthly,
          shieldScore: plan.match.shieldScore,
          g2pStyleId: plan.g2p.system.id,
          g2pStyleName: plan.g2p.system.name,
          g2pConfidence: plan.g2p.confidence,
        };
        set((s) => ({
          projects: [project, ...s.projects],
          activeProjectId: project.id,
          needs, // keep hydrated answers
        }));
        return project;
      },

      updateProject: (id, partial) =>
        set((s) => ({
          projects: s.projects.map((p) =>
            p.id === id ? { ...p, ...partial, updatedAt: new Date().toISOString() } : p,
          ),
        })),

      updateSection: (projectId, sectionId, partial) => {
        remember(projectId);
        set((s) => ({
          projects: s.projects.map((p) => {
            if (p.id !== projectId) return p;
            return {
              ...p,
              updatedAt: new Date().toISOString(),
              sections: p.sections.map((sec) =>
                sec.id === sectionId ? { ...sec, ...partial } : sec,
              ),
            };
          }),
        }));
      },

      reorderSections: (projectId, from, to) => {
        remember(projectId);
        set((s) => ({
          projects: s.projects.map((p) => {
            if (p.id !== projectId) return p;
            const sections = [...p.sections];
            const [item] = sections.splice(from, 1);
            if (!item) return p;
            sections.splice(to, 0, item);
            return { ...p, sections, updatedAt: new Date().toISOString() };
          }),
        }));
      },

      setTheme: (projectId, theme) => {
        remember(projectId);
        set((s) => ({
          projects: s.projects.map((p) =>
            p.id === projectId
              ? { ...p, theme: { ...p.theme, ...theme }, updatedAt: new Date().toISOString() }
              : p,
          ),
        }));
      },

      applyG2P: (id, system) => {
        remember(id);
        set((s) => ({
          projects: s.projects.map((p) => {
            if (p.id !== id) return p;
            const g2p = system
              ? { system, confidence: 96 }
              : runG2P({
                  prefs: p.needs.lookFeel ?? emptyLookFeel(),
                  businessType: p.needs.businessType,
                  description: `${p.needs.description} ${p.needs.lookFeel?.desire ?? ""}`,
                });
            const theme = applyG2PTheme(g2p.system);
            const sections = p.sections.map((sec) => {
              if (sec.type === "hero") {
                return {
                  ...sec,
                  subtitle: sec.subtitle || g2p.system.tone.heroSubtitle,
                  ctaLabel: sec.ctaLabel || g2p.system.tone.ctaDefault,
                };
              }
              return sec;
            });
            return {
              ...p,
              theme,
              sections,
              g2pStyleId: g2p.system.id,
              g2pStyleName: g2p.system.name,
              g2pConfidence: g2p.confidence,
              updatedAt: new Date().toISOString(),
            };
          }),
        }));
      },

      applyAnmosCopy: (id, copy) => {
        remember(id);
        set((s) => ({
          projects: s.projects.map((p) => {
            if (p.id !== id) return p;
            const overlay: Record<string, AnmosCopy[keyof AnmosCopy]> = {
              hero: copy.hero,
              features: copy.features,
              about: copy.about,
              cta: copy.cta,
            };
            const sections = p.sections.map((sec) => {
              const next = overlay[sec.type];
              if (!next) return sec;
              return {
                ...sec,
                title: next.title || sec.title,
                subtitle: next.subtitle || sec.subtitle,
                body: next.body || sec.body,
                ctaLabel: next.ctaLabel || sec.ctaLabel,
                items: next.items?.length ? next.items : sec.items,
              };
            });
            return { ...p, sections, updatedAt: new Date().toISOString() };
          }),
        }));
      },

      addSection: (id, type) => {
        remember(id);
        set((s) => ({
          projects: s.projects.map((p) => {
            if (p.id !== id) return p;
            const next = blankSection(type, p.name);
            const sections = [...p.sections];
            const footerIdx = sections.findIndex((sec) => sec.type === "footer");
            if (footerIdx >= 0) sections.splice(footerIdx, 0, next);
            else sections.push(next);
            return { ...p, sections, updatedAt: new Date().toISOString() };
          }),
        }));
      },

      removeSection: (id, sectionId) => {
        remember(id);
        set((s) => ({
          projects: s.projects.map((p) => {
            if (p.id !== id) return p;
            if (p.sections.length <= 1) return p;
            return {
              ...p,
              sections: p.sections.filter((sec) => sec.id !== sectionId),
              updatedAt: new Date().toISOString(),
            };
          }),
        }));
      },

      duplicateSection: (id, sectionId) => {
        remember(id);
        set((s) => ({
          projects: s.projects.map((p) => {
            if (p.id !== id) return p;
            const idx = p.sections.findIndex((sec) => sec.id === sectionId);
            if (idx < 0) return p;
            const copy = { ...p.sections[idx]!, id: uid("sec"), title: `${p.sections[idx]!.title}` };
            const sections = [...p.sections];
            sections.splice(idx + 1, 0, copy);
            return { ...p, sections, updatedAt: new Date().toISOString() };
          }),
        }));
      },

      undo: (id) => {
        const s = get();
        let last = -1;
        for (let i = s.past.length - 1; i >= 0; i--) {
          if (s.past[i]?.id === id) {
            last = i;
            break;
          }
        }
        if (last < 0) return false;
        const snap = s.past[last]!;
        const current = s.projects.find((p) => p.id === id);
        set({
          past: s.past.filter((_, i) => i !== last),
          future: current ? [...s.future, cloneProject(current)] : s.future,
          projects: s.projects.map((p) => (p.id === id ? snap : p)),
        });
        return true;
      },

      redo: (id) => {
        const s = get();
        let last = -1;
        for (let i = s.future.length - 1; i >= 0; i--) {
          if (s.future[i]?.id === id) {
            last = i;
            break;
          }
        }
        if (last < 0) return false;
        const snap = s.future[last]!;
        const current = s.projects.find((p) => p.id === id);
        set({
          future: s.future.filter((_, i) => i !== last),
          past: current ? [...s.past, cloneProject(current)] : s.past,
          projects: s.projects.map((p) => (p.id === id ? snap : p)),
        });
        return true;
      },

      deleteProject: (id) =>
        set((s) => ({
          projects: s.projects.filter((p) => p.id !== id),
          activeProjectId: s.activeProjectId === id ? null : s.activeProjectId,
        })),

      setActiveProject: (id) => set({ activeProjectId: id }),

      getProject: (id) => get().projects.find((p) => p.id === id),

      boostProduction: (id) =>
        set((s) => ({
          projects: s.projects.map((p) => {
            if (p.id !== id) return p;
            const boost = boostProjectForProduction(p);
            return { ...p, ...boost, updatedAt: new Date().toISOString() };
          }),
        })),

      publishProject: (id) =>
        set((s) => ({
          projects: s.projects.map((p) => {
            if (p.id !== id) return p;
            const boost = boostProjectForProduction(p);
            return {
              ...p,
              ...boost,
              published: true,
              qualityPassed: true,
              updatedAt: new Date().toISOString(),
            };
          }),
        })),

      runQualityPass: (id) =>
        set((s) => ({
          projects: s.projects.map((p) => {
            if (p.id !== id) return p;
            const boost = boostProjectForProduction(p);
            return {
              ...p,
              ...boost,
              qualityPassed: true,
              updatedAt: new Date().toISOString(),
            };
          }),
        })),

      applyTieIn: (id, moduleId) =>
        set((s) => ({
          projects: s.projects.map((p) => {
            if (p.id !== id) return p;
            const mod = getTieIn(moduleId);
            if (!mod) return p;
            const existing = projectTieInIds(p.sections);
            if (existing.includes(moduleId)) return p;
            const brandName = p.name || "your brand";
            const extra = mod.buildSections(brandName);
            // Insert before footer if present
            const sections = [...p.sections];
            const footerIdx = sections.findIndex((sec) => sec.type === "footer");
            if (footerIdx >= 0) sections.splice(footerIdx, 0, ...extra);
            else sections.push(...extra);
            return {
              ...p,
              sections,
              tieInIds: [...existing, moduleId],
              updatedAt: new Date().toISOString(),
            };
          }),
        })),

      removeTieIn: (id, moduleId) =>
        set((s) => ({
          projects: s.projects.map((p) => {
            if (p.id !== id) return p;
            const sections = p.sections.filter((sec) => sec.enhancementId !== moduleId);
            return {
              ...p,
              sections,
              tieInIds: projectTieInIds(sections),
              updatedAt: new Date().toISOString(),
            };
          }),
        })),
    };
    },
    {
      name: "auraxir-builder-v6-pipeline",
      partialize: (s) => ({
        projects: s.projects,
        activeProjectId: s.activeProjectId,
        needs: s.needs,
      }),
      merge: (persisted, current) => {
        const p = persisted as Partial<BuilderState> | undefined;
        const projects = (p?.projects ?? []).map((proj) => normalizeProject(proj as SiteProject));
        const needs = p?.needs
          ? {
              ...emptyNeeds(),
              ...p.needs,
              lookFeel: { ...emptyLookFeel(), ...p.needs.lookFeel },
            }
          : current.needs;
        return {
          ...current,
          ...p,
          projects,
          needs,
          past: [],
          future: [],
        };
      },
    },
  ),
);
