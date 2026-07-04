import Navbar from "../components/layout/Navbar";
import Loader from "../components/common/Loader";

import OfficeLayout from "../components/office/OfficeLayout";
import AlertPanel from "../components/alerts/AlertPanel";
import PowerChart from "../components/charts/PowerChart";
import DeviceGrid from "../components/devices/DeviceGrid";
import PowerMeter from "../components/dashboard/PowerMeter";

import AnalyticsCard from "../components/dashboard/AnalyticsCard";
import AIInsight from "../components/insights/AIInsight";

import useDashboard from "../hooks/useDashboard";
import useAnalytics from "../hooks/useAnalytics";
import useInsight from "../hooks/useInsight";

import { updateDeviceStatus } from "../services/device.service";
import { motion } from "framer-motion";
import { FaBolt, FaPlug, FaBuilding, FaTriangleExclamation } from "react-icons/fa6";

const pageMotion = {
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" },
};

const sectionMotion = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.5, ease: "easeOut", delay },
});

const heroStats = [
    { key: "totalPower", label: "Total power", icon: FaBolt, accent: "text-cyan-300", bg: "bg-cyan-400/10", border: "border-cyan-400/15" },
    { key: "activeDevices", label: "Active devices", icon: FaPlug, accent: "text-emerald-300", bg: "bg-emerald-400/10", border: "border-emerald-400/15" },
    { key: "totalRooms", label: "Rooms", icon: FaBuilding, accent: "text-brand-300", bg: "bg-brand-500/10", border: "border-brand-400/20" },
    { key: "alerts", label: "Alerts", icon: FaTriangleExclamation, accent: "text-rose-300", bg: "bg-rose-400/10", border: "border-rose-400/15" },
];

