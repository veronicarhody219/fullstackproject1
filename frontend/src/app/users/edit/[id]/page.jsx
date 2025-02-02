"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditUserPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(`http://127.0.0.1:8000/users/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setName(data.name);
        setEmail(data.email);
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    }
    fetchUser();
  }, [id]);
  async function handleSubmit(e) {
    e.preventDefault();
    const userData = {
      name: name,
      email: email,
    };

    try {
      const response = await fetch(`http://127.0.0.1:8000/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.log("Error response: ", errorData);
        throw new Error("Failed to update user");
      }
      const result = await response.json();
      console.log("User updated successfully: ", result);

      router.push("/users");
    } catch (error) {
      console.error("Error updating users: ", error);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Update user
      </h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            value={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="text"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
        <button type="submit" className="btn btn-edit">
          Update user
        </button>
      </form>
    </div>
  );
}
