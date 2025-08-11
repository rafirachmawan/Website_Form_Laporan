"use client";

import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../utils/firebase";

import Link from "next/link";
import { HiMenu, HiOutlineX } from "react-icons/hi";
import { FaRegEdit, FaPlusCircle } from "react-icons/fa";

export default function TambahProjectHarian() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [subProjects, setSubProjects] = useState<string[]>([]);
  const [subInput, setSubInput] = useState("");
  const [saving, setSaving] = useState(false);

  const handleAddSub = () => {
    const v = subInput.trim();
    if (!v) return;
    // hindari duplikat (case-insensitive)
    const exists = subProjects.some((s) => s.toLowerCase() === v.toLowerCase());
    if (exists) {
      setSubInput("");
      return;
    }
    setSubProjects((prev) => [...prev, v]);
    setSubInput("");
  };

  const handleRemoveSub = (idx: number) => {
    setSubProjects((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectName.trim() || subProjects.length === 0) {
      alert("Harap isi nama project dan minimal satu sub project.");
      return;
    }
    try {
      setSaving(true);
      await addDoc(collection(db, "projectHarian"), {
        nama: projectName.trim(),
        subProjects,
        createdAt: serverTimestamp(),
      });
      alert("✅ Project harian berhasil ditambahkan!");
      setProjectName("");
      setSubProjects([]);
    } catch (error: any) {
      alert("❌ Gagal menyimpan: " + (error?.message ?? error));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`fixed md:relative z-50 top-0 left-0 h-full w-64 bg-white border-r shadow-md transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:flex flex-col`}
      >
        <div className="p-6 border-b flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-blue-700">
            SPARTA
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-600 md:hidden"
          >
            <HiOutlineX size={24} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <Link
            href="/harian"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-50 text-gray-700 font-medium transition"
          >
            <FaRegEdit className="text-blue-600" />
            Form Laporan Harian
          </Link>

          {/* ✅ Halaman ini */}
          <Link
            href="/tambah-project-harian"
            className="flex items-center gap-3 px-4 py-2 rounded-lg bg-yellow-100 hover:bg-yellow-50 text-gray-700 font-medium transition"
          >
            <FaPlusCircle className="text-yellow-500" />
            Tambah Project Harian
          </Link>

          <Link
            href="/mingguan"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-green-50 text-gray-700 font-medium transition"
          >
            <FaPlusCircle className="text-green-600 rotate-45" />
            Form Laporan Mingguan
          </Link>

          <Link
            href="/tambah-project-mingguan"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-yellow-50 text-gray-700 font-medium transition"
          >
            <FaPlusCircle className="text-yellow-500" />
            Tambah Project Mingguan
          </Link>

          <Link
            href="/hasil-harian"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-purple-50 text-gray-700 font-medium transition"
          >
            <FaPlusCircle className="text-purple-600 rotate-90" />
            Laporan Harian
          </Link>

          <Link
            href="/hasil-mingguan"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-indigo-50 text-gray-700 font-medium transition"
          >
            <FaPlusCircle className="text-indigo-600 rotate-90" />
            Laporan Mingguan
          </Link>
        </nav>

        <div className="p-4 text-xs text-gray-400 mt-auto">
          © {new Date().getFullYear()} AstroGroup
        </div>
      </aside>

      {/* Overlay Mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full">
        <header className="md:hidden bg-white px-4 py-4 flex items-center justify-between shadow-sm border-b">
          <h1 className="text-lg font-bold text-yellow-500">
            Tambah Project Harian
          </h1>
          <button onClick={() => setSidebarOpen(true)}>
            <HiMenu size={24} className="text-gray-600" />
          </button>
        </header>

        <main className="flex-1 overflow-y-auto bg-gray-50 px-4 py-6">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-xl mx-auto bg-white rounded-lg shadow p-6 space-y-6"
          >
            <h1 className="text-2xl font-bold text-gray-900 text-center">
              Tambah Project Harian
            </h1>

            {/* Nama Project */}
            <div>
              <label className="block font-medium mb-1 text-gray-700">
                Nama Project
              </label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Contoh: Aplikasi Gudang - 20 Juli 2025"
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>

            {/* Tambah Sub Project */}
            <div>
              <label className="block font-medium mb-1 text-gray-700">
                Sub Project
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={subInput}
                  onChange={(e) => setSubInput(e.target.value)}
                  placeholder="Contoh: Implementasi ke Gudang"
                  className="flex-1 border border-gray-300 rounded px-3 py-2"
                />
                <button
                  type="button"
                  onClick={handleAddSub}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Tambah
                </button>
              </div>

              {/* List Sub Project */}
              <ul className="mt-3 space-y-2 text-sm text-gray-800">
                {subProjects.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between bg-gray-50 border rounded px-3 py-2"
                  >
                    <span className="truncate">{item}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSub(index)}
                      className="text-red-600 hover:underline"
                    >
                      Hapus
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-yellow-500 disabled:opacity-60 text-white py-2 rounded hover:bg-yellow-600 font-semibold transition"
            >
              {saving ? "Menyimpan..." : "Simpan Project"}
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}
