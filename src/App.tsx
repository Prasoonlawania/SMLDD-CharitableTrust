/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppContextProvider } from './AppContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutUs } from './components/AboutUs';
import { LatestNews } from './components/LatestNews';
import { ContactUs } from './components/ContactUs';
import { Footer } from './components/Footer';
import { AdminControl } from './components/AdminControl';

export default function App() {
  return (
    <AppContextProvider>
      <div className="min-h-screen bg-gray-50 font-sans text-gray-900 scroll-smooth">
        <Navbar />
        <main>
          <Hero />
          <AboutUs />
          <LatestNews />
          <ContactUs />
        </main>
        <Footer />
        <AdminControl />
      </div>
    </AppContextProvider>
  );
}
