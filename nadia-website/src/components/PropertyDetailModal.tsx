import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Property } from '../types';

function parsePriceToNumber(price: string) {
  const numeric = price.replace(/[^0-9]/g, '');
  const value = Number(numeric);
  return Number.isFinite(value) ? value : 0;
}

function formatType(type: Property['type']) {
  const label = type.replace('-', ' ');
  return label.charAt(0).toUpperCase() + label.slice(1);
}

function makeGallery(property: Property) {
  const images = property.images?.length ? property.images : [property.image];
  return images.length >= 3 ? images : [...images, ...images, ...images].slice(0, 3);
}

export default function PropertyDetailModal({
  property,
  onClose,
}: {
  property: Property | null;
  onClose: () => void;
}) {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const gallery = useMemo(() => (property ? makeGallery(property) : []), [property]);

  useEffect(() => {
    if (!property) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setActiveIndex((i) => Math.min(i + 1, gallery.length - 1));
      if (e.key === 'ArrowLeft') setActiveIndex((i) => Math.max(i - 1, 0));
    };

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [property, onClose, gallery.length]);

  useEffect(() => {
    setActiveIndex(0);
    setTilt({ x: 0, y: 0 });
  }, [property?.id]);

  if (!property) return null;

  const priceValue = parsePriceToNumber(property.price);
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(property.location)}`;

  return (
    <LayoutGroup>
      <AnimatePresence>
        <motion.div
          className="property-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            className="property-modal"
            layoutId={`property-card-${property.id}`}
            ref={modalRef}
            initial={prefersReducedMotion ? false : { scale: 0.98, y: 12 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { scale: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { scale: 0.98, y: 12, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 26 }}
          >
            <div className="property-modal-header">
              <div className="property-modal-header-left">
                <div className="property-modal-badges">
                  {property.status && (
                    <span className={`property-badge ${property.status === 'for-sale' ? 'sale' : 'rent'}`}>
                      {property.status === 'for-sale' ? 'For Sale' : 'For Rent'}
                    </span>
                  )}
                  <span className="property-badge type">{formatType(property.type)}</span>
                </div>
                <h2 className="property-modal-title">{property.title}</h2>
                <p className="property-modal-location">📍 {property.location}</p>
              </div>

              <div className="property-modal-header-right">
                <div className="property-modal-price" title={String(priceValue)}>
                  {property.price}
                </div>
                <div className="property-modal-cta">
                  <Link to="/contact" className="btn btn-primary">
                    Book a Consultation
                  </Link>
                  <button className="btn btn-secondary" type="button" onClick={onClose}>
                    Close
                  </button>
                </div>
              </div>
            </div>

            <div className="property-modal-body">
              <div className="property-hero">
                <motion.div
                  className="property-hero-image"
                  layoutId={`property-image-${property.id}`}
                  onMouseMove={(e) => {
                    if (prefersReducedMotion) return;
                    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
                    const px = (e.clientX - rect.left) / rect.width;
                    const py = (e.clientY - rect.top) / rect.height;
                    const x = (px - 0.5) * 10;
                    const y = (py - 0.5) * -10;
                    setTilt({ x, y });
                  }}
                  onMouseLeave={() => setTilt({ x: 0, y: 0 })}
                  style={
                    prefersReducedMotion
                      ? undefined
                      : {
                          transform: `perspective(900px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
                        }
                  }
                >
                  <motion.img
                    key={gallery[activeIndex]}
                    src={gallery[activeIndex]}
                    alt={property.title}
                    initial={prefersReducedMotion ? false : { opacity: 0, scale: 1.01 }}
                    animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                    exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.99 }}
                    transition={{ duration: 0.25 }}
                    draggable={false}
                  />

                  <div className="property-hero-controls">
                    <button
                      className="property-hero-nav"
                      type="button"
                      onClick={() => setActiveIndex((i) => Math.max(0, i - 1))}
                      disabled={activeIndex === 0}
                      aria-label="Previous image"
                    >
                      ‹
                    </button>
                    <button
                      className="property-hero-nav"
                      type="button"
                      onClick={() => setActiveIndex((i) => Math.min(gallery.length - 1, i + 1))}
                      disabled={activeIndex === gallery.length - 1}
                      aria-label="Next image"
                    >
                      ›
                    </button>
                  </div>
                </motion.div>

                <div className="property-hero-thumbs">
                  {gallery.map((src, idx) => (
                    <button
                      key={`${src}-${idx}`}
                      type="button"
                      className={`property-thumb ${idx === activeIndex ? 'active' : ''}`}
                      onClick={() => setActiveIndex(idx)}
                      aria-label={`View image ${idx + 1}`}
                    >
                      <img src={src} alt="" loading="lazy" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="property-sections">
                <motion.section
                  className="property-section"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.35 }}
                >
                  <h3>Overview</h3>
                  <p>
                    {property.overview ??
                      'A premium listing curated for clarity-first buyers. Explore the details, compare features, and make your next step with confidence.'}
                  </p>
                </motion.section>

                <motion.section
                  className="property-section"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.35, delay: 0.04 }}
                >
                  <h3>Key details</h3>
                  <div className="property-specs">
                    <div className="property-spec">
                      <div className="label">Floor area</div>
                      <div className="value">{property.size}</div>
                    </div>
                    <div className="property-spec">
                      <div className="label">Bedrooms</div>
                      <div className="value">{property.type === 'commercial' ? '—' : property.beds}</div>
                    </div>
                    <div className="property-spec">
                      <div className="label">Bathrooms</div>
                      <div className="value">{property.baths}</div>
                    </div>
                    <div className="property-spec">
                      <div className="label">Status</div>
                      <div className="value">
                        {property.status ? (property.status === 'for-sale' ? 'For Sale' : 'For Rent') : '—'}
                      </div>
                    </div>
                  </div>
                </motion.section>

                <motion.section
                  className="property-section"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.35, delay: 0.08 }}
                >
                  <h3>Features</h3>
                  <div className="property-pills">
                    {(property.highlights?.length ? property.highlights : ['Quality finishes', 'Smart layout', 'Great access'])
                      .slice(0, 8)
                      .map((h) => (
                        <span key={h} className="property-pill">
                          {h}
                        </span>
                      ))}
                  </div>
                </motion.section>

                <motion.section
                  className="property-section"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.35, delay: 0.12 }}
                >
                  <h3>Amenities</h3>
                  <div className="property-amenities">
                    {(property.amenities?.length ? property.amenities : ['Security', 'Parking', 'Nearby essentials']).map((a) => (
                      <div key={a} className="property-amenity">
                        <span className="dot" />
                        {a}
                      </div>
                    ))}
                  </div>
                </motion.section>

                <motion.section
                  className="property-section"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.35, delay: 0.16 }}
                >
                  <h3>Map</h3>
                  <div className="property-map">
                    <div className="property-map-placeholder">
                      <div className="property-map-title">{property.location}</div>
                      <div className="property-map-subtitle">Open in Maps for directions and nearby landmarks.</div>
                      <a className="btn btn-outline" href={mapUrl} target="_blank" rel="noreferrer">
                        Open in Google Maps
                      </a>
                    </div>
                  </div>
                </motion.section>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </LayoutGroup>
  );
}
