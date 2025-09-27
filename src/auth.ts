import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from 'firebase/auth';
import { auth } from '@/firebase';

/**
 * Register a new user
 */
export async function registerUser(
  email: string,
  password: string
): Promise<UserCredential> {
  return createUserWithEmailAndPassword(auth, email, password);
}

/**
 * Login existing user
 */
export async function loginUser(
  email: string,
  password: string
): Promise<UserCredential> {
  return signInWithEmailAndPassword(auth, email, password);
}

/**
 * Logout current user
 */
export async function logoutUser(): Promise<void> {
  return signOut(auth);
}