/* oxlint-disable next/no-img-element -- Static brand logo artwork is optimized for high-DPI display */
'use client';

import React from 'react';

interface BrandLogoProps {
  className?: string;
  variant?: 'topbar' | 'hero' | 'contact';
}

export function BrandLogo({
  className = '',
  variant = 'contact',
}: BrandLogoProps) {
  if (variant === 'topbar') {
    return (
      <span className={`topbar-brand-badge ${className}`.trim()}>
        <span className="topbar-brand-glow" aria-hidden="true" />
        <span className="topbar-brand-energy" aria-hidden="true" />
        <img
          src="/memasevich.webp"
          className="topbar-brand-img"
          alt="Memasevich"
          width="1672"
          height="941"
          loading="eager"
          decoding="async"
        />
        <span className="topbar-brand-shine" aria-hidden="true" />
      </span>
    );
  }

  const isContact = variant === 'contact';
  const wrapClass = isContact ? 'contact-brand-wrap' : 'brand-wrap';
  const brandClass = isContact ? 'contact-brand' : 'brand';

  return (
    <div className={`${wrapClass} ${className}`.trim()}>
      <div className={brandClass}>
        <div className="ambient" aria-hidden="true" />
        <div className="energy" aria-hidden="true" />

        <img
          src="/memasevich.webp"
          className="logo"
          alt="Memasevich"
          width="1672"
          height="941"
          loading="lazy"
          decoding="async"
        />

        <div className="highlight" aria-hidden="true" />
      </div>
    </div>
  );
}
