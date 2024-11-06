import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updateProfile as firebaseUpdateProfile
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { AuthRepository } from '../../core/repositories/AuthRepository';
import { User } from '../../core/entities/User';

export class FirebaseAuthRepository implements AuthRepository {
  async signIn(email: string, password: string): Promise<User> {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return User.fromFirebase(userCredential.user);
  }

  async signUp(email: string, password: string, displayName: string): Promise<User> {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await firebaseUpdateProfile(userCredential.user, { displayName });
    return User.fromFirebase(userCredential.user);
  }

  async signOut(): Promise<void> {
    await firebaseSignOut(auth);
  }

  async getCurrentUser(): Promise<User | null> {
    const user = auth.currentUser;
    return user ? User.fromFirebase(user) : null;
  }

  async resetPassword(email: string): Promise<void> {
    await sendPasswordResetEmail(auth, email);
  }

  async updateProfile(displayName: string, photoURL?: string): Promise<void> {
    const user = auth.currentUser;
    if (!user) throw new Error('No user is currently signed in');
    await firebaseUpdateProfile(user, { displayName, photoURL });
  }
}