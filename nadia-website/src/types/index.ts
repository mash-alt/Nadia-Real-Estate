export interface Property {
  id: number | string;
  title: string;
  location: string;
  price: string;
  size: string;
  beds: number;
  baths: number;
  unitOffers?: string[];
  showBedsBaths?: boolean;
  image: string;
  type: 'house' | 'condo' | 'apartment' | 'commercial' | 'townhouse';
  status?: 'for-sale' | 'for-rent';
  featured?: boolean;
  hidden?: boolean;

  images?: string[];
  highlights?: string[];
  amenities?: string[];
  overview?: string;
  mapUrl?: string;
}

export interface Testimonial {
  name: string;
  role: string;
  text: string;
  rating: number;
}
