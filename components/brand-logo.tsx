/* oxlint-disable next/no-img-element -- Static brand logo artwork is optimized for high-DPI display */
'use client';

import React from 'react';

interface BrandLogoProps {
  className?: string;
  variant?: 'topbar' | 'hero';
}

export function BrandLogo({
  className = '',
  variant = 'topbar',
}: BrandLogoProps) {
  const isTopbar = variant === 'topbar';

  return (
    <div
      className={`brand-wrap ${isTopbar ? 'brand-wrap-topbar' : ''} ${className}`.trim()}
    >
      <div className={`brand ${isTopbar ? 'brand-topbar' : ''}`}>
        <div className="ambient" aria-hidden="true" />
        <div className="energy" aria-hidden="true" />

        <img
          src="/memasevich.png"
          className="logo"
          alt="Memasevich"
          width="1672"
          height="941"
          loading="eager"
          decoding="async"
        />

        <div className="highlight" aria-hidden="true" />
      </div>
    </div>
  );
}
