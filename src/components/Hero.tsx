import React from 'react';
import { EditableText } from './EditableText';

export function Hero() {
  return (
    <section id="home" className="relative text-white py-24 md:py-36 overflow-hidden">
      {/* Background Image & Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&q=80&w=2000")' }}
      >
        <div className="absolute inset-0 bg-black/60 transition-opacity"></div>
      </div>
      
      <div className="container relative z-10 mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <EditableText 
            section="hero" 
            field="title" 
            as="h1" 
            className="text-4xl md:text-6xl font-bold tracking-tight" 
          />
          <EditableText 
            section="hero" 
            field="subtitle" 
            as="p" 
            multiline
            className="text-lg md:text-xl text-gray-200 mt-4 leading-relaxed" 
          />
          <div className="pt-8">
            <a href="#about" className="inline-block bg-white text-blue-600 font-bold py-3.5 px-8 rounded-lg shadow-lg hover:bg-gray-100 hover:scale-105 transition-all">
              Discover Our Work
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
