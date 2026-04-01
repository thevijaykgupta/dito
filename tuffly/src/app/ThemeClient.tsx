'use client';

import React, { useEffect } from 'react';

// This component now handles setting the theme based on the time of day.
// It will add either 'dark' or 'light' class to the <html> element.
export default function ThemeClient({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Always apply dark mode
    document.documentElement.classList.add('dark');
  }, []);

  return <>{children}</>;
} 
