import React from 'react';
import { EditableText } from './EditableText';

export function ContactUs() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Simulate form submission
    alert("Thank you for reaching out! We will get back to you soon.");
    (e.target as HTMLFormElement).reset();
  };

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
                    <EditableText section="contact" field="address" className="text-gray-800 font-medium" />
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
            
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Send us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                  <input id="name" type="text" required className="w-full bg-gray-50 border-gray-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all border" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input id="email" type="email" required className="w-full bg-gray-50 border-gray-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all border" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea id="message" rows={4} required className="w-full bg-gray-50 border-gray-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all border resize-none"></textarea>
                </div>
                <button type="submit" className="w-full bg-gray-900 text-white font-bold py-3.5 rounded-lg hover:bg-gray-800 transition-colors shadow-md">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
