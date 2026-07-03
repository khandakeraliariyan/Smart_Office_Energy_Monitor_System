import api from "./api";

export const getPowerHistory = async () => {

    const response =
        await api.get("/power/history");

    return response.data.data;

};