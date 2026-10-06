import React from 'react';
import { Container } from '../layout/Container';

/**
 * Skeleton Loader for Project Detail Page (/projects/:id)
 */
export const ProjectDetailSkeleton = () => {
  return (
    <div className="min-h-screen pt-28 sm:pt-32 pb-24 bg-[#F7F7F5] animate-pulse">
      {/* Top Back Link Skeleton */}
      <Container className="mb-8">
        <div className="w-40 h-4 bg-[#D9D9D4] rounded-[2px]"></div>
      </Container>

      {/* Header Skeleton */}
      <Container className="mb-12">
        <div className="w-32 h-4 bg-[#D85B3F]/30 rounded-[2px] mb-3"></div>
        <div className="w-3/4 sm:w-2/3 h-12 bg-[#D9D9D4] rounded-[4px] mb-4"></div>
        <div className="w-1/2 h-6 bg-[#D9D9D4] rounded-[2px]"></div>
      </Container>

      {/* Hero Image Skeleton */}
      <Container className="mb-16">
        <div className="w-full h-[400px] sm:h-[560px] rounded-[6px] bg-[#EEEEEB] border border-[#D9D9D4]"></div>
      </Container>

      {/* Meta Specs & Content Grid Skeleton */}
      <Container className="mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-y border-[#D9D9D4] py-12">
          {/* Sidebar Specs Skeleton */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-6 bg-[#EEEEEB] border border-[#D9D9D4] rounded-[4px] space-y-4">
              <div className="w-32 h-4 bg-[#D9D9D4] rounded-[2px]"></div>
              <div className="w-full h-8 bg-[#D9D9D4] rounded-[2px]"></div>
              <div className="w-full h-8 bg-[#D9D9D4] rounded-[2px]"></div>
              <div className="w-full h-8 bg-[#D9D9D4] rounded-[2px]"></div>
            </div>
            <div className="w-full h-12 bg-[#111111]/20 rounded-[4px]"></div>
          </div>

          {/* Description & Features Skeleton */}
          <div className="lg:col-span-8 space-y-6">
            <div className="w-48 h-8 bg-[#D9D9D4] rounded-[2px]"></div>
            <div className="w-full h-4 bg-[#D9D9D4] rounded-[2px]"></div>
            <div className="w-full h-4 bg-[#D9D9D4] rounded-[2px]"></div>
            <div className="w-3/4 h-4 bg-[#D9D9D4] rounded-[2px]"></div>

            <div className="pt-6 border-t border-[#D9D9D4] grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="h-14 bg-[#EEEEEB] border border-[#D9D9D4] rounded-[4px]"></div>
              <div className="h-14 bg-[#EEEEEB] border border-[#D9D9D4] rounded-[4px]"></div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
