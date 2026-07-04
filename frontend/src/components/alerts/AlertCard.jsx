import { FaExclamationTriangle } from "react-icons/fa";
import { motion } from "framer-motion";

const colors = {
    HIGH: "border-rose-400/30 bg-rose-500/10 text-rose-200",
    MEDIUM: "border-amber-400/30 bg-amber-500/10 text-amber-100",
    LOW: "border-sky-400/30 bg-sky-500/10 text-sky-100",
};

const iconColors = {
    HIGH: "border-rose-400/30 bg-rose-400/15 text-rose-300",
    MEDIUM: "border-amber-400/30 bg-amber-400/15 text-amber-300",
    LOW: "border-sky-400/30 bg-sky-400/15 text-sky-300",
};

const typeLabels = {
    AFTER_HOURS: "After Hours",
    ROOM_ACTIVE: "Room Activity",
    HIGH_POWER: "High Power",
};

const cardMotion = {
    hidden: { opacity: 0, x: 12 },
    show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

const AlertCard = ({ alert }) => {
    return (
        <motion.article
            variants={cardMotion}
            className={`rounded-2xl border p-4 shadow-[0_16px_35px_rgba(2,6,23,0.28)] backdrop-blur-sm ${colors[alert.severity] || colors.LOW}`}
        >
            <div className="flex items-start gap-3">
                <div className={`mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border ${iconColors[alert.severity] || iconColors.LOW}`}>
                    <FaExclamationTriangle className="text-lg" />
                </div>

                <div className="min-w-0 flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-semibold tracking-tight text-slate-50">
                            {alert.title}
                        </h3>
                        <span className="rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-100/90">
                            {typeLabels[alert.type] || alert.type}
                        </span>
                    </div>

                    <p className="text-sm leading-6 text-slate-200/90">
                        {alert.message}
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-300/80">
                        <span>
                            {alert.room?.name || "Office"}
                        </span>
                        <span className="font-mono">
                            {new Date(alert.createdAt).toLocaleString([], {
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </span>
                    </div>
                </div>
            </div>
        </motion.article>
    );
};

export default AlertCard;
