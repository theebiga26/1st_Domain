/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
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
import CookieBanner, { type CookieConsent } from './components/CookieBanner';
import TawkChat from './components/TawkChat';
import './components/BackgroundAnimations.css';

import Terms from './pages/Terms';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Cookies from './pages/Cookies';

function Home() {
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

export default function App() {
  const [consent, setConsent] = useState<CookieConsent | null>(null);

  const handleConsent = (c: CookieConsent) => {
    setConsent(c);
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/cookies" element={<Cookies />} />
      </Routes>

      {/* Cookie Consent Banner */}
      <CookieBanner onConsent={handleConsent} />

      {/* Tawk.to Live Chat — only loads after cookie consent */}
      <TawkChat chatEnabled={consent?.chat === true} />
    </>
  );
}

