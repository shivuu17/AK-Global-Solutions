import React from 'react';

/**
 * Skeleton Loader for Project Gallery Cards
 * Renders pulse animation matching editorial project card layout
 */
export const ProjectSkeleton = ({ count = 4 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => {
        const isEvenRow = Math.floor(index / 2) % 2 === 0;
        const isFirstInPair = index % 2 === 0;
        let colSpan = "md:col-span-6";
        let heightClass = "h-[320px] sm:h-[420px]";

        if (isFirstInPair) {
          colSpan = isEvenRow ? "md:col-span-7" : "md:col-span-5";
          heightClass = isEvenRow ? "h-[360px] sm:h-[460px]" : "h-[280px] sm:h-[360px]";
        } else {
          colSpan = isEvenRow ? "md:col-span-5" : "md:col-span-7";
          heightClass = isEvenRow ? "h-[280px] sm:h-[360px]" : "h-[360px] sm:h-[460px]";
        }

        return (
          <div
            key={index}
            className={`${colSpan} relative rounded-[6px] overflow-hidden border border-[#D9D9D4] bg-[#EEEEEB] animate-pulse ${heightClass} p-6 flex flex-col justify-between`}
          >
            {/* Top Category Badge Placeholder */}
            <div className="flex justify-between items-center">
              <div className="w-24 h-5 bg-[#D9D9D4] rounded-[2px]"></div>
              <div className="w-8 h-8 rounded-full bg-[#D9D9D4]"></div>
            </div>

            {/* Bottom Content Placeholders */}
            <div className="space-y-3">
              <div className="flex justify-between w-full">
                <div className="w-28 h-4 bg-[#D9D9D4] rounded-[2px]"></div>
                <div className="w-12 h-4 bg-[#D9D9D4] rounded-[2px]"></div>
              </div>
              <div className="w-3/4 h-7 bg-[#D9D9D4] rounded-[2px]"></div>
              <div className="w-full h-4 bg-[#D9D9D4] rounded-[2px]"></div>
            </div>
          </div>
        );
      })}
    </>
  );
};
