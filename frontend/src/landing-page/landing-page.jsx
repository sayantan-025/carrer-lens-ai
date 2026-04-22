import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Brain, Target, Zap } from "lucide-react";
import { Link } from "react-router";
import HeroSection from "./components/hero-section";
import TrustedCompanies from "./components/trusted-companies";
import Features from "./components/features";
import WorkflowSteps from "./components/workflow-steps";
import Testimonials from "./components/testimonials";
import FaqSection from "./components/faq-section";
import PricingPlans from "./components/pricing-plans";
import CallToAction from "./components/call-to-action";

const LandingPage = () => {
  return (
    <main className="px-4">
      <HeroSection />
      <TrustedCompanies />
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
