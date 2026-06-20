import { useState } from 'react';

export default function SuggestionForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch('/api/suggestion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, suggestion })
    });
    setLoading(false);
    setSuccess(true);
    setName('');
    setEmail('');
    setSuggestion('');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
      {/* ...form fields... */}
      <button type="submit" disabled={loading} className="...">{loading ? 'Sending...' : 'Submit Suggestion'}</button>
      {success && <p className="text-green-600 mt-2">Thank you for your suggestion!</p>}
    </form>
  );
} 
