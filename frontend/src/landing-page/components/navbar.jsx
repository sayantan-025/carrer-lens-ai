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

const Navbar = () => {
  const { scrollY } = useScroll();
  const width = useTransform(scrollY, [0, 200], ["95%", "85%"]);
  const bgOpacity = useTransform(scrollY, [0, 200], [0.8, 0.95]);
  const { user, handleLogout } = useAuth();
  const location = useLocation();
  const isLandingPage = location.pathname === "/";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const menuVariants = {
    closed: { opacity: 0, y: -20, scale: 0.95 },
    open: { opacity: 1, y: 0, scale: 1 },
  };

  const bgTemplate = useMotionTemplate`rgba(5, 5, 5, ${bgOpacity})`;

  return (
    <motion.div
      style={{ width }}
      className="fixed top-6 left-1/2 -translate-x-1/2 max-w-6xl z-50 origin-center"
    >
      <motion.nav
        style={{ backgroundColor: bgTemplate }}
        className="flex justify-between items-center px-6 py-4 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl transition-all"
      >
        <Link to="/" className="flex items-center gap-3">
          <Logo size={28} />
          <span className="text-xl font-bold tracking-tight text-white hidden sm:inline-flex">
            CareerLens<span className="text-brand-neon"> AI</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <>
            <Link
              to="/generate-report"
              className="text-zinc-400 text-sm font-medium hover:text-white transition-colors"
            >
              Generate Report
            </Link>
          </>
        </div>

        <div className="flex gap-3 items-center">
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
                onClick={handleLogout}
                className="bg-brand-neon/10 text-brand-neon px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 border border-brand-neon/20 hover:bg-brand-neon/20 transition-colors"
              >
                Log out <LogOut size={14} />
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
                  className="bg-brand-neon text-black px-5 py-2 rounded-full text-sm font-bold flex items-center gap-2"
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
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
            className="absolute top-24 left-0 right-0 mx-auto w-[90%] bg-[#050505]/90 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 flex flex-col gap-6 z-40 shadow-2xl md:hidden"
          >
            <div className="flex flex-col gap-6">
              <Link
                to="/generate-report"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-bold text-white tracking-tight"
              >
                Generate Report
              </Link>
            </div>

            <div className="h-px w-full bg-white/5 my-2"></div>

            {!user && (
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between text-zinc-400 group"
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
