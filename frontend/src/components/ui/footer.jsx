import { Mail, Code, Briefcase, Send } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router";

export default function Footer() {
  const links = [
    { name: "Terms of Service", href: "#" },
    { name: "Privacy Policy", href: "#" },
    { name: "Security", href: "#" },
    { name: "Sitemap", href: "#" },
  ];
  return (
    <motion.footer
      className="flex flex-col items-center px-4 md:px-16 lg:px-24 justify-center w-full pt-16 mt-20 glass border-0 rounded-t-[40px]"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Link to="/">
        <img src="/logo.svg" alt="logo" className="h-8 w-auto" />
      </Link>

      <div className="flex flex-wrap items-center justify-center gap-8 py-8">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.href}
            className="transition hover:text-blue-400"
          >
            {link.name}
          </a>
        ))}
      </div>
      <div className="flex items-center gap-6 pb-6">
        <a
          href="#"
          className="hover:-translate-y-0.5 text-gray-200 transition-all duration-300"
        >
          <Mail />
        </a>
        <a
          href="#"
          className="hover:-translate-y-0.5 text-gray-200 transition-all duration-300"
        >
          <Briefcase />
        </a>
        <a
          href="#"
          className="hover:-translate-y-0.5 text-gray-200 transition-all duration-300"
        >
          <Send />
        </a>
        <a
          href="#"
          className="hover:-translate-y-0.5 text-gray-200 transition-all duration-300"
        >
          <Code />
        </a>
      </div>
      <hr className="w-full border-white/10 mt-6" />
      <div className="flex flex-col md:flex-row items-center w-full justify-between gap-4 py-8 text-zinc-500 text-sm">
        <p>Prepare for your dream interview</p>
        <p>
          Copyright © 2026{" "}
          <Link
            to="/"
            className="text-white hover:text-blue-400 transition-colors"
          >
            CareerLens AI
          </Link>
          . All rights reserved.
        </p>
      </div>
    </motion.footer>
  );
}
