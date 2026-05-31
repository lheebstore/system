import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  BarChart3,
  Settings,
} from "lucide-react";

import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-72 bg-[#0b0b0b] border-l border-zinc-900 min-h-screen p-6 flex flex-col">

      <div className="text-center mb-10">

        <img
          src="/logo.PNG"
          alt="LHEB STORE"
          style={{
            width: "120px",
            height: "120px",
            borderRadius: "32px",
            objectFit: "cover",
            margin: "0 auto 20px",
            display: "block",
          }}
        />

        <h1 className="text-white text-2xl font-bold">
          LHEB STORE
        </h1>

      </div>

      <nav className="space-y-3 mt-8">

        <NavLink
          to="/"
          className="flex items-center gap-3 w-full bg-zinc-900 border border-zinc-800 text-white p-4 rounded-2xl"
        >
          <LayoutDashboard size={20} />
          لوحة التحكم
        </NavLink>

        <NavLink
          to="/products"
          className="flex items-center gap-3 w-full text-zinc-300 p-4 rounded-2xl hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition-all"
        >
          <Package size={20} />
          المنتجات
        </NavLink>

        <NavLink
          to="/orders"
          className="flex items-center gap-3 w-full text-zinc-300 p-4 rounded-2xl hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition-all"
        >
          <ShoppingCart size={20} />
          الطلبات
        </NavLink>

        <NavLink
          to="/reports"
          className="flex items-center gap-3 w-full text-zinc-300 p-4 rounded-2xl hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition-all"
        >
          <BarChart3 size={20} />
          التقارير
        </NavLink>

        <NavLink
          to="/settings"
          className="flex items-center gap-3 w-full text-zinc-300 p-4 rounded-2xl hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition-all"
        >
          <Settings size={20} />
          الإعدادات
        </NavLink>

      </nav>

    </aside>
  );
}