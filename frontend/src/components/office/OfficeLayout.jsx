import DeviceIcon from "./DeviceIcon";
import { FaFan, FaLightbulb } from "react-icons/fa";
import { motion } from "framer-motion";

const roomAccents = [
    { ring: "border-brand-400/25", glow: "bg-brand-500/15", bar: "from-brand-400 to-brand-600", text: "text-brand-200" },
    { ring: "border-cyan-400/25", glow: "bg-cyan-400/15", bar: "from-cyan-400 to-cyan-600", text: "text-cyan-200" },
    { ring: "border-emerald-400/25", glow: "bg-emerald-400/15", bar: "from-emerald-400 to-emerald-600", text: "text-emerald-200" },
];

const legendItems = [
    {
        label: "Fan",
        icon: FaFan,
        color: "text-cyan-300",
    },
    {
        label: "Light",
        icon: FaLightbulb,
        color: "text-amber-300",
    },
    {
        label: "Door",
        icon: () => (
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-slate-500/60 bg-slate-500/15 text-[10px] text-slate-200">
                D
            </span>
        ),
        color: "text-slate-300",
    },
    {
        label: "Window",
        icon: () => (
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-sky-400/40 bg-sky-400/10 text-[10px] text-sky-200">
                W
            </span>
        ),
        color: "text-sky-200",
    },
];

const slotOrder = [
    { type: "Light", slot: "top-left" },
    { type: "Fan", slot: "top-center" },
    { type: "Light", slot: "top-right" },
    { type: "Fan", slot: "center" },
    { type: "Light", slot: "bottom-center" },
];

