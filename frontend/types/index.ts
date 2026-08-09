export interface Article {
  id?: string;
  category: string;
  title: string;
  readTime: string;
  image: string;
  description?: string;
}

export interface PickItem {
  id?: string;
  title: string;
  tag: string;
  caption: string;
  image: string;
}

export interface CarouselProduct {
  id?: string;
  name: string;
  price: string;
  image: string;
  quote: string;
  details: string[];
  link?: string;
}

export interface TrendItem {
  id?: string;
  title: string;
  tag: string;
  readTime: string;
  image: string;
}
