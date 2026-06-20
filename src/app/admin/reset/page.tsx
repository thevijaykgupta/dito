'use client';

import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function ResetPage() {
  const router = useRouter();

  useEffect(() => {
    // Force disable maintenance mode
    Cookies.remove('maintenanceMode');
    // Redirect to admin dashboard
    router.push('/admin');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Resetting Maintenance Mode...</h1>
        <p className="text-gray-600">You will be redirected to the admin dashboard.</p>
      </div>
    </div>
  );
} 
