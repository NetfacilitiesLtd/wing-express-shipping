"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  ArrowLeft,
  Box,
  CalendarDays,
  MapPin,
  Package,
  Plus,
  Search,
  Warehouse,
} from "lucide-react";

export default function AdminStoragePage() {
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadStorageRecords = async () => {
      const { data, error } = await supabase
        .from("storage_records")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error loading storage records:", error);
      } else {
        setRecords(data || []);
      }

      setLoading(false);
    };

    loadStorageRecords();
  }, []);

  const filteredRecords = records.filter((record) => {
    const searchTerm = search.toLowerCase();

    return (
      record.tracking_number?.toLowerCase().includes(searchTerm) ||
      record.customer_name?.toLowerCase().includes(searchTerm) ||
      record.asset_name?.toLowerCase().includes(searchTerm) ||
      record.storage_location?.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto max-w-7xl p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <a
              href="/admin/dashboard"
              className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 transition hover:text-blue-900"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </a>

            <h1 className="text-3xl font-black text-slate-950">
              Storage Management
            </h1>

            <p className="mt-2 text-slate-500">
              Manage customer assets registered for secure storage.
            </p>
          </div>

          <a
            href="/admin/storage/new"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-emerald-700"
          >
            <Plus className="h-5 w-5" />
            Create Storage Record
          </a>
        </div>

        {/* Summary */}
        <div className="mb-7 grid gap-5 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                <Warehouse className="h-6 w-6 text-blue-700" />
              </div>

              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Storage Records
                </p>

                <p className="mt-1 text-3xl font-black text-slate-950">
                  {records.length}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100">
                <Box className="h-6 w-6 text-emerald-700" />
              </div>

              <div>
                <p className="text-sm font-medium text-slate-500">
                  Securely Stored Assets
                </p>

                <p className="mt-1 text-3xl font-black text-slate-950">
                  {
                    records.filter(
                      (record) => record.status === "Securely Stored"
                    ).length
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Storage Records */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col justify-between gap-4 border-b border-slate-200 p-6 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-black text-slate-950">
                All Storage Records
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                View and search registered customer assets.
              </p>
            </div>

            <div className="relative w-full sm:max-w-sm">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

              <input
                type="text"
                placeholder="Search tracking, customer or asset..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-12 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] text-left">
              <thead className="bg-slate-50">
                <tr className="text-xs font-bold uppercase tracking-wide text-slate-400">
                  <th className="px-6 py-4">Tracking Number</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Asset</th>
                  <th className="px-6 py-4">Storage Location</th>
                  <th className="px-6 py-4">Start Date</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-12 text-center text-sm text-slate-500"
                    >
                      Loading storage records...
                    </td>
                  </tr>
                ) : filteredRecords.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-12 text-center"
                    >
                      <Warehouse className="mx-auto mb-3 h-10 w-10 text-slate-300" />

                      <p className="font-semibold text-slate-700">
                        No storage records found
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        Create a storage record to see it listed here.
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredRecords.map((record) => (
                    <tr
                      key={record.id}
                      className="transition hover:bg-slate-50"
                    >
                      <td className="px-6 py-5">
                        <p className="text-sm font-bold text-blue-700">
                          <a
  href={`/admin/storage/${record.id}`}
  className="text-sm font-bold text-blue-700 hover:text-blue-900 hover:underline"
>
  {record.tracking_number}
</a>
                        </p>
                      </td>

                      <td className="px-6 py-5">
                        <p className="text-sm font-semibold text-slate-900">
                          {record.customer_name}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {record.customer_phone}
                        </p>
                      </td>

                      <td className="px-6 py-5">
                        <p className="text-sm font-semibold text-slate-900">
                          {record.asset_name}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {record.asset_category || "Uncategorized"}
                        </p>
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <MapPin className="h-4 w-4 shrink-0 text-slate-400" />
                          {record.storage_location}
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <CalendarDays className="h-4 w-4 text-slate-400" />

                          {record.storage_start_date
                            ? new Date(
                                record.storage_start_date
                              ).toLocaleDateString()
                            : "Not specified"}
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                          {record.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}