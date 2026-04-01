'use client';

import React, { useState } from 'react';

const SuggestionsBoard: React.FC = React.memo(() => {
  const [suggestion, setSuggestion] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle suggestion submission
    console.log('Suggestion submitted:', suggestion);
    setSuggestion('');
  };

  return (
    <section className="p-4 md:p-8 bg-gray-100 mt-8">
      <div className="max-w-2xl mx-auto">
        <h3 className="text-xl md:text-2xl font-bold text-center mb-4 text-gray-800">
          💡 Have a Suggestion?
        </h3>
        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit}>
            <textarea
              value={suggestion}
              onChange={(e) => setSuggestion(e.target.value)}
              placeholder="Share your ideas to improve Tuffly..."
              className="w-full mt-2 p-3 rounded-md bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-blue-500"
              rows={4}
            />
            <button
              type="submit"
              className="mt-4 w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-md hover:opacity-90 transition-opacity"
            >
              Submit Suggestion
            </button>
          </form>
        </div>
      </div>
    </section>
  );
});

SuggestionsBoard.displayName = 'SuggestionsBoard';
export default SuggestionsBoard; 