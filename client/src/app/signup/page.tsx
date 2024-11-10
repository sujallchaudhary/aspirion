"use client";

import React, { useState, useEffect, FormEvent, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const SignUp: React.FC = () => {
  const router = useRouter();
  const [userName, setUserName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [cPassword, setCPassword] = useState<string>('');
  const [alert, setAlert] = useState<{ message: string; color: string } | null>(null);

  const showAlert = (message: string, color: string) => {
    setAlert({ message, color });
    setTimeout(() => setAlert(null), 1000);
  };

  const signup = async () => {
    if (password !== cPassword) {
      showAlert('Passwords do not match', 'red');
      return;
    }

    const request = await fetch(process.env.NEXT_PUBLIC_API_URL+'/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: userName,
        email,
        password,
      }),
    });

    const response = await request.json();

    if (response.success) {
      showAlert('Signup Successful', 'green');
      localStorage.setItem('token', response.token);
      localStorage.setItem('userData', JSON.stringify(response.data));
      setTimeout(() => {
        router.push('/dashboard');
      }, 1000);
    } else {
      showAlert('Signup Failed', 'red');
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    signup();
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      router.push('/dashboard');
    }
  }, [router]);

  return (
    <div className="h-screen flex justify-center items-center bg-gray-900">
      <div className="flex max-w-4xl w-full shadow-lg rounded-lg overflow-hidden">
        <div
          style={{ backgroundImage: 'url(https://cdn.dribbble.com/users/1620156/screenshots/5547104/media/c738d5dea60fa01fe531798e1e9293fc.gif)' }}
          className="hidden lg:block lg:w-1/2 bg-gray-900 p-8 bg-cover bg-center bg-no-repeat"
        ></div>
        <div className="w-full lg:w-1/2 p-8 bg-white">
          <h2 className="text-3xl font-bold text-black mb-4">Aspirion</h2>
          <h2 className="text-2xl font-bold text-gray-700">Sign Up</h2>
          {alert && (
            <div className={`fixed top-5 right-5 text-white px-4 py-3 rounded-lg shadow-lg z-50`} style={{ backgroundColor: alert.color }}>
              {alert.message}
            </div>
          )}
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
              <input
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-500 text-black"
                type="text"
                placeholder="Enter your username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
              <input
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-500 text-black"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
              <input
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-500 text-black"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
              <input
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-500 text-black"
                type="password"
                placeholder="Confirm your password"
                value={cPassword}
                onChange={(e) => setCPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="w-full mt-6 bg-emerald-600 text-white p-3 rounded-lg hover:bg-emerald-700 transition duration-300">
              Sign Up
            </button>
          </form>
          <p className="mt-4 text-center text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;