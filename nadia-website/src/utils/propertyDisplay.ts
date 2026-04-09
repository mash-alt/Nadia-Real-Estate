import type { Property } from '../types';

type ListingInfoFields = Pick<Property, 'showBedsBaths' | 'unitOffers'>;

function parseUnitOffers(raw: unknown): string[] {
  if (Array.isArray(raw)) {
    return raw
      .map((offer) => String(offer).trim())
      .filter(Boolean);
  }

  if (typeof raw === 'string') {
    return raw
      .split(/\r?\n|,/)
      .map((offer) => offer.trim())
      .filter(Boolean);
  }

  return [];
}

export function getUnitOffers(source: Pick<Property, 'unitOffers'> | Record<string, unknown>): string[] {
  const direct = parseUnitOffers((source as { unitOffers?: unknown }).unitOffers);
  if (direct.length) return direct;

  const legacyKeys = ['unitOffer', 'unit_offers', 'unit offers'] as const;
  for (const key of legacyKeys) {
    const offers = parseUnitOffers((source as Record<string, unknown>)[key]);
    if (offers.length) return offers;
  }

  return [];
}

export function shouldShowUnitOffers(property: ListingInfoFields): boolean {
  const offers = getUnitOffers(property);
  if (!offers.length) return false;
  if (property.showBedsBaths === true) return false;
  if (property.showBedsBaths === false) return true;
  return true;
}

export function inferShowBedsBaths(property: ListingInfoFields): boolean {
  if (typeof property.showBedsBaths === 'boolean') return property.showBedsBaths;
  return getUnitOffers(property).length === 0;
}

export function getUnitOffersSummary(property: ListingInfoFields, maxVisible = 2): string {
  const offers = getUnitOffers(property);
  if (!offers.length) return '';

  const visible = offers.slice(0, Math.max(1, maxVisible));
  const hiddenCount = offers.length - visible.length;
  return hiddenCount > 0 ? `${visible.join(', ')} +${hiddenCount} more` : visible.join(', ');
}
