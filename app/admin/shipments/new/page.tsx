"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Globe2,
  MapPin,
  Package,
  Phone,
  Plus,
  Send,
  Truck,
  User,
} from "lucide-react";

export default function NewShipmentPage() {
  const [trackingNumber, setTrackingNumber] = useState("");

  const [formData, setFormData] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    recipient_name: "",
    recipient_phone: "",
    recipient_email: "",
    recipient_address: "",
    origin_city: "",
    origin_country: "",
    destination_city: "",
    destination_country: "",
    package_description: "",
    package_weight: "",
    shipping_method: "Express Delivery",
    shipment_type: "Air Freight",
    estimated_delivery: "",
    status: "Pending",
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const generateTrackingNumber = () => {
  const year = new Date().getFullYear();
  const randomNumber = Math.floor(100000 + Math.random() * 900000);

  setTrackingNumber(`WEX-${year}-${randomNumber}`);
};
const handleCreateShipment = async () => {
  if (saving) return;

  setSaving(true);

  const newTrackingNumber =
    trackingNumber ||
    `WEX-${new Date().getFullYear()}-${Math.floor(
      100000 + Math.random() * 900000
    )}`;

  const { error } = await supabase.from("shipments").insert([
   {
  tracking_number: newTrackingNumber,
  customer_name: formData.customer_name,
  customer_email: formData.customer_email,
  customer_phone: formData.customer_phone,
  recipient_name: formData.recipient_name,
  recipient_phone: formData.recipient_phone,
  recipient_email: formData.recipient_email,
  recipient_address: formData.recipient_address,
  origin_city: formData.origin_city,
  origin_country: formData.origin_country,
  destination_city: formData.destination_city,
  destination_country: formData.destination_country,
  package_description: formData.package_description,
  package_weight: formData.package_weight
    ? Number(formData.package_weight)
    : null,
  shipping_method: formData.shipping_method,
  shipment_type: formData.shipment_type,
  estimated_delivery: formData.estimated_delivery || null,
  status: formData.status,
  current_location: formData.origin_city,
},
  ]);

  if (error) {
    console.error(error);
    alert("Unable to create shipment. Please try again.");
    setSaving(false);
    return;
  }

  setTrackingNumber(newTrackingNumber);
  alert(`Shipment created successfully! Tracking number: ${newTrackingNumber}`);

  setSaving(false);
};
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
              Create New Shipment
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Create a shipment and generate a unique tracking number.
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
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* Form */}
          <div className="space-y-7">
            {/* Sender */}
            <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
                    <Send className="h-5 w-5 text-blue-700" />
                  </div>

                  <div>
                    <h2 className="font-black text-slate-950">
                      Sender Information
                    </h2>
                    <p className="text-sm text-slate-500">
                      Information about the person sending the package.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-5 p-6 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Sender Full Name
                  </label>

                  <div className="relative">
                    <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                    <input
                      type="text"
                      name="customer_name"
                      placeholder="Enter sender's full name"
                      value={formData.customer_name}
onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 px-4 py-3.5 pl-12 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Phone Number
                  </label>

                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                    <input
                      type="tel"
                      name="customer_phone"
                      placeholder="Enter phone number"
                        value={formData.customer_phone}
onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 px-4 py-3.5 pl-12 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="customer_email"
                    placeholder="sender@email.com"
                    value={formData.customer_email}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3.5 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </div>
            </section>

            {/* Recipient */}
            <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100">
                    <User className="h-5 w-5 text-purple-700" />
                  </div>

                  <div>
                    <h2 className="font-black text-slate-950">
                      Recipient Information
                    </h2>
                    <p className="text-sm text-slate-500">
                      Information about the person receiving the package.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-5 p-6 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Recipient Full Name
                  </label>

                  <input
                    type="text"
                    name="recipient_name"
                    placeholder="Enter recipient's full name"
                    value={formData.recipient_name}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3.5 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    name="recipient_phone"
                    placeholder="Enter phone number"
value={formData.recipient_phone}
onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3.5 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="recipient_email"
                    placeholder="recipient@email.com"
                    value={formData.recipient_email}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3.5 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Delivery Address
                  </label>

                  <textarea
                    rows={3}
                    name="recipient_address"
                    placeholder="Enter complete delivery address"
                    value={formData.recipient_address}
                    onChange={handleChange}
                    className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3.5 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </div>
            </section>

            {/* Route */}
