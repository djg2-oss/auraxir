/**
 * Elite matcher — recommends Auraxir production lines only.
 * Always-On dual FE/BE when continuous uptime is required.
 * Auraxir Shield scores elite encryption layer on every match.
 */
import {
  alwaysOnCustomerLines,
  alwaysOnMonthlyAddOn,
  resolveAlwaysOnTier,
  type AlwaysOnTier,
} from "./always-on";
import {
  resolveShieldTier,
  shieldMonthlyAddOn,
  shieldScore,
  type ShieldTier,
} from "./auraxir-shield";
import { BRAND } from "./brand";
import { PHASE1_BUILDERS, type PremiumBuilder } from "./builders";
import {
  HOST_PLANS,
  SITE_TYPES,
  type HostPlan,
  type NeedsAnswers,
  type SiteType,
} from "./catalog";
import { isAdultBusiness } from "./content-responsibility";
import { ELITE } from "./elite";

export interface MatchResult {
  siteType: SiteType;
  hostPlan: HostPlan;
  builder: PremiumBuilder;
  reasons: string[];
  alternatives: { siteType: SiteType; hostPlan: HostPlan; note: string }[];
  fitConfidence: number;
  needHits: string[];
  secureNetwork: boolean;
  alwaysOnTier: AlwaysOnTier;
  alwaysOnServices: string[];
  alwaysOnAddOnMonthly: number;
  shieldTier: ShieldTier;
  shieldAddOnMonthly: number;
  shieldScore: number;
  shieldGrade: string;
}

function scoreSiteType(site: SiteType, needs: NeedsAnswers): number {
  let score = 0;
  if (needs.businessType && site.bestBusiness.includes(needs.businessType)) score += 6;
  for (const g of needs.goals) {
    if (site.bestGoals.includes(g)) score += 3;
  }
  if (needs.productIntent === "app" && site.product === "app") score += 8;
  if (needs.productIntent === "website" && site.product === "website") score += 5;
  if (needs.productIntent === "both") {
    if (site.product === "app") score += 4;
    else score += 3;
  }
  if (needs.features.includes("shop") && site.id === "storefront") score += 5;
  if (needs.features.includes("booking") && site.id === "booking") score += 5;
  if (needs.features.includes("membership") && (site.id === "community-hub" || site.id === "web-app"))
    score += 4;
  if (needs.features.includes("workflows") && site.product === "app") score += 5;
  if (needs.features.includes("mobile-native") && site.id === "mobile-app") score += 6;
  if (needs.features.includes("blog") && site.id === "magazine") score += 4;
  if (
    needs.features.includes("api-integration") &&
    (site.product === "app" || site.id === "product-saas" || site.id === "web-app")
  )
    score += 4;
  if (needs.features.includes("pro-gui")) score += 1;
  if (
    (needs.needsAlwaysOn || needs.features.includes("always-on")) &&
    (site.product === "app" || site.id === "storefront" || site.id === "product-saas")
  )
    score += 3;
  if (
    needs.features.includes("adult-18") ||
    (needs.businessType && needs.businessType.startsWith("adult-"))
  ) {
    if (site.id === "adult-presence" || site.id === "adult-platform") score += 12;
  }
  if (needs.traffic === "global" && (site.id === "product-saas" || site.id === "web-app")) score += 2;
  if (needs.budget === "starter" && site.id === "portfolio-pro") score += 1;
  if (needs.budget === "scale" && (site.id === "product-saas" || site.id === "storefront")) score += 2;
  return score;
}

