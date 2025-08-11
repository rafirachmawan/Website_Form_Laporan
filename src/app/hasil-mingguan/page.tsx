"use client";

import { useEffect, useState } from "react";
import {
  FaRegEdit,
  FaClipboardList,
  FaCalendarAlt,
  FaPlusCircle,
} from "react-icons/fa";
import Link from "next/link";
import { HiMenu, HiOutlineX } from "react-icons/hi";

interface LaporanMingguanData {
  tanggal: string;
  nama: string;
  deadline: string;
  pic: string;
  cpic: string;
  project: string;
  sub: string;
  status: string;
  progress: string;
  pencapaian: string;
  tantanganSolusi: string;
  rencanaMingguDepan: string;
  kebutuhanResource: string;
  kesimpulan: string;
}

export default function LaporanMingguanPage() {
  const [dataList, setDataList] = useState<LaporanMingguanData[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://script.google.com/macros/s/AKfycbw9y4SRgvGgAmPutOK5IviDYCYFu6lj415KzL9uCho-pe4a9MdDzlN1dmjmhdUGM5od/exec"
        );
        const data = await res.json();
        setDataList(data);
      } catch (err) {
        console.error("Gagal mengambil data:", err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

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
            <FaRegEdit className="text-blue-600" /> Form Laporan Harian
          </Link>

          {/* ✅ Tambah Project Harian */}
          <Link
            href="/tambah-project-harian"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-yellow-50 text-gray-700 font-medium transition"
          >
            <FaPlusCircle className="text-yellow-500" /> Tambah Project Harian
          </Link>

          <Link
            href="/mingguan"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-green-50 text-gray-700 font-medium transition"
          >
            <FaCalendarAlt className="text-green-600" /> Form Laporan Mingguan
          </Link>

          {/* ✅ Tambah Project Mingguan */}
          <Link
            href="/tambah-project-mingguan"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-yellow-50 text-gray-700 font-medium transition"
          >
            <FaPlusCircle className="text-yellow-500" /> Tambah Project Mingguan
          </Link>

          <Link
            href="/hasil-harian"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-50 text-gray-700 font-medium transition"
          >
            <FaClipboardList className="text-purple-600" /> Laporan Harian
          </Link>
          <Link
            href="/hasil-mingguan"
            className="flex items-center gap-3 px-4 py-2 rounded-lg bg-blue-100 hover:bg-blue-50 text-gray-700 font-medium transition"
          >
            <FaClipboardList className="text-indigo-600" /> Laporan Mingguan
          </Link>
        </nav>
        <div className="p-4 text-xs text-gray-400 mt-auto">
          © {new Date().getFullYear()} AstroGroup
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-x-auto">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Laporan Mingguan
        </h1>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 text-sm">
            <thead>
              <tr className="bg-blue-100 text-gray-700 text-left">
                <th className="px-4 py-2 border">No</th>
                <th className="px-4 py-2 border">Tanggal</th>
                <th className="px-4 py-2 border">Nama</th>
                <th className="px-4 py-2 border">Deadline</th>
                <th className="px-4 py-2 border">P-PIC</th>
                <th className="px-4 py-2 border">C-PIC</th>
                <th className="px-4 py-2 border">Project</th>
                <th className="px-4 py-2 border">Sub Project</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Progress</th>
                <th className="px-4 py-2 border">Pencapaian</th>
                <th className="px-4 py-2 border">Tantangan & Solusi</th>
                <th className="px-4 py-2 border">Rencana Minggu Depan</th>
                <th className="px-4 py-2 border">Resource</th>
                <th className="px-4 py-2 border">Kesimpulan</th>
              </tr>
            </thead>
            <tbody>
              {dataList.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 text-gray-800">
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">{item.tanggal}</td>
                  <td className="px-4 py-2 border">{item.nama}</td>
                  <td className="px-4 py-2 border">{item.deadline}</td>
                  <td className="px-4 py-2 border">{item.pic}</td>
                  <td className="px-4 py-2 border">{item.cpic}</td>
                  <td className="px-4 py-2 border">{item.project}</td>
                  <td className="px-4 py-2 border">{item.sub}</td>
                  <td className="px-4 py-2 border">{item.status}</td>
                  <td className="px-4 py-2 border">{item.progress}</td>
                  <td className="px-4 py-2 border">{item.pencapaian}</td>
                  <td className="px-4 py-2 border">{item.tantanganSolusi}</td>
                  <td className="px-4 py-2 border">
                    {item.rencanaMingguDepan}
                  </td>
                  <td className="px-4 py-2 border">{item.kebutuhanResource}</td>
                  <td className="px-4 py-2 border">{item.kesimpulan}</td>
                </tr>
              ))}
              {dataList.length === 0 && (
                <tr>
                  <td
                    colSpan={15}
                    className="text-center text-gray-500 py-4 border"
                  >
                    Tidak ada data.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
