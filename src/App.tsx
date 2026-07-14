/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Critical above-the-fold components — loaded eagerly
import Header from './components/Header';
import Hero from './components/Hero';
import CookieBanner, { type CookieConsent } from './components/CookieBanner';
import TawkChat from './components/TawkChat';
import Preloader from './components/Preloader';
import './components/BackgroundAnimations.css';

// Below-the-fold components — lazy-loaded for performance
const PartnerBanner    = lazy(() => import('./components/PartnerBanner'));
const About            = lazy(() => import('./components/About'));
const Capabilities     = lazy(() => import('./components/Capabilities'));
const Metrics          = lazy(() => import('./components/Metrics'));
const HowItWorks       = lazy(() => import('./components/HowItWorks'));
const Testimonial      = lazy(() => import('./components/Testimonial'));
const FAQ              = lazy(() => import('./components/FAQ'));
const Price            = lazy(() => import('./components/Price'));
const ContactUs        = lazy(() => import('./components/ContactUs'));
const Footer           = lazy(() => import('./components/Footer'));

// Legal pages — lazy-loaded
const Terms            = lazy(() => import('./pages/Terms'));
const PrivacyPolicy    = lazy(() => import('./pages/PrivacyPolicy'));
const Cookies          = lazy(() => import('./pages/Cookies'));
const Products         = lazy(() => import('./pages/Products'));

function Home() {
  return (
    <div className="relative min-h-screen bg-white text-brand-dark-navy antialiased overflow-x-hidden selection:bg-blue-600 selection:text-white">
      {/* Sticky Header Nav — critical, no suspense needed */}
      <Header />

      {/* Main Sections */}
      <main>
        {/* Section 1: Hero — critical */}
        <Hero />

        <Suspense fallback={null}>
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
        </Suspense>
      </main>

      {/* Section 13: Footer */}
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
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
      <Preloader />
      
      <Suspense fallback={<div className="min-h-screen bg-[#0F172A]" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </Suspense>

      {/* Cookie Consent Banner */}
      <CookieBanner onConsent={handleConsent} />

      {/* Tawk.to Live Chat — loads immediately, always visible bottom-right */}
      <TawkChat chatEnabled={true} />
    </>
  );
}