function scoreBuilder(builder: PremiumBuilder, site: SiteType, needs: NeedsAnswers): number {
  let score = 0;
  const pref = site.preferredBuilders.indexOf(builder.id);
  if (pref === 0) score += 12;
  else if (pref === 1) score += 7;
  else if (pref >= 0) score += 4;
  else score += Math.max(0, 6 - builder.priority);

  if (needs.businessType && builder.bestBusiness.includes(needs.businessType)) score += 5;
  for (const g of needs.goals) {
    if (builder.bestGoals.includes(g)) score += 2;
  }
  if (needs.productIntent === "app" && (builder.kind === "app" || builder.kind === "ops")) score += 10;
  if (needs.productIntent === "website" && builder.kind === "website") score += 6;
  if (needs.productIntent === "website" && builder.kind === "commerce") score += 4;
  if (needs.productIntent === "both") {
    if (builder.kind === "app" || builder.kind === "ops") score += 5;
    else score += 3;
  }
  if (needs.traffic === "global" && builder.tier === "flagship") score += 3;
  if (needs.budget === "scale" && builder.tier === "flagship") score += 3;
  if (needs.budget === "starter" && builder.priority >= 4) score += 2;
  if (needs.skill && builder.skillFit.includes(needs.skill)) score += 2;
  if (needs.needsSecureNetwork || needs.features.includes("secure-network")) {
    if (builder.tier === "flagship" || builder.kind === "app") score += 3;
  }
  if (needs.needsAlwaysOn || needs.features.includes("always-on")) {
    if (builder.tier === "flagship") score += 4;
    if (builder.kind === "app" || builder.kind === "commerce" || builder.kind === "ops") score += 2;
  }
  const adultBiz = Boolean(
    needs.businessType?.startsWith("adult-") || needs.features.includes("adult-18"),
  );
  if (adultBiz) {
    if (builder.adultCapable) score += 14;
    else score -= 8;
  } else if (builder.adultCapable) {
    score -= 6;
  }
  if (builder.tier === "flagship") score += 2;
  return score;
}

function needHitsFor(
  site: SiteType,
  builder: PremiumBuilder,
  needs: NeedsAnswers,
  secure: boolean,
  alwaysOnTier: AlwaysOnTier,
  shieldTier: ShieldTier,
  grade: string,
  score: number,
): string[] {
  const hits: string[] = [];
  hits.push(`${builder.productName} · ${builder.tier}`);
  hits.push(builder.whyElite);
  if (needs.productIntent) hits.push(`Focus: ${needs.productIntent}`);
  if (needs.businessType && site.bestBusiness.includes(needs.businessType)) {
    hits.push(`Built for ${needs.businessType.replace(/-/g, " ")}`);
  }
  const goalHits = needs.goals.filter((g) => site.bestGoals.includes(g));
  if (goalHits.length) hits.push(`Goals: ${goalHits.join(", ")}`);
  if (secure) hits.push("Secure options included for this project");
  else hits.push("Secure options available on demand");
  if (alwaysOnTier !== "standard") {
    hits.push(`Always-On ${alwaysOnTier}: dual frontend + dual backend`);
  }
  hits.push(`Auraxir Shield ${shieldTier} · grade ${grade} · score ${score}`);
  if (needs.businessType?.startsWith("adult-") || needs.features.includes("adult-18")) {
    hits.push("Adult (18+) line · brand overlay only · you own content");
  }
  hits.push(BRAND.productionSeal);
  return hits;
}

