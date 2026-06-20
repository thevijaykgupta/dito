'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FaPhone, FaKey, FaArrowLeft, FaCheck, FaTimes, FaEye, FaEyeSlash } from 'react-icons/fa';

interface OTPLoginProps {
  onLogin: (phone: string, otp: string) => void;
  onBack: () => void;
}

export default function OTPLogin({ onLogin, onBack }: OTPLoginProps) {
  const [step, setStep] = useState<'phone' | 'otp' | 'success'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const otpInputs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validatePhoneNumber(phoneNumber)) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate OTP sending
      await new Promise(resolve => setTimeout(resolve, 2000));
      setStep('otp');
      setCountdown(30); // 30 seconds countdown
    } catch (error) {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow single digit

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      otpInputs.current[index + 1]?.focus();
    }

    // Check if OTP is complete
    if (newOtp.every(digit => digit !== '') && index === 5) {
      handleOtpSubmit(newOtp.join(''));
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputs.current[index - 1]?.focus();
    }
  };

  const handleOtpSubmit = async (otpString: string) => {
    setIsLoading(true);
    setError('');

    try {
      // Simulate OTP verification
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (otpString === '123456') { // Mock OTP
        setStep('success');
        setTimeout(() => {
          onLogin(phoneNumber, otpString);
        }, 1000);
      } else {
        setError('Invalid OTP. Please try again.');
        setOtp(['', '', '', '', '', '']);
        otpInputs.current[0]?.focus();
      }
    } catch (error) {
      setError('Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resendOTP = async () => {
    if (countdown > 0) return;

    setIsLoading(true);
    setError('');

    try {
      // Simulate resending OTP
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCountdown(30);
      setOtp(['', '', '', '', '', '']);
      otpInputs.current[0]?.focus();
    } catch (error) {
      setError('Failed to resend OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatPhoneNumber = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phone;
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
            <FaPhone className="text-white text-xl" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {step === 'phone' && 'Login with Phone'}
          {step === 'otp' && 'Enter OTP'}
          {step === 'success' && 'Login Successful'}
        </h2>
        <p className="text-gray-600 font-serif">
          {step === 'phone' && 'We\'ll send you a verification code'}
          {step === 'otp' && `Code sent to ${formatPhoneNumber(phoneNumber)}`}
          {step === 'success' && 'Welcome to Tuffly!'}
        </p>
      </div>

      {/* Back Button */}
      {step !== 'phone' && (
        <button
          onClick={() => {
            if (step === 'otp') {
              setStep('phone');
              setOtp(['', '', '', '', '', '']);
            }
            onBack();
          }}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
        >
          <FaArrowLeft />
          <span>Back</span>
        </button>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
          <div className="flex items-center space-x-2">
            <FaTimes className="text-red-500" />
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      )}

      {/* Phone Number Step */}
      {step === 'phone' && (
        <form onSubmit={handlePhoneSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 text-sm">+91</span>
              </div>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Enter your phone number"
                maxLength={10}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || phoneNumber.length !== 10}
            className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Sending OTP...' : 'Send OTP'}
          </button>
        </form>
      )}

      {/* OTP Step */}
      {step === 'otp' && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Enter 6-digit OTP
            </label>
            <div className="flex space-x-3 justify-center">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={((el: HTMLInputElement | null) => { otpInputs.current[index] = el; }) as ((el: HTMLInputElement | null) => void) | null}
                  type="text"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  className="w-12 h-12 text-center border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-lg font-semibold"
                  maxLength={1}
                  inputMode="numeric"
                  pattern="[0-9]*"
                />
              ))}
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600 mb-4">
              Didn't receive the code?
            </p>
            <button
              onClick={resendOTP}
              disabled={countdown > 0 || isLoading}
              className="text-yellow-600 hover:text-yellow-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {countdown > 0 ? `Resend in ${countdown}s` : 'Resend OTP'}
            </button>
          </div>

          {isLoading && (
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-yellow-500"></div>
              <p className="text-sm text-gray-600 mt-2">Verifying OTP...</p>
            </div>
          )}
        </div>
      )}

      {/* Success Step */}
      {step === 'success' && (
        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <FaCheck className="text-green-500 text-2xl" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Login Successful!
            </h3>
            <p className="text-gray-600 font-serif">
              Welcome back to Tuffly
            </p>
          </div>
        </div>
      )}

      {/* Alternative Login */}
      {step === 'phone' && (
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-4">Or login with password</p>
            <div className="space-y-3">
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="Enter password"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <FaKey className="text-gray-400" />
                </div>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? <FaEyeSlash className="text-gray-400" /> : <FaEye className="text-gray-400" />}
                </button>
              </div>
              <button
                onClick={() => {
                  if (password === 'password123') { // Mock password
                    setStep('success');
                    setTimeout(() => {
                      onLogin(phoneNumber, 'password');
                    }, 1000);
                  } else {
                    setError('Invalid password');
                  }
                }}
                className="w-full bg-gray-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-gray-600 transition-colors"
              >
                Login with Password
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-8 pt-6 border-t border-gray-200 text-center">
        <p className="text-sm text-gray-600">
          By continuing, you agree to our{' '}
          <a href="#" className="text-yellow-600 hover:text-yellow-700 font-medium">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="text-yellow-600 hover:text-yellow-700 font-medium">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
} 
