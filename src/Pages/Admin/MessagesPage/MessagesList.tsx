import { MessageSquare, Mail, Check, CheckCheck, Star } from 'lucide-react';
import { motion } from "framer-motion";

import { WhatsAppIcon } from './ WhatsAppIcon';

const MessagesList = ({ filteredMessages, searchQuery, setSelectedMessage }) => {
    return (
        <div className="flex-1 overflow-y-auto bg-gray-50">
            {filteredMessages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                    <MessageSquare className="w-12 h-12 mb-4 text-gray-300" />
                    <h3 className="text-lg font-medium text-gray-500">No messages found</h3>
                    <p className="text-sm text-gray-400 mt-1">
                        {searchQuery ? 'Try a different search term' : 'All caught up!'}
                    </p>
                </div>
            ) : (
                <div className="divide-y divide-gray-200">
                    {filteredMessages.map((message) => (
                        <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => setSelectedMessage(message)}
                            className={`p-3 cursor-pointer transition-colors ${message.unread ? 'bg-blue-50' : 'bg-white hover:bg-gray-50'}`}
                        >
                            <div className="flex items-start space-x-3">
                                <div className="relative flex-shrink-0">
                                    <img
                                        src={message.avatar}
                                        alt={message.sender}
                                        className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
                                    />
                                    <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center ${message.platform === 'whatsapp' ? 'bg-green-500' : 'bg-blue-500'}`}>
                                        {message.platform === 'whatsapp' ? (
                                            <WhatsAppIcon size={10} color="#fff" />
                                        ) : (
                                            <Mail className="w-3 h-3 text-white" />
                                        )}
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-baseline">
                                        <h3 className={`text-sm font-medium truncate ${message.unread ? 'text-gray-900' : 'text-gray-700'}`}>
                                            {message.sender}
                                        </h3>
                                        <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                                            {message.time}
                                        </span>
                                    </div>
                                    <p className={`text-sm mt-1 ${message.unread ? 'font-medium text-gray-800' : 'text-gray-600'}`}>
                                        {message.content.length > 60 ? `${message.content.substring(0, 60)}...` : message.content}
                                    </p>
                                    <div className="flex justify-between items-center mt-2">
                                        <span className="text-xs text-gray-400">{message.date}</span>
                                        <div className="flex items-center space-x-2">
                                            {message.unread && (
                                                <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                                            )}
                                            {message.platform === 'whatsapp' && (
                                                message.status === 'new' ? (
                                                    <Check className="w-3.5 h-3.5 text-gray-400" />
                                                ) : message.status === 'delivered' ? (
                                                    <CheckCheck className="w-3.5 h-3.5 text-gray-400" />
                                                ) : (
                                                    <CheckCheck className="w-3.5 h-3.5 text-blue-500" />
                                                )
                                            )}
                                            {message.platform === 'store' && message.unread && (
                                                <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default MessagesList;