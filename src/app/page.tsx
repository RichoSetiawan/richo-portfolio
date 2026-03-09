import { prisma } from "@/lib/prisma";
import HeroSection from "@/components/sections/HeroSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ProjectSection from "@/components/sections/ProjectSection";

export default async function HomePage() {
  const [profile, contacts, experiences, projects] = await Promise.all([
    prisma.profile.findFirst(),
    prisma.contact.findMany({ where: { isActive: true }, orderBy: { order: "asc" } }),
    prisma.experience.findMany({ where: { isActive: true }, orderBy: { order: "asc" } }),
    prisma.project.findMany({ where: { isActive: true, isDefault: true }, orderBy: { order: "asc" } }),
  ]);

  if (!profile) {
    return <div className="min-h-screen flex items-center justify-center text-text-secondary">Profile data not found. Please seed the database.</div>;
  }

  const serialized = {
    profile: { ...profile, createdAt: profile.createdAt.toISOString(), updatedAt: profile.updatedAt.toISOString() } as unknown as import("@/types").Profile,
    contacts: contacts.map((c) => ({ ...c, createdAt: undefined, updatedAt: undefined })) as unknown as import("@/types").Contact[],
    experiences: experiences.map((e) => ({
      ...e,
      startDate: e.startDate.toISOString(),
      endDate: e.endDate?.toISOString() ?? null,
      createdAt: undefined,
      updatedAt: undefined,
    })) as unknown as import("@/types").Experience[],
    projects: projects.map((p) => ({ ...p, createdAt: undefined, updatedAt: undefined })) as unknown as import("@/types").Project[],
  };

  return (
    <>
      <HeroSection profile={serialized.profile} contacts={serialized.contacts} />
      <ExperienceSection experiences={serialized.experiences} />
      <div className="w-full h-4 md:h-8 lg:h-8" aria-hidden="true"></div>
      <ProjectSection projects={serialized.projects} />
      <div className="w-full h-4 md:h-8 lg:h-8" aria-hidden="true"></div>
    </>
  );
}
