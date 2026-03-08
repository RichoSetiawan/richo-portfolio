import { prisma } from "@/lib/prisma";
import ProjectsClient from "./ProjectsClient";

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

  return <ProjectsClient projects={serialized} />;
}
