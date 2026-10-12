'use client';

import { useEffect } from 'react';

// Only the interactive controller is hydrated. The full portfolio is prerendered.
export default function Enhancements() {
  useEffect(() => {
    let cancelled = false;
    import('../app.js').then(({ initializePortfolio }) => {
      if (!cancelled) initializePortfolio();
    });
    return () => { cancelled = true; };
  }, []);
  return null;
}
