/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Header from './components/Header';
import Hero from './components/Hero';
import PartnerBanner from './components/PartnerBanner';
import About from './components/About';
import Capabilities from './components/Capabilities';
import Architecture from './components/Architecture';
import InfrastructureViz from './components/InfrastructureViz';
import Metrics from './components/Metrics';
import HowItWorks from './components/HowItWorks';
import UseCases from './components/UseCases';
import InfraIntelligence from './components/InfraIntelligence';
import WhyVertexGrid from './components/WhyVertexGrid';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import Price from './components/Price';
import ContactUs from './components/ContactUs';
import Testimonial from './components/Testimonial';
import FAQ from './components/FAQ';
import './components/BackgroundAnimations.css';

export default function App() {
  return (
    <div className="relative min-h-screen bg-white text-brand-dark-navy antialiased overflow-x-hidden selection:bg-blue-600 selection:text-white">
      {/* Sticky Header Nav */}
      <Header />

      {/* Main Sections */}
      <main>
        {/* Section 1: Hero */}
        <Hero />
        
        {/* Partner Logo Strip */}
        <PartnerBanner />

        <About />

        {/* Section 2: Capabilities */}
        <Capabilities />

        {/* Section 3: Metrics */}
        <Metrics />

        {/* Section 4: How It Works */}
        <HowItWorks />

        {/* Section 6: Reviews / Testimonials */}
        <Testimonial />

        {/* Section 7: FAQ */}
        <FAQ />

        {/* Section 11: Pricing */}
        <Price />

        {/* Section 11: Contact Us & CTA Merged */}
        <ContactUs />
      </main>

      {/* Section 13: Footer */}
      <Footer />
    </div>
  );
}
