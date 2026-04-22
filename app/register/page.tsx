"use client";

import { useState } from "react";
import API from "../../services/api";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleRegister = async () => {
    try {
      await API.post("/auth/register", data);
      alert("Registered successfully");
      router.push("/login");
    } catch (err: any) {
      alert(err?.response?.data?.msg || "Error");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-black">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-80 text-white">
        <h2 className="text-3xl font-bold mb-6 text-center">Create Account</h2>

        <input
          placeholder="Name"
          className="w-full p-2 mb-3 rounded bg-white/20 outline-none"
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />

        <input
          placeholder="Email"
          className="w-full p-2 mb-3 rounded bg-white/20 outline-none"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 rounded bg-white/20 outline-none"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />

        <button
          onClick={handleRegister}
          className="w-full bg-white text-black p-2 rounded font-semibold"
        >
          Register
        </button>

        <p className="text-sm mt-4 text-center">
          Already have account?{" "}
          <span
            className="underline cursor-pointer"
            onClick={() => router.push("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}