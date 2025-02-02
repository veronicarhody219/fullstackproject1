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
      <div className="flex  mb-4">
        <Link href="/users/add">
          <button className="btn btn-primary">Add User</button>
        </Link>
      </div>

      <ul className="list-disc list-inside bg-gray-50 p-4 rounded-md shadow-md">
        {users.map((user) => (
          <li
            key={user.id}
            className="flex items-center justify-between py-2 border-b border-gray-200"
          >
            <div className="flex flex-1 space-x-4  items-center overflow-hidden">
              <span className="flex-grow font-medium truncate">
                {user.name}
              </span>
              <span className="flex-grow text-gray-600 truncate">
                {user.email}
              </span>
            </div>
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
