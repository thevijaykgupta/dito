'use client';

import React, { useState } from 'react';
import { FaStar, FaComments, FaPaperPlane, FaTimes, FaSmile, FaMeh, FaFrown } from 'react-icons/fa';

interface Feedback {
  id: string;
  type: 'rating' | 'suggestion' | 'bug' | 'general';
  rating?: number;
  comment: string;
  category?: string;
  timestamp: Date;
  userEmail?: string;
}

export default function FeedbackSystem() {
  const [isOpen, setIsOpen] = useState(false);
  const [feedbackType, setFeedbackType] = useState<'rating' | 'suggestion' | 'bug' | 'general'>('rating');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [category, setCategory] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const feedback: Feedback = {
      id: Date.now().toString(),
      type: feedbackType,
      rating: feedbackType === 'rating' ? rating : undefined,
      comment,
      category: feedbackType !== 'rating' ? category : undefined,
      timestamp: new Date(),
      userEmail: userEmail || undefined,
    };

    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Feedback submitted:', feedback);
    setIsSubmitting(false);
    setIsSuccess(true);
    
    setTimeout(() => {
      setIsSuccess(false);
      setIsOpen(false);
      setRating(0);
      setComment('');
      setCategory('');
      setUserEmail('');
    }, 2000);
  };

  const getFeedbackIcon = (type: string) => {
    switch (type) {
      case 'rating':
        return <FaStar className="text-yellow-500" />;
      case 'suggestion':
        return <FaComments className="text-blue-500" />;
      case 'bug':
        return <FaTimes className="text-red-500" />;
      case 'general':
        return <FaPaperPlane className="text-green-500" />;
      default:
        return <FaComments className="text-gray-500" />;
    }
  };

  const getFeedbackTitle = (type: string) => {
    switch (type) {
      case 'rating':
        return 'Rate Your Experience';
      case 'suggestion':
        return 'Share Your Ideas';
      case 'bug':
        return 'Report an Issue';
      case 'general':
        return 'General Feedback';
      default:
        return 'Feedback';
    }
  };

  const getFeedbackDescription = (type: string) => {
    switch (type) {
      case 'rating':
        return 'How would you rate your experience with Tuffly?';
      case 'suggestion':
        return 'Have an idea to improve Tuffly? We would love to hear it!';
      case 'bug':
        return 'Found a bug or issue? Help us fix it!';
      case 'general':
        return 'Share your thoughts about Tuffly';
      default:
        return 'We value your feedback!';
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-4 z-40 bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
        title="Give Feedback"
      >
        <FaComments className="text-xl" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getFeedbackIcon(feedbackType)}
                  <h2 className="text-xl font-bold text-gray-800">
                    {getFeedbackTitle(feedbackType)}
                  </h2>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  x
                </button>
              </div>
              <p className="text-gray-600 mt-2">
                {getFeedbackDescription(feedbackType)}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Feedback Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { type: 'rating', label: 'Rating', icon: <FaStar /> },
                    { type: 'suggestion', label: 'Suggestion', icon: <FaComments /> },
                    { type: 'bug', label: 'Bug Report', icon: <FaTimes /> },
                    { type: 'general', label: 'General', icon: <FaPaperPlane /> }
                  ].map(({ type, label, icon }) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFeedbackType(type as any)}
                      className={`p-3 rounded-xl border-2 transition-all duration-200 flex items-center justify-center space-x-2 ${
                        feedbackType === type
                          ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                          : 'border-gray-200 hover:border-yellow-300 text-gray-600'
                      }`}
                    >
                      {icon}
                      <span className="text-sm font-medium">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {feedbackType === 'rating' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Rate Your Experience
                  </label>
                  <div className="flex justify-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className={`text-3xl transition-all duration-200 ${
                          star <= rating
                            ? 'text-yellow-500 transform scale-110'
                            : 'text-gray-300 hover:text-yellow-400'
                        }`}
                      >
                        <FaStar />
                      </button>
                    ))}
                  </div>
                  <div className="text-center mt-2">
                    {rating > 0 && (
                      <div className="flex items-center justify-center space-x-2">
                        {rating <= 2 && <FaFrown className="text-red-500" />}
                        {rating === 3 && <FaMeh className="text-yellow-500" />}
                        {rating >= 4 && <FaSmile className="text-green-500" />}
                        <span className="text-sm text-gray-600">
                          {rating <= 2 && 'Poor'}
                          {rating === 3 && 'Average'}
                          {rating === 4 && 'Good'}
                          {rating === 5 && 'Excellent'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {feedbackType !== 'rating' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select a category</option>
                    {feedbackType === 'suggestion' && (
                      <>
                        <option value="ui-ux">UI/UX Improvement</option>
                        <option value="features">New Features</option>
                        <option value="performance">Performance</option>
                        <option value="content">Content</option>
                      </>
                    )}
                    {feedbackType === 'bug' && (
                      <>
                        <option value="app-crash">App Crash</option>
                        <option value="payment-issue">Payment Issue</option>
                        <option value="login-problem">Login Problem</option>
                        <option value="display-issue">Display Issue</option>
                        <option value="other">Other</option>
                      </>
                    )}
                    {feedbackType === 'general' && (
                      <>
                        <option value="praise">Praise</option>
                        <option value="complaint">Complaint</option>
                        <option value="question">Question</option>
                        <option value="other">Other</option>
                      </>
                    )}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {feedbackType === 'rating' ? 'Additional Comments (Optional)' : 'Details'}
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent resize-none"
                  placeholder={
                    feedbackType === 'rating'
                      ? 'Tell us more about your experience...'
                      : feedbackType === 'suggestion'
                      ? 'Describe your suggestion in detail...'
                      : feedbackType === 'bug'
                      ? 'Describe the issue you encountered...'
                      : 'Share your thoughts...'
                  }
                  required={feedbackType !== 'rating'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email (Optional)
                </label>
                <input
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="your.email@example.com"
                />
                <p className="text-xs text-gray-500 mt-1">
                  We will use this to follow up on your feedback
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || (feedbackType !== 'rating' && !category) || (feedbackType !== 'rating' && !comment)}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Submitting...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <FaPaperPlane />
                    <span>Submit Feedback</span>
                  </div>
                )}
              </button>
            </form>

            {isSuccess && (
              <div className="p-6 bg-green-50 border-t border-green-200">
                <div className="flex items-center space-x-3 text-green-700">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <FaPaperPlane className="text-white text-xs" />
                  </div>
                  <span className="font-medium">Thank you for your feedback!</span>
                </div>
                <p className="text-green-600 text-sm mt-1">
                  We appreciate your input and will use it to improve Tuffly.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
