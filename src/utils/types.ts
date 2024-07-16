export interface UserProfile {
  id: string;
  name: string;
}

export interface User {
  profile: UserProfile | null;
  follower: number;
  following: number;
}

export interface AuthInputError {
  name?: string;
  email?: string;
  password?: string;
}
