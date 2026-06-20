'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowLeft, FaDownload, FaMobile, FaDesktop, FaApple, FaAndroid, FaChrome, FaEdge, FaSafari, FaQrcode, FaCopy, FaCheck } from 'react-icons/fa';

export default function InstallPage() {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('android');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const platformGuides = {
    android: {
      title: 'Install on Android',
      icon: FaAndroid,
      color: 'bg-green-500',
      steps: [
        {
          number: 1,
          title: 'Open Chrome Browser',
          description: 'Launch Google Chrome on your Android device',
          icon: '🌐'
        },
        {
          number: 2,
          title: 'Navigate to Tuffly',
          description: 'Go to Tuffly.com or scan the QR code below',
          icon: '📱'
        },
        {
          number: 3,
          title: 'Tap Menu Button',
          description: 'Tap the three dots (⋮) in the top-right corner',
          icon: '⚙️'
        },
        {
          number: 4,
          title: 'Select "Install App"',
          description: 'Choose "Add to Home screen" or "Install app"',
          icon: '📲'
        },
        {
          number: 5,
          title: 'Confirm Installation',
          description: 'Tap "Install" and wait for the download to complete',
          icon: '✅'
        },
        {
          number: 6,
          title: 'Launch from Home Screen',
          description: 'Find Tuffly icon on your home screen and tap to open',
          icon: '🏠'
        }
      ],
      tips: [
        'Make sure you have a stable internet connection',
        'Allow Chrome to install apps from unknown sources if prompted',
        'The app will work offline once installed',
        'You can uninstall anytime from your device settings'
      ]
    },
    iphone: {
      title: 'Install on iPhone',
      icon: FaApple,
      color: 'bg-gray-800',
      steps: [
        {
          number: 1,
          title: 'Open Safari Browser',
          description: 'Launch Safari on your iPhone (not Chrome or other browsers)',
          icon: '🌐'
        },
        {
          number: 2,
          title: 'Navigate to Tuffly',
          description: 'Go to Tuffly.com or scan the QR code below',
          icon: '📱'
        },
        {
          number: 3,
          title: 'Tap Share Button',
          description: 'Tap the share button (square with arrow up) at the bottom',
          icon: '📤'
        },
        {
          number: 4,
          title: 'Select "Add to Home Screen"',
          description: 'Scroll down and tap "Add to Home Screen"',
          icon: '🏠'
        },
        {
          number: 5,
          title: 'Customize Name (Optional)',
          description: 'You can change the name or keep "Tuffly"',
          icon: '✏️'
        },
        {
          number: 6,
          title: 'Tap "Add"',
          description: 'Tap "Add" in the top-right corner to complete installation',
          icon: '✅'
        }
      ],
      tips: [
        'Must use Safari browser (not Chrome or Firefox)',
        'The app will appear on your home screen like a native app',
        'You can organize it in folders with other apps',
        'Works offline and sends push notifications'
      ]
    },
    pc: {
      title: 'Install on PC',
      icon: FaDesktop,
      color: 'bg-blue-500',
      steps: [
        {
          number: 1,
          title: 'Open Chrome/Edge Browser',
          description: 'Launch Chrome or Microsoft Edge on your computer',
          icon: '💻'
        },
        {
          number: 2,
          title: 'Navigate to Tuffly',
          description: 'Go to Tuffly.com in your browser',
          icon: '🌐'
        },
        {
          number: 3,
          title: 'Click Install Button',
          description: 'Click the "Install App" button in the top-right corner',
          icon: '📥'
        },
        {
          number: 4,
          title: 'Confirm Installation',
          description: 'Click "Install" in the popup dialog',
          icon: '✅'
        },
        {
          number: 5,
          title: 'Launch from Start Menu',
          description: 'Find Tuffly in your Start Menu or Desktop',
          icon: '🚀'
        },
        {
          number: 6,
          title: 'Pin to Taskbar (Optional)',
          description: 'Right-click the app and select "Pin to taskbar"',
          icon: '📌'
        }
      ],
      tips: [
        'Works on Windows 10/11 and macOS',
        'The app will open in its own window like a native app',
        'You can pin it to your taskbar for quick access',
        'Supports keyboard shortcuts and desktop notifications'
      ]
    }
  };

  const currentGuide = platformGuides[activeTab as keyof typeof platformGuides];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Link 
            href="/"
            className="p-2 text-gray-600 hover:text-yellow-600 transition-colors"
          >
            <FaArrowLeft className="text-xl" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">Install Tuffly</h1>
        </div>

        {/* Platform Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {Object.entries(platformGuides).map(([key, guide]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`p-6 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 ${
                activeTab === key
                  ? 'bg-white border-2 border-yellow-500'
                  : 'bg-white/80 hover:bg-white'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className={`${guide.color} p-3 rounded-full`}>
                  <guide.icon className="text-white text-2xl" />
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-gray-800">{guide.title}</h3>
                  <p className="text-sm text-gray-600">Step-by-step guide</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Installation Guide */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className={`${currentGuide.color} p-3 rounded-full`}>
              <currentGuide.icon className="text-white text-2xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{currentGuide.title}</h2>
              <p className="text-gray-600">Follow these steps to install Tuffly on your device</p>
            </div>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {currentGuide.steps.map((step) => (
              <div key={step.number} className="flex space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold">
                  {step.number}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 flex items-center space-x-2">
                    <span>{step.icon}</span>
                    <span>{step.title}</span>
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Tips */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="font-bold text-yellow-800 mb-4">💡 Pro Tips</h3>
            <ul className="space-y-2">
              {currentGuide.tips.map((tip, index) => (
                <li key={index} className="flex items-start space-x-2 text-sm text-yellow-700">
                  <span className="text-yellow-500 mt-1">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* QR Code & Direct Link */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* QR Code */}
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-4">📱 Quick Install</h3>
            <div className="bg-gray-100 rounded-lg p-6 inline-block mb-4">
              <FaQrcode className="text-6xl text-gray-400 mx-auto" />
              <p className="text-sm text-gray-600 mt-2">Scan with your camera</p>
            </div>
            <p className="text-sm text-gray-600">Point your camera at this QR code to open Tuffly</p>
          </div>

          {/* Direct Link */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">🔗 Direct Link</h3>
            <div className="flex items-center space-x-2 p-3 bg-gray-100 rounded-lg mb-4">
              <input
                type="text"
                value="https://Tuffly.com"
                readOnly
                className="flex-1 bg-transparent text-sm text-gray-600"
              />
              <button
                onClick={() => copyToClipboard('https://Tuffly.com')}
                className="p-2 text-gray-600 hover:text-yellow-600 transition-colors"
              >
                {copied ? <FaCheck className="text-green-500" /> : <FaCopy />}
              </button>
            </div>
            <p className="text-sm text-gray-600">Copy this link and open it in your browser</p>
          </div>
        </div>

        {/* Features Showcase */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">🚀 Why Install Tuffly?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="font-bold text-gray-800 mb-2">Lightning Fast</h3>
              <p className="text-sm text-gray-600">Loads instantly and works offline</p>
            </div>
            <div className="text-center p-4">
              <div className="text-4xl mb-4">🔔</div>
              <h3 className="font-bold text-gray-800 mb-2">Push Notifications</h3>
              <p className="text-sm text-gray-600">Get real-time updates and offers</p>
            </div>
            <div className="text-center p-4">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="font-bold text-gray-800 mb-2">Native Experience</h3>
              <p className="text-sm text-gray-600">Feels like a real app on your device</p>
            </div>
          </div>
        </div>

        {/* Troubleshooting */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">🔧 Troubleshooting</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-yellow-500 pl-4">
              <h3 className="font-semibold text-gray-800">Install button not showing?</h3>
              <p className="text-sm text-gray-600">Make sure you're using the latest version of Chrome/Safari and have a stable internet connection.</p>
            </div>
            <div className="border-l-4 border-yellow-500 pl-4">
              <h3 className="font-semibold text-gray-800">App not working after installation?</h3>
              <p className="text-sm text-gray-600">Try clearing your browser cache and reinstalling the app.</p>
            </div>
            <div className="border-l-4 border-yellow-500 pl-4">
              <h3 className="font-semibold text-gray-800">Can't find the app icon?</h3>
              <p className="text-sm text-gray-600">Check your home screen, app drawer, or search for "Tuffly" in your device search.</p>
            </div>
          </div>
        </div>

        {/* Support */}
        <div className="text-center">
          <p className="text-gray-600 mb-4">Need help? Contact our support team</p>
          <Link
            href="/help"
            className="inline-flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <span>Get Help</span>
            <FaArrowLeft className="rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
} 
