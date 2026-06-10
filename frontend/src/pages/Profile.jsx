import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        setLoading(false);
        return;
      }

      const parsedUser = JSON.parse(storedUser);

      setUser({
        ...parsedUser,
        id: parsedUser.id || "VG-2026-001",
        createdAt: parsedUser.createdAt || "June 2026",
      });

      setLoading(false);
    } catch (err) {
      setError("Failed to load profile information");
      setLoading(false);
    }
  }, []);

  if (!localStorage.getItem("user")) {
    return <Navigate to="/login" replace />;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-lg text-gray-500 animate-pulse">
          Loading Profile...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-red-500 font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-400 h-32"></div>

        {/* Profile Content */}
        <div className="px-8 pb-8">
          {/* Avatar */}
          <div className="-mt-16 flex flex-col items-center">
            <div className="w-32 h-32 rounded-full bg-white border-4 border-white shadow-lg flex items-center justify-center text-4xl font-bold text-blue-600">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <h1 className="mt-4 text-3xl font-bold text-gray-900">
              {user?.name}
            </h1>

            <p className="text-gray-500">{user?.email}</p>
          </div>

          {/* Information Cards */}
          <div className="grid md:grid-cols-2 gap-6 mt-10">
            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                User ID
              </h3>

              <p className="text-lg font-bold text-gray-800">{user?.id}</p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                Account Created
              </h3>

              <p className="text-lg font-bold text-gray-800">
                {user?.createdAt}
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                Name
              </h3>

              <p className="text-lg font-bold text-gray-800">{user?.name}</p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                Email Address
              </h3>

              <p className="text-lg font-bold text-gray-800 break-all">
                {user?.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
