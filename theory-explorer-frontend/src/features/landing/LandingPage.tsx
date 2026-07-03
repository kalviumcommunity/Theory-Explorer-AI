import { HeroSection } from "./components/HeroSection"
import { FeaturesSection } from "./components/FeaturesSection"
import { HowItWorksSection } from "./components/HowItWorksSection"
import { TestimonialsSection } from "./components/TestimonialsSection"
import { CTASection } from "./components/CTASection"
import { Footer } from "./components/Footer"

export function LandingPage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </>
  )
}
