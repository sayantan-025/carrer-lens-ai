import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router";

export default function CallToAction() {
    return (
        <motion.div className="flex flex-col max-w-5xl mt-40 mb-20 px-4 mx-auto items-center justify-center text-center py-20 rounded-3xl glass border border-white/10 relative overflow-hidden"
            initial={{ y: 150, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 320, damping: 70, mass: 1 }}
        >
            <div className="absolute -top-24 -right-24 size-64 bg-blue-600/20 blur-[100px] rounded-full" />
            <div className="absolute -bottom-24 -left-24 size-64 bg-indigo-600/20 blur-[100px] rounded-full" />
            
            <motion.h2 className="text-3xl md:text-5xl font-bold mt-2 text-white"
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, type: "spring", stiffness: 280, damping: 70, mass: 1 }}
            >
                Ready to land your dream job?
            </motion.h2>
            <motion.p className="mt-6 text-lg text-gray-300 max-w-2xl"
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 70, mass: 1 }}
            >
                Join thousands of professionals using Career Lens AI to master their interviews, 
                optimize their resumes, and accelerate their career growth.
            </motion.p>
            <motion.div
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, type: "spring", stiffness: 280, damping: 70, mass: 1 }}
            >
                <Link to="/register" className="btn btn-primary bg-blue-600 hover:bg-blue-700 border-none px-10 py-4 text-lg font-semibold flex items-center gap-2 mt-10 transition-all transform hover:scale-105 rounded-xl">
                    Get Started for Free
                    <ArrowRight className="size-5" />
                </Link>
            </motion.div>
            <p className="mt-6 text-sm text-gray-500">No credit card required. Cancel anytime.</p>
        </motion.div>
    );
};