'use client';

import { useEffect } from 'react';
import { initializePortfolio } from '../app.js';

export default function Enhancements() {
  useEffect(() => { initializePortfolio(); }, []);
  return null;
}
