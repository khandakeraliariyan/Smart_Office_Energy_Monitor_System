import {
    AreaChart,
    Area,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { FaChartLine } from "react-icons/fa";

const PowerChart = ({ history }) => {
    const data = [...history]
        .reverse()
        .map((item) => ({
            time: new Date(item.createdAt).toLocaleTimeString(),
            power: item.totalPower,
        }));

    const tickStyle = {
        fill: "#64748b",
        fontSize: 12,
        fontFamily: "var(--font-sans)",
    };

    const CustomTooltip = ({ active, payload, label }) => {
        if (!active || !payload?.length) return null;

        return (
            <div className="glass-panel rounded-xl px-4 py-3 text-sm">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-500">{label}</p>
                <p className="mt-1 flex items-center gap-2 font-semibold text-slate-50">
                    <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                    {payload[0].value}W
                </p>
            </div>
        );
    };

    return (
        <div className="glass-panel relative overflow-hidden rounded-[2rem] p-6 sm:p-7">
            <div className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full bg-brand-500/10 blur-[100px]" />

            <div className="relative mb-6 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
                        <FaChartLine />
                    </span>
                    <div>
                        <h2 className="section-title text-xl sm:text-2xl">
                            Live Power Usage
                        </h2>
                        <p className="mt-0.5 text-sm text-slate-400">
                            Recent office-wide energy trend
                        </p>
                    </div>
                </div>
                <span className="chip border-emerald-400/20 bg-emerald-400/10 text-emerald-300">
                    <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    </span>
                    Live feed
                </span>
            </div>

            <ResponsiveContainer width="100%" height={320}>
                <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="powerFill" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.35} />
                            <stop offset="100%" stopColor="#22d3ee" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="powerStroke" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#818cf8" />
                            <stop offset="100%" stopColor="#22d3ee" />
                        </linearGradient>
                    </defs>

                    <CartesianGrid stroke="rgba(148, 163, 184, 0.1)" strokeDasharray="4 12" vertical={false} />

                    <XAxis
                        dataKey="time"
                        tick={tickStyle}
                        axisLine={false}
                        tickLine={false}
                        minTickGap={24}
                    />

                    <YAxis
                        tick={tickStyle}
                        axisLine={false}
                        tickLine={false}
                        width={44}
                    />

                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: "rgba(129,140,248,0.35)", strokeWidth: 1 }} />

                    <Area
                        type="monotone"
                        dataKey="power"
                        stroke="url(#powerStroke)"
                        strokeWidth={3}
                        fill="url(#powerFill)"
                        dot={false}
                        activeDot={{ r: 5, fill: "#22d3ee", stroke: "#0f172a", strokeWidth: 2 }}
                        animationDuration={900}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PowerChart;
