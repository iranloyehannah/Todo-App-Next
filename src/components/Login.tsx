'use client';

import { useState,useEffect } from 'react';
import { loginUser, registerUser, logoutUser } from '@/auth';
import { useAuth } from '@/components/AuthProvider';
import { User } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function Login() {
  const { user } = useAuth() as { user: User | null };
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); 

useEffect(() => {
    if (user) {
      router.push('/todo-list'); 
    }
  }, [user, router]);

  const handleLogin = async () => {
    try {
      await loginUser(email, password);
      router.push('/todo-list'); 
    } catch (error: unknown) {
      alert(error instanceof Error ? error.message : 'An unknown error occurred');
    }
  };

  const handleRegister = async () => {
    try {
      await registerUser(email, password);
      router.push('/todo-list'); 
    } catch (error: unknown) {
      alert(error instanceof Error ? error.message : 'An unknown error occurred');
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      router.push('/login'); 
    } catch (error: unknown) {
      alert(error instanceof Error ? error.message : 'An unknown error occurred');
    }
  };

  return (
    <div className="flex flex-col items-center mt-20 space-y-4">
      {user ? (
        <>
          <p>Welcome, {user.email}</p>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded w-64"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-2 rounded w-64"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex gap-2">
            <button
              onClick={handleLogin}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Login
            </button>
            <button
              onClick={handleRegister}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Register
            </button>
          </div>
        </>
      )}
    </div>
  );
}