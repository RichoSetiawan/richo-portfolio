"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { MapPin, Calendar, X, Briefcase } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import type { Experience } from "@/types";

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

interface Props {
  experiences: Experience[];
}

export default function ExperienceSection({ experiences }: Props) {
  const [selected, setSelected] = useState<Experience | null>(null);

  return (
    <section id="experience" className="py-24">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 gradient-text">Experience</h2>
          <p className="text-center text-text-secondary mb-12">My professional journey so far</p>
        </motion.div>

        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1.2 },
            768: { slidesPerView: 1.8 },
            1024: { slidesPerView: 2.2 },
          }}
          className="pb-16"
        >
          {experiences.map((exp, i) => (
            <SwiperSlide key={exp.id}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="h-full"
              >
                <div 
                  className="h-full rounded-2xl bg-card-bg border border-border-subtle overflow-hidden group hover:-translate-y-2 hover:shadow-xl hover:shadow-primary-accent/10 transition-all duration-300 cursor-pointer flex flex-col"
                  onClick={() => setSelected(exp)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && setSelected(exp)}
                >
                  {/* Company header */}
                  <div className="h-32 bg-gradient-to-br from-primary-accent/20 to-secondary-accent/20 flex items-center justify-center">
                    <Briefcase size={40} className="text-primary-accent/60" />
                  </div>

                  <div className="p-6 md:p-8 flex-1 flex flex-col">
                    <div className="ml-1 md:ml-2 flex-1">
                      <h3 className="text-xl font-bold text-text-primary mb-1">{exp.position}</h3>
                      <p className="text-base text-primary-accent font-semibold mb-3">{exp.company}</p>

                      <div className="flex items-center gap-3 text-sm text-text-secondary mb-4">
                        <span className="flex items-center gap-1.5">
                          <Calendar size={14} />
                          {formatDate(exp.startDate)} — {exp.endDate ? formatDate(exp.endDate) : "Present"}
                        </span>
                        {exp.location && (
                          <span className="flex items-center gap-1.5">
                            <MapPin size={14} />
                            {exp.location}
                          </span>
                        )}
                      </div>

                      <p className="text-base text-text-secondary line-clamp-3 mb-6 relative pl-3 border-l-2 border-primary-accent/30">{exp.description}</p>
                    </div>

                    <div className="w-full mt-auto py-2.5 rounded-xl bg-primary-accent/10 text-primary-accent text-sm font-semibold text-center group-hover:bg-primary-accent/20 transition-colors">
                      View Details
                    </div>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg bg-card-bg border border-border-subtle rounded-2xl overflow-hidden max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 z-10 glass px-6 py-4 flex items-center justify-between border-b border-border-subtle">
                <div>
                  <h3 className="text-lg font-semibold text-text-primary">{selected.position}</h3>
                  <p className="text-sm text-primary-accent">{selected.company}</p>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X size={20} className="text-text-secondary" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-text-secondary mb-6">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {formatDate(selected.startDate)} — {selected.endDate ? formatDate(selected.endDate) : "Present"}
                  </span>
                  {selected.location && (
                    <span className="flex items-center gap-1">
                      <MapPin size={14} />
                      {selected.location}
                    </span>
                  )}
                </div>

                {/* Full description */}
                <div className="space-y-2 text-sm text-text-secondary leading-relaxed">
                  {(selected.fullDescription ?? selected.description).split("\n").map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>

                {/* Skills */}
                {selected.skills && (
                  <div className="mt-6">
                    <h4 className="text-xs font-semibold text-text-primary uppercase tracking-wider mb-3">Skills Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {selected.skills.split(",").map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 text-xs rounded-full bg-primary-accent/10 text-primary-accent border border-primary-accent/20"
                        >
                          {skill.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
