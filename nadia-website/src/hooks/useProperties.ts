import { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../config';
import type { Property } from '../types';

export function useProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading]       = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'properties'), orderBy('createdAt', 'desc'));

    const unsub = onSnapshot(
      q,
      (snap) => {
        const props = snap.docs.map((d) => ({
          ...(d.data() as Omit<Property, 'id'>),
          id: d.id,
        })) as Property[];

        setProperties(props.filter(p => !p.hidden));
        setLoading(false);
      },
      (err) => {
        console.error('Firestore error:', err);
        setLoading(false);
      }
    );

    return unsub;
  }, []);

  return { properties, loading };
}
