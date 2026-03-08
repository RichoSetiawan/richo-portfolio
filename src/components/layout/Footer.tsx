import { prisma } from "@/lib/prisma";
import { Linkedin, Instagram, MessageCircle, Mail, Heart } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Linkedin, Instagram, MessageCircle, Mail,
};

export default async function Footer() {
  const contacts = await prisma.contact.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
  });

  return (
    <footer className="border-t border-border-subtle bg-primary-dark/80">
      <div className="section-container py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold gradient-text mb-1">Richo Setiawan</h3>
            <p className="text-sm text-text-secondary">Backend Developer &bull; Spring Boot Enthusiast</p>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {contacts.map((c) => {
              const Icon = iconMap[c.icon ?? ""] ?? Mail;
              return (
                <a
                  key={c.id}
                  href={c.value}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={c.label}
                  className="w-11 h-11 rounded-full flex items-center justify-center bg-primary-accent/10 text-primary-accent hover:bg-primary-accent/25 hover:scale-110 transition-all duration-200"
                >
                  <Icon size={20} />
                </a>
              );
            })}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-border-subtle/50 text-center">
          <p className="text-xs text-text-secondary flex items-center justify-center gap-1">
            Made with <Heart size={12} className="text-red-500 fill-red-500" /> by Richo Setiawan &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
