"use client";

import UsersPage from "./users/page";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-grow flex flex-col items-center justify-center space-y-4">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome to User Management
        </h1>
        <p className="text-gray-600">
          Manage your users easily and effectively.
        </p>
        <Link
          href="/users"
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          View users
        </Link>
      </main>
    </div>
  );
}
