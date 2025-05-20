const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const getStatus = async () => {
    const response = await fetch(`${API_URL}/whatsapp/status`);
    if (!response.ok) {
        console.log("Error checking the status of whatsapp", await response.json());
        throw new Error('Failed to fetch status');
    }
    const dataResponse = await response.json();
    return dataResponse;
};

export const getQR = async () => {
    const response = await fetch(`${API_URL}/whatsapp/qr`);
    if (!response.ok) {
        // console.log("Error getting QR code to connect to whatsapp", await response.json());
        throw new Error('Failed to fetch QR');
    }
    const blob = await response.blob();
    // Return image blob URL
    return URL.createObjectURL(blob);
};

export const disconnect = async () => {
    const response = await fetch(`${API_URL}/whatsapp/disconnect`, {
        method: 'POST'
    });
    if (!response.ok) {
        console.log("Error disconnecting whatsapp", await response.json());
        throw new Error('Failed to disconnect');
    }
    return await response.json();
};

export const restart = async () => {
    const response = await fetch(`${API_URL}/whatsapp/restart`, {
        method: 'POST'
    });
    if (!response.ok) {
        console.log("Error restarting whatsapp", await response.json());
        throw new Error('Failed to restart');
    }
    return await response.json();
};