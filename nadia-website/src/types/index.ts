export interface Property {
  id: number;
  title: string;
  location: string;
  price: string;
  size: string;
  beds: number;
  baths: number;
  image: string;
  type: 'condo' | 'house' | 'townhouse' | 'apartment';
  featured?: boolean;
}

export interface Testimonial {
  name: string;
  role: string;
  text: string;
  rating: number;
}
