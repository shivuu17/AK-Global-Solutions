import React, { useState, useEffect } from 'react';
import { Container } from '../layout/Container';
import { SectionHeader } from '../ui/SectionHeader';
import { ProjectCard } from '../ui/ProjectCard';
import { ProjectSkeleton } from '../ui/ProjectSkeleton';
import { projectService } from '../../services/projectService';

export const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Residential', 'Commercial', 'Renovation', 'Interior', 'Carpentry'];

  useEffect(() => {
    async function loadProjects() {
      setLoading(true);
      const data = await projectService.getProjects(activeCategory);
      setProjects(data);
      setLoading(false);
    }
    loadProjects();
  }, [activeCategory]);

  return (
    <section id="projects" className="py-24 md:py-32 bg-[#EEEEEB] border-b border-[#D9D9D4]">
      <Container>
        <SectionHeader 
          label="PORTFOLIO"
          title="Selected Projects"
          description="A curated selection of residential transformations, commercial interiors, and bespoke joinery commissions."
          align="between"
        />

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-12 border-b border-[#D9D9D4] pb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs uppercase tracking-architectural font-mono px-4 py-2 rounded-[2px] transition-architectural cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#111111] text-[#F7F7F5]'
                  : 'bg-[#F7F7F5] text-[#6B6B67] hover:text-[#111111] border border-[#D9D9D4]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Asymmetric Editorial Grid with Skeleton Loading */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {loading ? (
            <ProjectSkeleton count={4} />
          ) : projects.length === 0 ? (
            <div className="md:col-span-12 py-20 text-center text-xs font-mono text-[#6B6B67]">
              NO PROJECTS FOUND IN THIS CATEGORY.
            </div>
          ) : (
            projects.map((project, index) => {
              const isEvenRow = Math.floor(index / 2) % 2 === 0;
              const isFirstInPair = index % 2 === 0;

              let colSpan = "md:col-span-6";
              let aspect = "large";

              if (isFirstInPair) {
                colSpan = isEvenRow ? "md:col-span-7" : "md:col-span-5";
                aspect = isEvenRow ? "large" : "small";
              } else {
                colSpan = isEvenRow ? "md:col-span-5" : "md:col-span-7";
                aspect = isEvenRow ? "small" : "large";
              }

              return (
                <div key={project.id} className={colSpan}>
                  <ProjectCard project={project} aspect={aspect} />
                </div>
              );
            })
          )}
        </div>
      </Container>
    </section>
  );
};
