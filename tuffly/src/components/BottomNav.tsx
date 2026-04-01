import Link from 'next/link';
import { FaHome, FaThLarge, FaComments, FaQuestionCircle, FaUser, FaPlus } from 'react-icons/fa';

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-tr from-tuffly-blue via-tuffly-purple to-tuffly-gold border-t border-gray-200 shadow-lg flex justify-around items-center h-16 md:hidden">
      <Link href="/" className="flex flex-col items-center text-white hover:text-tuffly-cyan transition-colors drop-shadow-[0_0_8px_#6a11cb]">
        <FaHome className="text-2xl" />
        <span className="text-xs">Home</span>
      </Link>
      <Link href="/categories" className="flex flex-col items-center text-white hover:text-tuffly-cyan transition-colors drop-shadow-[0_0_8px_#6a11cb]">
        <FaThLarge className="text-2xl" />
        <span className="text-xs">Categories</span>
      </Link>
      <Link href="/sell" className="flex flex-col items-center hover:opacity-80 transition-opacity">
        <div className="bg-yellow-400 rounded-full flex items-center justify-center mb-1" style={{ width: '48px', height: '48px' }}>
          <FaPlus className="text-2xl text-blue-900" />
        </div>
        <span className="text-xs text-white">Sell</span>
      </Link>
      <Link href="/chat" className="flex flex-col items-center text-white hover:text-tuffly-cyan transition-colors drop-shadow-[0_0_8px_#6a11cb]">
        <FaComments className="text-2xl" />
        <span className="text-xs">Chat</span>
      </Link>
      <Link href="/help" className="hidden flex flex-col items-center text-white hover:text-tuffly-cyan transition-colors drop-shadow-[0_0_8px_#6a11cb]">
        <FaQuestionCircle className="text-2xl" />
        <span className="text-xs">Help</span>
      </Link>
      <Link href="/profile" className="flex flex-col items-center text-white hover:text-tuffly-cyan transition-colors drop-shadow-[0_0_8px_#6a11cb]">
        <FaUser className="text-2xl" />
        <span className="text-xs">Profile</span>
      </Link>
    </nav>
  );
} 
