"use client";

import { motion } from "framer-motion";
import { ArrowRight, Gamepad2, ListTodo, CloudSun, ExternalLink } from "lucide-react";
import Link from "next/link";
import type { Project } from "@/types";

const typeIcons: Record<string, React.ElementType> = {
  game: Gamepad2,
  todo: ListTodo,
  weather: CloudSun,
};

interface Props {
  projects: Project[];
  showSeeMore?: boolean;
}

export default function ProjectSection({ projects, showSeeMore = true }: Props) {
  return (
    <section id="projects" className="py-24">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 gradient-text">Projects</h2>
          <p className="text-center text-text-secondary mb-12">Things I&apos;ve built and played with</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj, i) => {
            const TypeIcon = typeIcons[proj.projectType ?? ""] ?? ExternalLink;
            const href = proj.isDefault
              ? proj.projectType === "game" ? "/rock-paper-scissors"
              : proj.projectType === "todo" ? "/todo"
              : proj.projectType === "weather" ? "/weather"
              : proj.liveUrl ?? "#"
              : proj.liveUrl ?? "#";

            return (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="h-full"
              >
                <div className="h-full rounded-2xl bg-card-bg border border-border-subtle overflow-hidden group hover:-translate-y-2 hover:shadow-xl hover:shadow-primary-accent/10 transition-all duration-300 flex flex-col">
                  {/* Image area */}
                  <div className="h-48 bg-gradient-to-br from-primary-accent/15 via-secondary-accent/10 to-primary-dark flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-card-bg/80 to-transparent" />
                    <TypeIcon size={56} className="text-primary-accent/40 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                  </div>

                  <div className="p-6 md:p-8 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-text-primary mb-3">{proj.title}</h3>
                    <p className="text-base text-text-secondary line-clamp-3 mb-6 flex-1">
                      {proj.description}
                    </p>

                    {/* Tech badges */}
                    {proj.technologies && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {proj.technologies.split(",").slice(0, 4).map((tech) => (
                          <span key={tech} className="px-2 py-0.5 text-[10px] rounded-full bg-border-subtle/50 text-text-secondary">
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    )}

                    <Link
                      href={href}
                      className="w-full mt-auto py-3 rounded-xl bg-primary-accent text-white text-base font-semibold text-center hover:bg-primary-accent/90 hover:shadow-lg hover:shadow-primary-accent/25 transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      Let&apos;s Go! <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {showSeeMore && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            className="text-center mt-12"
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-primary-accent text-primary-accent text-base font-semibold hover:bg-primary-accent/10 transition-colors"
            >
              View All Projects <ArrowRight size={20} />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
