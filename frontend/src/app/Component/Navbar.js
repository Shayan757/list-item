"use client";

import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // This will only run on the client side
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);
    }
  }, []);

  const handleLogout = () => {
    // Clear the authentication token
    localStorage.removeItem("token");

    // Update authentication status
    setIsAuthenticated(false);

    // Redirect to the home page
    router.push('/');
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          {/* Left side links */}
          <div className="flex space-x-4">
            <Link href="/" className="text-white px-3 py-2 rounded-md text-sm font-medium">
              Home
            </Link>
            <Link href="/about" className="text-white px-3 py-2 rounded-md text-sm font-medium">
              About
            </Link>
          </div>

          {isAuthenticated ? (
            <button
              type="button"
              className="text-white px-3 py-2 rounded-md text-sm font-medium"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <div className="flex space-x-4 ml-auto">
              <Link href="/register" className="text-white px-3 py-2 rounded-md text-sm font-medium">
                Register
              </Link>
              <Link href="/login" className="text-white px-3 py-2 rounded-md text-sm font-medium">
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
