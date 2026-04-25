import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router";
import { Menu, X, User, LogOut, ChevronDown, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../features/auth/hooks/use-auth";
import Logo from "./logo";
import LogoutModal from "../../features/auth/components/logout-modal";
import { cn } from "../../lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/generate-report", label: "New Report" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogoutConfirm = async () => {
    await logout();
    setIsLogoutModalOpen(false);
    setIsProfileOpen(false);
    setIsOpen(false);
    navigate("/");
  };

  const UserAvatar = ({ size = "size-8" }) => (
    <div className={cn(size, "rounded-full overflow-hidden border border-white/10 bg-zinc-800 flex items-center justify-center text-white text-xs font-bold")}>
      {user?.avatar ? (
        <img src={user.avatar} alt={user.name} className="size-full object-cover" />
      ) : (
        <span>{user?.name?.charAt(0).toUpperCase() || "U"}</span>
      )}
    </div>
  );

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 p-4 pointer-events-none">
        <nav className="max-w-5xl mx-auto flex items-center justify-between h-14 px-6 rounded-full bg-zinc-950/70 border border-white/5 backdrop-blur-xl pointer-events-auto shadow-2xl">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-2 group transition-transform hover:scale-105">
            <Logo className="h-7 w-7 max-md:h-6 max-md:w-6" /> {/* responsive: smaller logo on mobile */}
            <span className="font-display text-lg font-bold tracking-tighter text-white border-r border-white/10 pr-4 mr-2 max-sm:hidden max-md:text-base max-md:pr-3 max-md:mr-1">
              CareerLens<span className="text-zinc-500">AI</span>
            </span>
          </Link>

          {/* Desktop Links - hidden below 768px */}
          <div className="flex items-center gap-1 max-md:hidden">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200 text-zinc-400 hover:text-white hover:bg-white/5 active:scale-95"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Action Area */}
          <div className="flex items-center gap-3 max-md:gap-2">
            {isAuthenticated ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 group p-1 pr-2 rounded-full hover:bg-white/5 transition-all active:scale-95 min-h-[44px]" /* responsive: min-h-44 for touch */
                >
                  <UserAvatar size="size-8 max-md:size-7" />
                  <ChevronDown className={cn("size-3.5 text-zinc-500 transition-transform duration-300", isProfileOpen && "rotate-180")} />
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-64 bg-zinc-950/90 border border-white/10 rounded-2xl p-2 shadow-2xl backdrop-blur-2xl z-50 max-sm:w-56"
                    >
                      <div className="px-3 py-3 border-b border-white/5 mb-2">
                        <p className="text-sm font-bold text-white truncate">{user?.name}</p>
                        <p className="text-xs text-zinc-500 truncate">{user?.email}</p>
                      </div>
                      <Link
                        to="/profile"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 text-zinc-400 hover:text-white transition-all group min-h-[44px]"
                      >
                        <User className="size-4 group-hover:text-white" />
                        <span className="text-sm font-medium">Profile Settings</span>
                      </Link>
                      <button
                        onClick={() => setIsLogoutModalOpen(true)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-500/10 text-zinc-400 hover:text-red-400 transition-all group mt-1 min-h-[44px]"
                      >
                        <LogOut className="size-4" />
                        <span className="text-sm font-medium">Log Out</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link to="/login" className="text-sm font-medium text-zinc-400 hover:text-white px-4 max-sm:hidden max-md:px-2 max-md:text-xs">
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2 text-sm rounded-full bg-white text-black font-bold hover:bg-zinc-200 transition-all active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.15)] max-md:text-xs max-md:px-3 max-md:py-1.5"
                >
                  Get Started
                </Link>
              </>
            )}

            {/* Mobile Menu Toggle - shown below 768px */}
            <button
              onClick={() => setIsOpen(true)}
              className="p-2 -mr-2 text-zinc-400 hover:text-white hidden max-md:flex min-h-[44px] items-center justify-center" /* responsive: flex on mobile, 44px touch */
            >
              <Menu className="size-6" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-[60] bg-black/80 flex flex-col"
          >
            <div className="flex items-center justify-between p-6">
              <Logo className="h-7 w-7" />
              <button
                onClick={() => setIsOpen(false)}
                className="p-3 rounded-full bg-white/5 border border-white/10 text-white min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <X className="size-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-12 flex flex-col items-center justify-center min-h-0">
              <div className="flex flex-col items-center gap-8 w-full max-w-xs mx-auto">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-3xl font-bold text-zinc-500 hover:text-white transition-colors min-h-[44px] flex items-center"
                  >
                    {link.label}
                  </Link>
                ))}
                
                <div className="h-px w-24 bg-white/10" />

                {!isAuthenticated ? (
                  <div className="flex flex-col items-center gap-6 w-full">
                    <Link to="/login" onClick={() => setIsOpen(false)} className="text-xl text-zinc-400 min-h-[44px] flex items-center">
                      Log in
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsOpen(false)}
                      className="w-full py-4 text-xl rounded-full bg-white text-black font-bold text-center min-h-[44px]"
                    >
                      Get Started
                    </Link>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      setIsLogoutModalOpen(true);
                    }}
                    className="text-xl text-red-500 font-medium min-h-[44px]"
                  >
                    Log Out
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogoutConfirm}
      />
    </>
  );
}
