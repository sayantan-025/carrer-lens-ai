import React from "react";
import HeroSection from "./components/hero-section";
import WorkflowSteps from "./components/workflow-steps";
import Features from "./components/features";
import Testimonials from "./components/testimonials";
import FaqSection from "./components/faq-section";
import PricingPlans from "./components/pricing-plans";
import CallToAction from "./components/call-to-action";

const LandingPage = () => {
  return (
    <main>
      <HeroSection />
      <Features />
      <WorkflowSteps />
      <Testimonials />
      <FaqSection />
      <PricingPlans />
      <CallToAction />
    </main>
  );
};

export default LandingPage;
