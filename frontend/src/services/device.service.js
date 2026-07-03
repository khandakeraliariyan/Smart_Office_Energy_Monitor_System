import api from "./api";

export const getDevices = async () => {
    const response = await api.get("/devices");
    return response.data.data;
};

export const updateDeviceStatus = async (id, status) => {
    const response = await api.patch(`/devices/${id}/status`, {
        status,
    });

    return response.data.data;
};