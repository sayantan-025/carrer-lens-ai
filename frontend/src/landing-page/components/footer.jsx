import React from 'react';
import { motion } from 'framer-motion';
import { Send, Globe, Terminal, MessageSquare } from 'lucide-react';
import Logo from '../../components/ui/logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: "Product",
      links: [
        { name: "Features", href: "#" },
        { name: "Strategy Engine", href: "#" },
        { name: "Resume Re-gen", href: "#" },
        { name: "Roadmap", href: "#" }
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Documentation", href: "#" },
        { name: "Interview Tips", href: "#" },
        { name: "System Design", href: "#" },
        { name: "FAANG Guide", href: "#" }
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "#" },
        { name: "Terms of Service", href: "#" },
        { name: "Cookie Policy", href: "#" }
      ]
    }
  ];

  return (
    <footer className="w-full border-t border-white/5 bg-brand-dark relative overflow-hidden mt-32">
      {/* Subtle Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-brand-neon/5 blur-[150px] pointer-events-none -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-24">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="flex items-center gap-3 group cursor-default">
              <Logo size={40} className="shadow-[0_0_20px_rgba(140,255,46,0.1)] group-hover:shadow-[0_0_30px_rgba(140,255,46,0.2)] transition-shadow" />
              <span className="text-2xl font-bold tracking-tighter text-white">CareerLens<span className="text-brand-neon"> AI</span></span>
            </div>
            <p className="text-zinc-500 text-lg font-light leading-relaxed max-w-sm">
              The next-generation protocol for high-signal interview preparation and strategic career conversion.
            </p>
            <div className="flex gap-4 mt-2">
              {[Send, Globe, Terminal, MessageSquare].map((Icon, idx) => (
                <motion.a 
                  key={idx}
                  whileHover={{ y: -4, color: "#8CFF2E" }}
                  href="#" 
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 transition-colors"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {footerLinks.map((section, idx) => (
            <div key={idx} className="flex flex-col gap-6">
              <h4 className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">{section.title}</h4>
              <ul className="flex flex-col gap-4">
                {section.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <a href={link.href} className="text-zinc-500 hover:text-brand-neon transition-colors text-sm font-light">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-zinc-600 text-[10px] font-bold uppercase tracking-widest">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-neon/40 animate-pulse"></div>
            System Status: All Protocols Operational
          </div>
          <p className="text-zinc-600 text-xs font-mono">
            &copy; {currentYear} CAREERLENS AI LABS. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
