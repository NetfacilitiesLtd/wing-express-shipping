"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Package, User, Warehouse, Calendar } from "lucide-react";

type StorageRecord = {
  id: string;
  tracking_number: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string | null;
  customer_address: string;
  asset_name: string;
  asset_description: string | null;
  asset_category: string | null;
  storage_start_date: string;
  expected_release_date: string | null;
  storage_location: string;
  status: string;
};

const statuses = [
  "Securely Stored",
  "Ready for Release",
  "Shipping Requested",
  "Released",
  "Shipped",
  "Delivered",
];

export default function StorageRecordDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [record, setRecord] = useState<StorageRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchRecord = async () => {
      const { data, error } = await supabase
        .from("storage_records")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error loading storage record:", error);
        setMessage("Unable to load this storage record.");
      } else if (data) {
        setRecord(data as StorageRecord);
        setNewStatus(data.status);
      }

      setLoading(false);
    };

    if (id) {
      fetchRecord();
    }
  }, [id]);

  const updateStatus = async () => {
    if (!record || !newStatus) return;

    setSaving(true);
    setMessage("");

    const { error } = await supabase
      .from("storage_records")
      .update({
        status: newStatus,
        updated_at: new Date().toISOString(),
      })
      .eq("id", record.id);

    if (error) {
      console.error("Error updating storage status:", error);
      setMessage("Failed to update status. Please try again.");
    } else {
      setRecord({ ...record, status: newStatus });
      setMessage("Storage status updated successfully.");
    }

    setSaving(false);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-100 p-8">
        <p className="text-slate-600">Loading storage record...</p>
      </main>
    );
  }

  if (!record) {
    return (
      <main className="min-h-screen bg-slate-100 p-8">
        <Link
          href="/admin/storage"
          className="flex items-center gap-2 text-blue-600"
        >
          <ArrowLeft size={18} />
          Back to Storage Management
        </Link>
        <p className="mt-6 text-red-600">
          Storage record not found.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 p-6 md:p-10">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/admin/storage"
          className="mb-6 inline-flex items-center gap-2 font-semibold text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft size={18} />
          Back to Storage Management
        </Link>

        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-slate-400">
              Tracking Number
            </p>
            <h1 className="mt-2 text-3xl font-extrabold text-blue-700">
              {record.tracking_number}
            </h1>
          </div>

          <span className="inline-flex w-fit rounded-full bg-green-100 px-4 py-2 text-sm font-bold text-green-700">
            {record.status}
          </span>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
                <User size={24} />
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                Customer Information
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-slate-400">Full Name</p>
                <p className="font-semibold text-slate-900">
                  {record.customer_name}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-400">Phone Number</p>
                <p className="font-semibold text-slate-900">
                  {record.customer_phone}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-400">Email Address</p>
                <p className="font-semibold text-slate-900">
                  {record.customer_email || "Not provided"}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-400">Customer Address</p>
                <p className="font-semibold text-slate-900">
                  {record.customer_address}
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-purple-100 p-3 text-purple-600">
                <Package size={24} />
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                Asset Information
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-slate-400">Asset Name</p>
                <p className="font-semibold text-slate-900">
                  {record.asset_name}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-400">Asset Category</p>
                <p className="font-semibold text-slate-900">
                  {record.asset_category || "Not specified"}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-400">Description</p>
                <p className="font-semibold text-slate-900">
                  {record.asset_description || "No description provided"}
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-green-100 p-3 text-green-600">
                <Warehouse size={24} />
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                Storage Information
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-slate-400">Storage Location</p>
                <p className="font-semibold text-slate-900">
                  {record.storage_location}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-400">Storage Start Date</p>
                <p className="font-semibold text-slate-900">
                  {record.storage_start_date}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-400">Expected Release Date</p>
                <p className="font-semibold text-slate-900">
                  {record.expected_release_date || "Not specified"}
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-orange-100 p-3 text-orange-600">
                <Calendar size={24} />
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                Update Storage Status
              </h2>
            </div>

            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Current Status
            </label>

            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>

            <button
              onClick={updateStatus}
              disabled={saving || newStatus === record.status}
              className="mt-4 w-full rounded-xl bg-blue-600 px-5 py-3 font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {saving ? "Updating..." : "Update Status"}
            </button>

            {message && (
              <p className="mt-4 text-sm font-medium text-slate-600">
                {message}
              </p>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}