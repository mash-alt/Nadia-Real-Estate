import { useMemo, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import InteractivePropertyCard from '../components/InteractivePropertyCard';
import PropertyDetailModal from '../components/PropertyDetailModal';
import { properties } from '../data/properties';
import type { Property } from '../types';

function parsePriceToNumber(price: string) {
  const numeric = price.replace(/[^0-9]/g, '');
  const value = Number(numeric);
  return Number.isFinite(value) ? value : 0;
}

export default function AllProperties() {
  const [query, setQuery] = useState('');
  const [type, setType] = useState<Property['type'] | 'all'>('all');
  const [status, setStatus] = useState<Property['status'] | 'all'>('all');
  const [bedrooms, setBedrooms] = useState<'all' | '0' | '1' | '2' | '3' | '4+'>('all');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [selected, setSelected] = useState<Property | null>(null);

  const filteredProperties = useMemo(() => {
    const q = query.trim().toLowerCase();
    const min = minPrice ? Number(minPrice) : null;
    const max = maxPrice ? Number(maxPrice) : null;

    return properties.filter((p) => {
      const priceValue = parsePriceToNumber(p.price);
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q);

      const matchesType = type === 'all' ? true : p.type === type;
      const matchesStatus = status === 'all' ? true : (p.status ?? 'for-sale') === status;

      const matchesBedrooms = (() => {
        if (bedrooms === 'all') return true;
        if (p.type === 'commercial') return bedrooms === '0';
        if (bedrooms === '4+') return p.beds >= 4;
        return p.beds === Number(bedrooms);
      })();

      const matchesMin = min == null ? true : priceValue >= min;
      const matchesMax = max == null ? true : priceValue <= max;

      return matchesQuery && matchesType && matchesStatus && matchesBedrooms && matchesMin && matchesMax;
    });
  }, [query, type, status, bedrooms, minPrice, maxPrice]);

  const clearFilters = () => {
    setQuery('');
    setType('all');
    setStatus('all');
    setBedrooms('all');
    setMinPrice('');
    setMaxPrice('');
  };

  return (
    <section className="condos-section properties-section">
      <div className="container">
        <h2 className="section-title">All Properties</h2>
        <p className="section-subtitle">Search and filter listings with clarity-first controls</p>

        <div className="properties-toolbar">
          <div className="properties-search">
            <input
              className="properties-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by location, property name, or type…"
              aria-label="Search properties"
            />
          </div>

          <div className="properties-filters">
            <div className="properties-filter">
              <label>Type</label>
              <select value={type} onChange={(e) => setType(e.target.value as any)}>
                <option value="all">All</option>
                <option value="house">House</option>
                <option value="condo">Condo</option>
                <option value="apartment">Apartment</option>
                <option value="commercial">Commercial</option>
              </select>
            </div>

            <div className="properties-filter">
              <label>Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value as any)}>
                <option value="all">All</option>
                <option value="for-sale">For Sale</option>
                <option value="for-rent">For Rent</option>
              </select>
            </div>

            <div className="properties-filter">
              <label>Bedrooms</label>
              <select value={bedrooms} onChange={(e) => setBedrooms(e.target.value as any)}>
                <option value="all">Any</option>
                <option value="0">0 (Commercial)</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4+">4+</option>
              </select>
            </div>

            <div className="properties-filter">
              <label>Min Price</label>
              <input
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="e.g. 300000"
                inputMode="numeric"
              />
            </div>

            <div className="properties-filter">
              <label>Max Price</label>
              <input
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="e.g. 1500000"
                inputMode="numeric"
              />
            </div>

            <button className="btn btn-secondary properties-clear" type="button" onClick={clearFilters}>
              Clear
            </button>
          </div>

          <div className="properties-meta">
            <span className="properties-count">{filteredProperties.length} results</span>
          </div>
        </div>

        <div className="properties-grid">
          {filteredProperties.map((property) => (
            <InteractivePropertyCard key={property.id} property={property} onClick={setSelected} />
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div className="no-results">
            <p>No properties match your search and filters.</p>
          </div>
        )}

        <AnimatePresence>
          {selected ? <PropertyDetailModal property={selected} onClose={() => setSelected(null)} /> : null}
        </AnimatePresence>
      </div>
    </section>
  );
}
