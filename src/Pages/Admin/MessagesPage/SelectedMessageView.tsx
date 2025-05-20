import { AnimatePresence, motion } from "framer-motion";
import { 
    ChevronLeft, Mail, MoreVertical, Star, 
    Archive, Trash2, Check, CheckCheck, Paperclip, 
    Smile, Send, Mic, ArrowUpRight
} from 'lucide-react';

import { WhatsAppIcon } from "./ WhatsAppIcon";

const SelectedMessageView = ({ 
    selectedMessage, setSelectedMessage, optionsRef, setShowOptions, 
    showOptions, setReplyText, replyText, handleSendReply
 }) => {
    return (
        <AnimatePresence>
            {selectedMessage && (
                <>
                    {/* Mobile Overlay - Only shown on mobile */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black md:hidden"
                        onClick={() => setSelectedMessage(null)}
                    />

                    {/* Message Detail Panel */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{
                            type: 'spring',
                            damping: 25,
                            stiffness: 300
                        }}
                        className={`fixed inset-y-0 right-0 z-50 w-full max-w-full md:absolute md:max-w-md md:rounded-l-xl bg-white shadow-2xl flex flex-col md:border-l md:border-gray-200`}
                    >
                        {/* Header with swipe indicator */}
                        <div className="md:hidden pt-1 flex justify-center">
                            <div className="w-10 h-1 bg-gray-300 rounded-full mb-1"></div>
                        </div>

                        {/* Message Header */}
                        <div className="flex items-center justify-between p-3 bg-gradient-to-r from-indigo-600 to-indigo-500 sticky top-0">
                            <button
                                onClick={() => setSelectedMessage(null)}
                                className="p-1.5 rounded-full hover:bg-indigo-700 transition-colors"
                            >
                                <ChevronLeft className="w-5 h-5 text-white" />
                            </button>
                            <div className="flex items-center space-x-3 flex-1 min-w-0 px-2">
                                <img
                                    src={selectedMessage.avatar}
                                    alt={selectedMessage.sender}
                                    className="w-9 h-9 rounded-full border-2 border-white flex-shrink-0"
                                />
                                <div className="min-w-0">
                                    <h3 className="text-sm font-medium text-white truncate">
                                        {selectedMessage.sender}
                                    </h3>
                                    <p className="text-xs text-indigo-100 flex items-center truncate">
                                        {selectedMessage.platform === 'whatsapp' ? (
                                            <>
                                                <WhatsAppIcon size={12} color="#fff" className="mr-1 flex-shrink-0" />
                                                WhatsApp
                                            </>
                                        ) : (
                                            <>
                                                <Mail className="w-3 h-3 mr-1 text-indigo-200 flex-shrink-0" />
                                                Store Message
                                            </>
                                        )}
                                    </p>
                                </div>
                            </div>
                            <div className="relative" ref={optionsRef}>
                                <button
                                    onClick={() => setShowOptions(!showOptions)}
                                    className="p-1.5 rounded-full hover:bg-indigo-700 transition-colors"
                                >
                                    <MoreVertical className="w-5 h-5 text-white" />
                                </button>
                                {showOptions && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200"
                                    >
                                        <div className="py-1">
                                            <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                                                <Star className="w-4 h-4 mr-2 text-gray-500" />
                                                Mark as favorite
                                            </button>
                                            <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                                                <Archive className="w-4 h-4 mr-2 text-gray-500" />
                                                Archive chat
                                            </button>
                                            <button className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left">
                                                <Trash2 className="w-4 h-4 mr-2" />
                                                Delete chat
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </div>

                        {/* Message Content - Adjusted for mobile viewport */}
                        <div className="flex-1 overflow-y-auto bg-[#f0f2f5] p-4"
                            style={{ height: 'calc(100vh - 136px)' }}
                        >
                            <div className="flex flex-col space-y-4">
                                {/* Date indicator */}
                                <div className="flex justify-center">
                                    <span className="px-3 py-1 text-xs font-medium bg-white text-gray-500 rounded-full shadow-sm">
                                        {selectedMessage.date} • {selectedMessage.time}
                                    </span>
                                </div>

                                {/* Message bubble */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${selectedMessage.platform === 'whatsapp' ? 'justify-start' : 'justify-end'}`}
                                >
                                    <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${selectedMessage.platform === 'whatsapp' ? 'bg-white' : 'bg-indigo-100'}`}>
                                        <p className={`text-sm ${selectedMessage.platform === 'whatsapp' ? 'text-gray-800' : 'text-indigo-800'}`}>
                                            {selectedMessage.content}
                                        </p>
                                        <div className="flex justify-end items-center mt-1 space-x-1">
                                            <span className="text-xs text-gray-400">
                                                {selectedMessage.time}
                                            </span>
                                            {selectedMessage.platform === 'whatsapp' && (
                                                selectedMessage.status === 'new' ? (
                                                    <Check className="w-3 h-3 text-gray-400" />
                                                ) : selectedMessage.status === 'delivered' ? (
                                                    <CheckCheck className="w-3 h-3 text-gray-400" />
                                                ) : (
                                                    <CheckCheck className="w-3 h-3 text-blue-500" />
                                                )
                                            )}
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Suggested replies for WhatsApp */}
                                {selectedMessage.platform === 'whatsapp' && (
                                    <div className="flex flex-wrap gap-2">
                                        <button className="px-3 py-1.5 text-sm bg-white text-gray-700 rounded-full border border-gray-200 hover:bg-gray-50">
                                            Thanks for reaching out!
                                        </button>
                                        <button className="px-3 py-1.5 text-sm bg-white text-gray-700 rounded-full border border-gray-200 hover:bg-gray-50">
                                            Let me check on that
                                        </button>
                                        <button className="px-3 py-1.5 text-sm bg-white text-gray-700 rounded-full border border-gray-200 hover:bg-gray-50">
                                            Can you share more details?
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Reply Area - Sticky bottom */}
                        <div className="sticky bottom-0 p-3 bg-white border-t border-gray-200">
                            <div className="flex items-center space-x-2">
                                <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                                    <Paperclip className="w-5 h-5" />
                                </button>
                                <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                                    <Smile className="w-5 h-5" />
                                </button>
                                <input
                                    type="text"
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                    placeholder="Type a message..."
                                    className="flex-1 px-4 py-2.5 text-sm border border-gray-200 rounded-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    onKeyPress={(e) => e.key === 'Enter' && handleSendReply()}
                                />
                                {replyText ? (
                                    <button
                                        onClick={handleSendReply}
                                        className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors"
                                    >
                                        <Send className="w-5 h-5" />
                                    </button>
                                ) : (
                                    <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                                        <Mic className="w-5 h-5" />
                                    </button>
                                )}
                            </div>
                            {selectedMessage.platform === 'whatsapp' && (
                                <div className="flex justify-center mt-2">
                                    <a
                                        href={`https://wa.me/${selectedMessage.sender.replace(/\D/g, '')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center px-3 py-1 text-xs bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
                                    >
                                        <WhatsAppIcon size={14} className="mr-1" />
                                        Open in WhatsApp
                                        <ArrowUpRight className="w-3 h-3 ml-1" />
                                    </a>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

export default SelectedMessageView;