const OfficeLayout = ({ rooms }) => {

    return (
        <section className="space-y-5">
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <p className="eyebrow">Floor plan</p>
                    <h2 className="section-title mt-1 text-xl sm:text-2xl">
                        Office Layout
                    </h2>
                    <p className="mt-1 text-sm text-slate-400">
                        Top-view map of the office with live room states
                    </p>
                </div>
                <span className="chip">
                    {rooms.length} rooms mapped
                </span>
            </div>

            <div
                className="glass-panel relative overflow-hidden rounded-[2rem] p-4 sm:p-5"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                }}
            >
                <div className="pointer-events-none absolute -left-16 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-brand-500/10 blur-[100px]" />

                <div className="relative grid gap-4 xl:grid-cols-[minmax(0,1fr)_280px]">
                    <div className="space-y-4">
                        <div className="grid gap-4 lg:grid-cols-3">
                            {rooms.map((room, index) => {
                                const lights = room.devices.filter((device) => device.type === "Light");
                                const fans = room.devices.filter((device) => device.type === "Fan");
                                const fanSlots = [...fans];
                                const lightSlots = [...lights];
                                const fanCount = fans.length;
                                const lightCount = lights.length;
                                const accent = roomAccents[index % roomAccents.length];

                                return (
                                    <motion.article
                                        key={room._id}
                                        initial={{ opacity: 0, y: 16 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-60px" }}
                                        transition={{ duration: 0.45, delay: index * 0.08 }}
                                        className={`glass-card glass-card-hover relative min-h-[330px] overflow-hidden rounded-[1.6rem] border ${accent.ring}`}
                                    >
                                        <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accent.bar}`} />
                                        <div className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full blur-3xl ${accent.glow}`} />

                                        <div className="relative z-10 flex h-full flex-col p-4">
                                            <div className="flex items-start justify-between gap-3">
                                                <div>
                                                    <p className={`text-[11px] font-semibold uppercase tracking-[0.28em] ${accent.text}`}>
                                                        Room {index + 1}
                                                    </p>
                                                    <h3 className="mt-1 text-lg font-bold tracking-tight text-slate-50">
                                                        {room.name}
                                                    </h3>
                                                    <p className="text-sm text-slate-400">
                                                        {room.description}
                                                    </p>
                                                </div>

                                                <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2 text-right backdrop-blur-sm">
                                                    <p className="text-[10px] uppercase tracking-[0.22em] text-slate-500">
                                                        Live load
                                                    </p>
                                                    <p className="font-mono text-xl font-bold text-slate-50">
                                                        {room.totalPower}W
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="mt-4 grid flex-1 grid-cols-3 grid-rows-3 gap-3">
                                                {slotOrder.map((slot) => {
                                                    const device = slot.type === "Fan"
                                                        ? fanSlots.shift()
                                                        : lightSlots.shift();

                                                    const slotClasses = {
                                                        "top-left": "col-start-1 row-start-1 self-start justify-self-start",
                                                        "top-center": "col-start-2 row-start-1 self-start justify-self-center",
                                                        "top-right": "col-start-3 row-start-1 self-start justify-self-end",
                                                        center: "col-start-2 row-start-2 self-center justify-self-center",
                                                        "bottom-center": "col-start-2 row-start-3 self-end justify-self-center",
                                                    };

                                                    return (
                                                        <div
                                                            key={`${room._id}-${slot.slot}`}
                                                            className={`flex h-full w-full flex-col items-center justify-center gap-2 ${slotClasses[slot.slot]}`}
                                                        >
                                                            <div className={`flex h-16 w-16 items-center justify-center rounded-2xl border transition-shadow duration-300 ${device?.status ? "border-white/15 bg-white/[0.06] shadow-[0_0_24px_rgba(56,189,248,0.16)]" : "border-white/8 bg-black/20"}`}>
                                                                {device ? (
                                                                    <div className={device.status ? "scale-100" : "scale-90 opacity-50"}>
                                                                        <DeviceIcon device={device} />
                                                                    </div>
                                                                ) : (
                                                                    <div className="h-7 w-7 rounded-full border border-dashed border-white/15" />
                                                                )}
                                                            </div>

                                                            {device && (
                                                                <span className="rounded-full border border-white/10 bg-black/40 px-2 py-1 text-[11px] font-medium text-slate-200 shadow-sm">
                                                                    {device.name}
                                                                </span>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>

                                            <div className="mt-3 grid grid-cols-2 gap-3 text-xs text-slate-400">
                                                <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-3 py-2">
                                                    <p className="flex items-center gap-1.5 uppercase tracking-[0.22em] text-slate-500">
                                                        <FaFan className="text-cyan-300/70" /> Fans
                                                    </p>
                                                    <p className="mt-1 text-sm font-semibold text-slate-100">
                                                        {fanCount} total
                                                    </p>
                                                </div>
                                                <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-3 py-2">
                                                    <p className="flex items-center gap-1.5 uppercase tracking-[0.22em] text-slate-500">
                                                        <FaLightbulb className="text-amber-300/70" /> Lights
                                                    </p>
                                                    <p className="mt-1 text-sm font-semibold text-slate-100">
                                                        {lightCount} total
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.article>
                                );
                            })}
                        </div>

                        <div className="rounded-[1.5rem] border border-white/8 bg-white/[0.025] p-4">
                            <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_1.1fr]">
                                <div className="rounded-[1.3rem] border border-white/8 bg-white/[0.03] p-4">
                                    <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">
                                        Entry / Corridor
                                    </p>
                                    <p className="mt-2 text-sm text-slate-400">
                                        Central passage keeps the room blocks visually aligned to the reference layout.
                                    </p>
                                </div>

                                <div className="grid gap-3 sm:grid-cols-3">
                                    {rooms.map((room, index) => (
                                        <div
                                            key={`${room._id}-usage`}
                                            className="rounded-[1.25rem] border border-white/8 bg-white/[0.03] p-3"
                                        >
                                            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                                                {index === 0 ? "Waiting area" : "Employees"}
                                            </p>
                                            <p className="mt-1 text-sm font-semibold text-slate-100">
                                                {room.name}
                                            </p>
                                            <p className="text-xs text-slate-400">
                                                {room.devices.length} devices · {room.totalPower}W
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <aside className="space-y-4 xl:sticky xl:top-24">
                        <div className="glass-card rounded-[1.5rem] p-4">
                            <h3 className="text-lg font-bold tracking-tight text-slate-50">
                                Legend
                            </h3>
                            <div className="mt-4 space-y-3">
                                {legendItems.map((item) => {
                                    const Icon = item.icon;

                                    return (
                                        <div
                                            key={item.label}
                                            className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.03] px-3 py-2"
                                        >
                                            <span className={item.color}>
                                                <Icon className="text-lg" />
                                            </span>
                                            <span className="text-sm font-medium text-slate-300">
                                                {item.label}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="glass-card rounded-[1.5rem] p-4">
                            <h3 className="text-lg font-bold tracking-tight text-slate-50">
                                Devices Summary
                            </h3>
                            <div className="mt-4 space-y-3 text-sm text-slate-300">
                                <div className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.03] px-3 py-2">
                                    <span>Rooms</span>
                                    <strong className="font-mono">{rooms.length}</strong>
                                </div>
                                <div className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.03] px-3 py-2">
                                    <span>Fans</span>
                                    <strong className="font-mono">{rooms.reduce((sum, room) => sum + room.devices.filter((device) => device.type === "Fan").length, 0)}</strong>
                                </div>
                                <div className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.03] px-3 py-2">
                                    <span>Lights</span>
                                    <strong className="font-mono">{rooms.reduce((sum, room) => sum + room.devices.filter((device) => device.type === "Light").length, 0)}</strong>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </section>
    );
};

export default OfficeLayout;
