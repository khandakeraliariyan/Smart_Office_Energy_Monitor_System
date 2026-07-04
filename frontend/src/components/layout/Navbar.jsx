import { FaBolt } from "react-icons/fa";
import { MdCircle } from "react-icons/md";
import { motion } from "framer-motion";

const Navbar = () => {
    return (
        <nav className="sticky top-0 z-30 border-b border-white/10 bg-[#05070f]/80 px-4 py-3.5 backdrop-blur-2xl sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-[1760px] items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <motion.div
                        initial={{ rotate: -8, scale: 0.9 }}
                        animate={{ rotate: 0, scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 14 }}
                        className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-brand-500 to-cyan-400 shadow-[0_0_28px_rgba(99,102,241,0.45)] sm:h-11 sm:w-11"
                    >
                        <FaBolt className="text-base text-white drop-shadow sm:text-lg" />
                    </motion.div>

                    <div>
                        <h1 className="text-base font-bold tracking-tight text-slate-50 sm:text-lg" style={{ fontFamily: "var(--font-display)" }}>
                            Nimbus <span className="gradient-text">Office Intelligence</span>
                        </h1>
                        <p className="hidden text-xs text-slate-500 sm:block">
                            Real-time energy monitoring &amp; device control
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-slate-400 sm:flex">
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
                        v1.0 · Techathon
                    </div>

                    <div className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs text-emerald-300 sm:text-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                            <MdCircle className="relative inline-flex h-2 w-2 rounded-full text-emerald-400" />
                        </span>
                        <span className="font-semibold">Live</span>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
