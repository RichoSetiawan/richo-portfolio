"use client";

import { useState, useMemo, KeyboardEvent, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Server, Smartphone, Globe, ArrowRight, Search, Home } from "lucide-react";
import Link from "next/link";
import type { Project } from "@/types";

const iconMap: Record<string, React.ElementType> = {
  Code, Server, Smartphone, Globe,
};

export default function ProjectsClient({ projects }: { projects: Project[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeQuery, setActiveQuery] = useState("");
  const [stars, setStars] = useState<{ id: number; top: string; left: string; size: number; opacity: number; delay: string }[]>([]);

  // Generate stars on mount
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const starCount = isMobile ? Math.floor(Math.random() * 21) + 30 : Math.floor(Math.random() * 51) + 50; // 30-50 mobile, 50-100 desktop
    
    const newStars = Array.from({ length: starCount }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1, // 1px - 3px
      opacity: Math.random() * 0.5 + 0.3, // 0.3 - 0.8
      delay: `${Math.random() * 5}s`, // 0s - 5s
    }));
    
    setStars(newStars);
  }, []);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveQuery(searchTerm);
    }, 300); // 300ms debounce
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleSearch = () => {
    setActiveQuery(searchTerm);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  const filteredProjects = useMemo(() => {
    if (!activeQuery.trim()) return projects;
    
    const q = activeQuery.toLowerCase().trim();
    return projects.filter((proj) => (
      (proj.title?.toLowerCase().includes(q)) ||
      (proj.description?.toLowerCase().includes(q)) ||
      (proj.technologies?.toLowerCase().includes(q))
    ));
  }, [projects, activeQuery]);

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background Stars Accent */}
      <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-primary-dark" aria-hidden="true">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-primary-accent/60"
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animation: `twinkle 3s ease-in-out infinite`,
              animationDelay: star.delay,
              willChange: "opacity, transform",
            }}
          />
        ))}
      </div>
      
      {/* Floating Home Button */}
      <Link
        href="/"
        aria-label="Back to Home"
        title="Back to Home"
        className="fixed bottom-6 right-6 md:bottom-7 md:right-7 lg:bottom-8 lg:right-8 z-50 w-14 h-14 md:w-[60px] md:h-[60px] lg:w-16 lg:h-16 rounded-full bg-primary-accent text-white flex items-center justify-center hover:scale-110 hover:shadow-lg hover:shadow-primary-accent/40 active:scale-95 transition-all duration-300 group"
      >
        <Home size={24} className="group-hover:-rotate-12 transition-transform" />
      </Link>

      <div className="flex-1 flex flex-col justify-center w-full pt-32 md:pt-40 pb-24 md:pb-32 relative z-10">
        <div className="section-container w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header Centered */}
          <div className="flex flex-col items-center mb-8 md:mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-center mb-4 gradient-text">All Projects</h1>
            <p className="text-center text-text-secondary max-w-2xl text-base md:text-lg">
              Explore my latest work, professional projects, and experimental builds.
            </p>
          </div>

          {/* Search Input Enhanced */}
          <div className="w-full max-w-4xl md:max-w-5xl lg:max-w-6xl mx-auto relative group">
            <div className="relative w-full shadow-lg shadow-black/10 rounded-full">
              <input
                type="text"
                placeholder="Search projects by title, description, or tech stack..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-card-bg/70 backdrop-blur-md border border-border-subtle hover:border-text-secondary/50 focus:border-primary-accent rounded-full py-5 md:py-6 px-16 text-text-primary text-base md:text-lg focus:outline-none focus:ring-4 focus:ring-primary-accent/20 transition-all placeholder:text-text-secondary/50 text-center"
                aria-label="Search projects"
              />
              {/* Decorative left icon to ensure absolute visual symmetry of text centering */}
              <div className="absolute left-6 top-1/2 -translate-y-1/2 h-12 w-12 flex items-center justify-center text-text-secondary/20 pointer-events-none hidden md:flex">
                <Search size={22} />
              </div>
              {/* Clickable Search Icon */}
              <button
                onClick={handleSearch}
                className="absolute right-6 top-1/2 -translate-y-1/2 h-12 w-12 flex items-center justify-center text-text-secondary hover:text-primary-accent hover:bg-primary-accent/10 rounded-full transition-colors cursor-pointer"
                aria-label="Trigger search"
              >
                <Search size={24} />
              </button>
            </div>
          </div>

        {/* Project Grid */}
        <div className="w-full pt-20 md:pt-28 lg:pt-36">
          {filteredProjects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center text-text-secondary py-24 bg-card-bg/30 rounded-3xl border border-border-subtle/50 backdrop-blur-sm mx-auto max-w-3xl"
          >
            <Search size={48} className="mx-auto mb-6 text-text-secondary/50" />
            <p className="text-xl md:text-2xl font-semibold text-text-primary mb-3">No projects found</p>
            <p className="text-base md:text-lg">
              We couldn&apos;t find anything matching &quot;<span className="text-primary-accent">{activeQuery}</span>&quot;.
            </p>
            <button
              onClick={() => setSearchTerm("")}
              className="mt-8 px-6 py-3 rounded-xl bg-card-bg border border-border-subtle text-text-primary hover:text-primary-accent hover:border-primary-accent/50 transition-colors"
            >
              Clear search input
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 justify-center">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((proj) => {
                const TypeIcon = iconMap[proj.projectType ?? "Code"] ?? Code;
                const href = proj.liveUrl ?? (proj.projectType === "WebApp" ? `/${proj.title.toLowerCase().replace(/\s+/g, "-")}` : "#");

                return (
                  <motion.div
                    key={proj.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="h-full"
                  >
                    {/* Entire Card wrapped in Link for clickability */}
                    <Link
                      href={href}
                      className="block h-full rounded-3xl bg-card-bg border border-border-subtle p-2 md:p-3 group hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary-accent/15 transition-all duration-300 flex flex-col focus:outline-none focus:ring-4 focus:ring-primary-accent/30 cursor-pointer"
                      style={{ willChange: "transform, box-shadow" }}
                    >
                      {/* Image Area with spacing from border */}
                      <div className="h-48 md:h-56 rounded-2xl bg-gradient-to-br from-primary-accent/15 via-secondary-accent/10 to-primary-dark flex items-center justify-center relative overflow-hidden shrink-0">
                        <div className="absolute inset-0 bg-gradient-to-t from-card-bg/80 to-transparent mix-blend-overlay" />
                        <TypeIcon size={64} className="text-primary-accent/40 relative z-10 group-hover:scale-110 group-hover:text-primary-accent/60 transition-all duration-500" />
                      </div>

                      {/* Content Area with consistent internal padding and spacing hierarchy */}
                      <div className="p-4 md:p-6 lg:p-8 flex flex-col flex-1">
                        <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-4 group-hover:text-primary-accent transition-colors">
                          {proj.title}
                        </h3>
                        
                        <p className="text-base text-text-secondary line-clamp-3 md:line-clamp-4 mb-4 flex-1 leading-relaxed">
                          {proj.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {proj.technologies?.split(",").map((tech) => (
                            <span 
                              key={tech} 
                              className="px-3 py-1.5 text-xs font-medium rounded-full bg-border-subtle/30 text-text-secondary group-hover:bg-primary-accent/10 group-hover:text-primary-accent border border-transparent group-hover:border-primary-accent/20 transition-colors"
                            >
                              {tech.trim()}
                            </span>
                          ))}
                        </div>

                        {/* Visual CTA Button */}
                        <div className="w-full mt-auto mb-0 py-3.5 rounded-xl bg-primary-accent/10 text-primary-accent text-base font-bold text-center group-hover:bg-primary-accent group-hover:text-white group-hover:shadow-lg group-hover:shadow-primary-accent/25 transition-all duration-300 flex items-center justify-center gap-2">
                          Let&apos;s Go! <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
          </div>
        </div>
      </div>
    </div>
  );
}