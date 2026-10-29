import AboutSection from "@/sections/home/AboutSection";
import FaqSection from "@/sections/home/FaqSection";
import HeroSection from "@/sections/home/HeroSection";
import OurImpactSection from "@/sections/home/OurImpactSection";
import ProcessSection from "@/sections/home/ProcessSection";
import ServicesSection from "@/sections/home/ServiceSection";
import TestimonialSection from "@/sections/home/TestimonialSection";
import { siteMap } from "@/data";

export default function Home() {
  const { hero, about, ourImpact, services, process, testimonial, faq } = siteMap;

  return (
    <main>
      <HeroSection data={hero} />
      <AboutSection data={about} />
      <OurImpactSection data={ourImpact} />
      <ServicesSection data={services} />
      <ProcessSection data={process} />
      <TestimonialSection data={testimonial} />
      <FaqSection data={faq} />
    </main>
  );
}

