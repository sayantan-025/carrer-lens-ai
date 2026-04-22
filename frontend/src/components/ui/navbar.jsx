import { Menu, X, User, LogOut, ChevronDown } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../../features/auth/hooks/use-auth';
import Logo from './logo';
import LogoutModal from '../../features/auth/components/logout-modal';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const profileRef = useRef(null);

    const links = [
        { name: 'Home', href: '/' },
        { name: 'Dashboard', href: '/dashboard' },
        { name: 'Generate Report', href: '/generate-report' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogoutConfirm = async () => {
        await logout();
        setIsLogoutModalOpen(false);
        setIsProfileOpen(false);
        setIsOpen(false);
        navigate('/');
    };

    const handleLogoutClick = () => {
        setIsLogoutModalOpen(true);
    };

    const UserAvatar = ({ size = "size-10" }) => (
        <div className={`${size} rounded-full overflow-hidden border border-white/20 bg-blue-600 flex items-center justify-center text-white font-bold`}>
            {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="size-full object-cover" />
            ) : (
                <span>{user?.name?.charAt(0).toUpperCase() || 'U'}</span>
            )}
        </div>
    );

    return (
        <>
            <motion.nav className={`fixed top-0 z-50 flex w-full items-center justify-between px-4 py-3.5 md:px-16 lg:px-24 transition-colors ${isScrolled ? 'bg-white/5 backdrop-blur-lg border-b border-white/10' : ''}`}
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1 }}
            >
                <Link to='/' className='flex items-center gap-2 group'>
                    <Logo className='h-8 w-8 transition-transform group-hover:scale-105' />
                    <span className='text-xl font-bold font-display tracking-tight text-white'>
                        CareerLens<span className='text-blue-500'>AI</span>
                    </span>
                </Link>

                <div className='hidden items-center space-x-10 md:flex'>
                    {links.map((link) => (
                        <Link key={link.name} to={link.href} className='transition hover:text-blue-400'>
                            {link.name}
                        </Link>
                    ))}
                    
                    {isAuthenticated ? (
                        <div className="relative" ref={profileRef}>
                            <button 
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center gap-2 group p-1 pr-2 rounded-full hover:bg-white/5 transition-all"
                            >
                                <UserAvatar size="size-8" />
                                <ChevronDown className={`size-4 text-gray-400 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
                            </button>

                            <AnimatePresence>
                                {isProfileOpen && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute right-0 mt-2 w-56 glass border border-white/10 rounded-2xl p-2 shadow-2xl backdrop-blur-2xl z-50"
                                    >
                                        <div className="px-3 py-3 border-b border-white/5 mb-2">
                                            <p className="text-sm font-bold text-white truncate">{user?.name}</p>
                                            <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                                        </div>
                                        <Link 
                                            to="/profile" 
                                            onClick={() => setIsProfileOpen(false)}
                                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 text-gray-300 hover:text-white transition-all group"
                                        >
                                            <User className="size-4 group-hover:text-blue-400" />
                                            <span className="text-sm font-medium">Profile Settings</span>
                                        </Link>
                                        <button 
                                            onClick={handleLogoutClick}
                                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-500/10 text-gray-300 hover:text-red-400 transition-all group mt-1"
                                        >
                                            <LogOut className="size-4" />
                                            <span className="text-sm font-medium">Log Out</span>
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <Link to='/register' className='btn glass'>
                            Sign Up
                        </Link>
                    )}
                </div>

                <button onClick={() => setIsOpen(true)} className='transition active:scale-90 md:hidden'>
                    <Menu className='size-6' />
                </button>
            </motion.nav>

            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className={`fixed inset-0 z-[60] flex flex-col items-center justify-center gap-8 bg-black/95 text-lg font-medium backdrop-blur-2xl md:hidden`}
                    >
                        <button onClick={() => setIsOpen(false)} className='absolute top-4 right-4 rounded-full p-3 glass'>
                            <X className="size-6" />
                        </button>

                        {isAuthenticated && (
                            <div className="flex flex-col items-center gap-3 mb-4">
                                <UserAvatar size="size-20" />
                                <div className="text-center">
                                    <p className="text-xl font-bold text-white">{user?.name}</p>
                                    <p className="text-sm text-gray-400">{user?.email}</p>
                                </div>
                            </div>
                        )}

                        <div className="flex flex-col items-center gap-6">
                            {links.map((link) => (
                                <Link 
                                    key={link.name} 
                                    to={link.href} 
                                    onClick={() => setIsOpen(false)}
                                    className="text-2xl hover:text-blue-400 transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        <div className="flex flex-col gap-4 w-full px-12 mt-4">
                            {isAuthenticated ? (
                                <>
                                    <Link 
                                        to="/profile" 
                                        className='btn glass w-full flex items-center justify-center gap-3' 
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <User className="size-5" />
                                        Profile Settings
                                    </Link>
                                    <button 
                                        onClick={handleLogoutClick}
                                        className='btn bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-600/30 w-full flex items-center justify-center gap-3'
                                    >
                                        <LogOut className="size-5" />
                                        Log Out
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to='/login' className='btn glass w-full' onClick={() => setIsOpen(false)}>
                                        Log In
                                    </Link>
                                    <Link to='/register' className='btn btn-primary bg-blue-600 border-none w-full' onClick={() => setIsOpen(false)}>
                                        Sign Up
                                    </Link>
                                </>
                            )}
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
