"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ChevronRight,
  Filter,
  MapPin,
  Package,
  Plus,
  Search,
  Truck,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function ShipmentsPage() {
  const [shipments, setShipments] = useState<any[]>([]);
const [loading, setLoading] = useState(true);
const [search, setSearch] = useState("");
const [statusFilter, setStatusFilter] = useState("All");

useEffect(() => {
  async function loadShipments() {
    const { data, error } = await supabase
      .from("shipments")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error loading shipments:", error);
    } else {
      setShipments(
  (data || []).map((shipment) => ({
    ...shipment,
    tracking: shipment.tracking_number,
    customer: shipment.customer_name,
    origin: `${shipment.origin_city || ""}${shipment.origin_country ? `, ${shipment.origin_country}` : ""}`,
    destination: `${shipment.destination_city || ""}${shipment.destination_country ? `, ${shipment.destination_country}` : ""}`,
    location: shipment.current_location || "Not yet available",
    date: new Date(shipment.created_at).toLocaleDateString(),
  }))
);
    }

    setLoading(false);
  }

  loadShipments();
}, []);

  const filteredShipments = shipments.filter((shipment) => {
    const searchValue = search.toLowerCase();

    const matchesSearch =
      shipment.tracking.toLowerCase().includes(searchValue) ||
      shipment.customer.toLowerCase().includes(searchValue) ||
      shipment.destination.toLowerCase().includes(searchValue);

    const matchesStatus =
      statusFilter === "All" || shipment.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <div>
            <a
              href="/admin/dashboard"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-blue-700"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </a>

            <h1 className="mt-3 text-2xl font-black text-slate-950">
              Shipments
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage and monitor all Wing Express shipments.
            </p>
          </div>

          <div className="hidden items-center gap-3 sm:flex">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-700">
              <Truck className="h-6 w-6 text-white" />
            </div>

            <div>
              <p className="font-black text-slate-950">Wing Express</p>
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-700">
                Admin Portal
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        {/* Top Actions */}
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <h2 className="text-lg font-black text-slate-950">
              All Shipments
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {filteredShipments.length} shipment
              {filteredShipments.length === 1 ? "" : "s"} displayed
            </p>
          </div>

          <a
            href="/admin/shipments/new"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800"
          >
            <Plus className="h-5 w-5" />
            Create Shipment
          </a>
        </div>

        {/* Filters */}
        <div className="mt-7 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid gap-4 md:grid-cols-[1fr_220px]">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search tracking number, customer or destination..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />
            </div>

            {/* Status */}
            <div className="relative">
              <Filter className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm font-medium outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              >
                <option value="All">All Statuses</option>
<option value="Pending">Pending</option>
<option value="Processing">Processing</option>
<option value="Awaiting Shipment">Awaiting Shipment</option>
<option value="Shipped">Shipped</option>
<option value="In Transit">In Transit</option>
<option value="Picked Up">Picked Up</option>
<option value="Out for Delivery">Out for Delivery</option>
<option value="On Hold">On Hold</option>
<option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        </div>

        {/* Shipment Table */}
        <div className="mt-7 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] text-left">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr className="text-xs font-bold uppercase tracking-wide text-slate-400">
                  <th className="px-6 py-4">Shipment</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Route</th>
                  <th className="px-6 py-4">Current Location</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Created</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredShipments.map((shipment) => (
                  <tr
                    key={shipment.tracking}
                    className="transition hover:bg-slate-50"
                  >
                    {/* Shipment */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
                          <Package className="h-5 w-5 text-blue-700" />
                        </div>

                        <div>
                          <p className="text-sm font-black text-blue-700">
                            {shipment.tracking}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            Shipment
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Customer */}
                    <td className="px-6 py-5">
                      <p className="text-sm font-bold text-slate-900">
                        {shipment.customer}
                      </p>
                    </td>

                    {/* Route */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <div>
                          <p className="text-xs font-semibold text-slate-400">
                            From
                          </p>

                          <p className="text-sm font-semibold text-slate-700">
                            {shipment.origin}
                          </p>
                        </div>

                        <ChevronRight className="h-4 w-4 shrink-0 text-slate-300" />

                        <div>
                          <p className="text-xs font-semibold text-slate-400">
                            To
                          </p>

                          <p className="text-sm font-semibold text-slate-700">
                            {shipment.destination}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Location */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 shrink-0 text-blue-600" />

                        <span className="text-sm text-slate-600">
                          {shipment.location}
                        </span>
                      </div>
                    </td>

                    {/* Status */}
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

                    {/* Date */}
                    <td className="px-6 py-5">
                      <span className="text-sm text-slate-500">
                        {shipment.date}
                      </span>
                    </td>

                    {/* Action */}
<td className="px-6 py-5">
  <Link
    href={`/admin/shipments/${shipment.tracking}`}
    className="inline-flex rounded-lg border border-slate-200 p-2 text-slate-400 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
    title="View shipment"
  >
    <ChevronRight className="h-5 w-5" />
  </Link>
</td>
                  </tr>
                ))}

                {filteredShipments.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-16 text-center">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
                        <Package className="h-6 w-6 text-slate-400" />
                      </div>

                      <h3 className="mt-4 font-bold text-slate-900">
                        No shipments found
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        Try changing your search or status filter.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom Information */}
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4">
          <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />

          <p className="text-sm leading-6 text-slate-600">
            Shipment locations and statuses will be updated from the shipment
            management system. Customers will see these updates when they
            track their package.
          </p>
        </div>
      </div>
    </main>
  );
}