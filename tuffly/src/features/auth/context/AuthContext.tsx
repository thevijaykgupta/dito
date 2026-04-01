"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { generateAvatarUrl } from "../services/avatar";
import { signInWithFacebookPopup, signInWithGooglePopup } from "../services/socialAuth";
import type { SignUpData, User } from "../types";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (userData: SignUpData) => Promise<boolean>;
  signOut: () => void;
  updateProfile: (data: Partial<User>) => Promise<boolean>;
  updateProfilePicture: (file: File) => Promise<boolean>;
  signInWithGoogle: () => Promise<boolean>;
  signInWithFacebook: () => Promise<boolean>;
  signInWithApple: () => Promise<boolean>;
  phone?: string;
  campus?: string;
  studentId?: string;
  upiId?: string;
}

type MockUserWithPassword = User & { password: string };

const defaultUsers: MockUserWithPassword[] = [
  {
    id: "1",
    email: "the.vijaykgupta@gmail.com",
    password: "Vijay",
    name: "Vijay Kumar Gupta",
    role: "admin",
    profilePicture: "/images/products/logo_new.jpg",
    phone: "+91 9876543210",
    campus: "RVCE",
    studentId: "ADMIN001",
    isVerified: true,
    createdAt: new Date("2024-01-01"),
    upiId: "admin@upi",
    isAvailableForTeam: true,
  },
  {
    id: "2",
    email: "student@example.com",
    password: "student123",
    name: "John Student",
    role: "user",
    profilePicture: "/images/products/logo_new.jpg",
    phone: "+91 9876543211",
    campus: "RVU",
    studentId: "STU001",
    isVerified: true,
    createdAt: new Date("2024-01-15"),
    isAvailableForTeam: false,
  },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export { AuthContext };

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

function persistSession(nextUser: User) {
  localStorage.setItem("user", JSON.stringify(nextUser));
  Cookies.set("auth-token", `mock-token-${Date.now()}`, { expires: 7 });
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("auth-token");
    const savedUser = localStorage.getItem("user");
    if (token && savedUser) {
      try {
        const parsed = JSON.parse(savedUser) as User;
        setUser(parsed);
      } catch (error) {
        console.error("Error parsing saved user:", error);
      }
    }
    setIsLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const foundUser = defaultUsers.find((u) => u.email === email && u.password === password);
      if (!foundUser) {
        return false;
      }
      const { password: _password, ...safeUser } = foundUser;
      setUser(safeUser);
      persistSession(safeUser);
      return true;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (userData: SignUpData) => {
    setIsLoading(true);
    try {
      const newUser: User = {
        id: Date.now().toString(),
        email: userData.email,
        name: userData.name,
        role: "user",
        phone: userData.phone,
        campus: userData.campus,
        studentId: userData.studentId,
        isVerified: false,
        createdAt: new Date(),
        profilePicture: generateAvatarUrl(userData.name),
        isAvailableForTeam: false,
      };
      setUser(newUser);
      persistSession(newUser);
      return true;
    } catch (error) {
      console.error("Sign up error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("user");
    Cookies.remove("auth-token");
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return false;
    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    return true;
  };

  const updateProfilePicture = async (file: File) => {
    if (!user) return false;
    const imageUrl = URL.createObjectURL(file);
    return updateProfile({ profilePicture: imageUrl });
  };

  const signInWithGoogle = async () => {
    setIsLoading(true);
    try {
      const profile = await signInWithGooglePopup();
      const socialUser: User = {
        id: Date.now().toString(),
        email: profile.email,
        name: profile.name,
        role: "user",
        profilePicture: profile.picture || generateAvatarUrl(profile.name),
        isVerified: true,
        createdAt: new Date(),
        campus: "RVCE",
        isAvailableForTeam: true,
      };
      setUser(socialUser);
      persistSession(socialUser);
      return true;
    } catch (error) {
      console.error("Google sign in error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithFacebook = async () => {
    setIsLoading(true);
    try {
      const profile = await signInWithFacebookPopup();
      const socialUser: User = {
        id: Date.now().toString(),
        email: profile.email,
        name: profile.name,
        role: "user",
        profilePicture: profile.picture || generateAvatarUrl(profile.name),
        isVerified: true,
        createdAt: new Date(),
        campus: "RVU",
        isAvailableForTeam: true,
      };
      setUser(socialUser);
      persistSession(socialUser);
      return true;
    } catch (error) {
      console.error("Facebook sign in error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithApple = async () => {
    setIsLoading(true);
    try {
      const appleUser: User = {
        id: Date.now().toString(),
        email: "apple.user@icloud.com",
        name: "Apple User",
        role: "user",
        profilePicture: generateAvatarUrl("Apple User"),
        isVerified: true,
        createdAt: new Date(),
        isAvailableForTeam: false,
      };
      setUser(appleUser);
      persistSession(appleUser);
      return true;
    } catch (error) {
      console.error("Apple sign in error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
    isLoading,
    signIn,
    signUp,
    signOut,
    updateProfile,
    updateProfilePicture,
    signInWithGoogle,
    signInWithFacebook,
    signInWithApple,
    phone: user?.phone,
    campus: user?.campus,
    studentId: user?.studentId,
    upiId: user?.upiId,
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
