"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "الصفحة الرئيسية", href: "/" },
  { label: "الدروس التعليمية", href: "/#lessons" },
  { label: "تواصل معنا", href: "/contact" },
  { label: "نبذة عن الموقع", href: "/about" }
];

export default function Navigation() {
  const pathname = usePathname();
  const [currentHash, setCurrentHash] = useState("");

  useEffect(() => {
    setCurrentHash(window.location.hash);
    const updateHash = () => setCurrentHash(window.location.hash);
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <div className="text-xl font-bold text-emerald-400">منصة تعليم البرمجة</div>
        <nav className="flex flex-wrap items-center gap-3">
          {navItems.map((item) => {
            const isActive =
              item.href === "/#lessons"
                ? pathname === "/" && currentHash === "#lessons"
                : pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-emerald-500 text-slate-950 shadow-lg"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
