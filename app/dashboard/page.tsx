"use client";

import { useEffect, useState } from "react";
import API from "../../services/api";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [scores, setScores] = useState<any[]>([]);
  const [value, setValue] = useState("");
  const [date, setDate] = useState("");
  const router = useRouter();

  const fetchScores = async () => {
    const res = await API.get("/scores");
    setScores(res.data);
  };

  const addScore = async () => {
    await API.post("/scores", { value, date });
    setValue("");
    setDate("");
    fetchScores();
  };

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  useEffect(() => {
    fetchScores();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6">
      
      {/* Header */}
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <button onClick={logout} className="bg-red-500 px-4 py-1 rounded">
          Logout
        </button>
      </div>

      {/* Add Score Card */}
      <div className="bg-white/10 p-4 rounded-xl backdrop-blur mb-6">
        <h3 className="mb-2 font-semibold">Add Score</h3>

        <input
          type="number"
          placeholder="Score"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="p-2 mr-2 rounded bg-white/20"
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="p-2 mr-2 rounded bg-white/20"
        />

        <button onClick={addScore} className="bg-white text-black px-4 py-2 rounded">
          Add
        </button>
      </div>

      {/* Scores List */}
      <div className="bg-white/10 p-4 rounded-xl backdrop-blur">
        <h3 className="mb-3 font-semibold">Your Scores</h3>

        {scores.map((s, i) => (
          <div
            key={i}
            className="flex justify-between border-b border-gray-600 py-2"
          >
            <span>{s.value}</span>
            <span>{new Date(s.date).toDateString()}</span>
          </div>
        ))}
      </div>

    </div>
  );
}