import React from 'react';
import { EditableText } from './EditableText';
import { UserCheck, UserCog, Landmark } from 'lucide-react';

export function AboutUs() {
  const leaders = [
    { name: "Shmt. Renu Sharma", role: "Chairman", icon: UserCheck, color: "text-blue-600", bg: "bg-blue-100" },
    { name: "Sh. Pankaj Kumar Lawania", role: "Secretary", icon: UserCog, color: "text-green-600", bg: "bg-green-100" },
    { name: "Sh. Rupendra Lawaniya", role: "Treasurer", icon: Landmark, color: "text-amber-600", bg: "bg-amber-100" }
  ];

  return (
    <section id="about" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <EditableText section="about" field="heading" as="h2" className="text-3xl md:text-4xl font-bold text-gray-900" />
          <EditableText section="about" field="subheading" as="p" className="text-gray-600 mt-4 text-lg" />
        </div>
        
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Our Mission & Vision</h3>
            <EditableText section="about" field="mission" as="p" multiline className="text-gray-600 leading-relaxed text-lg" />
            <EditableText section="about" field="vision" as="p" multiline className="text-gray-600 leading-relaxed text-lg" />
          </div>
          
          <div className="bg-gray-50 p-8 rounded-2xl shadow-sm border border-gray-100">
            <h4 className="text-xl font-bold mb-8 text-center text-gray-900">Our Leadership</h4>
            <div className="space-y-6">
              {leaders.map((leader, i) => {
                const Icon = leader.icon;
                return (
                  <div key={i} className="flex items-center space-x-4 p-4 rounded-xl hover:bg-white transition-colors">
                    <div className={`${leader.bg} p-3 rounded-full flex-shrink-0`}>
                      <Icon className={leader.color} size={24} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{leader.name}</p>
                      <p className="text-sm text-gray-500 font-medium">{leader.role}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
