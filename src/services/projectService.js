import { PROJECTS_DATA } from '../data/projects';

/**
 * Service Layer Facade for Projects
 * Designed for future API integration (e.g. fetch('/api/projects'))
 */

export const projectService = {
  // Fetch all projects (optional category filter)
  async getProjects(category = 'All') {
    // Simulate API delay for realistic async flow
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!category || category === 'All') {
          resolve(PROJECTS_DATA);
        } else {
          const filtered = PROJECTS_DATA.filter(
            (p) => p.category.toLowerCase() === category.toLowerCase()
          );
          resolve(filtered);
        }
      }, 100);
    });
  },

  // Fetch single project by ID
  async getProjectById(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const project = PROJECTS_DATA.find((p) => p.id === id);
        resolve(project || null);
      }, 100);
    });
  },

  // Fetch featured projects for homepage editorial layout
  async getFeaturedProjects() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const featured = PROJECTS_DATA.filter((p) => p.isFeatured);
        resolve(featured);
      }, 100);
    });
  },

  // Fetch related projects (excluding current ID)
  async getRelatedProjects(currentId, limit = 2) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const related = PROJECTS_DATA.filter((p) => p.id !== currentId).slice(0, limit);
        resolve(related);
      }, 100);
    });
  }
};
