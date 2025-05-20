import { io } from "socket.io-client";

// Get the backend URL from environment variable
// Default to localhost:5000 if not specified (for development)
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api';

// Initialize socket connection
const socket = io(BACKEND_URL);

export default socket;