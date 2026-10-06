import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container } from '../components/layout/Container';
import { Button } from '../components/ui/Button';
import { BeforeAfterSlider } from '../components/ui/BeforeAfterSlider';
import { ProjectCard } from '../components/ui/ProjectCard';
import { ProjectDetailSkeleton } from '../components/ui/ProjectDetailSkeleton';
import { projectService } from '../services/projectService';
import { ArrowLeft, MapPin, Calendar, Layers, ShieldCheck } from 'lucide-react';

export const ProjectDetailPage = ({ onOpenQuoteModal }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [relatedProjects, setRelatedProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    async function loadProjectData() {
      setLoading(true);
      const data = await projectService.getProjectById(id);
      if (data) {
        setProject(data);
        const related = await projectService.getRelatedProjects(id, 2);
        setRelatedProjects(related);
      } else {
        setProject(null);
      }
      setLoading(false);
    }
    loadProjectData();
  }, [id]);

  if (loading) {
    return <ProjectDetailSkeleton />;
  }

  if (!project) {
    return (
      <div className="min-h-screen pt-40 pb-20 bg-[#F7F7F5]">
        <Container>
          <div className="max-w-xl mx-auto text-center space-y-6">
            <h1 className="text-3xl font-bold text-[#111111]">Project Not Found</h1>
            <p className="text-sm text-[#6B6B67]">
              The requested architectural project could not be located in our database.
            </p>
            <Button onClick={() => navigate('/')} variant="primary">
              Return to Home
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <main className="min-h-screen pt-28 sm:pt-32 pb-24 bg-[#F7F7F5]">
      {/* Top Navigation Bar */}
      <Container className="mb-8">
        <Link 
          to="/#projects" 
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-architectural text-[#6B6B67] hover:text-[#111111] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Projects Gallery</span>
        </Link>
      </Container>

      {/* Hero Section */}
      <Container className="mb-12">
        <div className="flex items-center gap-3 mb-3">
          <span className="w-6 h-[1px] bg-[#D85B3F]"></span>
          <span className="text-xs uppercase tracking-architectural text-[#D85B3F] font-mono font-bold">
            {project.category} PROJECT
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#111111] mb-6">
          {project.title}
        </h1>
        <p className="text-lg sm:text-xl text-[#6B6B67] font-serif italic max-w-3xl">
          "{project.tagline}"
        </p>
      </Container>

      {/* Hero Cover Image */}
      <Container className="mb-16">
        <div className="w-full h-[400px] sm:h-[560px] md:h-[640px] rounded-[6px] overflow-hidden border border-[#D9D9D4] bg-[#EEEEEB] shadow-sm">
          <img 
            src={project.coverImage} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
        </div>
      </Container>

      {/* Project Meta Details Grid */}
      <Container className="mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-y border-[#D9D9D4] py-12">
          
          {/* Metadata Specs Sidebar */}
          <div className="lg:col-span-4 space-y-6 font-mono text-xs">
            <div className="p-6 bg-[#EEEEEB] border border-[#D9D9D4] rounded-[4px] space-y-4">
              <h3 className="text-xs uppercase tracking-architectural text-[#111111] font-bold border-b border-[#D9D9D4] pb-3">
                PROJECT METRICS
              </h3>

              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[#D85B3F]" />
                <div>
                  <span className="text-[#6B6B67] block text-[10px]">LOCATION</span>
                  <span className="text-[#111111] font-bold">{project.location}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-[#D85B3F]" />
                <div>
                  <span className="text-[#6B6B67] block text-[10px]">COMPLETION YEAR</span>
                  <span className="text-[#111111] font-bold">{project.year}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Layers className="w-4 h-4 text-[#D85B3F]" />
                <div>
                  <span className="text-[#6B6B67] block text-[10px]">SCOPE</span>
                  <span className="text-[#111111] font-bold">{project.scope}</span>
                </div>
              </div>

              {project.area && (
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4 text-[#D85B3F]" />
                  <div>
                    <span className="text-[#6B6B67] block text-[10px]">TOTAL AREA</span>
                    <span className="text-[#111111] font-bold">{project.area}</span>
                  </div>
                </div>
              )}
            </div>

            <Button onClick={onOpenQuoteModal} variant="primary" size="md" className="w-full">
              Inquire Similar Project &rarr;
            </Button>
          </div>

          {/* Description & Key Features */}
          <div className="lg:col-span-8 space-y-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#111111] mb-4">
                Architectural Vision & Execution
              </h2>
              <p className="text-base sm:text-lg text-[#6B6B67] leading-relaxed font-normal">
                {project.description}
              </p>
            </div>

            {project.features && project.features.length > 0 && (
              <div className="pt-6 border-t border-[#D9D9D4]">
                <h3 className="text-xs uppercase tracking-architectural font-mono text-[#111111] mb-4 font-bold">
                  SERVICES & CRAFTSMANSHIP HIGHLIGHTS
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 bg-[#EEEEEB] border border-[#D9D9D4] rounded-[4px]">
                      <span className="w-2 h-2 rounded-full bg-[#D85B3F] mt-1.5"></span>
                      <span className="text-xs sm:text-sm text-[#111111] font-medium">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </Container>

      {/* Before / After Section if available */}
      {project.beforeAfter && (
        <Container className="mb-24">
          <div className="mb-8">
            <span className="text-xs uppercase tracking-architectural text-[#D85B3F] font-mono font-bold block mb-1">
              RENOVATION TIMELINE
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#111111]">
              Before & After Transformation
            </h2>
          </div>
          <BeforeAfterSlider 
            beforeImage={project.beforeAfter.before}
            afterImage={project.beforeAfter.after}
            caption={project.beforeAfter.caption}
          />
        </Container>
      )}

      {/* Editorial Photo Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <Container className="mb-24">
          <div className="mb-8">
            <span className="text-xs uppercase tracking-architectural text-[#6B6B67] font-mono font-bold block mb-1">
              VISUAL DOCUMENTATION
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#111111]">
              Project Gallery
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {project.gallery.map((imgUrl, idx) => (
              <div key={idx} className="h-[320px] sm:h-[420px] rounded-[6px] overflow-hidden border border-[#D9D9D4] bg-[#EEEEEB]">
                <img 
                  src={imgUrl} 
                  alt={`${project.title} detail ${idx + 1}`} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </Container>
      )}

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <Container className="pt-16 border-t border-[#D9D9D4]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs uppercase tracking-architectural text-[#6B6B67] font-mono font-bold block mb-1">
                MORE WORK
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#111111]">
                Related Projects
              </h2>
            </div>
            <Link to="/#projects" className="text-xs uppercase font-mono tracking-wider text-[#D85B3F] hover:text-[#111111]">
              View All &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedProjects.map((rel) => (
              <ProjectCard key={rel.id} project={rel} aspect="large" />
            ))}
          </div>
        </Container>
      )}
    </main>
  );
};
