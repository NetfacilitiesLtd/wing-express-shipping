"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Clock3,
  LayoutDashboard,
  LogOut,
  MapPin,
  Package,
  Plus,
  Settings,
  Truck,
  Users,
} from "lucide-react";



export default function AdminDashboardPage() {
    const [shipments, setShipments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadShipments = async () => {
      const { data, error } = await supabase
        .from("shipments")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error loading shipments:", error);
      } else {
  console.log("Shipments from Supabase:", JSON.stringify(data, null, 2));
  setShipments(
  (data || []).map((shipment) => ({
    tracking: shipment.tracking_number,
    customer: shipment.customer_name,
    destination: [shipment.destination_city, shipment.destination_country]
      .filter(Boolean)
      .join(", "),
    location: shipment.current_location,
    status: shipment.status,
  }))
);
}

      setLoading(false);
    };

    loadShipments();
  }, []);

    const totalShipments = shipments.length;
  const processingShipments = shipments.filter(
    (shipment) => shipment.status === "Processing"
  ).length;
  const inTransitShipments = shipments.filter(
    (shipment) => shipment.status === "In Transit"
  ).length;
  const deliveredShipments = shipments.filter(
    (shipment) => shipment.status === "Delivered"
  ).length;
  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden w-72 shrink-0 bg-slate-950 text-white lg:flex lg:flex-col">
          <div className="border-b border-white/10 px-7 py-6">
            <a href="/" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-700">
                <Truck className="h-6 w-6 text-white" />
              </div>

              <div>
                <p className="text-lg font-black">Wing Express</p>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-300">
                  Admin Portal
                </p>
              </div>
            </a>
          </div>

          <nav className="flex-1 px-4 py-6">
            <p className="px-3 pb-3 text-[11px] font-bold uppercase tracking-widest text-slate-500">
              Main Menu
            </p>

            <div className="space-y-1">
              <a
                href="/admin/dashboard"
                className="flex items-center gap-3 rounded-xl bg-blue-700 px-4 py-3 text-sm font-semibold"
              >
                <LayoutDashboard className="h-5 w-5" />
                Dashboard
              </a>

              <a
                href="/admin/shipments"
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
              >
                <Package className="h-5 w-5" />
                Shipments
              </a>

              <a
                href="/admin/customers"
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
              >
                <Users className="h-5 w-5" />
                Customers
              </a>

              <a
                href="#"
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
              >
                <BarChart3 className="h-5 w-5" />
                Reports
              </a>
            </div>

            <p className="px-3 pb-3 pt-8 text-[11px] font-bold uppercase tracking-widest text-slate-500">
              System
            </p>

            <div className="space-y-1">
              <a
                href="#"
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
              >
                <Settings className="h-5 w-5" />
                Settings
              </a>
            </div>
          </nav>

          <div className="border-t border-white/10 p-5">
            <a
              href="/admin/login"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/5 hover:text-white"
            >
              <LogOut className="h-5 w-5" />
              Sign Out
            </a>
          </div>
        </aside>

        {/* Main Content */}
        <section className="min-w-0 flex-1">
          {/* Header */}
          <header className="border-b border-slate-200 bg-white">
            <div className="flex items-center justify-between px-6 py-5 lg:px-8">
              <div>
                <p className="text-sm font-semibold text-blue-700">
                  Admin Portal
                </p>
                <h1 className="mt-1 text-2xl font-black text-slate-950">
                  Dashboard
                </h1>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden text-right sm:block">
                  <p className="text-sm font-bold text-slate-900">
                    Administrator
                  </p>
                  <p className="text-xs text-slate-500">
                    Wing Express Logistics
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 font-black text-blue-700">
                  WE
                </div>
              </div>
            </div>
          </header>

          <div className="p-6 lg:p-8">
            {/* Welcome */}
            <div className="flex flex-col justify-between gap-5 rounded-2xl bg-gradient-to-r from-blue-950 to-blue-700 p-7 text-white shadow-lg sm:flex-row sm:items-center">
              <div>
                <p className="text-sm font-semibold text-blue-200">
                  Welcome back, Administrator
                </p>

                <h2 className="mt-2 text-2xl font-black">
                  Manage your shipments
                </h2>

                <p className="mt-2 max-w-xl text-sm leading-6 text-blue-100">
                  Create shipments, generate tracking numbers and keep
                  customers informed about their deliveries.
                </p>
              </div>

              <a
                href="/admin/shipments/new"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-50"
              >
                <Plus className="h-5 w-5" />
                Create Shipment
              </a>
            </div>

            {/* Stats */}
            <div className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100">
                    <Package className="h-5 w-5 text-blue-700" />
                  </div>

                  <span className="text-xs font-bold text-emerald-600">
                    +12%
                  </span>
                </div>

                <p className="mt-5 text-sm font-medium text-slate-500">
                  Total Shipments
                </p>

                <p className="mt-1 text-3xl font-black text-slate-950">
                  {totalShipments}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100">
                    <Clock3 className="h-5 w-5 text-amber-600" />
                  </div>

                  <span className="text-xs font-bold text-slate-400">
                    Active
                  </span>
                </div>

                <p className="mt-5 text-sm font-medium text-slate-500">
                  Processing
                </p>

                <p className="mt-1 text-3xl font-black text-slate-950">
                  {processingShipments}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100">
                    <MapPin className="h-5 w-5 text-purple-600" />
                  </div>

                  <span className="text-xs font-bold text-blue-600">
                    Active
                  </span>
                </div>

                <p className="mt-5 text-sm font-medium text-slate-500">
                  In Transit
                </p>

                <p className="mt-1 text-3xl font-black text-slate-950">
                  {inTransitShipments}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  </div>

                  <span className="text-xs font-bold text-emerald-600">
                    +8%
                  </span>
                </div>

                <p className="mt-5 text-sm font-medium text-slate-500">
                  Delivered
                </p>

                <p className="mt-1 text-3xl font-black text-slate-950">
                  {deliveredShipments}
                </p>
              </div>
            </div>

            {/* Shipments */}
            <div className="mt-7 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex flex-col justify-between gap-4 border-b border-slate-200 p-6 sm:flex-row sm:items-center">
                <div>
                  <h2 className="text-lg font-black text-slate-950">
                    Recent Shipments
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Monitor your latest shipments and their current status.
                  </p>
                </div>

                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-800"
                >
                  View All
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px] text-left">
                  <thead className="bg-slate-50">
                    <tr className="text-xs font-bold uppercase tracking-wide text-slate-400">
                      <th className="px-6 py-4">Tracking Number</th>
                      <th className="px-6 py-4">Customer</th>
                      <th className="px-6 py-4">Destination</th>
                      <th className="px-6 py-4">Location</th>
                      <th className="px-6 py-4">Status</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {shipments.map((shipment) => (
                      <tr
                        key={shipment.tracking || `${shipment.customer}-${shipment.status}`}
                        className="transition hover:bg-slate-50"
                      >
                        <td className="px-6 py-5">
                          <p className="text-sm font-bold text-blue-700">
                            {shipment.tracking}
                          </p>
                        </td>

                        <td className="px-6 py-5">
                          <p className="text-sm font-semibold text-slate-900">
                            {shipment.customer}
                          </p>
                        </td>

                        <td className="px-6 py-5">
                          <p className="text-sm text-slate-600">
                            {shipment.destination}
                          </p>
                        </td>

                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <MapPin className="h-4 w-4 text-slate-400" />
                            {shipment.location}
                          </div>
                        </td>

                        <td className="px-6 py-5">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                              shipment.status === "Delivered"
                                ? "bg-emerald-100 text-emerald-700"
                                : shipment.status === "Processing"
                                  ? "bg-amber-100 text-amber-700"
                                  : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {shipment.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}