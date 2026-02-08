import type { Property, Testimonial } from '../types';

export const properties: Property[] = [
  // Condos
  {
    id: 1,
    title: "Luxury Skyline Penthouse",
    location: "Downtown Metro",
    price: "$850,000",
    size: "2,400 sq ft",
    beds: 3,
    baths: 2.5,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    type: "condo",
    featured: true
  },
  {
    id: 2,
    title: "Modern Waterfront Suite",
    location: "Harbor District",
    price: "$625,000",
    size: "1,850 sq ft",
    beds: 2,
    baths: 2,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    type: "condo",
    featured: true
  },
  {
    id: 3,
    title: "Urban Executive Loft",
    location: "Financial Center",
    price: "$475,000",
    size: "1,450 sq ft",
    beds: 2,
    baths: 1.5,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    type: "condo",
    featured: true
  },
  {
    id: 4,
    title: "Contemporary High-Rise",
    location: "Midtown Plaza",
    price: "$720,000",
    size: "2,100 sq ft",
    beds: 3,
    baths: 2,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    type: "condo",
    featured: true
  },
  // Additional Properties (non-condos)
  {
    id: 5,
    title: "Elegant Victorian House",
    location: "Heritage District",
    price: "$1,250,000",
    size: "3,200 sq ft",
    beds: 4,
    baths: 3,
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
    type: "house"
  },
  {
    id: 6,
    title: "Modern Townhouse",
    location: "Riverside Community",
    price: "$580,000",
    size: "1,900 sq ft",
    beds: 3,
    baths: 2.5,
    image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80",
    type: "townhouse"
  },
  {
    id: 7,
    title: "Spacious Garden Apartment",
    location: "Green Valley",
    price: "$385,000",
    size: "1,350 sq ft",
    beds: 2,
    baths: 2,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
    type: "apartment"
  },
  {
    id: 8,
    title: "Charming Cottage House",
    location: "Oak Park",
    price: "$895,000",
    size: "2,600 sq ft",
    beds: 3,
    baths: 2,
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80",
    type: "house"
  }
];

export const testimonials: Testimonial[] = [
  {
    name: "[Client Name 1]",
    role: "[Client Title/Role]",
    text: "[Replace with client testimonial - describe their positive experience working with you and how you helped them find their perfect property.]",
    rating: 5
  },
  {
    name: "[Client Name 2]",
    role: "[Client Title/Role]",
    text: "[Replace with client testimonial - highlight your expertise, professionalism, and the value you provided during their real estate journey.]",
    rating: 5
  },
  {
    name: "[Client Name 3]",
    role: "[Client Title/Role]",
    text: "[Replace with client testimonial - showcase your attention to detail and commitment to understanding client needs.]",
    rating: 5
  }
];
