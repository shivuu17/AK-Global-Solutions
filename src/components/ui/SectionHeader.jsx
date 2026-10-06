import React from 'react';

/**
 * Reusable Section Header Component
 * Provides clean architectural layout: small label, section title, description, and thin line divider
 */

export const SectionHeader = ({
  label,
  title,
  description,
  align = 'left', // 'left', 'center', 'between'
  className = ''
}) => {
  return (
    <div className={`mb-12 md:mb-16 ${className}`}>
      {label && (
        <div className="flex items-center gap-3 mb-3">
          <span className="w-6 h-[1px] bg-[#D85B3F]"></span>
          <span className="text-xs uppercase tracking-architectural text-[#6B6B67] font-semibold">
            {label}
          </span>
        </div>
      )}

      <div className={`flex flex-col ${align === 'between' ? 'md:flex-row md:items-end md:justify-between gap-6' : ''}`}>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#111111] max-w-3xl leading-[1.15]">
          {title}
        </h2>

        {description && (
          <p className={`text-[#6B6B67] text-base sm:text-lg max-w-xl font-normal leading-relaxed ${align === 'between' ? 'md:mb-1' : 'mt-4'}`}>
            {description}
          </p>
        )}
      </div>

      <div className="w-full h-[1px] bg-[#D9D9D4] mt-8"></div>
    </div>
  );
};
