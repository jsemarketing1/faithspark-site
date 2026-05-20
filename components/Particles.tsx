'use client';
import { useEffect } from 'react';

export default function Particles() {
  useEffect(() => {
    const container = document.getElementById('pts');
    if (!container) return;
    for (let i = 0; i < 20; i++) {
      const p = document.createElement('div');
      p.className = 'pt';
      const sz = Math.random() * 3 + 1;
      p.style.cssText = `left:${Math.random() * 100}%;bottom:-10px;width:${sz}px;height:${sz}px;animation-duration:${Math.random() * 10 + 8}s;animation-delay:${Math.random() * 8}s;`;
      container.appendChild(p);
    }
  }, []);

  return (
    <div
      id="pts"
      style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}
    />
  );
}
