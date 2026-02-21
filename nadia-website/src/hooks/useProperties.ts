import { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../config';
import { properties as staticProperties } from '../data/properties';
import type { Property } from '../types';

export function useProperties() {
  const [properties, setProperties] = useState<Property[]>(staticProperties);
  const [loading, setLoading]       = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'properties'), orderBy('createdAt', 'desc'));

    const unsub = onSnapshot(
      q,
      (snap) => {
        if (!snap.empty) {
          const firestoreProps = snap.docs.map((d) => ({
            ...(d.data() as Omit<Property, 'id'>),
            id: d.id,
          })) as Property[];

          // Merge: Firestore is the source of truth, but keep any static
          // properties that haven't been added to Firestore yet (matched by title)
          const firestoreTitles = new Set(firestoreProps.map((p) => p.title));
          const staticOnly = staticProperties.filter((p) => !firestoreTitles.has(p.title));
          // Filter out hidden properties for the public view
          setProperties([...firestoreProps, ...staticOnly].filter(p => !p.hidden));
        } else {
          // Firestore collection empty → show placeholder data
          setProperties(staticProperties.filter(p => !p.hidden));
        }
        setLoading(false);
      },
      () => {
        // Network / rules error → fall back to static data silently
        setProperties(staticProperties.filter(p => !p.hidden));
        setLoading(false);
      }
    );

    return unsub;
  }, []);

  return { properties, loading };
}
