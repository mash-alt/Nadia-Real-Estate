import PropertyCard from '../components/PropertyCard';
import { properties } from '../data/properties';

export default function Condos() {
  const condos = properties.filter(p => p.type === 'condo');

  return (
    <section className="condos-section">
      <div className="container">
        <h2 className="section-title">Featured Condominiums</h2>
        <p className="section-subtitle">Handpicked properties that define modern urban luxury</p>
        
        <div className="condos-grid">
          {condos.map((condo) => (
            <PropertyCard key={condo.id} property={condo} />
          ))}
        </div>
      </div>
    </section>
  );
}
