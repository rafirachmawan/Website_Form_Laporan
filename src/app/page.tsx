"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { HiMenu, HiOutlineX, HiOutlineHome } from "react-icons/hi";
import {
  FaRegEdit,
  FaClipboardList,
  FaCalendarAlt,
  FaPlusCircle,
} from "react-icons/fa";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navLinkClass = (href: string, color: string = "blue") =>
    `flex items-center gap-3 px-4 py-2 rounded-lg transition font-medium ${
      pathname === href
        ? `bg-${color}-100 text-${color}-700`
        : `hover:bg-${color}-50 text-gray-700`
    }`;

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden relative">
      {/* Button Mobile */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="absolute top-4 left-4 z-50 md:hidden bg-white p-2 rounded-full shadow-md"
      >
        <HiMenu size={24} />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:relative z-50 top-0 left-0 h-full w-64 bg-white border-r shadow-md transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:flex flex-col`}
      >
        {/* Header */}
        <div className="p-6 border-b sticky top-0 bg-white z-10 flex items-center justify-between">
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

        {/* Menu */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <Link href="/harian" className={navLinkClass("/harian", "blue")}>
            <FaRegEdit className="text-blue-600" />
            Form Laporan Harian
          </Link>

          <Link
            href="/tambah-project-harian"
            className={navLinkClass("/tambah-project-harian", "yellow")}
          >
            <FaPlusCircle className="text-yellow-500" />
            Tambah Project Harian
          </Link>

          <Link href="/mingguan" className={navLinkClass("/mingguan", "green")}>
            <FaCalendarAlt className="text-green-600" />
            Form Laporan Mingguan
          </Link>

          <Link
            href="/tambah-project-mingguan"
            className={navLinkClass("/tambah-project-mingguan", "yellow")}
          >
            <FaPlusCircle className="text-yellow-500" />
            Tambah Project Mingguan
          </Link>

          <Link
            href="/hasil-harian"
            className={navLinkClass("/hasil-harian", "purple")}
          >
            <FaClipboardList className="text-purple-600" />
            Laporan Harian
          </Link>

          <Link
            href="/hasil-mingguan"
            className={navLinkClass("/hasil-mingguan", "indigo")}
          >
            <FaClipboardList className="text-indigo-600" />
            Laporan Mingguan
          </Link>
        </nav>

        {/* Footer */}
        <div className="p-4 text-xs text-gray-400 mt-auto sticky bottom-0 bg-white">
          © {new Date().getFullYear()} AstroGroup
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Konten Utama */}
      <div
        className={`flex-1 flex items-center justify-center bg-gray-50 transition-all duration-300 ${
          sidebarOpen ? "md:ml-64" : ""
        }`}
      >
        <div className="text-center px-6">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            Selamat Datang!
          </h2>
          <p className="text-gray-600 leading-relaxed max-w-md mx-auto">
            Pilih form atau laporan dari menu di samping. Sistem ini dibuat
            untuk mempermudah pengisian dan pelacakan laporan harian dan
            mingguan di lingkungan kerja Anda.
          </p>
        </div>
      </div>
    </div>
  );
}
