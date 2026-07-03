import api from "./api";

export const getDashboardData = async () => {

    const [dashboard, history] = await Promise.all([

        api.get("/dashboard"),

        api.get("/power/history")

    ]);

    return {

        ...dashboard.data.data,

        powerHistory:
            history.data.data

    };

};