export function matchNeeds(needs: NeedsAnswers): MatchResult {
  const siteRanked = [...SITE_TYPES]
    .map((siteType) => ({ siteType, score: scoreSiteType(siteType, needs) }))
    .sort((a, b) => b.score - a.score);

  const bestSite = siteRanked[0]!;
  const secondSite = siteRanked[1];

  const builderRanked = [...PHASE1_BUILDERS]
    .map((builder) => ({
      builder,
      score: scoreBuilder(builder, bestSite.siteType, needs),
    }))
    .sort((a, b) => b.score - a.score || a.builder.priority - b.builder.priority);

  const bestBuilder = builderRanked[0]!;
  const hostPlan = HOST_PLANS.find((h) => h.id === bestBuilder.builder.id) ?? HOST_PLANS[0]!;

  const secureNetwork =
    needs.needsSecureNetwork ||
    needs.features.includes("secure-network") ||
    needs.budget === "scale" ||
    needs.traffic === "global" ||
    bestBuilder.builder.kind === "app";

  const alwaysOnTier = resolveAlwaysOnTier({
    needsAlwaysOn: needs.needsAlwaysOn,
    traffic: needs.traffic,
    budget: needs.budget,
    productIntent: needs.productIntent,
    features: needs.features,
  });
  const alwaysOnServices = alwaysOnCustomerLines(alwaysOnTier);
  const alwaysOnAddOnMonthly = alwaysOnMonthlyAddOn(alwaysOnTier);

  const adultBiz = isAdultBusiness(needs.businessType) || needs.features.includes("adult-18");
  const shieldTier = resolveShieldTier({
    budget: needs.budget,
    traffic: needs.traffic,
    needsSecure: secureNetwork,
    adult: adultBiz,
    features: needs.features,
    alwaysOn: alwaysOnTier !== "standard",
  });
  const shieldAddOnMonthly = shieldMonthlyAddOn(shieldTier);
  const shield = shieldScore({
    tier: shieldTier,
    builderId: bestBuilder.builder.id,
    secureNetwork,
    alwaysOn: alwaysOnTier !== "standard",
  });

  const gap = bestSite.score - (secondSite?.score ?? 0);
  const engineGap = bestBuilder.score - (builderRanked[1]?.score ?? 0);
  const fitConfidence = Math.min(
    99,
    Math.round(54 + Math.min(gap * 6, 22) + Math.min(engineGap * 4, 16) + Math.min(bestSite.score, 8)),
  );

  const needHits = needHitsFor(
    bestSite.siteType,
    bestBuilder.builder,
    needs,
    secureNetwork,
    alwaysOnTier,
    shieldTier,
    shield.grade,
    shield.score,
  );

  const reasons: string[] = [
    `Best layout for you: ${bestSite.siteType.name}.`,
    `Recommended line: ${bestBuilder.builder.productName} — ${bestBuilder.builder.whyElite}`,
    `You get ${BRAND.productionSeal} end to end.`,
    ELITE.bar,
  ];

  if (needs.productIntent === "app") {
    reasons.push("App path: real accounts, workflows, and data — not a brochure shell.");
  }
  if (secureNetwork) {
    const nets = bestBuilder.builder.network.map((n) => n.customerLabel).join(", ");
    reasons.push(`Secure options for this project: ${nets}.`);
  }
  if (alwaysOnTier !== "standard") {
    reasons.push(
      `Always-On ${alwaysOnTier}: dual frontend + dual backend services so you stay online at all times` +
        (alwaysOnAddOnMonthly ? ` (+$${alwaysOnAddOnMonthly}/mo).` : "."),
    );
    if (alwaysOnServices.length) {
      reasons.push(`Always-On includes: ${alwaysOnServices.join(", ")}.`);
    }
  }
  if (needs.businessType) {
    reasons.push(
      bestSite.siteType.bestBusiness.includes(needs.businessType)
        ? `Purpose-built for ${needs.businessType.replace(/-/g, " ")}.`
        : `${bestSite.siteType.name} led on your goals and features.`,
    );
  }
  if (needs.budget) {
    reasons.push(`Your plan: $${hostPlan.priceMonthly}/mo on the ${needs.budget} band.`);
  }
  reasons.push("Elite production only — no hobby kits.");
  reasons.push(
    `Auraxir Shield (${shieldTier}): elite encryption layer stacked on the production baseline — grade ${shield.grade} (${shield.score}/99).`,
  );
  if (adultBiz) {
    reasons.push(
      "Adult (18+) best-fit line. Auraxir brand overlay only — you operate the site and are solely responsible for all content.",
    );
  }

  const alternatives = siteRanked
    .slice(1)
    .filter((s) => bestSite.score - s.score <= 3 && s.score > 0)
    .slice(0, 1)
    .map((s) => {
      const altEngineId = s.siteType.preferredBuilders[0] ?? bestBuilder.builder.id;
      const altHost = HOST_PLANS.find((h) => h.id === altEngineId) ?? hostPlan;
      return {
        siteType: s.siteType,
        hostPlan: altHost,
        note: `Also strong for your goals: ${s.siteType.name} on ${altHost.name}.`,
      };
    });

  return {
    siteType: bestSite.siteType,
    hostPlan,
    builder: bestBuilder.builder,
    reasons,
    alternatives,
    fitConfidence,
    needHits,
    secureNetwork,
    alwaysOnTier,
    alwaysOnServices,
    alwaysOnAddOnMonthly,
    shieldTier,
    shieldAddOnMonthly,
    shieldScore: shield.score,
    shieldGrade: shield.grade,
  };
}
