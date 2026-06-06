export interface NewsItem {
  id: string;
  date: string;
  title: string;
  content: string;
  imageUrl: string;
}

export interface ContentState {
  hero: {
    title: string;
    subtitle: string;
  };
  about: {
    heading: string;
    subheading: string;
    mission: string;
    vision: string;
  };
  contact: {
    address: string;
    email: string;
    phone: string;
  };
  news: NewsItem[];
}
