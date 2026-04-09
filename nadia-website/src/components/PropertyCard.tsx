import { Link } from 'react-router-dom';
import type { Property } from '../types';
import { getUnitOffersSummary, shouldShowUnitOffers } from '../utils/propertyDisplay';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const showUnitOffers = shouldShowUnitOffers(property);
  const unitOffersSummary = getUnitOffersSummary(property);

  return (
    <div className="condo-card">
      <div className="condo-image">
        <img src={property.image} alt={property.title} />
        <div className="condo-price">{property.price}</div>
      </div>
      <div className="condo-content">
        <h3 className="condo-title">{property.title}</h3>
        <p className="condo-location">📍 {property.location}</p>
        <div className="condo-details">
          {showUnitOffers ? (
            <span>🏷️ {unitOffersSummary}</span>
          ) : (
            <>
              {property.type !== 'commercial' && <span>🛏️ {property.beds} Beds</span>}
              <span>🚿 {property.baths} Baths</span>
            </>
          )}
          <span>📐 {property.size}</span>
        </div>
        <Link to="/contact" className="btn btn-outline">
          Inquire Now
        </Link>
      </div>
    </div>
  );
}
