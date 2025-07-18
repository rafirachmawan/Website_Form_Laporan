"use client";

import { useEffect, useState } from "react";

export default function TambahProjectHarian() {
  const [projects, setProjects] = useState<Record<string, string[]>>({});
  const [newProject, setNewProject] = useState("");
  const [newSubProject, setNewSubProject] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("masterProjects");
    if (saved) {
      setProjects(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("masterProjects", JSON.stringify(projects));
  }, [projects]);

  const handleAddProject = () => {
    if (!newProject) return alert("Isi nama project dulu");
    setProjects((prev) => ({
      ...prev,
      [newProject]: newSubProject ? [newSubProject] : ["None"],
    }));
    setNewProject("");
    setNewSubProject("");
  };

  const handleAddSubProject = (projectName: string) => {
    if (!newSubProject) return;
    setProjects((prev) => ({
      ...prev,
      [projectName]: [...(prev[projectName] || []), newSubProject],
    }));
    setNewSubProject("");
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-blue-700">
        ➕ Tambah Project Laporan Harian
      </h1>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Nama Project Baru"
          value={newProject}
          onChange={(e) => setNewProject(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Sub Project Pertama (opsional)"
          value={newSubProject}
          onChange={(e) => setNewSubProject(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
        <button
          onClick={handleAddProject}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Tambah Project Baru
        </button>
      </div>

      <hr className="my-6" />

      <h2 className="text-xl font-semibold mb-3">🗂 Daftar Project</h2>
      {Object.keys(projects).length === 0 ? (
        <p className="text-gray-500">Belum ada project.</p>
      ) : (
        <ul className="space-y-4">
          {Object.entries(projects).map(([key, sub]) => (
            <li key={key} className="border p-4 rounded shadow-sm bg-white">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">{key}</h3>
              </div>
              <ul className="list-disc pl-6 mt-2 text-sm text-gray-700">
                {sub.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
              <div className="mt-3 flex gap-2">
                <input
                  type="text"
                  placeholder="Tambah sub project"
                  value={newSubProject}
                  onChange={(e) => setNewSubProject(e.target.value)}
                  className="flex-1 border px-2 py-1 rounded text-sm"
                />
                <button
                  onClick={() => handleAddSubProject(key)}
                  className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                >
                  + Sub
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
