"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Package,
  MapPin,
  Calendar,
  Warehouse,
  Truck,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function CreateStoragePage() {
  const router = useRouter();

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");

  const [assetName, setAssetName] = useState("");
  const [assetCategory, setAssetCategory] = useState("Electronics");
  const [assetDescription, setAssetDescription] = useState("");

  const [storageStartDate, setStorageStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [expectedReleaseDate, setExpectedReleaseDate] = useState("");
  const [storageLocation, setStorageLocation] = useState(
    "Manchester Secure Storage Facility"
  );

  const [loading, setLoading] = useState(false);
  const [createdTrackingNumber, setCreatedTrackingNumber] = useState("");

  const generateTrackingNumber = () => {
    const year = new Date().getFullYear();
    const randomNumber = Math.floor(100000 + Math.random() * 900000);

    return `WEX-${year}-${randomNumber}`;
  };

  const createStorageRecord = async () => {
    if (
      !customerName.trim() ||
      !customerPhone.trim() ||
      !customerAddress.trim() ||
      !assetName.trim() ||
      !storageLocation.trim()
    ) {
      alert("Please complete all required fields.");
      return;
    }

    setLoading(true);

    const trackingNumber = generateTrackingNumber();

    const { error } = await supabase.from("storage_records").insert({
      tracking_number: trackingNumber,
      customer_name: customerName.trim(),
      customer_phone: customerPhone.trim(),
      customer_email: customerEmail.trim() || null,
      customer_address: customerAddress.trim(),
      asset_name: assetName.trim(),
      asset_category: assetCategory,
      asset_description: assetDescription.trim() || null,
      storage_start_date: storageStartDate,
      expected_release_date: expectedReleaseDate || null,
      storage_location: storageLocation.trim(),
      status: "Securely Stored",
    });

    setLoading(false);

    if (error) {
      console.error("Error creating storage record:", error);
      alert("Failed to create storage record. Please try again.");
      return;
    }

    setCreatedTrackingNumber(trackingNumber);
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white px-6 py-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div>
  <a
    href="/admin/dashboard"
    className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 transition hover:text-blue-900"
  >
    <ArrowLeft className="h-4 w-4" />
    Back to Dashboard
  </a>

  <h1 className="text-3xl font-extrabold text-slate-900">
    Create Storage Record
  </h1>

  <p className="mt-2 text-slate-500">
    Register a customer's asset for secure storage.
  </p>
</div>

          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white">
              <Warehouse size={24} />
            </div>

            <div>
              <p className="font-extrabold text-slate-900">
                Wing Express Logistics
              </p>
              <p className="text-sm font-semibold text-blue-600">
                ADMIN PORTAL
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        {createdTrackingNumber ? (
          <div className="mx-auto max-w-2xl rounded-3xl border border-green-200 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
              <CheckCircle size={36} />
            </div>

            <h2 className="text-2xl font-extrabold text-slate-900">
              Storage Record Created Successfully
            </h2>

            <p className="mt-3 text-slate-500">
              The customer's asset has been registered for secure storage.
            </p>

            <div className="mt-6 rounded-2xl bg-slate-50 p-6">
              <p className="text-sm font-bold uppercase tracking-wider text-slate-400">
                Tracking Number
              </p>

              <p className="mt-2 text-3xl font-extrabold text-blue-600">
                {createdTrackingNumber}
              </p>

              <p className="mt-4 font-semibold text-green-600">
                Status: Securely Stored
              </p>
            </div>

            <button
              onClick={() => router.push("/admin/shipments")}
              className="mt-8 rounded-xl bg-blue-600 px-6 py-3 font-bold text-white transition hover:bg-blue-700"
            >
              Back to Admin Shipments
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
            {/* Form */}
            <div className="space-y-8 lg:col-span-2">
              {/* Customer Information */}
              <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-200 px-7 py-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                      <User size={24} />
                    </div>

                    <div>
                      <h2 className="text-xl font-extrabold text-slate-900">
                        Customer Information
                      </h2>
                      <p className="text-sm text-slate-500">
                        Information about the person storing the asset.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-5 p-7">
                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700">
                      Customer Full Name *
                    </label>
                    <input
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Enter customer's full name"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-bold text-slate-700">
                        Phone Number *
                      </label>
                      <input
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="Enter phone number"
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-bold text-slate-700">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        placeholder="customer@email.com"
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700">
                      Customer Address *
                    </label>
                    <textarea
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      rows={3}
                      placeholder="Enter customer's complete address"
                      className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>
                </div>
              </section>

              {/* Asset Information */}
              <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-200 px-7 py-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                      <Package size={24} />
                    </div>

                    <div>
                      <h2 className="text-xl font-extrabold text-slate-900">
                        Asset Information
                      </h2>
                      <p className="text-sm text-slate-500">
                        Details about the item being stored.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-5 p-7">
                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700">
                      Asset Name *
                    </label>
                    <input
                      value={assetName}
                      onChange={(e) => setAssetName(e.target.value)}
                      placeholder="e.g. Television, Laptop, Furniture"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700">
                      Asset Category *
                    </label>
                    <select
                      value={assetCategory}
                      onChange={(e) => setAssetCategory(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    >
                      <option>Electronics</option>
                      <option>Furniture</option>
                      <option>Documents</option>
                      <option>Personal Belongings</option>
                      <option>Household Items</option>
                      <option>Commercial Goods</option>
                      <option>Precious Items</option>
<option>Inherited Assets & Heirlooms</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700">
                      Asset Description
                    </label>
                    <textarea
                      value={assetDescription}
                      onChange={(e) => setAssetDescription(e.target.value)}
                      rows={3}
                      placeholder="Describe the asset and its condition..."
                      className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>
                </div>
              </section>

              {/* Storage Information */}
              <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-200 px-7 py-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                      <Warehouse size={24} />
                    </div>

                    <div>
                      <h2 className="text-xl font-extrabold text-slate-900">
                        Storage Information
                      </h2>
                      <p className="text-sm text-slate-500">
                        Set the storage location and dates.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-5 p-7">
                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700">
                      Storage Location *
                    </label>
                    <input
                      value={storageLocation}
                      onChange={(e) => setStorageLocation(e.target.value)}
                      placeholder="Enter storage facility location"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-bold text-slate-700">
                        Storage Start Date *
                      </label>
                      <input
                        type="date"
                        value={storageStartDate}
                        onChange={(e) => setStorageStartDate(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-bold text-slate-700">
                        Expected Release Date
                      </label>
                      <input
                        type="date"
                        value={expectedReleaseDate}
                        onChange={(e) => setExpectedReleaseDate(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                      />
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Summary */}
            <aside className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm lg:sticky lg:top-6">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                  <Truck size={24} />
                </div>

                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">
                    Storage Summary
                  </h2>
                  <p className="text-sm text-slate-500">
                    Review before creating
                  </p>
                </div>
              </div>

              <div className="rounded-xl bg-slate-50 p-5">
                <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                  Tracking Number
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Will be generated automatically
                </p>
              </div>

              <div className="mt-5 flex items-center justify-between border-b border-slate-100 py-4">
                <span className="text-sm text-slate-500">Status</span>
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                  Securely Stored
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-slate-100 py-4">
                <span className="text-sm text-slate-500">Location</span>
                <span className="max-w-[180px] text-right text-sm font-bold text-slate-900">
                  {storageLocation || "Not set"}
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-slate-100 py-4">
                <span className="text-sm text-slate-500">Asset</span>
                <span className="text-sm font-bold text-slate-900">
                  {assetName || "Not set"}
                </span>
              </div>

              <button
                onClick={createStorageRecord}
                disabled={loading}
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-4 font-extrabold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <CheckCircle size={20} />
                {loading ? "Creating Storage Record..." : "Create Storage Record"}
              </button>

              <p className="mt-4 text-center text-xs leading-5 text-slate-400">
                A unique tracking number will be assigned to this stored asset.
                Customers can use it to track their storage record.
              </p>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}