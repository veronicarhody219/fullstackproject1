"use client";

import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch("http://127.0.0.1:8000/users");
      const data = await response.json();
      setUsers(data);
    }
    fetchUsers();
  }, []);

  async function deleteUser(id) {
    await fetch(`http://127.0.0.1:8000/users/${id}`, { method: "DELETE" });
    setUsers(users.filter((user) => user.id !== id));
  }

  return (
    <div>
      <button className="btn btn-primary">
        <Link href="/users/add">Add user</Link>
      </button>

      <ul className="list-disc list-inside bg-gray-50 p-4 rounded-md shadow-md">
        {users.map((user) => (
          <li
            key={user.id}
            className="flex items-center justify-between py-2 border-b border-gray-200"
          >
            <span className="font-medium">{user.name}</span>
            <span className="text-gray-600">{user.email}</span>
            <div className="space-x-2">
              <Link href={`/users/edit/${user.id}`}>
                <button className="btn btn-secondary">Edit</button>
              </Link>
              <button
                onClick={() => deleteUser(user.id)}
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
