import { useState } from 'react';
import PropertyCard from '../components/PropertyCard';
import { properties } from '../data/properties';

export default function AllProperties() {
  const [selectedType, setSelectedType] = useState<string>('all');

  const filteredProperties = selectedType === 'all' 
    ? properties 
    : properties.filter(p => p.type === selectedType);

  const propertyTypes = [
    { value: 'all', label: 'All Properties' },
    { value: 'condo', label: 'Condos' },
    { value: 'house', label: 'Houses' },
    { value: 'townhouse', label: 'Townhouses' },
    { value: 'apartment', label: 'Apartments' }
  ];

  return (
    <section className="condos-section">
      <div className="container">
        <h2 className="section-title">All Properties</h2>
        <p className="section-subtitle">Browse our complete collection of available properties</p>
        
        {/* Filter Buttons */}
        <div className="property-filters">
          {propertyTypes.map(type => (
            <button
              key={type.value}
              className={`filter-btn ${selectedType === type.value ? 'active' : ''}`}
              onClick={() => setSelectedType(type.value)}
            >
              {type.label}
            </button>
          ))}
        </div>

        <div className="condos-grid">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div className="no-results">
            <p>No properties found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
}
