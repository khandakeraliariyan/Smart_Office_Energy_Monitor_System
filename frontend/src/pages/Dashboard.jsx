import Navbar from "../components/layout/Navbar";
import KpiCard from "../components/cards/KpiCard";

const Dashboard = () => {
    return (
        <>
            <Navbar />

            <main className="p-8 space-y-8">

                <section>

                    <h2 className="text-3xl font-bold">
                        Dashboard
                    </h2>

                    <p className="text-slate-400">
                        Smart Office Energy Monitoring
                    </p>

                </section>

                <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                    <KpiCard
                        title="Total Power"
                        value="0"
                        unit="W"
                    />

                    <KpiCard
                        title="Active Devices"
                        value="0"
                    />

                    <KpiCard
                        title="Rooms"
                        value="3"
                    />

                    <KpiCard
                        title="Active Alerts"
                        value="0"
                    />

                </section>

            </main>
        </>
    );
};

export default Dashboard;