import { useCallback, useEffect, useState } from "react";

import { getDashboardData } from "../services/dashboard.service";

import useSocket from "./useSocket";

const useDashboard = () => {

    const [dashboard, setDashboard] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const fetchDashboard = useCallback(async () => {

        try {

            const data = await getDashboardData();

            setDashboard(data);

            setError("");

        } catch (err) {

            console.error(err);

            setError("Failed to load dashboard.");

        } finally {

            setLoading(false);

        }

    }, []);

    useEffect(() => {

        fetchDashboard();

    }, [fetchDashboard]);

    useSocket("dashboardUpdated", () => {

        fetchDashboard();

    });

    return {

        dashboard,

        loading,

        error,

        refresh: fetchDashboard

    };

};

export default useDashboard;    