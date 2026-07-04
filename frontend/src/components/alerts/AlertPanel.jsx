import AlertCard from "./AlertCard";
import { motion } from "framer-motion";
import { FaTriangleExclamation } from "react-icons/fa6";

const listMotion = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
};

const AlertPanel = ({ alerts }) => {
    return (
        <section className="glass-panel relative overflow-hidden rounded-[1.75rem] p-5 sm:p-6">
            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-rose-500/10 blur-[80px]" />

            <div className="relative mb-5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-rose-400/20 bg-rose-400/10 text-rose-300">
                        <FaTriangleExclamation />
                    </span>
                    <div>
                        <h2 className="section-title text-xl sm:text-2xl">
                            Active Alerts
                        </h2>
                        <p className="mt-0.5 text-sm text-slate-400">
                            Timestamped anomalies that need attention
                        </p>
                    </div>
                </div>

                <span className="chip border-rose-400/20 bg-rose-400/10 text-rose-200">
                    {alerts.length} open
                </span>
            </div>

            <motion.div
                variants={listMotion}
                initial="hidden"
                animate="show"
                className="relative space-y-4"
            >
                {alerts.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-8 text-center text-sm text-slate-400">
                        All clear — no active alerts right now.
                    </div>
                ) : (
                    alerts.map((alert) => (
                        <AlertCard
                            key={alert._id}
                            alert={alert}
                        />
                    ))
                )}
            </motion.div>
        </section>
    );
};

export default AlertPanel;
