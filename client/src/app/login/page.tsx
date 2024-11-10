"use client"

import React, { useState, useEffect, useRef, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Login: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [alert, setAlert] = useState<{ message: string; color: string } | null>(null);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const showAlert = (message: string, color: string) => {
    setAlert({ message, color });
    setTimeout(() => setAlert(null), 3000);
  };

  const login = async () => {
    const request = await fetch('https://brainwaveapi.techpi.me/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
      }),
    });

    const response = await request.json();
    console.log(response);

    if (response.success) {
      showAlert('Login Successful', 'green');
      localStorage.setItem('token', response.token);
      localStorage.setItem('userData', JSON.stringify(response.data));
      setTimeout(() => {
        router.push('/dashboard');
      }, 1000);
    } else {
      showAlert('Login Failed', 'red');
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      router.push('/dashboard');
    }
  }, [router]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    login();
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-900">
      <div className="flex max-w-4xl w-full shadow-lg rounded-lg overflow-hidden">
        <div
          style={{ backgroundImage: 'url(https://cdn.dribbble.com/users/1620156/screenshots/5547104/media/c738d5dea60fa01fe531798e1e9293fc.gif)' }}
          className="hidden lg:block lg:w-1/2 bg-gray-900 p-8 bg-cover bg-center bg-no-repeat"
        ></div>
        <div className="w-full lg:w-1/2 p-8 bg-white">
          <h2 className="text-3xl font-bold text-black mb-4">Aspirion</h2>
          <h2 className="text-2xl font-bold text-gray-700">Login</h2>
          {alert && <div className={`text-white p-3 mb-4 bg-${alert.color}-600`}>{alert.message}</div>}
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
              <input
                ref={emailRef}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-500 text-black"
                type="email"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
              <input
                ref={passwordRef}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-500 text-black"
                type="password"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <Link href="/forgotPassword" className="text-sm text-gray-600 hover:underline">
                Forgot Password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full mt-6 bg-emerald-600 text-white p-3 rounded-lg hover:bg-emerald-700 transition duration-300"
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-center text-gray-600">
            Don't have an account?{' '}
            <Link href="/signup" className="text-emerald-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;