<section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
  <div className="border-b border-slate-200 px-6 py-5">
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
        <Globe2 className="h-5 w-5 text-emerald-700" />
      </div>

      <div>
        <h2 className="font-black text-slate-950">
          Shipping Route
        </h2>
        <p className="text-sm text-slate-500">
          Set the origin and destination of the shipment.
        </p>
      </div>
    </div>
  </div>

  <div className="grid gap-5 p-6 sm:grid-cols-2">
    {/* Origin City */}
    <div>
      <label className="mb-2 block text-sm font-bold text-slate-700">
        Origin City
      </label>

      <div className="relative">
        <MapPin className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

        <input
          type="text"
          name="origin_city"
          placeholder="Enter origin city"
          value={formData.origin_city}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-200 px-4 py-3.5 pl-12 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        />
      </div>
    </div>

    {/* Origin Country */}
    <div>
      <label className="mb-2 block text-sm font-bold text-slate-700">
        Origin Country
      </label>

      <div className="relative">
        <Globe2 className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

        <input
          type="text"
          name="origin_country"
          placeholder="Enter origin country"
          value={formData.origin_country}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-200 px-4 py-3.5 pl-12 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        />
      </div>
    </div>

    {/* Destination City */}
    <div>
      <label className="mb-2 block text-sm font-bold text-slate-700">
        Destination City
      </label>

      <div className="relative">
        <MapPin className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

        <input
          type="text"
          name="destination_city"
          placeholder="Enter destination city"
          value={formData.destination_city}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-200 px-4 py-3.5 pl-12 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        />
      </div>
    </div>

    {/* Destination Country */}
    <div>
      <label className="mb-2 block text-sm font-bold text-slate-700">
        Destination Country
      </label>

      <div className="relative">
        <Globe2 className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

        <input
          type="text"
          name="destination_country"
          placeholder="Enter destination country"
          value={formData.destination_country}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-200 px-4 py-3.5 pl-12 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        />
      </div>
    </div>
  </div>
</section>
            {/* Package */}
            <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">
                    <Package className="h-5 w-5 text-amber-700" />
                  </div>

                  <div>
                    <h2 className="font-black text-slate-950">
                      Package Details
                    </h2>
                    <p className="text-sm text-slate-500">
                      Tell us about the package being shipped.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-5 p-6 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Package Description
                  </label>

                  <input
                    type="text"
                    name="package_description"
                    placeholder="e.g. Documents, Clothing, Electronics"
                    value={formData.package_description}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3.5 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Weight
                  </label>

                  <div className="flex">
                    <input
                      type="number"
                      name="package_weight"
                      placeholder="0.00"
                      value={formData.package_weight}
                      onChange={handleChange}
                      className="min-w-0 flex-1 rounded-l-xl border border-r-0 border-slate-200 px-4 py-3.5 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    />

                    <span className="flex items-center rounded-r-xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold text-slate-500">
                      kg
                    </span>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Package Type
                  </label>

                  <select className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100">
                    <option>Standard Package</option>
                    <option>Document</option>
                    <option>Box</option>
                    <option>Fragile Package</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
  <label className="mb-2 block text-sm font-bold text-slate-700">
    Shipment Type
  </label>

  <select
    name="shipment_type"
    value={formData.shipment_type}
    onChange={handleChange}
    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
  >
    <option>Air Freight</option>
    <option>Sea Freight</option>
  </select>
</div>
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Shipping Service
                  </label>

                  <select
  name="shipping_method"
  value={formData.shipping_method}
  onChange={handleChange}
  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
>
                    <option>Express Delivery</option>
                    <option>Standard Delivery</option>
                    <option>International Priority</option>
                    <option>Economy Shipping</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Delivery */}
            <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100">
                    <CalendarDays className="h-5 w-5 text-red-700" />
                  </div>

                  <div>
                    <h2 className="font-black text-slate-950">
                      Delivery Information
                    </h2>
                    <p className="text-sm text-slate-500">
                      Set the expected delivery date and initial status.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-5 p-6 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Estimated Delivery Date
                  </label>

                  <input
                    type="date"
                    name="estimated_delivery"
                    value={formData.estimated_delivery}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3.5 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Initial Status
                  </label>

                  <select
  name="status"
  value={formData.status}
  onChange={handleChange}
  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
>
                    <option>Pending</option>
                    <option>Picked Up</option>
                    <option>In Transit</option>
                  </select>
                </div>
              </div>
            </section>
          </div>

          {/* Right Side */}
          <aside className="lg:sticky lg:top-8 lg:self-start">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100">
                  <Truck className="h-5 w-5 text-blue-700" />
                </div>

                <div>
                  <h2 className="font-black text-slate-950">
                    Shipment Summary
                  </h2>
                  <p className="text-xs text-slate-500">
                    Review before creating
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-xl bg-slate-50 p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Tracking Number
                </p>

                {trackingNumber ? (
                  <div className="mt-3 flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />

                    <p className="text-lg font-black text-blue-700">
                      {trackingNumber}
                    </p>
                  </div>
                ) : (
                  <p className="mt-3 text-sm font-medium text-slate-500">
                    Will be generated automatically
                  </p>
                )}

                <button
                  type="button"
                  onClick={generateTrackingNumber}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-blue-200 bg-white px-4 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-50"
                >
                  <Plus className="h-4 w-4" />
                  Generate Tracking Number
                </button>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <span className="text-sm text-slate-500">Status</span>
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700">
                    Processing
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <span className="text-sm text-slate-500">Origin</span>
                  <span className="text-sm font-bold text-slate-900">
                    Not set
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <span className="text-sm text-slate-500">Destination</span>
                  <span className="text-sm font-bold text-slate-900">
                    Not set
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Service</span>
                  <span className="text-sm font-bold text-slate-900">
                    Express
                  </span>
                </div>
              </div>

              <button
  type="button"
  onClick={handleCreateShipment}
  disabled={saving}
  className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3.5 font-bold text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-70"
>
                <CheckCircle2 className="h-5 w-5" />
                Create Shipment
              </button>

              <p className="mt-4 text-center text-xs leading-5 text-slate-400">
                The shipment will be assigned a unique tracking number when
                created.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}