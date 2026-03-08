import { prisma } from "@/lib/prisma";
import ProjectSection from "@/components/sections/ProjectSection";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
  });

  const serialized = projects.map((p) => ({
    ...p,
    createdAt: undefined,
    updatedAt: undefined,
  })) as unknown as import("@/types").Project[];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="section-container">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-primary-accent mb-8 transition-colors">
          <ArrowLeft size={16} /> Back to Home
        </Link>
        <ProjectSection projects={serialized} showSeeMore={false} />
      </div>
    </div>
  );
}
