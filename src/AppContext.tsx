import React, { createContext, useContext, useState, useEffect } from 'react';
import { ContentState, NewsItem } from './types';

const defaultContent: ContentState = {
  hero: {
    title: "Shree Murari Lal Dulari Devi Charitable Trust",
    subtitle: "Empowering communities through health, education, and sustainable development."
  },
  about: {
    heading: "About Our Trust",
    subheading: "Driven by compassion, dedicated to change.",
    mission: "Our mission is to uplift underprivileged communities by providing access to essential services. We envision a society where every individual has the opportunity to live a healthy, educated, and dignified life.",
    vision: "Founded on the principles of service and integrity, the Trust has been committed to creating lasting impact through sustainable and community-focused initiatives."
  },
  news: [
    {
      id: "1",
      date: "15 September, 2025",
      title: "Successful Health Camp in Rural Bharatpur",
      content: "We provided free health check-ups and medicines to over 200 villagers, focusing on women and children's health.",
      imageUrl: "https://images.unsplash.com/photo-1583912268183-a34d4a7f2f2a?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "2",
      date: "28 August, 2025",
      title: "Plantation Drive for a Greener Tomorrow",
      content: "Our volunteers and local community members planted over 500 saplings near the Keoladeo National Park periphery.",
      imageUrl: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&q=80&w=600"
    }
  ],
  contact: {
    address: "VPO, near water tank, Tehsil, Unch, Nadbai, Rajasthan 321602",
    email: "smlddcharitabletrust@gmail.com",
    phone: "+91 99297 08333"
  }
};

interface AppContextType {
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
  content: ContentState;
  updateContent: (section: keyof ContentState, field: string, value: string) => void;
  addNews: (news: NewsItem) => void;
  editNews: (id: string, news: NewsItem) => void;
  deleteNews: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppContextProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [content, setContent] = useState<ContentState>(() => {
    const saved = localStorage.getItem('smldd-content-v2');
    return saved ? JSON.parse(saved) : defaultContent;
  });

  useEffect(() => {
    localStorage.setItem('smldd-content-v2', JSON.stringify(content));
  }, [content]);

  const updateContent = (section: keyof ContentState, field: string, value: string) => {
    setContent(prev => ({
      ...prev,
      [section]: {
        ...(prev[section] as any),
        [field]: value
      }
    }));
  };

  const addNews = (news: NewsItem) => {
    setContent(prev => ({ ...prev, news: [news, ...prev.news] }));
  };

  const editNews = (id: string, updated: NewsItem) => {
    setContent(prev => ({
      ...prev,
      news: prev.news.map(n => n.id === id ? updated : n)
    }));
  };

  const deleteNews = (id: string) => {
    setContent(prev => ({
      ...prev,
      news: prev.news.filter(n => n.id !== id)
    }));
  };

  return (
    <AppContext.Provider value={{ isAdmin, setIsAdmin, content, updateContent, addNews, editNews, deleteNews }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppContextProvider");
  return context;
}
