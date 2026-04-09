import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { Property } from '../types';
import { getUnitOffersSummary, shouldShowUnitOffers } from '../utils/propertyDisplay';

function formatType(type: Property['type']) {
  const label = type.replace('-', ' ');
  return label.charAt(0).toUpperCase() + label.slice(1);
}

export default function InteractivePropertyCard({
  property,
  onClick,
}: {
  property: Property;
  onClick: (property: Property) => void;
}) {
  const showUnitOffers = shouldShowUnitOffers(property);
  const unitOffersSummary = getUnitOffersSummary(property);

  return (
    <motion.article
      className="property-card"
      layoutId={`property-card-${property.id}`}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 320, damping: 24 }}
      onClick={() => onClick(property)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(property);
        }
      }}
    >
      <motion.div className="property-card-media" layoutId={`property-image-${property.id}`}>
        <img src={property.image} alt={property.title} loading="lazy" />
        <div className="property-card-badges">
          {property.status && (
            <span className={`property-badge ${property.status === 'for-sale' ? 'sale' : 'rent'}`}>
              {property.status === 'for-sale' ? 'For Sale' : 'For Rent'}
            </span>
          )}
          <span className="property-badge type">{formatType(property.type)}</span>
        </div>
        <div className="property-card-price">{property.price}</div>
      </motion.div>

      <div className="property-card-body">
        <h3 className="property-card-title">{property.title}</h3>
        <p className="property-card-location">📍 {property.location}</p>

        <div className="property-card-highlights">
          <span>📐 {property.size}</span>
          {showUnitOffers ? (
            <span>🏷️ {unitOffersSummary}</span>
          ) : (
            <>
              {property.type !== 'commercial' && <span>🛏️ {property.beds} Beds</span>}
              <span>🚿 {property.baths} Baths</span>
            </>
          )}
        </div>

        {property.highlights?.length ? (
          <div className="property-card-chips">
            {property.highlights.slice(0, 3).map((h) => (
              <span key={h} className="property-chip">
                {h}
              </span>
            ))}
          </div>
        ) : null}

        <div className="property-card-actions" onClick={(e) => e.stopPropagation()}>
          <Link to="/contact" className="btn btn-primary property-inquire-btn">
            Inquire
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
