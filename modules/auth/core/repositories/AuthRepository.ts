import { User } from '../entities/User';

export interface AuthRepository {
  signIn(email: string, password: string): Promise<User>;
  signUp(email: string, password: string, displayName: string): Promise<User>;
  signOut(): Promise<void>;
  getCurrentUser(): Promise<User | null>;
  resetPassword(email: string): Promise<void>;
  updateProfile(displayName: string, photoURL?: string): Promise<void>;
}