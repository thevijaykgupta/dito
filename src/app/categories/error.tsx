"use client";
import React from "react";

export default function CategoriesError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50">
      <div className="text-6xl mb-4">❌</div>
      <h1 className="text-2xl font-bold text-red-700 mb-2">Something went wrong in Categories</h1>
      <p className="text-gray-700 mb-4">A client-side error occurred. Please refresh the page or try again later.</p>
      <details className="text-gray-500 whitespace-pre-wrap mb-4">
        {error.message}
      </details>
      <button
        onClick={() => reset()}
        className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
} 
