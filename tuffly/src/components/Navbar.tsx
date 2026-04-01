'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { FaShoppingCart, FaUserCircle, FaBars, FaTimes, FaBell } from 'react-icons/fa';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const notificationsRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const { user, signOut } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
                setShowNotifications(false);
            }
        };

        if (showNotifications) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [showNotifications]);

    // Hide Navbar on certain routes
    if (pathname.startsWith('/admin') || pathname.startsWith('/login')) {
        return null;
    }

    const navLinks = [
        { name: 'Categories', href: '/categories' },
        { name: 'Chat', href: '/chat' },
        { name: 'Sell', href: '/sell' },
        { name: 'Help', href: '/help' },
    ];

    return (
        <nav className="bg-gradient-to-r from-tuffly-blue to-tuffly-purple border-b-4 border-tuffly-gold shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
                <div className="flex items-center justify-between h-16 sm:h-20">
                    {/* Logo and Brand Name */}
                    <Link href="/" className="flex items-center space-x-2 flex-shrink-0 cursor-pointer">
                        <Image src="/images/products/logo_whitee.png" alt="Tuffly Logo" width={40} height={40} />
                        <span className="text-2xl font-bold text-tuffly-gold font-sans drop-shadow-lg">Tuffly</span>
                    </Link>

                    {/* Desktop Nav Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link key={link.name} href={link.href} className={`text-lg font-medium transition-all duration-300 ${pathname === link.href ? 'text-tuffly-gold font-semibold' : 'text-white hover:text-tuffly-gold hover:scale-105'}`}>
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Right-side Icons */}
                    <div className="flex items-center space-x-6 relative">
                        <Link href="/cart" className="relative text-white hover:text-tuffly-gold transition-all duration-300 hover:scale-110">
                            <FaShoppingCart className="h-6 w-6" />
                            <span className="absolute -top-2 -right-2 bg-tuffly-gold text-tuffly-blue text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">3</span>
                        </Link>
                        <div className="relative" ref={notificationsRef}>
                            <button 
                                onClick={() => setShowNotifications(!showNotifications)}
                                className="relative text-white hover:text-tuffly-gold transition-all duration-300 hover:scale-110"
                            >
                                <FaBell className="h-6 w-6" />
                                <span className="absolute -top-2 -right-2 bg-tuffly-gold text-tuffly-blue text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">9+</span>
                            </button>
                            {showNotifications && (
                                <div className="absolute right-0 mt-2 w-80 bg-yellow-50 rounded-lg shadow-xl border border-gray-200 z-50">
                                    <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                                        <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
                                        <button 
                                            onClick={() => setShowNotifications(false)}
                                            className="text-gray-500 hover:text-gray-700"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                    <div className="p-6 text-center">
                                        <div className="flex justify-center mb-3">
                                            <FaBell className="h-12 w-12 text-gray-300" />
                                        </div>
                                        <p className="text-gray-600 font-medium mb-2">No notifications yet</p>
                                        <p className="text-gray-500 text-sm">We'll notify you about offers and updates</p>
                                    </div>
                                </div>
                            )}
                        </div>
                        {user ? (
                            <>
                                <Link href="/profile" className="text-white hover:text-tuffly-gold transition-all duration-300 hover:scale-110">
                                    <FaUserCircle className="h-7 w-7" />
                                </Link>
                                <button
                                    onClick={() => { signOut(); router.push('/login'); }}
                                    className="ml-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link href="/login" className="text-white hover:text-tuffly-gold transition-all duration-300 hover:scale-110">
                               <FaUserCircle className="h-7 w-7" />
                            </Link>
                        )}
                        {/* Hamburger for mobile */}
                        <div className="md:hidden flex items-center">
                          
                                
                            <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
                                    {isOpen ? <FaTimes className="h-7 w-7" /> : <FaBars className="h-7 w-7" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Nav Menu */}
            {isOpen && (
                <div className="md:hidden bg-gradient-to-r from-tuffly-blue to-tuffly-purple px-2 pt-2 pb-4 space-y-3 rounded-b-xl shadow-lg">
                    {navLinks.map((link) => (
                        <Link key={link.name} href={link.href} className={`block text-lg font-medium transition-all duration-300 ${pathname === link.href ? 'text-tuffly-gold font-semibold' : 'text-gray-900 hover:text-tuffly-gold'}`} onClick={() => setIsOpen(false)}>
                            {link.name}
                        </Link>
                    ))}
                    <Link href="/cart" className="block text-white hover:text-tuffly-gold transition-all duration-300">
                        <FaShoppingCart className="inline mr-2" />Cart
                    </Link>
                    <button className="block text-white hover:text-tuffly-gold transition-all duration-300">
                        <FaBell className="inline mr-2" />Notifications
                    </button>
                    {user ? (
                        <>
                            <Link href="/profile" className="block text-white hover:text-tuffly-gold transition-all duration-300" onClick={() => setIsOpen(false)}>
                                <FaUserCircle className="inline mr-2" />Profile
                            </Link>
                            <button
                                onClick={() => { signOut(); router.push('/login'); setIsOpen(false); }}
                                className="mt-2 w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link href="/login" className="block text-white hover:text-tuffly-gold transition-all duration-300" onClick={() => setIsOpen(false)}>
                            <FaUserCircle className="inline mr-2" />Login
                        </Link>
                    )}
                </div>
            )}
        </nav>
    );
} 
