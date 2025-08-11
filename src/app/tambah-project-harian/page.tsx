"use client";

import { useEffect, useMemo, useState } from "react";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../utils/firebase";

import Link from "next/link";
import { HiMenu, HiOutlineX } from "react-icons/hi";
import { FaRegEdit, FaPlusCircle, FaTrash } from "react-icons/fa";

type ProjectDoc = {
  id: string;
  nama: string;
  subProjects: string[];
  createdAt?: any;
};

export default function TambahProjectHarian() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Form tambah
  const [projectName, setProjectName] = useState("");
  const [subProjects, setSubProjects] = useState<string[]>([]);
  const [subInput, setSubInput] = useState("");
  const [saving, setSaving] = useState(false);

  // Daftar project (realtime)
  const [projects, setProjects] = useState<ProjectDoc[]>([]);
  const [loadingList, setLoadingList] = useState(true);

  // Edit state per project
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [editProjectName, setEditProjectName] = useState("");

  // Edit sub per project
  const [editingSubs, setEditingSubs] = useState<
    Record<string, { index: number; value: string } | null>
  >({});

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "projectHarian"), (snap) => {
      const rows: ProjectDoc[] = [];
      snap.forEach((d) => {
        const data = d.data() as any;
        rows.push({
          id: d.id,
          nama: data?.nama ?? "",
          subProjects: Array.isArray(data?.subProjects) ? data.subProjects : [],
          createdAt: data?.createdAt,
        });
      });
      rows.sort((a, b) => a.nama.localeCompare(b.nama));
      setProjects(rows);
      setLoadingList(false);
    });
    return () => unsub();
  }, []);

  const handleAddSub = () => {
    const v = subInput.trim();
    if (!v) return;
    const exists = subProjects.some((s) => s.toLowerCase() === v.toLowerCase());
    if (exists) {
      setSubInput("");
      return;
    }
    setSubProjects((prev) => [...prev, v]);
    setSubInput("");
  };

  const handleRemoveSubLocal = (idx: number) => {
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
      setSubInput("");
    } catch (error: any) {
      alert("❌ Gagal menyimpan: " + (error?.message ?? error));
    } finally {
      setSaving(false);
    }
  };

  // ---------- Aksi pada daftar ----------

  const startEditProject = (p: ProjectDoc) => {
    setEditingProjectId(p.id);
    setEditProjectName(p.nama);
  };

  const cancelEditProject = () => {
    setEditingProjectId(null);
    setEditProjectName("");
  };

  const saveEditProject = async (id: string) => {
    const name = editProjectName.trim();
    if (!name) return;
    try {
      await updateDoc(doc(db, "projectHarian", id), { nama: name });
      cancelEditProject();
    } catch (e: any) {
      alert("Gagal update nama project: " + (e?.message ?? e));
    }
  };

  const deleteProject = async (id: string) => {
    if (!confirm("Hapus project beserta semua sub-nya?")) return;
    try {
      await deleteDoc(doc(db, "projectHarian", id));
    } catch (e: any) {
      alert("Gagal menghapus project: " + (e?.message ?? e));
    }
  };

  const addSubToProject = async (id: string, value: string) => {
    const v = value.trim();
    if (!v) return;
    const target = projects.find((x) => x.id === id);
    if (!target) return;
    const exists = target.subProjects.some(
      (s) => s.toLowerCase() === v.toLowerCase()
    );
    if (exists) {
      alert("Sub project sudah ada.");
      return;
    }
    try {
      const newSubs = [...target.subProjects, v];
      await updateDoc(doc(db, "projectHarian", id), { subProjects: newSubs });
    } catch (e: any) {
      alert("Gagal menambah sub: " + (e?.message ?? e));
    }
  };

  const removeSubFromProject = async (id: string, index: number) => {
    const target = projects.find((x) => x.id === id);
    if (!target) return;
    const sub = target.subProjects[index];
    if (sub == null) return;
    if (!confirm(`Hapus sub "${sub}" ?`)) return;
    try {
      const newSubs = target.subProjects.filter((_, i) => i !== index);
      await updateDoc(doc(db, "projectHarian", id), { subProjects: newSubs });
    } catch (e: any) {
      alert("Gagal menghapus sub: " + (e?.message ?? e));
    }
  };

  const startEditSub = (projectId: string, index: number, value: string) => {
    setEditingSubs((prev) => ({ ...prev, [projectId]: { index, value } }));
  };

  const cancelEditSub = (projectId: string) => {
    setEditingSubs((prev) => ({ ...prev, [projectId]: null }));
  };

  const saveEditSub = async (projectId: string) => {
    const entry = editingSubs[projectId];
    if (!entry) return;
    const v = entry.value.trim();
    if (!v) return;

    const target = projects.find((x) => x.id === projectId);
    if (!target) return;

    const duplicate = target.subProjects.some(
      (s, i) => i !== entry.index && s.toLowerCase() === v.toLowerCase()
    );
    if (duplicate) {
      alert("Sub project sudah ada.");
      return;
    }

    try {
      const newSubs = [...target.subProjects];
      newSubs[entry.index] = v;
      await updateDoc(doc(db, "projectHarian", projectId), {
        subProjects: newSubs,
      });
      cancelEditSub(projectId);
    } catch (e: any) {
      alert("Gagal menyimpan edit sub: " + (e?.message ?? e));
    }
  };

  // input cepat tambah sub
  const [quickSubInputs, setQuickSubInputs] = useState<Record<string, string>>(
    {}
  );
  const setQuickSub = (projectId: string, v: string) =>
    setQuickSubInputs((prev) => ({ ...prev, [projectId]: v }));

  const handleQuickAdd = (projectId: string) => {
    const v = (quickSubInputs[projectId] || "").trim();
    if (!v) return;
    addSubToProject(projectId, v);
    setQuickSub(projectId, "");
  };

  const emptyState = useMemo(
    () => !loadingList && projects.length === 0,
    [loadingList, projects.length]
  );

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
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-50 text-gray-800 font-medium transition"
          >
            <FaRegEdit className="text-blue-600" />
            Form Laporan Harian
          </Link>

          {/* Halaman ini */}
          <Link
            href="/tambah-project-harian"
            className="flex items-center gap-3 px-4 py-2 rounded-lg bg-yellow-100 hover:bg-yellow-50 text-gray-800 font-medium transition"
          >
            <FaPlusCircle className="text-yellow-500" />
            Tambah Project Harian
          </Link>

          <Link
            href="/mingguan"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-green-50 text-gray-800 font-medium transition"
          >
            <FaPlusCircle className="text-green-600 rotate-45" />
            Form Laporan Mingguan
          </Link>

          <Link
            href="/tambah-project-mingguan"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-yellow-50 text-gray-800 font-medium transition"
          >
            <FaPlusCircle className="text-yellow-500" />
            Tambah Project Mingguan
          </Link>

          <Link
            href="/hasil-harian"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-purple-50 text-gray-800 font-medium transition"
          >
            <FaPlusCircle className="text-purple-600 rotate-90" />
            Laporan Harian
          </Link>

          <Link
            href="/hasil-mingguan"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-indigo-50 text-gray-800 font-medium transition"
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
        {/* Header mobile */}
        <header className="md:hidden bg-white px-4 py-4 flex items-center justify-between shadow-sm border-b">
          <h1 className="text-lg font-bold text-gray-900">
            Tambah Project Harian
          </h1>
          <button onClick={() => setSidebarOpen(true)}>
            <HiMenu size={24} className="text-gray-700" />
          </button>
        </header>

        <main className="flex-1 overflow-y-auto bg-gray-50 px-4 py-6">
          {/* Form Tambah */}
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-xl mx-auto bg-white rounded-lg shadow p-6 space-y-6"
          >
            <h1 className="text-2xl font-bold text-gray-900 text-center">
              Tambah Project Harian
            </h1>

            {/* Nama Project */}
            <div>
              <label className="block font-medium mb-1 text-gray-900">
                Nama Project
              </label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Contoh: Aplikasi Gudang - 20 Juli 2025"
                className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900"
                required
              />
            </div>

            {/* Tambah Sub Project (baru) */}
            <div>
              <label className="block font-medium mb-1 text-gray-900">
                Sub Project
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={subInput}
                  onChange={(e) => setSubInput(e.target.value)}
                  placeholder="Contoh: Implementasi ke Gudang"
                  className="flex-1 border border-gray-300 rounded px-3 py-2 text-gray-900"
                />
                <button
                  type="button"
                  onClick={handleAddSub}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Tambah
                </button>
              </div>

              {/* List Sub Project (baru, sebelum simpan) */}
              <ul className="mt-3 space-y-2 text-sm text-gray-900">
                {subProjects.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between bg-gray-50 border rounded px-3 py-2"
                  >
                    <span className="truncate">{item}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSubLocal(index)}
                      className="text-red-600 hover:underline"
                    >
                      Hapus
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tombol Simpan → biru */}
            <button
              type="submit"
              disabled={saving}
              className="w-full bg-blue-600 disabled:opacity-60 text-white py-2 rounded hover:bg-blue-700 font-semibold transition"
            >
              {saving ? "Menyimpan..." : "Simpan Project"}
            </button>
          </form>

          {/* Daftar Project yang sudah ada */}
          <section className="w-full max-w-3xl mx-auto mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              🗂 Daftar Project
            </h2>

            {loadingList && (
              <div className="text-gray-700 text-sm">
                Memuat data project...
              </div>
            )}

            {emptyState && (
              <div className="text-gray-700 text-sm">Belum ada project.</div>
            )}

            <ul className="space-y-4">
              {projects.map((p) => {
                const subEdit = editingSubs[p.id] ?? null;
                const quickValue = quickSubInputs[p.id] ?? "";

                return (
                  <li
                    key={p.id}
                    className="bg-white border rounded shadow-sm p-4"
                  >
                    {/* Header Project (nama + aksi) */}
                    <div className="flex items-center justify-between gap-3">
                      {editingProjectId === p.id ? (
                        <div className="flex-1 flex items-center gap-2">
                          <input
                            value={editProjectName}
                            onChange={(e) => setEditProjectName(e.target.value)}
                            className="flex-1 border rounded px-3 py-2 text-gray-900"
                          />
                          <button
                            onClick={() => saveEditProject(p.id)}
                            className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                          >
                            Simpan
                          </button>
                          <button
                            onClick={cancelEditProject}
                            className="px-3 py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200"
                          >
                            Batal
                          </button>
                        </div>
                      ) : (
                        <>
                          <h3 className="font-semibold text-lg truncate text-gray-900">
                            {p.nama}
                          </h3>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => startEditProject(p)}
                              className="px-3 py-2 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200"
                              title="Edit Nama Project"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => deleteProject(p.id)}
                              className="px-3 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200"
                              title="Hapus Project"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </>
                      )}
                    </div>

                    {/* List Sub */}
                    <ul className="list-disc pl-6 mt-3 text-sm text-gray-900 space-y-2">
                      {p.subProjects.map((s, i) => (
                        <li
                          key={i}
                          className="flex items-center justify-between gap-3"
                        >
                          {subEdit && subEdit.index === i ? (
                            <div className="flex-1 flex items-center gap-2">
                              <input
                                value={subEdit.value}
                                onChange={(e) =>
                                  setEditingSubs((prev) => ({
                                    ...prev,
                                    [p.id]: { index: i, value: e.target.value },
                                  }))
                                }
                                className="flex-1 border rounded px-2 py-1 text-gray-900"
                              />
                              <button
                                onClick={() => saveEditSub(p.id)}
                                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs"
                              >
                                Simpan
                              </button>
                              <button
                                onClick={() => cancelEditSub(p.id)}
                                className="px-3 py-1 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 text-xs"
                              >
                                Batal
                              </button>
                            </div>
                          ) : (
                            <>
                              <span className="flex-1 truncate">{s}</span>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => startEditSub(p.id, i, s)}
                                  className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 text-xs"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => removeSubFromProject(p.id, i)}
                                  className="px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-xs"
                                >
                                  Hapus
                                </button>
                              </div>
                            </>
                          )}
                        </li>
                      ))}
                    </ul>

                    {/* Quick add sub */}
                    <div className="mt-3 flex gap-2">
                      <input
                        type="text"
                        value={quickValue}
                        onChange={(e) => setQuickSub(p.id, e.target.value)}
                        placeholder="Tambah sub project..."
                        className="flex-1 border px-2 py-2 rounded text-sm text-gray-900"
                      />
                      <button
                        onClick={() => handleQuickAdd(p.id)}
                        className="bg-green-600 text-white px-3 py-2 rounded text-sm hover:bg-green-700"
                      >
                        + Sub
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
}
