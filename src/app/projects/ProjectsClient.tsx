"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Server, Smartphone, Globe, ArrowRight, Search, ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { Project } from "@/types";

const iconMap: Record<string, React.ElementType> = {
  Code, Server, Smartphone, Globe,
};

export default function ProjectsClient({ projects }: { projects: Project[] }) {
  const [search, setSearch] = useState("");

  const filteredProjects = projects.filter((proj) => {
    const q = search.toLowerCase();
    return (
      (proj.title?.toLowerCase().includes(q)) ||
      (proj.description?.toLowerCase().includes(q)) ||
      (proj.technologies?.toLowerCase().includes(q))
    );
  });

  return (
    <div className="section-container pt-32 pb-24 min-h-screen">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-primary-accent mb-8 transition-colors">
        <ArrowLeft size={16} /> Back to Home
      </Link>
      
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 gradient-text">All Projects</h1>
        
        {/* Search Input */}
        <div className="max-w-xl mx-auto relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="text-text-secondary group-focus-within:text-primary-accent transition-colors" size={20} />
          </div>
          <input
            type="text"
            placeholder="Search projects by title, description, or tech stack..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-card-bg/50 border border-border-subtle focus:border-primary-accent rounded-2xl py-4 pl-12 pr-4 text-text-primary text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-primary-accent/20 transition-all placeholder:text-text-secondary/50 glass"
          />
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="text-center text-text-secondary py-16 text-lg">
          No projects found matching &quot;{search}&quot;.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-16">
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
                  <div className="h-full rounded-2xl bg-card-bg border border-border-subtle overflow-hidden group hover:-translate-y-2 hover:shadow-xl hover:shadow-primary-accent/10 transition-all duration-300 flex flex-col">
                    {/* Image area */}
                    <div className="h-56 bg-gradient-to-br from-primary-accent/15 via-secondary-accent/10 to-primary-dark flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-card-bg/80 to-transparent" />
                      <TypeIcon size={64} className="text-primary-accent/40 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                    </div>

                    <div className="p-6 md:p-8 flex flex-col flex-1">
                      <h3 className="text-2xl font-bold text-text-primary mb-3">{proj.title}</h3>
                      <p className="text-base md:text-lg text-text-secondary line-clamp-4 mb-6 flex-1 relative pl-3 border-l-2 border-primary-accent/30">
                        {proj.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-8">
                        {proj.technologies?.split(",").map((tech) => (
                          <span key={tech} className="px-3 py-1 text-sm rounded-full bg-primary-accent/10 text-primary-accent border border-primary-accent/20">
                            {tech.trim()}
                          </span>
                        ))}
                      </div>

                      <Link
                        href={href}
                        className="w-full mt-auto py-3.5 rounded-xl bg-primary-accent text-white text-lg font-semibold text-center hover:bg-primary-accent/90 hover:shadow-lg hover:shadow-primary-accent/25 transition-all duration-200 flex items-center justify-center gap-2"
                      >
                        Let&apos;s Go! <ArrowRight size={20} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
