import React from 'react';
import { MapPin } from 'lucide-react';
import { EditableText } from './EditableText';

export function ContactUs() {
  return (
    <>
      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Get in Touch</h2>
            <p className="text-gray-600 mt-4 text-lg">We would love to hear from you. Reach out with questions or suggestions.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-16 max-w-5xl mx-auto">
            <div className="space-y-8">
              <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div>
                    <span className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Address</span>
                    <div className="flex items-start gap-2 justify-between">
                      <div className="flex-1">
                        <EditableText section="contact" field="address" className="text-gray-800 font-medium" />
                      </div>
                      <a 
                        href="https://www.google.com/maps/place/Shri+Murari+Lal+Dulari+Devi+Charitable+Trust/@27.2814426,77.1581716,89m/data=!3m1!1e3!4m12!1m5!3m4!2zMjfCsDE2JzUzLjYiTiA3N8KwMDknMjkuMSJF!8m2!3d27.2815679!4d77.158095!3m5!1s0x39725560af919627:0x220cb8ceea5053ed!8m2!3d27.2813391!4d77.1581057!16s%2Fg%2F11xznzs9jd?entry=ttu&g_ep=EgoyMDI2MDYwMS4wIKXMDSoASAFQAw%3D%3D4" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-600 hover:text-blue-800 bg-blue-50 p-2 rounded-full transition-colors flex-shrink-0"
                        title="View on Google Maps"
                      >
                        <MapPin className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Email</span>
                    <EditableText section="contact" field="email" className="text-gray-800 font-medium" />
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Phone</span>
                    <EditableText section="contact" field="phone" className="text-gray-800 font-medium" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 sm:p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col min-h-[600px] w-full">
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSet1cuIzl9r4u-Mf8VfVL-exqeGGWU9-OdllTs84W2iUkp5DQ/viewform?embedded=true"
                width="100%"
                height="100%"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                className="w-full h-full flex-1 min-h-[800px]"
                title="Contact Form"
              >
                Loading…
              </iframe>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
