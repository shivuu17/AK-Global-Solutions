import React from 'react';
import { ArrowUpRight } from 'lucide-react';

/**
 * Editorial Project Card Component
 * Minimalist architectural framing with crisp typography & subtle image scale on hover
 */

export const ProjectCard = ({ project, aspect = "large" }) => {
  const isLarge = aspect === "large";

  return (
    <a 
      href={`/projects/${project.id}`}
      className="group block relative overflow-hidden bg-[#EEEEEB] border border-[#D9D9D4] rounded-[6px] transition-architectural"
    >
      {/* Image Wrapper */}
      <div className={`relative w-full overflow-hidden ${isLarge ? 'h-[360px] sm:h-[480px]' : 'h-[280px] sm:h-[360px]'}`}>
        <img 
          src={project.coverImage} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        {/* Subtle architectural gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/75 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
        
        {/* Category Pill Tag */}
        <div className="absolute top-4 left-4 z-10">
          <span className="text-[11px] uppercase tracking-widest font-mono text-[#111111] bg-[#F7F7F5]/90 backdrop-blur-xs px-2.5 py-1 border border-[#D9D9D4] rounded-[2px]">
            {project.category}
          </span>
        </div>

        {/* Arrow Badge Top Right */}
        <div className="absolute top-4 right-4 z-10 w-9 h-9 bg-[#111111] text-[#F7F7F5] rounded-full flex items-center justify-center transition-transform duration-300 group-hover:bg-[#D85B3F] group-hover:rotate-45">
          <ArrowUpRight className="w-4 h-4" />
        </div>

        {/* Card Content Overlay Bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-10 text-[#F7F7F5]">
          <div className="flex items-center justify-between text-xs font-mono text-[#D9D9D4] mb-1">
            <span>{project.location}</span>
            <span>{project.year}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#F7F7F5] group-hover:text-[#F7F7F5]">
            {project.title}
          </h3>
          {project.tagline && (
            <p className="text-sm text-[#D9D9D4] line-clamp-2 mt-2 font-normal opacity-90">
              {project.tagline}
            </p>
          )}
        </div>
      </div>
    </a>
  );
};
