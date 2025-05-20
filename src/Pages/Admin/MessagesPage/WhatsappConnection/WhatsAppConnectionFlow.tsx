import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, WifiOff, QrCode, RotateCw } from 'lucide-react';
import socket from '../../../../libs/socket';
import ConnectionHistoryCard from './ConnectionHistoryCard';
import QrCodeReadyStatus from './QrCodeReadyStatus';
import ErrorState from './ErrorState';
import SuccessfullyConnectedState from './SuccessfullyConnectedState';

export default function WhatsAppConnectionFlow({ whatsAppIsConnected }) {
    const [state, setState] = useState({
        status: 'checking', // checking, loading, qr-ready, connected, disconnected, error
        qrImage: null,
        error: null,
        history: [],
        progress: 0
    });

    // Handle all socket events
    useEffect(() => {
        // Initial connection status
        const handleStatus = (status) => {
            setState(prev => ({
                ...prev,
                status: status === 'open' ? 'connected' : status
            }));
            if (status === 'open') whatsAppIsConnected();
        };

        // QR Code received
        const handleQR = (qrData) => {
            setState(prev => ({
                ...prev,
                status: 'qr-ready',
                qrImage: qrData,
                progress: 100
            }));
        };

        // Connection established
        const handleConnected = () => {
            setState(prev => ({
                ...prev,
                status: 'connected',
                progress: 100
            }));
            whatsAppIsConnected();
        };

        // Disconnection occurred
        const handleDisconnected = () => {
            setState(prev => ({
                ...prev,
                status: 'disconnected',
                error: 'WhatsApp connection was terminated'
            }));
        };

        // Error occurred
        const handleError = (errorMsg) => {
            setState(prev => ({
                ...prev,
                status: 'error',
                error: errorMsg
            }));
        };

        // Socket connection error
        const handleConnectError = () => {
            setState(prev => ({
                ...prev,
                status: 'error',
                error: 'Failed to connect to server'
            }));
        };

        // Set up all event listeners
        socket.on("status", handleStatus);
        socket.on("qr", handleQR);
        socket.on("connected", handleConnected);
        socket.on("disconnected", handleDisconnected);
        socket.on("error", handleError);
        socket.on("connect_error", handleConnectError);

        // Request initial status
        socket.emit("get-status");

        return () => {
            // Clean up all listeners
            socket.off("status", handleStatus);
            socket.off("qr", handleQR);
            socket.off("connected", handleConnected);
            socket.off("disconnected", handleDisconnected);
            socket.off("error", handleError);
            socket.off("connect_error", handleConnectError);
        };
    }, [whatsAppIsConnected]);

    // Status configurations
    const statusConfig = {
        checking: {
            icon: <Wifi className="w-5 h-5" />,
            color: 'bg-blue-500',
            title: 'Checking Connection',
            description: 'Verifying WhatsApp server status...'
        },
        loading: {
            icon: <QrCode className="w-5 h-5" />,
            color: 'bg-yellow-500',
            title: 'Generating QR Code',
            description: 'Preparing your secure connection...'
        },
        'qr-ready': {
            icon: <QrCode className="w-5 h-5" />,
            color: 'bg-purple-500',
            title: 'Scan QR Code',
            description: 'Use WhatsApp on your phone to scan'
        },
        connected: {
            icon: <Wifi className="w-5 h-5" />,
            color: 'bg-green-500',
            title: 'Connected',
            description: 'WhatsApp is successfully linked!'
        },
        error: {
            icon: <WifiOff className="w-5 h-5" />,
            color: 'bg-red-500',
            title: 'Connection Error',
            description: state.error || 'Failed to establish connection'
        },
        disconnected: {
            icon: <WifiOff className="w-5 h-5" />,
            color: 'bg-gray-500',
            title: 'Disconnected',
            description: 'WhatsApp connection was terminated'
        }
    };

    const currentStatus = statusConfig[state.status] || statusConfig.checking;

    // Handler functions
    const handleGenerateQR = () => {
        socket.emit('generate-qr');
        setState(prev => ({
            ...prev,
            status: 'loading',
            progress: 0
        }));
    };

    const handleDisconnect = () => {
        socket.emit('disconnect-whatsapp');
        setState(prev => ({
            ...prev,
            status: 'disconnected'
        }));
    };

    const handleRetry = () => {
        socket.emit('generate-qr');
        setState(prev => ({
            ...prev,
            status: 'loading',
            progress: 0,
            error: null
        }));
    };

    return (
        <div className="max-w-2xl mx-auto py-4 sm:py-8 px-3 sm:px-4">
            {/* Main Connection Card */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-6 border-b border-gray-700 gap-3 sm:gap-0">
                    <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${currentStatus.color} bg-opacity-20`}>
                            {React.cloneElement(currentStatus.icon, { className: "w-4 h-4 sm:w-5 sm:h-5" })}
                        </div>
                        <div>
                            <h4 className="text-lg sm:text-xl font-bold text-white">WhatsApp Connection</h4>
                            <p className="text-xs sm:text-sm text-gray-400">{currentStatus.title}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${currentStatus.color} bg-opacity-20 text-white`}>
                            {state.status.toUpperCase()}
                        </span>
                        <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${currentStatus.color} ${state.status === 'connected' ? 'animate-pulse' : ''}`} />
                    </div>
                </div>

                {/* Progress Bar */}
                {(state.status === 'checking' || state.status === 'loading') && (
                    <div className="h-1 bg-gray-700">
                        <motion.div
                            className={`h-full ${currentStatus.color}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${state.progress}%` }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                )}

                {/* Content section */}
                <div className="p-4 sm:p-6">
                    <AnimatePresence mode="wait">
                        {/* Loading State */}
                        {(state.status === 'checking' || state.status === 'loading') && (
                            <motion.div className="flex flex-col items-center py-6 sm:py-8">
                                <div className="relative mb-4 sm:mb-6">
                                    <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gray-800 flex items-center justify-center">
                                        <RotateCw className="w-8 h-8 sm:w-12 sm:h-12 text-gray-500 animate-spin" />
                                    </div>
                                    <div className={`absolute inset-0 flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full ${currentStatus.color}`}>
                                        {React.cloneElement(currentStatus.icon, { className: "w-3 h-3 sm:w-4 sm:h-4" })}
                                    </div>
                                </div>
                                <h4 className="text-lg sm:text-xl font-semibold text-white mb-1 sm:mb-2 text-center">
                                    {currentStatus.title}
                                </h4>
                            </motion.div>
                        )}

                        {/* QR Ready State */}
                        {state.status === 'qr-ready' && (
                            <QrCodeReadyStatus
                                qrImage={state.qrImage}
                                onRetry={handleGenerateQR}
                            />
                        )}

                        {/* Connected State */}
                        {state.status === 'connected' && (
                            <SuccessfullyConnectedState
                                onDisconnect={handleDisconnect}
                            />
                        )}

                        {/* Error State */}
                        {state.status === 'error' && (
                            <ErrorState
                                error={state.error}
                                onRetry={handleRetry}
                            />
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Connection History */}
            <ConnectionHistoryCard history={state.history} />
        </div>
    );
}