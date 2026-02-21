import PropertyCard from '../components/PropertyCard';
import SEO from '../components/SEO';
import { useProperties } from '../hooks/useProperties';

export default function Condos() {
  const { properties, loading } = useProperties();
  const condos = properties.filter(p => p.type === 'condo');


  return (
    <>
    <SEO
      title="Condominiums for Sale & Rent in the Philippines"
      description="Browse curated condo listings across the Philippines including Cebu, Metro Manila, and more. Find your ideal unit with NadiaCagayRealty."
      canonical="/condos"
      keywords="condo for sale Philippines, condominium Philippines, BE Uptown Cebu, condo investment Philippines"
    />
    <section className="condos-section">
      <div className="container">
        <h2 className="section-title">Featured Condominiums</h2>
        <p className="section-subtitle">Handpicked properties that define modern urban luxury</p>
        
        <div className="condos-grid">
          {loading ? (
            <p style={{ textAlign: 'center', color: '#c9a961', padding: '40px 0', letterSpacing: '1px', gridColumn: '1/-1' }}>
              Loading properties…
            </p>
          ) : condos.map((condo) => (
            <PropertyCard key={condo.id} property={condo} />
          ))}
        </div>
      </div>
    </section>
    </>
  );
}
