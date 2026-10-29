import siteData from "./site.json";

// Root schema types
export type RawSiteData = typeof siteData;
export type CyberVaultSchema = typeof siteData.CyberVault;
export type CyberVaultSections = CyberVaultSchema["sections"];
export type CyberVaultTemplateComponents = CyberVaultSchema["templateComponents"];

// Schema aliases
export type ServicesSchema = CyberVaultSchema;
export type ServicesSections = CyberVaultSections;

// Section props
export interface SectionProps<T = unknown> {
  data?: T;
  className?: string;
  contentClassName?: string;
  variant?: string;
  isEditable?: boolean;
  onUpdate?: (newData: Partial<T>) => void;
}

// Section models
export type CyberVaultTopbarData = CyberVaultSections["topbar"]["variants"]["CyberVaultTopbar1"];
export type CyberVaultNavbarData = CyberVaultSections["navbar"]["variants"]["CyberVaultNavbar1"];
export type CyberVaultFooterData = CyberVaultSections["footer"]["variants"]["CyberVaultFooter1"];
export type CyberVaultHeroData = CyberVaultSections["hero"]["variants"]["CyberVaultHero1"];
export type CyberVaultAboutData = CyberVaultSections["about"]["variants"]["CyberVaultAbout1"];
export type CyberVaultOurImpactData = CyberVaultSections["ourImpact"]["variants"]["CyberVaultOurImpact1"];
export type CyberVaultServicesData = CyberVaultSections["services"]["variants"]["CyberVaultServices1"];
export type CyberVaultProcessData = CyberVaultSections["process"]["variants"]["CyberVaultProcess1"];
export type CyberVaultTestimonialData = CyberVaultSections["testimonial"]["variants"]["CyberVaultTestimonial1"];
export type CyberVaultTestimonialsData = CyberVaultTestimonialData;
export type CyberVaultFaqData = CyberVaultSections["faq"]["variants"]["CyberVaultFaq1"];
export type CyberVaultContactModalData = CyberVaultSections["contactModal"]["variants"]["CyberVaultContactModal1"];

// Item types
export type NavItem = CyberVaultNavbarData["navItems"][number];
export type HeroStat = CyberVaultHeroData["floatingStats"][number];
export type AboutFeature = CyberVaultAboutData["features"][number];
export type OurImpactMetric = CyberVaultOurImpactData["stats"][number];
export type ServiceItem = CyberVaultServicesData["servicesList"][number];
export type ProcessStep = CyberVaultProcessData["steps"][number];
export type TestimonialItem = CyberVaultTestimonialData["testimonials"][number];
export type FaqItem = CyberVaultFaqData["faqs"][number];

// Site data map
const sec = siteData.CyberVault.sections;

export const siteMap = {
  topbar: sec.topbar.variants.CyberVaultTopbar1,
  navbar: sec.navbar.variants.CyberVaultNavbar1,
  navItems: sec.navbar.variants.CyberVaultNavbar1.navItems,
  footer: sec.footer.variants.CyberVaultFooter1,
  hero: sec.hero.variants.CyberVaultHero1,
  about: sec.about.variants.CyberVaultAbout1,
  ourImpact: sec.ourImpact.variants.CyberVaultOurImpact1,
  services: sec.services.variants.CyberVaultServices1,
  process: sec.process.variants.CyberVaultProcess1,
  testimonial: sec.testimonial.variants.CyberVaultTestimonial1,
  testimonials: sec.testimonial.variants.CyberVaultTestimonial1,
  faq: sec.faq.variants.CyberVaultFaq1,
  contactModal: sec.contactModal.variants.CyberVaultContactModal1,

  // Section shortcuts
  topbarData: sec.topbar.variants.CyberVaultTopbar1,
  navbarData: sec.navbar.variants.CyberVaultNavbar1,
  footerData: sec.footer.variants.CyberVaultFooter1,
  heroData: sec.hero.variants.CyberVaultHero1,
  aboutData: sec.about.variants.CyberVaultAbout1,
  ourImpactData: sec.ourImpact.variants.CyberVaultOurImpact1,
  servicesData: sec.services.variants.CyberVaultServices1,
  processData: sec.process.variants.CyberVaultProcess1,
  testimonialData: sec.testimonial.variants.CyberVaultTestimonial1,
  testimonialsData: sec.testimonial.variants.CyberVaultTestimonial1,
  faqData: sec.faq.variants.CyberVaultFaq1,
  contactModalData: sec.contactModal.variants.CyberVaultContactModal1,

  // Root tree
  CyberVault: siteData.CyberVault,
};

export type SiteData = typeof siteMap;
export const site = siteMap;
export default siteData;
