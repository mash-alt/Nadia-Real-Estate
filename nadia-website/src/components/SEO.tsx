import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  keywords?: string;
}

const BASE_URL  = 'https://nadiacagayrealty.com';
const DEFAULT_IMG = 'https://res.cloudinary.com/dtsoyzdfu/image/upload/q_auto,f_auto,c_fill,w_1200,h_630,g_auto/home/nadia-realestate/nadia-profile';

function setMeta(name: string, content: string, attr: 'name' | 'property' = 'name') {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(href: string) {
  let el = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export default function SEO({
  title,
  description,
  canonical,
  ogImage = DEFAULT_IMG,
  ogType  = 'website',
  keywords,
}: SEOProps) {
  useEffect(() => {
    const fullTitle = `${title} | NadiaCagayRealty`;
    document.title = fullTitle;

    const url = canonical ? `${BASE_URL}${canonical}` : BASE_URL;

    setMeta('description', description);
    if (keywords) setMeta('keywords', keywords);

    setMeta('og:title',       fullTitle,   'property');
    setMeta('og:description', description, 'property');
    setMeta('og:image',       ogImage,     'property');
    setMeta('og:url',         url,         'property');
    setMeta('og:type',        ogType,      'property');

    setMeta('twitter:title',       fullTitle);
    setMeta('twitter:description', description);
    setMeta('twitter:image',       ogImage);

    setCanonical(url);
  }, [title, description, canonical, ogImage, ogType, keywords]);

  return null;
}
