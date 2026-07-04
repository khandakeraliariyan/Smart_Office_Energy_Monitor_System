import { motion } from "framer-motion";

const KpiCard = ({ title, value, unit, color = "text-slate-50" }) => {
    return (
        <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 280, damping: 20 }}
            className="glass-card relative overflow-hidden rounded-3xl p-5 sm:p-6"
        >
            <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-500/10 blur-3xl" />

            <div className="relative mb-5 flex items-center justify-between">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-400">
                    {title}
                </p>
                <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(74,222,128,0.65)]" />
                </span>
            </div>

            <h2 className={`relative text-4xl font-extrabold tracking-tight sm:text-5xl ${color}`} style={{ fontFamily: "var(--font-display)" }}>
                {value}
                <span className="ml-1 text-xl font-semibold text-slate-500">
                    {unit}
                </span>
            </h2>
        </motion.div>
    );
};

export default KpiCard;
