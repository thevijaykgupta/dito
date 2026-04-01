export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user";
  profilePicture?: string;
  phone?: string;
  hostel?: string;
  campus?: string;
  studentId?: string;
  isVerified: boolean;
  createdAt: Date;
  upiId?: string;
  isAvailableForTeam?: boolean;
}

export interface SignUpData {
  email: string;
  password: string;
  name: string;
  phone?: string;
  campus?: string;
  studentId?: string;
}

export interface SocialProfile {
  provider: "google" | "facebook" | "apple";
  email: string;
  name: string;
  picture?: string;
}
