import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useMotionTemplate,
} from "framer-motion";
import { ArrowRight, LogOut, User, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router";
import Logo from "../../components/ui/logo";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { useToast } from "../../context/toast-context";

const Navbar = () => {
  const { scrollY } = useScroll();
  const width = useTransform(scrollY, [0, 200], ["96%", "88%"]);
  const bgOpacity = useTransform(scrollY, [0, 200], [0.8, 0.95]);
  const { user, handleLogout } = useAuth();
  const { showToast } = useToast();
  const location = useLocation();
  const isLandingPage = location.pathname === "/";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const menuVariants = {
    closed: { opacity: 0, scale: 0.9, y: 10 },
    open: { opacity: 1, scale: 1, y: 0 },
  };

  const bgTemplate = useMotionTemplate`rgba(5, 5, 5, ${bgOpacity})`;

  return (
    <motion.div
      style={{ width }}
      className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 max-w-6xl z-50 origin-center"
    >
      <motion.nav
        style={{ backgroundColor: bgTemplate }}
        className="flex justify-between items-center px-4 md:px-6 py-3 md:py-4 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl transition-all"
      >
        <Link to="/" className="flex items-center gap-2 md:gap-3">
          <Logo size={24} className="md:w-7 md:h-7" />
          <span className="text-lg md:text-xl font-bold tracking-tight text-white hidden sm:inline-flex">
            CareerLens<span className="text-brand-neon"> AI</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/generate-report"
            className={`text-sm font-medium transition-all relative group ${
              location.pathname === "/generate-report" ? "text-brand-neon" : "text-zinc-400 hover:text-white"
            }`}
          >
            Generate Report
            {location.pathname === "/generate-report" && (
              <motion.div
                layoutId="nav-pill"
                className="absolute -bottom-1 left-0 right-0 h-px bg-brand-neon shadow-[0_0_8px_rgba(140,255,46,0.8)]"
              />
            )}
          </Link>
        </div>

        <div className="flex gap-2 md:gap-3 items-center">
          {user ? (
            <>
              <div className="hidden sm:flex items-center gap-2 text-white text-sm font-medium px-4 py-2 bg-white/5 border border-white/10 rounded-full">
                <User size={16} className="text-brand-neon" />
                <span className="max-w-[100px] truncate">
                  {user?.name || "User"}
                </span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  handleLogout();
                  showToast({ message: "Logged out successfully. See you soon!", type: "info" });
                }}
                className="bg-brand-neon/10 text-brand-neon px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-bold flex items-center gap-2 border border-brand-neon/20 hover:bg-brand-neon/20 transition-colors"
              >
                <span className="hidden xs:inline">Log out</span> <LogOut size={14} />
              </motion.button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden sm:block text-white text-sm font-medium px-4 py-2 border border-white/10 rounded-full hover:bg-white/5 transition-colors"
              >
                Log in
              </Link>
              <Link to="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-brand-neon text-black px-4 md:px-5 py-2 rounded-full text-xs md:text-sm font-bold flex items-center gap-2"
                >
                  Start <span className="hidden xs:inline">Free</span>{" "}
                  <ArrowRight size={14} />
                </motion.button>
              </Link>
            </>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="absolute top-20 left-0 right-0 mx-auto w-full bg-[#050505]/95 backdrop-blur-3xl border border-white/10 rounded-[24px] md:rounded-[32px] p-6 flex flex-col gap-4 z-40 shadow-2xl md:hidden overflow-hidden"
          >
            <div className="flex flex-col gap-4">
              <Link
                to="/generate-report"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xl font-bold text-white tracking-tight px-4 py-3 bg-white/5 rounded-2xl border border-white/5"
              >
                Generate Report
              </Link>
            </div>

            {!user && (
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between text-zinc-400 group px-4 py-3"
              >
                <span className="text-lg font-medium group-hover:text-white transition-colors">
                  Log in
                </span>
                <ArrowRight size={18} />
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Navbar;
