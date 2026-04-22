"use client"

import React from "react"
import { Link } from "react-router"
import { Mail } from "lucide-react"
import Logo from "./logo"
import { cn } from "../../lib/utils"

const footerLinks = {
  product: [
    { label: "Features", href: "#features" },
    { label: "Protocol", href: "#workflow" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Pricing", href: "#pricing" },
  ],
  company: [
    { label: "Intelligence Base", href: "#faq" },
    { label: "Strategic Blog", href: "#" },
    { label: "Career Path", href: "#" },
    { label: "Contact Protocol", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Security Protocol", href: "#" },
  ],
}

export default function Footer() {
  return (
    <footer className="px-6 py-24 bg-black border-t border-zinc-900 overflow-hidden relative">
      {/* Background Subtle Gradient */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-[radial-gradient(circle_at_50%_100%,rgba(255,255,255,0.03),transparent_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              <Logo className="h-8 w-8 transition-transform group-hover:rotate-12" />
              <span className="font-display text-xl font-bold tracking-tighter text-white">
                CareerLens<span className="text-brand-400">AI</span>
              </span>
            </Link>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-[240px]">
              The industrial-grade platform for strategic interview preparation and career dominance.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-display text-sm font-bold text-white uppercase tracking-[0.2em] mb-6">Product</h4>
            <ul className="space-y-4">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-zinc-500 hover:text-brand-400 transition-colors duration-300">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-display text-sm font-bold text-white uppercase tracking-[0.2em] mb-6">Company</h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm text-zinc-500 hover:text-brand-400 transition-colors duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-display text-sm font-bold text-white uppercase tracking-[0.2em] mb-6">Legal</h4>
            <ul className="space-y-4">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm text-zinc-500 hover:text-brand-400 transition-colors duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-zinc-900/50 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
              © {new Date().getFullYear()} CareerLens AI. Protocol Alpha v4.2
            </p>
            <div className="hidden md:block w-1 h-1 rounded-full bg-zinc-800" />
            <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
              Engineered for Excellence
            </p>
          </div>
          
          <div className="flex items-center gap-5">
            <a href="#" className="p-2 rounded-xl bg-zinc-900/50 border border-zinc-800 text-zinc-500 hover:text-white hover:border-zinc-700 transition-all active:scale-95" aria-label="GitHub">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
            <a href="#" className="p-2 rounded-xl bg-zinc-900/50 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-all active:scale-95" aria-label="Twitter">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.95 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.921 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.939 0 0024 4.59z"/></svg>
            </a>
            <a href="#" className="p-2 rounded-xl bg-zinc-900/50 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-all active:scale-95" aria-label="LinkedIn">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
            <a href="mailto:ops@careerlens.ai" className="p-2 rounded-xl bg-zinc-900/50 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-all active:scale-95" aria-label="Email">
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
