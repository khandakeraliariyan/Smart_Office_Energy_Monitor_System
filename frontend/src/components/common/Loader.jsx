import { motion } from "framer-motion";
import { FaBolt } from "react-icons/fa";

const Loader = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-[#05070f] text-slate-100">
            <div className="flex flex-col items-center gap-5">
                <div className="relative flex h-16 w-16 items-center justify-center">
                    <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1.3, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 rounded-full border-[3px] border-white/10 border-t-brand-400 border-r-cyan-400"
                    />
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-cyan-400 shadow-[0_0_24px_rgba(99,102,241,0.5)]">
                        <FaBolt className="text-sm text-white" />
                    </span>
                </div>
                <p className="text-sm tracking-wide text-slate-400">
                    Loading dashboard<span className="animate-pulse">…</span>
                </p>
            </div>
        </div>
    );
};

export default Loader;
