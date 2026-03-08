import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.profile.upsert({
    where: { id: "richo-profile" },
    update: {},
    create: {
      id: "richo-profile",
      name: "Richo Setiawan",
      tagline: "Backend Developer | Spring Boot Enthusiast",
      bio: "Mahasiswa Sistem Informasi dengan passion di backend development dan software engineering. Berpengalaman dalam membangun aplikasi web modern dengan berbagai teknologi.",
      university: "Universitas Kristen Krida Wacana",
      major: "Sistem Informasi",
      gpa: 3.92,
    },
  });

  const contacts = [
    { id: "contact-linkedin", type: "linkedin", label: "LinkedIn", value: "https://www.linkedin.com/in/richosetiawan/", icon: "Linkedin", order: 0 },
    { id: "contact-instagram", type: "instagram", label: "Instagram", value: "https://www.instagram.com/richoveritas/?hl=en", icon: "Instagram", order: 1 },
    { id: "contact-whatsapp", type: "whatsapp", label: "WhatsApp", value: "https://wa.me/6288213144917", icon: "MessageCircle", order: 2 },
    { id: "contact-email", type: "email", label: "Email", value: "mailto:richosetiawan37@gmail.com", icon: "Mail", order: 3 },
  ];
  for (const c of contacts) {
    await prisma.contact.upsert({ where: { id: c.id }, update: {}, create: c });
  }

  const experiences = [
    {
      id: "exp-1", title: "Backend Developer Intern", position: "Backend Developer Intern",
      company: "PT Teknologi Nusantara", location: "Jakarta, Indonesia",
      startDate: new Date("2025-06-01"), endDate: new Date("2025-12-31"), isCurrent: false,
      description: "Developed RESTful APIs using Spring Boot and integrated with PostgreSQL databases for enterprise applications.",
      fullDescription: "• Developed and maintained RESTful APIs using Spring Boot framework\n• Designed and optimized PostgreSQL database schemas for scalability\n• Implemented authentication and authorization using Spring Security + JWT\n• Collaborated with frontend team for API integration\n• Participated in code reviews and Agile sprint planning\n• Wrote unit and integration tests achieving 85% code coverage",
      skills: "Java,Spring Boot,PostgreSQL,REST API,JWT,Git", order: 0,
    },
    {
      id: "exp-2", title: "Fullstack Developer", position: "Fullstack Developer",
      company: "Campus Dev Team", location: "Jakarta, Indonesia",
      startDate: new Date("2025-01-01"), endDate: new Date("2025-05-31"), isCurrent: false,
      description: "Built internal campus management tools using React and Node.js, serving 500+ active users.",
      fullDescription: "• Built campus management dashboard using React.js and Tailwind CSS\n• Created RESTful backend services with Node.js and Express\n• Implemented real-time notifications using WebSocket\n• Managed SQLite database with Prisma ORM\n• Deployed application on university cloud infrastructure\n• Mentored junior developers on modern web development practices",
      skills: "React,Node.js,Express,Prisma,SQLite,Tailwind CSS", order: 1,
    },
    {
      id: "exp-3", title: "Freelance Web Developer", position: "Freelance Web Developer",
      company: "Self-Employed", location: "Remote",
      startDate: new Date("2024-06-01"), endDate: new Date("2024-12-31"), isCurrent: false,
      description: "Delivered multiple client projects including e-commerce sites, landing pages, and admin dashboards.",
      fullDescription: "• Designed and developed responsive websites for local businesses\n• Built custom e-commerce solutions with payment gateway integration\n• Created admin dashboards for content management\n• Optimized website performance achieving 90+ Lighthouse scores\n• Managed client relationships and project timelines\n• Implemented SEO best practices for improved search rankings",
      skills: "Next.js,React,TypeScript,Tailwind CSS,Vercel,SEO", order: 2,
    },
  ];
  for (const e of experiences) {
    await prisma.experience.upsert({ where: { id: e.id }, update: {}, create: e });
  }

  const projects = [
    { id: "proj-rps", title: "Rock Paper Scissors", slug: "rock-paper-scissors", description: "Interactive Rock Paper Scissors game with score tracking and animated UI.", technologies: "React,TypeScript,Framer Motion,Tailwind CSS", category: "personal", isDefault: true, projectType: "game", order: 0 },
    { id: "proj-todo", title: "To-Do List", slug: "todo-list", description: "Full-featured to-do list with local caching, filters, and CSV/Excel export.", technologies: "React,Zustand,LocalStorage,TypeScript", category: "personal", isDefault: true, projectType: "todo", order: 1 },
    { id: "proj-weather", title: "Weather App", slug: "weather-app", description: "Real-time weather app with animated characters reacting to weather conditions.", technologies: "React,OpenWeatherMap API,CSS Animations,TypeScript", category: "personal", isDefault: true, projectType: "weather", order: 2 },
  ];
  for (const p of projects) {
    await prisma.project.upsert({ where: { id: p.id }, update: {}, create: p });
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
