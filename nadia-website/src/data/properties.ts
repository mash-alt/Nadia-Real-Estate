import type { Property, Testimonial } from '../types';

export const properties: Property[] = [
  // Condos
  {
    id: 1,
    title: "Luxury Skyline Penthouse",
    location: "Metro Manila",
    price: "₱850,000",
    size: "2,400 sq ft",
    beds: 3,
    baths: 2.5,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    type: "condo",
    status: 'for-sale',
    featured: true
  },
  {
    id: 2,
    title: "Modern Waterfront Suite",
    location: "Cebu",
    price: "₱625,000",
    size: "1,850 sq ft",
    beds: 2,
    baths: 2,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    type: "condo",
    status: 'for-sale',
    featured: true
  },
  {
    id: 3,
    title: "Urban Executive Loft",
    location: "Metro Manila",
    price: "₱475,000",
    size: "1,450 sq ft",
    beds: 2,
    baths: 1.5,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    type: "condo",
    status: 'for-rent',
    featured: true
  },
  {
    id: 4,
    title: "Contemporary High-Rise",
    location: "Batangas",
    price: "₱720,000",
    size: "2,100 sq ft",
    beds: 3,
    baths: 2,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    type: "condo",
    status: 'for-sale',
    featured: true
  },
  // Additional Properties (non-condos)
  {
    id: 5,
    title: "Elegant Victorian House",
    location: "Laguna",
    price: "₱1,250,000",
    size: "3,200 sq ft",
    beds: 4,
    baths: 3,
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
    type: "house",
    status: 'for-sale',
    highlights: ["Corner lot", "Quiet street", "Near schools"],
    amenities: ["Garden", "Parking", "Storage"],
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80",
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&q=80",
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1200&q=80"
    ]
  },
  {
    id: 6,
    title: "Modern Townhouse",
    location: "Cavite",
    price: "₱580,000",
    size: "1,900 sq ft",
    beds: 3,
    baths: 2.5,
    image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80",
    type: "townhouse",
    status: 'for-rent',
    highlights: ["Flexible lease", "Open-plan living", "Near parks"],
    amenities: ["Clubhouse", "Security", "Parking"],
    images: [
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80"
    ]
  },
  {
    id: 7,
    title: "Spacious Garden Apartment",
    location: "Batangas",
    price: "₱385,000",
    size: "1,350 sq ft",
    beds: 2,
    baths: 2,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
    type: "apartment",
    status: 'for-rent',
    highlights: ["Garden view", "Bright interiors", "Walkable area"],
    amenities: ["Gym", "Playground", "Pet-friendly"],
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80"
    ]
  },
  {
    id: 8,
    title: "Charming Cottage House",
    location: "Davao",
    price: "₱895,000",
    size: "2,600 sq ft",
    beds: 3,
    baths: 2,
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80",
    type: "house",
    status: 'for-sale',
    highlights: ["Cozy neighborhood", "Updated kitchen", "Move-in ready"],
    amenities: ["Backyard", "Parking", "Laundry"],
    images: [
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&q=80",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80"
    ]
  },
  {
    id: 9,
    title: "Prime Commercial Space",
    location: "Metro Manila",
    price: "₱1,950,000",
    size: "4,500 sq ft",
    beds: 0,
    baths: 2,
    image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=800&q=80",
    type: "commercial",
    status: 'for-sale',
    highlights: ["High foot traffic", "Flexible layout", "Near transit"],
    amenities: ["Elevator access", "Security", "Loading area"],
    images: [
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1200&q=80",
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80",
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=80"
    ]
  },
  {
    id: 10,
    title: "BE Uptown Park",
    location: "Cebu",
    price: "Contact for Price",
    size: "23.55 – 422.62 sqm",
    beds: 2,
    baths: 1,
    image: "https://res.cloudinary.com/dtsoyzdfu/image/upload/q_auto,f_auto,c_limit,w_1920/home/nadia-realestate/be-uptown-facade",
    type: "condo",
    status: 'for-sale',
    featured: true,
    overview: "BE Uptown Park is a 25-floor eco-luxury condominium rising in the heart of Cebu City, just 400 meters from Fuente Osmeña Circle and 30 meters from St. Theresa's College. Designed around the concept of biophilic living, it weaves nature and modern architecture together to offer a sanctuary within the city. Unit types range from cozy Studio Suites to expansive Sky Villas, making it ideal for first-time buyers, professionals, and investors alike.",
    highlights: [
      "25-floor eco-luxury condominium",
      "Prime location — 400m from Fuente Osmeña Circle",
      "30m from St. Theresa's College",
      "Unit sizes: 23.55 – 422.62 sqm",
      "Studio, 1BR, 2BR & Sky Villa options",
      "Biophilic architecture with eco green spaces",
      "3,046 sqm lot area"
    ],
    amenities: [
      "Residential Lobby",
      "Commune Social Hall",
      "The Veranda Lounge",
      "Wonder Patch Kids' Play Area",
      "Uplift Fitness Gym",
      "Ripple Cove Kiddie Pool",
      "Splash Lap Pool",
      "The Escalade — Terraced Nature Park",
      "Eco Garden",
      "BE Lockers Storage"
    ],
    images: [
      "https://res.cloudinary.com/dtsoyzdfu/image/upload/q_auto,f_auto,c_limit,w_1920/home/nadia-realestate/be-uptown-facade",
      "https://res.cloudinary.com/dtsoyzdfu/image/upload/q_auto,f_auto,c_limit,w_1920/home/nadia-realestate/be-uptown-lifestyle",
      "https://res.cloudinary.com/dtsoyzdfu/image/upload/q_auto,f_auto,c_limit,w_1920/home/nadia-realestate/be-uptown-veranda",
      "https://res.cloudinary.com/dtsoyzdfu/image/upload/q_auto,f_auto,c_limit,w_1920/home/nadia-realestate/be-uptown-escalade",
      "https://res.cloudinary.com/dtsoyzdfu/image/upload/q_auto,f_auto,c_limit,w_1920/home/nadia-realestate/be-uptown-ripple-cove",
      "https://res.cloudinary.com/dtsoyzdfu/image/upload/q_auto,f_auto,c_limit,w_1920/home/nadia-realestate/be-uptown-sky-villa",
      "https://res.cloudinary.com/dtsoyzdfu/image/upload/q_auto,f_auto,c_limit,w_1920/home/nadia-realestate/be-uptown-studio",
      "https://res.cloudinary.com/dtsoyzdfu/image/upload/q_auto,f_auto,c_limit,w_1920/home/nadia-realestate/be-uptown-1br-kitchen",
      "https://res.cloudinary.com/dtsoyzdfu/image/upload/q_auto,f_auto,c_limit,w_1920/home/nadia-realestate/be-uptown-1br-bedroom",
      "https://res.cloudinary.com/dtsoyzdfu/image/upload/q_auto,f_auto,c_limit,w_1920/home/nadia-realestate/be-uptown-2br-bedroom",
      "https://res.cloudinary.com/dtsoyzdfu/image/upload/q_auto,f_auto,c_limit,w_1920/home/nadia-realestate/be-uptown-2br-living"
    ]
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
