import { useEffect, useState } from "react";
import { getDashboardData } from "../services/dashboard.service";

const useDashboard = () => {
    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchDashboard = async () => {
        try {
            setLoading(true);

            const data = await getDashboardData();

            setDashboard(data);
        } catch (err) {
            console.error(err);
            setError("Failed to load dashboard.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboard();
    }, []);

    return {
        dashboard,
        loading,
        error,
        refresh: fetchDashboard,
    };
};

export default useDashboard;