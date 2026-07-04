import { FaFan, FaLightbulb } from "react-icons/fa";
import { motion } from "framer-motion";

const DeviceCard = ({ device, onToggle }) => {

    const Icon =
        device.type === "Fan"
            ? FaFan
            : FaLightbulb;

    return (
        <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 280, damping: 20 }}
            className="glass-card rounded-2xl p-5"
        >
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h2 className="text-lg font-bold tracking-tight text-slate-50">
                        {device.name}
                    </h2>
                    <p className="mt-1 text-sm text-slate-400">
                        {device.room.name}
                    </p>
                </div>

                <span className={`flex h-11 w-11 items-center justify-center rounded-2xl border ${device.status ? "border-amber-400/20 bg-amber-400/10" : "border-white/10 bg-white/5"}`}>
                    <Icon
                        className={`text-xl transition ${device.status
                            ? "text-amber-300 drop-shadow-[0_0_16px_rgba(251,191,36,0.35)]"
                            : "text-slate-500"
                            }`}
                    />
                </span>
            </div>

            <div className="mt-6 flex items-center justify-between gap-3">
                <span className={`rounded-full px-3 py-1 text-xs font-semibold tracking-[0.18em] ${device.status
                    ? "bg-emerald-400/10 text-emerald-300"
                    : "bg-slate-800/80 text-slate-400"
                    }`}>
                    {device.status
                        ? "ON"
                        : "OFF"}
                </span>

                <button
                    onClick={() =>
                        onToggle(device)
                    }
                    className={device.status ? "btn-danger" : "btn-primary"}
                >
                    {device.status
                        ? "Turn Off"
                        : "Turn On"}
                </button>
            </div>
        </motion.div>
    );
};

export default DeviceCard;
