import HeroSection from "../components/HeroSection";
import VortexSection from "../components/VortexSection";
import AboutSection from "../components/AboutSection";
import ProjectSections from "../components/ProjectSection";
import FooterSection from "../components/FooterSection";
import ScrollIndicator from "../components/ScrollIndicator";

export default function Home() {
  return (
    <>
      <ScrollIndicator />
      <HeroSection />
      <VortexSection />
      <AboutSection />
      <ProjectSections />
      <FooterSection />
    </>
  );
}
