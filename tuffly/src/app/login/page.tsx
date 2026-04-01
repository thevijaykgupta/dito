'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Script from 'next/script';
import { FaEye, FaEyeSlash, FaUser, FaLock, FaGoogle, FaFacebook } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import Image from 'next/image';

export default function LoginPage() {
  const router = useRouter();
  const { signIn, signUp, signInWithGoogle, signInWithFacebook } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [hostel, setHostel] = useState('');
  const [institution, setInstitution] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    hostel: '',
    campus: 'RVCE',
    studentId: '',
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    (window as Window & { fbAsyncInit?: () => void }).fbAsyncInit = () => {
      const appId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID;
      if (!window.FB || !appId) return;
      window.FB.init({
        appId,
        cookie: true,
        xfbml: true,
        version: 'v19.0',
      });
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      if (isLogin) {
        const success = await signIn(formData.email, formData.password);
        if (success) {
          setSuccess('Login successful! Redirecting...');
          setTimeout(() => router.push('/'), 1000);
        } else {
          setError('Invalid email or password');
        }
      } else {
        const success = await signUp({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          phone: formData.phone,
          campus: formData.campus,
          studentId: formData.studentId,
        });
        if (success) {
          setSuccess('Account created successfully! Redirecting...');
          setFormData({
            email: '',
            password: '',
            name: '',
            phone: '',
            campus: 'RVCE',
            hostel: '',
            studentId: '',
          });
          setTimeout(() => router.push('/'), 800);
        } else {
          setError('Failed to create account. Please try again.');
        }
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const ok = await signInWithGoogle();
      if (!ok) throw new Error('Google login failed');
      setSuccess('Google sign in successful! Redirecting...');
      setTimeout(() => router.push('/'), 1000);
    } catch (error) {
      setError('Google sign in failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFacebookSignIn = async () => {
    setIsLoading(true);
    setError('');
    setSuccess('');
    try {
      const ok = await signInWithFacebook();
      if (!ok) throw new Error('Facebook login failed');
      setSuccess('Facebook sign in successful! Redirecting...');
      setTimeout(() => router.push('/'), 1000);
    } catch {
      setError('Facebook sign in failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50 flex items-center justify-center p-4">
      <Script src="https://accounts.google.com/gsi/client" async defer />
      <Script src="https://connect.facebook.net/en_US/sdk.js" async defer />
      <div
        id="g_id_onload"
        data-client_id={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''}
        data-context="signup"
        data-ux_mode="popup"
        data-auto_select="false"
      />
      <div id="google-signin-anchor" />
      <div className="max-w-md w-full">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Image
              src="/images/products/logo_blackk.png"
              alt="Tuffly Logo"
              width={80}
              height={80}
              className="w-20 h-20 rounded-2xl shadow-xl border-4 border-yellow-300"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 font-serif">
            Welcome to <span className="text-yellow-600">Tuffly</span>
          </h1>
          <p className="text-gray-600">
            {isLogin ? 'Sign in to your account' : 'Create your account'}
          </p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Toggle Buttons */}
          <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
            <button
              onClick={() => {
                setIsLogin(true);
                setError('');
                setSuccess('');
              }}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                isLogin
                  ? 'bg-white text-yellow-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setIsLogin(false);
                setError('');
                setSuccess('');
              }}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                !isLogin
                  ? 'bg-white text-yellow-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Error/Success Messages */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-600 text-sm">{success}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div className="text-center text-sm text-gray-500 bg-gray-50 rounded-lg px-3 py-2">
                  Avatar will be auto-generated from your name. You can change it later in Profile.
                </div>

                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="color-black w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                {/* Phone Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent color-black"
                    placeholder="+91 98765 43210"
                  />
                </div>

                {/* Campus Field */}
                <div>
                  {/* <label className="block text-sm font-medium text-gray-700 mb-1"> */}
                   <label className="block text-gray-700 mt-4 mb-2">
                      Institution *
                    </label>

                    <select
                    required
                    value={formData.campus}
                    onChange={(e) => setFormData({ ...formData, campus: e.target.value })}
                    className="color-black w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-400"
                  >
                    <option value="">Select Institution</option>
                    <option value="RVCE">RVCE</option>
                    <option value="RVU">RVU</option>
                  </select>
                  </div>

                {/* Student ID Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Student ID
                  </label>
                  <input
                    type="text"
                    value={formData.studentId}
                    onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent color-black"
                    placeholder="1RV2__________"
                  />
                </div>

                <label className="block text-gray-700 mt-4 mb-2">
                Hostel Block *
              </label>

              <select
                required
                value={formData.hostel}
                onChange={(e) => setFormData({ ...formData, hostel: e.target.value })}
                className="color-black w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-400"
              >


            
                <option value="">Select Hostel</option>
                <option value="Cauvery">Cauvery</option>
                <option value="Krishna">Krishna</option>
                <option value="Cauvery Annex">Cauvery Annex</option>
                <option value="Krishna Annex">Krishna Annex</option>
                <option value="Krishna Garden">Krishna Garden</option>
                <option value="Chamundi">Chamundi</option>
                <option value="Sir MV Hostel">Sir MV Hostel</option>
                <option value="DJ Hostel">DJ Hostel</option>
                           </select>
              </>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent color-black"
                placeholder="your.email@example.com"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password *
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="color-black w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-yellow-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
            </button>
          </form>

          {/* Social Login */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3">
              <button 
                onClick={handleGoogleSignIn}
                type="button"
                disabled={isLoading}
                className="w-full inline-flex justify-center items-center py-3 px-6 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Sign in with Google"
              >
                <FaGoogle className="text-red-500 mr-3 text-lg" />
                Continue with Google
              </button>

              <button
                onClick={handleFacebookSignIn}
                type="button"
                disabled={isLoading}
                className="w-full inline-flex justify-center items-center py-3 px-6 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Sign in with Facebook"
              >
                <FaFacebook className="text-blue-600 mr-3 text-lg" />
                Continue with Facebook
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          {isLogin && (
            <div className="mt-6 text-center">
              <Link
                href="/forgot-password"
                className="text-sm text-yellow-600 hover:text-yellow-500"
              >
                Forgot your password?
              </Link>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-600">
            By continuing, you agree to Tuffly's{' '}
            <Link href="/terms" className="text-yellow-600 hover:text-yellow-500">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-yellow-600 hover:text-yellow-500">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