const Dashboard = () => {
    const {
        dashboard,
        loading,
        error,
        refresh,
    } = useDashboard();

    const analytics = useAnalytics();

    const {
        insight,
        loading: insightLoading,
    } = useInsight();

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#05070f] px-6 text-center text-rose-300">
                {error}
            </div>
        );
    }

    const activeDevices = dashboard.devices.filter(
        (device) => device.status
    ).length;

    const totalRooms = dashboard.rooms.length;
    const lastUpdated = dashboard.lastUpdated
        ? new Date(dashboard.lastUpdated)
        : null;

    const statValues = {
        totalPower: `${dashboard.totalPower}W`,
        activeDevices,
        totalRooms,
        alerts: dashboard.alerts.length,
    };

    const handleToggle = async (device) => {
        try {
            await updateDeviceStatus(
                device._id,
                !device.status
            );

            refresh();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <Navbar />

            <motion.main
                className="mx-auto min-h-screen w-full max-w-[1760px] space-y-10 px-4 py-7 sm:px-6 lg:space-y-14 lg:px-8 lg:py-10"
                initial={pageMotion.initial}
                animate={pageMotion.animate}
                transition={pageMotion.transition}
            >
                <section className="glass-panel relative overflow-hidden rounded-[2rem] p-6 sm:p-8 lg:rounded-[2.5rem]">
                    <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-brand-500/20 blur-[100px]" />
                    <div className="pointer-events-none absolute -bottom-20 left-10 h-52 w-52 rounded-full bg-cyan-400/10 blur-[90px]" />

                    <div className="relative grid gap-8 xl:grid-cols-[minmax(0,1.05fr)_420px] xl:items-stretch">
                        <div className="space-y-7">
                            <div className="space-y-4">
                                <span className="chip border-brand-400/25 bg-brand-500/10 text-brand-200">
                                    <span className="h-1.5 w-1.5 rounded-full bg-brand-300" />
                                    Energy Operations Center
                                </span>

                                <div>
                                    <h1 className="text-3xl font-extrabold tracking-tight text-slate-50 sm:text-4xl lg:text-[3.2rem] lg:leading-[1.05]" style={{ fontFamily: "var(--font-display)" }}>
                                        Smart Office <span className="gradient-text">Command Center</span>
                                    </h1>

                                    <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                                        A live operations wall for the office — room layout, device state, power draw, and anomaly alerts, unified in one intelligent view.
                                    </p>
                                </div>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                                {heroStats.map((stat, index) => {
                                    const Icon = stat.icon;
                                    return (
                                        <motion.div
                                            key={stat.key}
                                            initial={{ opacity: 0, y: 12 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.4, delay: 0.1 + index * 0.06 }}
                                            className="glass-card glass-card-hover rounded-2xl p-4"
                                        >
                                            <div className="flex items-center justify-between">
                                                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{stat.label}</p>
                                                <span className={`flex h-8 w-8 items-center justify-center rounded-xl border ${stat.border} ${stat.bg}`}>
                                                    <Icon className={`text-sm ${stat.accent}`} />
                                                </span>
                                            </div>
                                            <p className="mt-3 text-2xl font-bold tracking-tight text-slate-50">{statValues[stat.key]}</p>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            <div className="flex flex-wrap items-center gap-2.5 text-sm text-slate-400">
                                <span className="chip">
                                    {dashboard.devices.length} tracked devices
                                </span>
                                <span className="chip">
                                    {dashboard.rooms.length} room zones
                                </span>
                                <span className="chip">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                                    {lastUpdated ? `Updated ${lastUpdated.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}` : "Syncing live"}
                                </span>
                            </div>
                        </div>

                        <PowerMeter
                            rooms={dashboard.rooms}
                            roomPower={dashboard.roomPower}
                            totalPower={dashboard.totalPower}
                            lastUpdated={dashboard.lastUpdated}
                        />
                    </div>
                </section>

                <motion.section {...sectionMotion(0)} className="grid gap-6 xl:grid-cols-12">
                    <div className="xl:col-span-8">
                        <OfficeLayout rooms={dashboard.rooms} />
                    </div>

                    <div className="xl:col-span-4">
                        <div className="xl:sticky xl:top-24">
                            <AlertPanel alerts={dashboard.alerts} />
                        </div>
                    </div>
                </motion.section>

                <motion.section {...sectionMotion(0.05)} className="glass-panel rounded-[2rem] p-5 sm:p-6 lg:rounded-[2.25rem]">
                    <DeviceGrid
                        rooms={dashboard.rooms}
                        devices={dashboard.devices}
                        onToggle={handleToggle}
                    />
                </motion.section>

                <motion.div {...sectionMotion(0.05)}>
                    <PowerChart history={dashboard.powerHistory} />
                </motion.div>

                <motion.section {...sectionMotion(0.05)} className="space-y-6">
                    <div className="flex items-end justify-between gap-4">
                        <div>
                            <p className="eyebrow">Performance</p>
                            <h2 className="section-title mt-1 text-xl sm:text-2xl">
                                Analytics
                            </h2>
                            <p className="mt-1 text-sm text-slate-400">
                                Summary metrics from recent office activity
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
                        <AnalyticsCard
                            title="Peak Power"
                            value={analytics?.peakPower || 0}
                            unit="W"
                            accent="cyan"
                        />

                        <AnalyticsCard
                            title="Average Power"
                            value={analytics?.averagePower || 0}
                            unit="W"
                            accent="brand"
                        />

                        <AnalyticsCard
                            title="Active Devices"
                            value={analytics?.deviceUsage || 0}
                            unit="%"
                            accent="emerald"
                        />

                        <AnalyticsCard
                            title="Inactive Devices"
                            value={analytics?.inactiveDevices || 0}
                            accent="rose"
                        />
                    </div>
                </motion.section>

                <motion.div {...sectionMotion(0.05)}>
                    <AIInsight
                        insight={insight}
                        loading={insightLoading}
                    />
                </motion.div>
            </motion.main>
        </>
    );
};

export default Dashboard;
