import { useState, useRef, useEffect } from "react";
import { MessageSquare, Mail } from "lucide-react";

import { WhatsAppIcon } from "./ WhatsAppIcon";
import MessagesPageHeader from "./MessagesPageHeader";
import WhatsAppConnectionFlow from "./WhatsappConnection/WhatsAppConnectionFlow";
import { messages } from "./mockData";
import SearchBarComponent from "./SearchBarComponent";
import MessagesList from "./MessagesList";
import SelectedMessageView from "./SelectedMessageView";

const MessagesPage = ({ onClose }) => {
    const [activeTab, setActiveTab] = useState('all');
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [replyText, setReplyText] = useState('');
    const [showOptions, setShowOptions] = useState(false);
    const optionsRef = useRef(null);

    // Determine if we have connected to whatsapp or not.
    const [isConnected, setIsConnected] = useState(false);

    const filteredMessages = () => {
        if (activeTab === 'all') {
            return messages.filter((msg) => (
                msg.sender.toLowerCase().includes(searchQuery.toLowerCase()) || msg.content.toLowerCase().includes(searchQuery.toLowerCase())
            ))
        } else {
            return messages.filter((msg) => (
                msg.platform === activeTab && msg.sender.toLowerCase().includes(searchQuery.toLowerCase()) || msg.content.toLowerCase().includes(searchQuery.toLowerCase())
            ))
        }
    }

    // const filteredMessages = activeTab === 'all'
    //     ? messages.filter(msg =>
    //         msg.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //         msg.content.toLowerCase().includes(searchQuery.toLowerCase())
    //     )
    //     : messages.filter(msg =>
    //         msg.platform === activeTab &&
    //         (msg.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //             msg.content.toLowerCase().includes(searchQuery.toLowerCase())));

    useEffect(() => {
        function handleClickOutside(event) {
            if (optionsRef.current && !optionsRef.current.contains(event.target)) {
                setShowOptions(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSendReply = () => {
        if (replyText.trim()) {
            // Here you would normally send the message
            console.log("Sending reply:", replyText);
            setReplyText('');
        }
    };

    return (
        <div className="flex flex-col h-full">
            {!isConnected ? (
                <WhatsAppConnectionFlow whatsAppIsConnected={() => setIsConnected(true)} />
            ) : (
                <>
                    {/* Header */}
                    <MessagesPageHeader />

                    {/* Messages tabs section */}
                    <div className="flex border-b border-gray-200 bg-gray-50">
                        <button
                            onClick={() => setActiveTab('all')}
                            className={`flex-1 py-3 text-sm font-medium flex items-center justify-center ${activeTab === 'all' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            <MessageSquare className="w-4 h-4 mr-2" />
                            All
                        </button>
                        <button
                            onClick={() => setActiveTab('whatsapp')}
                            className={`flex-1 py-3 text-sm font-medium flex items-center justify-center ${activeTab === 'whatsapp' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            <WhatsAppIcon className="w-4 h-4 mr-2" />
                            WhatsApp
                        </button>
                        <button
                            onClick={() => setActiveTab('store')}
                            className={`flex-1 py-3 text-sm font-medium flex items-center justify-center ${activeTab === 'store' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            <Mail className="w-4 h-4 mr-2" />
                            Store
                        </button>
                    </div>

                    {/* Search Bar Component */}
                    <SearchBarComponent
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                    />

                    {/* Messages List */}
                    <MessagesList
                        filteredMessages={filteredMessages}
                        searchQuery={searchQuery}
                        setSelectedMessage={setSelectedMessage}
                    />

                    {/* Selected Message View */}
                    <SelectedMessageView
                        selectedMessage={selectedMessage}
                        setSelectedMessage={setSelectedMessage}
                        optionsRef={optionsRef}
                        setShowOptions={setShowOptions}
                        showOptions={showOptions}
                        setReplyText={setReplyText}
                        replyText={replyText}
                        handleSendReply={handleSendReply}
                    />
                </>
            )}
        </div>
    );
};

export default MessagesPage;