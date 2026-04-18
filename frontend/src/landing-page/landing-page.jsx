import HeroSection from "./components/hero-section";
import SpotlightFeatures from "./components/spotlight-features";
import FlowSection from "./components/flow-section";
import ResumeComparison from "./components/resume-comparison";
import FAQSection from "./components/faq-section";
import InfiniteMarquee from "./components/Infinite-marquee";
import CTASection from "./components/cta-section";
import Testimonials from "./components/testimonials";

const LandingPage = () => {
  return (
    <div className="w-full text-white font-sans selection:bg-brand-neon/30 relative overflow-x-hidden">
      <div className="relative z-10 w-full flex flex-col min-h-screen">
        <main className="flex flex-col items-center w-full relative mx-auto flex-1 overflow-x-hidden">
          <HeroSection />
          <InfiniteMarquee />
          <SpotlightFeatures />
          <FlowSection />
          <ResumeComparison />
          <Testimonials />
          <FAQSection />
          <CTASection />
        </main>
      </div>
    </div>
  );
};
export default LandingPage;
