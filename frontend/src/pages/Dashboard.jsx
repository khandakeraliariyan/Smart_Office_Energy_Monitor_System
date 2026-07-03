import Navbar from "../components/layout/Navbar";
import Loader from "../components/common/Loader";
import KpiCard from "../components/cards/KpiCard";
import OfficeLayout from "../components/office/OfficeLayout";
import PowerChart from "../components/charts/PowerChart";
import DeviceGrid from "../components/devices/DeviceGrid";
import useDashboard from "../hooks/useDashboard";

import { updateDeviceStatus } from "../services/device.service";

const Dashboard = () => {

    const {
        dashboard,
        loading,
        error,
        refresh,
    } = useDashboard();

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-950 text-red-500 text-xl">
                {error}
            </div>
        );
    }

    const activeDevices = dashboard.devices.filter(
        (device) => device.status
    ).length;

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

            <main className="bg-slate-950 min-h-screen p-8 space-y-10">

                {/* Header */}

                <section>

                    <h1 className="text-4xl font-bold">

                        Smart Office Dashboard

                    </h1>

                    <p className="text-slate-400 mt-2">

                        Real-Time Office Energy Monitoring System

                    </p>

                </section>

                {/* KPI Cards */}

                <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                    <KpiCard
                        title="Total Power"
                        value={dashboard.totalPower}
                        unit="W"
                        color="text-green-400"
                    />

                    <KpiCard
                        title="Active Devices"
                        value={activeDevices}
                        color="text-blue-400"
                    />

                    <KpiCard
                        title="Rooms"
                        value={dashboard.rooms.length}
                        color="text-purple-400"
                    />

                    <KpiCard
                        title="Active Alerts"
                        value={dashboard.alerts.length}
                        color="text-red-400"
                    />

                </section>

                {/* Office Layout */}

                <OfficeLayout
                    rooms={dashboard.rooms}
                />

                {/* Power Chart */}

                <PowerChart
                    history={dashboard.powerHistory}
                />

                {/* Device Grid */}

                <DeviceGrid
                    devices={dashboard.devices}
                    onToggle={handleToggle}
                />

            </main>
        </>
    );
};

export default Dashboard;