"use client";

import { motion, type Variants } from "framer-motion";
import { GraduationCap, Linkedin, Instagram, MessageCircle, Mail } from "lucide-react";
import type { Profile, Contact } from "@/types";

const iconMap: Record<string, React.ElementType> = {
  Linkedin, Instagram, MessageCircle, Mail,
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 20, stiffness: 100 } },
};

interface HeroSectionProps {
  profile: Profile;
  contacts: Contact[];
}

export default function HeroSection({ profile, contacts }: HeroSectionProps) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary-accent/10 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-secondary-accent/10 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-accent/5 rounded-full blur-[160px]" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
        className="section-container text-center py-20"
      >
        {/* Name */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-extrabold gradient-text mb-4 leading-tight"
        >
          {profile.name}
        </motion.h1>

        {/* Tagline */}
        <motion.p variants={itemVariants} className="text-lg md:text-xl text-text-secondary mb-6 max-w-xl mx-auto">
          {profile.tagline}
        </motion.p>

        {/* University & GPA */}
        <motion.div variants={itemVariants} className="flex items-center justify-center gap-2 text-sm text-text-secondary mb-10">
          <GraduationCap size={18} className="text-primary-accent" />
          <span>{profile.major} &mdash; {profile.university}</span>
          <span className="mx-1 text-border-subtle">|</span>
          <span className="font-semibold text-primary-accent">IPK {profile.gpa}</span>
        </motion.div>

        {/* Bio */}
        {profile.bio && (
          <motion.p variants={itemVariants} className="text-sm text-text-secondary max-w-lg mx-auto mb-10 leading-relaxed">
            {profile.bio}
          </motion.p>
        )}

        {/* Contact Icons */}
        <motion.div variants={itemVariants} className="flex items-center justify-center gap-4">
          {contacts.map((c, i) => {
            const Icon = iconMap[c.icon ?? ""] ?? Mail;
            return (
              <motion.a
                key={c.id}
                href={c.value}
                target="_blank"
                rel="noopener noreferrer"
                title={c.label}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ delay: 0.8 + i * 0.1, type: "spring", damping: 15 }}
                className="w-14 h-14 rounded-full flex items-center justify-center bg-primary-accent/15 text-primary-accent hover:bg-primary-accent hover:text-white hover:shadow-lg hover:shadow-primary-accent/25 hover:scale-110 transition-all duration-200"
              >
                <Icon size={24} />
              </motion.a>
            );
          })}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ delay: 1.5 }}
          className="mt-16"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full border-2 border-text-secondary/30 mx-auto flex justify-center pt-2"
          >
            <div className="w-1 h-2 rounded-full bg-primary-accent" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
