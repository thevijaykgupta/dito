export interface TeamUpProfile {
  userId: string;
  name: string;
  campus?: string;
  isAvailableForTeam: boolean;
  subjects: string[];
  skills: string[];
  region?: string;
  cgpaMin?: number;
  cgpaMax?: number;
  hostel?: string;
}

export interface TeamMatchResult {
  profile: TeamUpProfile;
  compatibilityScore: number;
}
