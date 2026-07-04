import { motion } from "framer-motion";

const accentMap = {
    cyan: { text: "text-cyan-300", dot: "bg-cyan-400 shadow-[0_0_14px_rgba(34,211,238,0.7)]", glow: "bg-cyan-400/10" },
    brand: { text: "text-brand-300", dot: "bg-brand-400 shadow-[0_0_14px_rgba(129,140,248,0.7)]", glow: "bg-brand-500/10" },
    emerald: { text: "text-emerald-300", dot: "bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,0.7)]", glow: "bg-emerald-400/10" },
    rose: { text: "text-rose-300", dot: "bg-rose-400 shadow-[0_0_14px_rgba(251,113,133,0.7)]", glow: "bg-rose-400/10" },
};

const AnalyticsCard = ({ title, value, unit, accent = "brand" }) => {
    const theme = accentMap[accent] || accentMap.brand;

    return (
        <motion.div
            whileHover={{ y: -3 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="glass-card relative overflow-hidden rounded-2xl p-5"
        >
            <div className={`pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full blur-2xl ${theme.glow}`} />

            <div className="relative flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                    {title}
                </p>
                <span className={`h-2 w-2 rounded-full ${theme.dot}`} />
            </div>

            <h2 className={`relative mt-4 text-3xl font-extrabold tracking-tight ${theme.text}`} style={{ fontFamily: "var(--font-display)" }}>
                {value}
                <span className="ml-1 text-base font-semibold text-slate-500">
                    {unit}
                </span>
            </h2>
        </motion.div>
    );
};

export default AnalyticsCard;
