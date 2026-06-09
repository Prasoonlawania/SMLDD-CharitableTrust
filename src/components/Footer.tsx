import React from 'react';
import { Heart } from 'lucide-react';
import { useAppContext } from '../AppContext';

export function Footer() {
  const { content } = useAppContext();
  
  return (
    <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 items-start mb-12">
          <div>
            <div className="flex items-center gap-2 text-xl font-bold text-white mb-4">
              <img src="./logo-1.png" alt="SMLDD Logo" className="h-8 w-8 object-contain rounded" />
              SMLDD
            </div>
            <p className="text-gray-400 max-w-sm leading-relaxed">
              Empowering communities and spreading compassion to create a brighter, sustainable future.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <div className="flex flex-col space-y-2">
              <a href="#home" className="text-gray-400 hover:text-white transition-colors">Home</a>
              <a href="#about" className="text-gray-400 hover:text-white transition-colors">About Us</a>
              <a href="#updates" className="text-gray-400 hover:text-white transition-colors">Latest News</a>
            </div>
          </div>

          <div>
             <h4 className="font-bold text-lg mb-4">Contact</h4>
             <address className="text-gray-400 not-italic space-y-2">
               <p>{content.contact.address}</p>
               <p><a href={`mailto:${content.contact.email}`} className="hover:text-white transition-colors">{content.contact.email}</a></p>
               <p><a href={`tel:${content.contact.phone.replace(/\s/g, '')}`} className="hover:text-white transition-colors">{content.contact.phone}</a></p>
             </address>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Shree Murari Lal Dulari Devi Charitable Trust. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
