/**
 * Auraxir legal documentation — protective terms for brand-overlay model.
 * Not a substitute for counsel; structured to limit operator liability.
 */
import { BRAND } from "./brand";

export const LEGAL_META = {
  company: BRAND.legalName,
  shortName: BRAND.name,
  domain: BRAND.domain,
  contact: BRAND.supportEmail,
  effectiveDate: "August 3, 2026",
  jurisdiction: "the State of Delaware, United States",
  lastUpdated: "August 3, 2026",
  notLegalAdvice:
    "These documents are platform terms. They do not constitute legal advice to you. Consult your own counsel for your business, content, and jurisdiction.",
} as const;

export type LegalDocId =
  | "terms"
  | "aup"
  | "adult"
  | "privacy"
  | "disclaimer"
  | "indemnity"
  | "dmca";

export interface LegalDoc {
  id: LegalDocId;
  title: string;
  shortTitle: string;
  summary: string;
  sections: { heading: string; body: string[] }[];
}

const co = LEGAL_META.company;
const name = LEGAL_META.shortName;

export const LEGAL_DOCS: LegalDoc[] = [
  {
    id: "terms",
    title: "Terms of Service",
    shortTitle: "Terms",
    summary:
      "Binding terms for use of Auraxir. Brand overlay and matching only. You operate your projects and own all content risk.",
    sections: [
      {
        heading: "1. Agreement",
        body: [
          `By accessing or using ${co} (“${name},” “we,” “us,” or “our”) websites, applications, matching tools, previews, or related services (the “Service”), you (“Customer,” “you”) agree to these Terms of Service (the “Terms”). If you do not agree, do not use the Service.`,
          `If you accept on behalf of an entity, you represent that you have authority to bind that entity. These Terms form a binding contract as of the date you first use the Service or click accept.`,
          LEGAL_META.notLegalAdvice,
        ],
      },
      {
        heading: "2. Nature of the Service — Brand Overlay Only",
        body: [
          `${name} provides premium brand presentation, needs matching, design systems (including G2P and Imago), production polish, and related advisory tooling. The Service is a brand-overlay and facilitation layer.`,
          `We do not, by default, act as the website operator, application operator, hosting provider of record, publisher, studio, payment facilitator, content moderator, or editorial controller of your customer-facing projects.`,
          `Underlying production infrastructure, third-party platforms, or “production lines” may be used to deliver capabilities. You acknowledge that such underlying providers are independent parties. Your contractual relationship for content operation remains with you (and, where applicable, those third parties)—not as a joint content venture with ${name}.`,
          `Display of the ${name} name, seal, or chrome on a project does not mean ${name} owns, operates, or assumes responsibility for that project’s content or audience.`,
        ],
      },
      {
        heading: "3. Accounts, Eligibility, and Age",
        body: [
          `You must be at least 18 years of age (or the age of majority in your jurisdiction, if higher) to use the Service. By using the Service you represent that you meet this requirement.`,
          `Adult (18+) production lines are available only for lawful adult businesses. You must not allow minors to access adult projects you create.`,
          `You are responsible for safeguarding credentials and for all activity under your account.`,
        ],
      },
      {
        heading: "4. Customer Content — Sole Responsibility",
        body: [
          `“Customer Content” means all text, images, video, audio, code, data, products, offers, streams, profiles, and other materials you or your users submit, publish, sell, stream, store, or display in connection with projects facilitated through the Service.`,
          `You retain ownership of Customer Content (subject to licenses you grant to third-party platforms you choose). ${name} does not claim ownership of Customer Content.`,
          `You are solely responsible for Customer Content and for everything that happens with it, including creation, upload, storage, distribution, sales, marketing, moderation, takedowns, age-gating, consent, rights clearances, taxes, consumer claims, and disputes.`,
          `${name} has no obligation to monitor, review, approve, or edit Customer Content. Any quality or design suggestions are presentation-oriented and do not constitute legal, compliance, or content clearance.`,
        ],
      },
      {
        heading: "5. License to ${name}",
        body: [
          `You grant ${name} a limited, worldwide, non-exclusive license to host, cache, transmit, display, and process Customer Content and project metadata solely as needed to provide the Service (e.g., previews, matching, support), and to use anonymized/aggregated data to improve the Service.`,
          `This license does not make ${name} the publisher or operator of your public site for liability purposes.`,
        ],
      },
      {
        heading: "6. Fees",
        body: [
          `Fees, subscriptions, activation charges, and Always-On or other add-ons are as presented at checkout or in your plan summary. Premium pricing reflects elite service positioning.`,
          `Except where required by law, fees are non-refundable once production access is provisioned. Chargebacks initiated in bad faith may result in suspension.`,
        ],
      },
      {
        heading: "7. Acceptable Use",
        body: [
          `You must comply with the Acceptable Use Policy (AUP), Adult Services Addendum (if applicable), and all laws. We may suspend or terminate access for violations.`,
        ],
      },
      {
        heading: "8. Disclaimers",
        body: [
          `THE SERVICE IS PROVIDED “AS IS” AND “AS AVAILABLE.” TO THE MAXIMUM EXTENT PERMITTED BY LAW, ${name.toUpperCase()} DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.`,
          `We do not warrant uninterrupted uptime, third-party platform availability, search rankings, revenue outcomes, or that matching recommendations are error-free.`,
          `Recommendations of production lines are tools to assist you; you decide what to publish and how to operate.`,
        ],
      },
      {
        heading: "9. Limitation of Liability",
        body: [
          `TO THE MAXIMUM EXTENT PERMITTED BY LAW, ${name.toUpperCase()} AND ITS OFFICERS, DIRECTORS, EMPLOYEES, CONTRACTORS, AND AFFILIATES SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, REVENUE, DATA, GOODWILL, OR BUSINESS OPPORTUNITY, ARISING FROM OR RELATED TO THE SERVICE OR CUSTOMER CONTENT.`,
          `OUR TOTAL LIABILITY FOR ANY CLAIM ARISING OUT OF OR RELATING TO THE SERVICE SHALL NOT EXCEED THE AMOUNTS YOU PAID TO ${name.toUpperCase()} FOR THE SERVICE IN THE THREE (3) MONTHS PRECEDING THE CLAIM.`,
          `These limits apply even if a remedy fails of its essential purpose, and whether based in contract, tort (including negligence), strict liability, or otherwise.`,
          `Some jurisdictions do not allow certain limitations; in those cases, our liability is limited to the fullest extent permitted.`,
        ],
      },
      {
        heading: "10. Indemnification",
        body: [
          `You agree to defend, indemnify, and hold harmless ${co}, its affiliates, and their officers, directors, employees, and agents from and against any claims, damages, losses, liabilities, costs, and expenses (including reasonable attorneys’ fees) arising out of or related to: (a) Customer Content; (b) your websites, apps, products, or services; (c) your users or audience; (d) your breach of these Terms, the AUP, or Adult Addendum; (e) alleged IP, privacy, publicity, defamation, obscenity, or regulatory violations; (f) payments, taxes, refunds, or chargebacks; (g) age-verification failures; and (h) third-party platform actions regarding your account or content.`,
          `We may assume exclusive defense of any matter subject to indemnification at your expense. You will not settle any claim imposing obligation on ${name} without our prior written consent.`,
        ],
      },
      {
        heading: "11. Suspension and Termination",
        body: [
          `We may suspend or terminate access immediately if we reasonably believe you violated these Terms, the AUP, applicable law, or create legal or security risk. You may stop using the Service at any time.`,
          `Sections that by nature should survive (including content responsibility, disclaimers, liability limits, indemnity, and governing law) survive termination.`,
        ],
      },
      {
        heading: "12. Governing Law and Disputes",
        body: [
          `These Terms are governed by the laws of ${LEGAL_META.jurisdiction}, without regard to conflict-of-law rules.`,
          `Except where prohibited, disputes shall be resolved in the state or federal courts located in ${LEGAL_META.jurisdiction}, and you consent to personal jurisdiction there.`,
          `Optional: parties may agree in writing to binding arbitration under AAA rules on an individual basis (no class actions) before filing suit.`,
        ],
      },
      {
        heading: "13. Changes",
        body: [
          `We may update these Terms by posting a revised version with a new effective date. Continued use after changes constitutes acceptance. Material changes may be highlighted in the Service when practicable.`,
        ],
      },
      {
        heading: "14. Contact",
        body: [
          `Legal notices: ${LEGAL_META.contact} · Domain: ${LEGAL_META.domain}`,
          `Effective: ${LEGAL_META.effectiveDate} · Last updated: ${LEGAL_META.lastUpdated}`,
        ],
      },
    ],
  },
  {
    id: "aup",
    title: "Acceptable Use Policy",
    shortTitle: "AUP",
    summary:
      "What is never allowed. Protects the platform from illegal and abusive use while allowing lawful adult content under strict rules.",
    sections: [
      {
        heading: "1. Purpose",
        body: [
          `This Acceptable Use Policy (“AUP”) is part of the Terms. Violations may result in immediate suspension without refund.`,
        ],
      },
      {
        heading: "2. Strictly Prohibited Content and Conduct",
        body: [
          `You may not use the Service to create, upload, host, link, sell, promote, or distribute any of the following:`,
          `• Child sexual abuse material (CSAM) or any sexual content involving minors (anyone under 18), including fictional or AI-generated depictions of minors. Zero tolerance. We will cooperate with law enforcement.`,
          `• Non-consensual intimate imagery, revenge porn, or deepfakes of real persons without lawful authorization.`,
          `• Trafficking, exploitation, or facilitation of illegal sex work where prohibited by law.`,
          `• Content that exploits, abuses, or endangers children in any way.`,
          `• Malware, ransomware, phishing, credential theft, or unauthorized network access.`,
          `• Fraud, pyramid schemes, stolen goods, or payment-card abuse.`,
          `• Unlawful hate crimes content, credible threats of violence, or terrorism promotion.`,
          `• Infringement of copyrights, trademarks, or other IP without authorization.`,
          `• Doxxing, stalking, or unlawful privacy invasions.`,
          `• Spam, coordinated inauthentic behavior, or abuse of infrastructure.`,
          `• Any activity that violates applicable law in your or your audience’s jurisdiction.`,
        ],
      },
      {
        heading: "3. Lawful Adult Content",
        body: [
          `Lawful explicit adult content involving only consenting adults (18+) may be permitted on designated adult production lines, subject to the Adult Services Addendum, age-gating, and all applicable laws.`,
          `Permission to use adult lines is not approval of any specific material. You remain solely responsible for legality and compliance.`,
        ],
      },
      {
        heading: "4. Security and Network Abuse",
        body: [
          `No probing, scanning, or load testing of ${name} systems without written permission. No circumvention of access controls, age gates, or brand-overlay integrity.`,
        ],
      },
      {
        heading: "5. Reporting",
        body: [
          `Report AUP violations or illegal content to ${LEGAL_META.contact} with URLs, descriptions, and evidence. For CSAM, also report to appropriate authorities (e.g., NCMEC CyberTipline in the U.S.).`,
        ],
      },
    ],
  },
  {
    id: "adult",
    title: "Adult Services Addendum (18+)",
    shortTitle: "Adult Addendum",
    summary:
      "Special terms for explicit adult production lines. Reinforces age rules, consent, and that Auraxir never operates your adult content.",
    sections: [
      {
        heading: "1. Scope",
        body: [
          `This Adult Services Addendum (“Addendum”) applies when you select adult business types, adult features, adult site types, or adult-capable production lines (“Adult Services”). It supplements the Terms and AUP. If conflict arises on adult topics, this Addendum controls.`,
        ],
      },
      {
        heading: "2. Adults Only",
        body: [
          `Adult Services are strictly 18+ (or higher age of majority). You represent that: (a) you are of legal age; (b) all persons depicted or performing in Customer Content are adults and were adults when content was created; (c) you will not market Adult Services to minors; (d) you will implement commercially reasonable age gates and access controls.`,
        ],
      },
      {
        heading: "3. Consent, Records, and Rights",
        body: [
          `You are solely responsible for obtaining and maintaining all required consents, model releases, performer agreements, and—where required by law (including 18 U.S.C. § 2257 record-keeping obligations if applicable)—identity and age records. ${name} does not maintain § 2257 records for your content and is not your records custodian.`,
          `You warrant that you have all rights needed to publish and monetize Customer Content.`,
        ],
      },
      {
        heading: "4. No Operator or Publisher Role",
        body: [
          `${name} does not produce, direct, cast, film, edit (as content producer), or commercially distribute your adult content as a studio or platform operator of record.`,
          `Brand overlay, previews, and matching do not make ${name} a “content provider,” “producer,” or “operator” of your adult business under any statute or common-law theory to the maximum extent permitted by law.`,
          `You acknowledge that end users of your projects are your customers, not ${name}’s, for content and consumer purposes.`,
        ],
      },
      {
        heading: "5. Payments and Regulated Processing",
        body: [
          `Adult payments may be restricted by banks and processors. You are solely responsible for selecting compliant processors, high-risk merchant accounts, taxes, chargebacks, and refunds. ${name} is not your merchant of record unless a separate written agreement expressly states otherwise.`,
        ],
      },
      {
        heading: "6. Geographic and Platform Restrictions",
        body: [
          `You must not offer Adult Services where prohibited. You must comply with each underlying platform’s rules. Suspension by a third-party platform is not a breach by ${name}.`,
        ],
      },
      {
        heading: "7. Indemnity Enhancement",
        body: [
          `Without limiting the Terms, you specifically indemnify ${name} against claims arising from adult content, alleged obscenity, zoning or community-standards claims, performer disputes, age-verification failures, payment-network fines, and regulatory investigations related to your Adult Services.`,
        ],
      },
      {
        heading: "8. Immediate Termination",
        body: [
          `Any involvement with minors in sexual content, or credible evidence of the same, results in immediate termination and referral to law enforcement. No refunds.`,
        ],
      },
    ],
  },
  {
    id: "disclaimer",
    title: "Operator Status & Liability Disclaimer",
    shortTitle: "Disclaimer",
    summary:
      "Plain-language and legal disclaimer: Auraxir is not your site operator and is not liable for customer content or operations.",
    sections: [
      {
        heading: "1. Core Disclaimer",
        body: [
          `${co} provides a premium brand overlay, matching intelligence, and production presentation tools. We are not the operator of your website, app, store, or community.`,
          `YOU OPERATE YOUR PROJECTS. YOU ARE SOLELY RESPONSIBLE FOR YOUR CONTENT AND FOR WHAT HAPPENS WITH IT.`,
        ],
      },
      {
        heading: "2. No Agency or Partnership",
        body: [
          `Nothing in the Service creates a partnership, joint venture, employment, or agency relationship between you and ${name} regarding content production or publication. You have no authority to bind ${name}.`,
        ],
      },
      {
        heading: "3. Third-Party Platforms",
        body: [
          `Production lines may involve independent third-party technologies. ${name} is not liable for their outages, policy changes, bans, fees, or data practices. Your use of third parties is at your own risk and subject to their terms.`,
        ],
      },
      {
        heading: "4. No Professional Advice",
        body: [
          `The Service does not provide legal, tax, accounting, or compliance advice. Matching and design guidance are not certifications of legality.`,
        ],
      },
      {
        heading: "5. Assumption of Risk",
        body: [
          `You assume all risks of publishing online, including reputational, commercial, and legal risks associated with your niche (including adult niches).`,
        ],
      },
    ],
  },
  {
    id: "indemnity",
    title: "Indemnification & Hold-Harmless Schedule",
    shortTitle: "Indemnity",
    summary:
      "Expanded indemnification protecting Auraxir from content, regulatory, IP, and audience claims.",
    sections: [
      {
        heading: "1. Hold Harmless",
        body: [
          `You agree to hold harmless and release ${co} from any and all claims by you related to Customer Content, audience disputes, third-party platform actions, and business outcomes, to the fullest extent permitted by law.`,
        ],
      },
      {
        heading: "2. Covered Claims",
        body: [
          `Indemnified claims include without limitation: intellectual property; right of publicity; defamation; invasion of privacy; obscenity; FTC/advertising; data protection (GDPR/CCPA as applicable to your processing); payment network assessments; domain disputes; employment/performer misclassification; and product liability for goods or digital goods you sell.`,
        ],
      },
      {
        heading: "3. Procedure",
        body: [
          `We will provide reasonable notice of claims (failure to notify does not relieve you except to the extent you are materially prejudiced). You will cooperate fully. We may retain counsel of our choice at your expense for covered claims.`,
        ],
      },
      {
        heading: "4. No Limitation on Indemnity Cap",
        body: [
          `Your indemnification obligations are not limited by the liability cap in the Terms that applies to ${name}’s liability to you.`,
        ],
      },
    ],
  },
  {
    id: "privacy",
    title: "Privacy Policy",
    shortTitle: "Privacy",
    summary:
      "How Auraxir handles account and service data. Customer sites remain the customer’s responsibility for their own users’ data.",
    sections: [
      {
        heading: "1. Scope",
        body: [
          `This Privacy Policy describes how ${co} processes personal data when you use our Service. It does not govern how you process data on your own sites or apps—you are the controller for your audience data.`,
        ],
      },
      {
        heading: "2. Data We Collect",
        body: [
          `Account data (name, email, business details you provide), project configuration, needs-assessment answers, usage logs, device/browser data, and payment metadata processed by our payment providers.`,
          `We do not want sensitive performer identity documents uploaded to ${name} unless a separate written process requires them; you should keep § 2257 and KYC records in your own compliant systems.`,
        ],
      },
      {
        heading: "3. Use",
        body: [
          `We use data to provide matching, previews, billing, security, support, and service improvement. We may use aggregated analytics.`,
        ],
      },
      {
        heading: "4. Sharing",
        body: [
          `We share data with infrastructure and payment processors under contract, and when required by law or to protect rights and safety. We do not sell personal information as defined under CCPA if applicable.`,
        ],
      },
      {
        heading: "5. Retention and Security",
        body: [
          `We retain data as needed for the Service and legal obligations. We use reasonable technical and organizational measures; no method is 100% secure.`,
        ],
      },
      {
        heading: "6. Your Rights",
        body: [
          `Depending on your region, you may request access, correction, deletion, or export of personal data we hold about you by contacting ${LEGAL_META.contact}.`,
        ],
      },
      {
        heading: "7. Contact",
        body: [
          `${LEGAL_META.contact} · Effective ${LEGAL_META.effectiveDate}`,
        ],
      },
    ],
  },
  {
    id: "dmca",
    title: "IP / DMCA & Illegal Content Notice Policy",
    shortTitle: "DMCA / Notices",
    summary:
      "How to send copyright and illegal-content notices. Clarifies customer is primary host/operator for their public content.",
    sections: [
      {
        heading: "1. Role Clarity",
        body: [
          `For Customer Content on customer-operated properties, the customer is the appropriate first recipient of takedown and rights notices. ${name} may forward notices when we are contacted and may disable Service access for repeat or egregious infringement.`,
        ],
      },
      {
        heading: "2. Copyright Notices",
        body: [
          `If you believe material facilitated through the Service infringes your copyright, send a notice to ${LEGAL_META.contact} including: (a) your contact information; (b) identification of the work; (c) the exact URL or location; (d) a statement of good-faith belief; (e) a statement under penalty of perjury of accuracy and authority; (f) your physical or electronic signature.`,
        ],
      },
      {
        heading: "3. Counter-Notices",
        body: [
          `If your material was removed and you believe it was a mistake, you may send a counter-notice with required statutory elements. We may restore access where appropriate and lawful.`,
        ],
      },
      {
        heading: "4. Illegal Content Including CSAM",
        body: [
          `We prohibit illegal content. Reports of CSAM will be actioned urgently, accounts terminated as appropriate, and reports made to authorities. Do not send illegal files to us as “samples.” Provide URLs and descriptions only.`,
        ],
      },
      {
        heading: "5. Designated Contact",
        body: [
          `Notices: ${LEGAL_META.contact} · Re: “IP/DMCA Notice” or “Illegal Content Report”`,
        ],
      },
    ],
  },
];

export function getLegalDoc(id: string): LegalDoc | undefined {
  return LEGAL_DOCS.find((d) => d.id === id);
}

export const LEGAL_ACCEPTANCE_TEXT = `I have read and agree to the ${co} Terms of Service, Acceptable Use Policy, Operator Disclaimer, and Indemnification terms. If I use Adult Services, I also agree to the Adult Services Addendum (18+). I understand ${name} is brand overlay only, does not operate my site, and I am solely responsible for all content and compliance.`;
