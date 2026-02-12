export interface Property {
  id: number;
  title: string;
  location: string;
  price: string;
  size: string;
  beds: number;
  baths: number;
  image: string;
  type: 'house' | 'condo' | 'apartment' | 'commercial' | 'townhouse';
  status?: 'for-sale' | 'for-rent';
  featured?: boolean;

  images?: string[];
  highlights?: string[];
  amenities?: string[];
  overview?: string;
}

export interface Testimonial {
  name: string;
  role: string;
  text: string;
  rating: number;
}
