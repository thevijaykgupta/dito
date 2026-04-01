'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FaComments, FaTimes, FaPaperPlane, FaSmile, FaImage, FaMicrophone, FaEllipsisV, FaCircle } from 'react-icons/fa';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'other';
  timestamp: Date;
  type: 'text' | 'image' | 'system';
  isRead: boolean;
}

interface ChatContact {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: Date;
  isOnline: boolean;
  unreadCount: number;
}

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [selectedContact, setSelectedContact] = useState<ChatContact | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const contacts: ChatContact[] = [
    {
      id: '1',
      name: 'Alex Kumar',
      avatar: '/images/products/logo_new.jpg',
      lastMessage: 'Is the laptop still available?',
      lastMessageTime: new Date(Date.now() - 5 * 60 * 1000),
      isOnline: true,
      unreadCount: 2,
    },
    {
      id: '2',
      name: 'Sarah Patel',
      avatar: '/images/products/logo_new.jpg',
      lastMessage: 'Thanks for the quick delivery!',
      lastMessageTime: new Date(Date.now() - 30 * 60 * 1000),
      isOnline: false,
      unreadCount: 0,
    },
    {
      id: '3',
      name: 'Mike Singh',
      avatar: '/images/products/logo_new.jpg',
      lastMessage: 'Can you lower the price?',
      lastMessageTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isOnline: true,
      unreadCount: 1,
    },
  ];

  useEffect(() => {
    if (selectedContact) {
      // Simulate loading messages
      const sampleMessages: Message[] = [
        {
          id: '1',
          text: `Hi! I'm interested in your item.`,
          sender: 'other',
          timestamp: new Date(Date.now() - 10 * 60 * 1000),
          type: 'text',
          isRead: true,
        },
        {
          id: '2',
          text: 'Hello! Yes, it\'s still available. What would you like to know?',
          sender: 'user',
          timestamp: new Date(Date.now() - 8 * 60 * 1000),
          type: 'text',
          isRead: true,
        },
        {
          id: '3',
          text: 'Can you send me more photos?',
          sender: 'other',
          timestamp: new Date(Date.now() - 5 * 60 * 1000),
          type: 'text',
          isRead: true,
        },
        {
          id: '4',
          text: 'Sure! I\'ll send them right away.',
          sender: 'user',
          timestamp: new Date(Date.now() - 3 * 60 * 1000),
          type: 'text',
          isRead: false,
        },
      ];
      setMessages(sampleMessages);
    }
  }, [selectedContact]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedContact) {
      const message: Message = {
        id: Date.now().toString(),
        text: newMessage,
        sender: 'user',
        timestamp: new Date(),
        type: 'text',
        isRead: false,
      };
      setMessages(prev => [...prev, message]);
      setNewMessage('');

      // Simulate typing indicator
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        // Simulate reply
        const reply: Message = {
          id: (Date.now() + 1).toString(),
          text: 'Thanks for your message! I\'ll get back to you soon.',
          sender: 'other',
          timestamp: new Date(),
          type: 'text',
          isRead: false,
        };
        setMessages(prev => [...prev, reply]);
      }, 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return formatTime(date);
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  // Add a prop or context check: if (!userHasPaidForItem) return null or show a message.

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-44 right-4 z-40 bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
        title="Live Chat"
      >
        <FaComments className="text-xl" />
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold animate-pulse">
          {contacts.reduce((sum, contact) => sum + contact.unreadCount, 0)}
        </span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 z-50 w-80 h-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FaComments className="text-xl" />
                <h3 className="font-semibold">Live Chat</h3>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1 hover:bg-white/20 rounded transition-colors"
                >
                  {isMinimized ? '□' : '−'}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/20 rounded transition-colors"
                >
                  <FaTimes />
                </button>
              </div>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Contact List or Chat */}
              {!selectedContact ? (
                <div className="h-full overflow-y-auto">
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-800 mb-3">Recent Conversations</h4>
                    <div className="space-y-2">
                      {contacts.map((contact) => (
                        <div
                          key={contact.id}
                          onClick={() => setSelectedContact(contact)}
                          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                        >
                          <div className="relative">
                            <img
                              src={contact.avatar}
                              alt={contact.name}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                            {contact.isOnline && (
                              <FaCircle className="absolute -bottom-1 -right-1 text-green-500 text-sm" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h5 className="font-medium text-gray-800 truncate">{contact.name}</h5>
                              <span className="text-xs text-gray-500">{formatDate(contact.lastMessageTime)}</span>
                            </div>
                            <p className="text-sm text-gray-600 truncate">{contact.lastMessage}</p>
                          </div>
                          {contact.unreadCount > 0 && (
                            <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                              {contact.unreadCount}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col h-full">
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-200 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => setSelectedContact(null)}
                          className="p-1 hover:bg-gray-200 rounded transition-colors"
                        >
                          ←
                        </button>
                        <div className="relative">
                          <img
                            src={selectedContact.avatar}
                            alt={selectedContact.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          {selectedContact.isOnline && (
                            <FaCircle className="absolute -bottom-1 -right-1 text-green-500 text-xs" />
                          )}
                        </div>
                        <div>
                          <h5 className="font-semibold text-gray-800">{selectedContact.name}</h5>
                          <p className="text-xs text-gray-500">
                            {selectedContact.isOnline ? 'Online' : 'Offline'}
                          </p>
                        </div>
                      </div>
                      <button className="p-2 hover:bg-gray-200 rounded transition-colors">
                        <FaEllipsisV />
                      </button>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs px-4 py-2 rounded-2xl ${
                            message.sender === 'user'
                              ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          <p className="text-sm">{message.text}</p>
                          <p className={`text-xs mt-1 ${
                            message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                            {formatTime(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))}
                    
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-2xl">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-gray-200">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
                        <FaSmile />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
                        <FaImage />
                      </button>
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder="Type a message..."
                          className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        />
                      </div>
                      <button
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                        className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <FaPaperPlane />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
}
