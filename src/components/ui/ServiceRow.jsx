import React from 'react';
import { ArrowRight } from 'lucide-react';

/**
 * Editorial Service Row Component
 * Features clean architectural list layout: Number, Title, Short Desc, Arrow & hover accent line
 */

export const ServiceRow = ({ service, isSelected = false, onSelect }) => {
  return (
    <div 
      onClick={onSelect}
      className={`group relative py-7 px-6 sm:px-8 border-b border-[#D9D9D4] transition-architectural cursor-pointer select-none rounded-[4px] ${
        isSelected 
          ? 'bg-[#EEEEEB] border-l-4 border-l-[#D85B3F]' 
          : 'bg-transparent hover:bg-[#EEEEEB]/70 hover:pl-8 sm:hover:pl-10'
      }`}
    >
      {/* Subtle top accent line on hover */}
      <span className={`absolute top-0 left-0 h-[2px] bg-[#D85B3F] transition-all duration-500 ${isSelected ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-8">
        {/* Left Side: Number + Title */}
        <div className="flex items-start md:items-center gap-6 sm:gap-8 min-w-[320px]">
          <span className="font-mono text-sm sm:text-base text-[#D85B3F] font-bold">
            {service.number}
          </span>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#111111] group-hover:text-[#111111]">
            {service.title}
          </h3>
        </div>

        {/* Middle: Short Description */}
        <p className="text-sm sm:text-base text-[#6B6B67] max-w-xl font-normal leading-relaxed">
          {service.shortDesc}
        </p>

        {/* Right Side: Arrow Action */}
        <div className="flex items-center justify-end">
          <div className={`w-10 h-10 rounded-full border border-[#D9D9D4] flex items-center justify-center transition-architectural ${
            isSelected 
              ? 'bg-[#111111] text-[#F7F7F5] border-[#111111]' 
              : 'group-hover:border-[#111111] group-hover:bg-[#111111] group-hover:text-[#F7F7F5]'
          }`}>
            <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${isSelected ? 'translate-x-0' : 'group-hover:translate-x-0.5'}`} />
          </div>
        </div>
      </div>
    </div>
  );
};
