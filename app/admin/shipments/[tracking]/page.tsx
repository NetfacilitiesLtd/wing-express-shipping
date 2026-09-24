"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  MapPin,
  Package,
  Save,
Trash2,
Truck,
User,
} from "lucide-react";
import { supabase } from "@/lib/supabase";




export default function ShipmentDetailsPage() {
  const params = useParams();
  const trackingNumber = decodeURIComponent(params.tracking as string);

  const [shipmentData, setShipmentData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("In Transit");
  const [note, setNote] = useState("");
  const [updates, setUpdates] = useState<any[]>([]);
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    const loadShipment = async () => {
      const { data, error } = await supabase
        .from("shipments")
        .select("*")
        .eq("tracking_number", trackingNumber)
        .single();

      if (error) {
        console.error("Error loading shipment:", error);
      } else {
        setShipmentData(data);
        setStatus(data.status || "Processing");
          const { data: trackingData, error: trackingError } = await supabase
    .from("tracking_events")
    .select("*")
    .eq("shipment_id", data.id)
    .order("event_time", { ascending: false });

  if (trackingError) {
    console.error("Error loading tracking history:", trackingError);
  } else {
    setUpdates(trackingData || []);
  }
      }

      setLoading(false);
    };

    loadShipment();
  }, [trackingNumber]);
  if (loading) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100">
      <p className="text-sm font-semibold text-slate-500">
        Loading shipment...
      </p>
    </main>
  );
}

if (!shipmentData) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100">
      <p className="text-sm font-semibold text-red-600">
        Shipment not found.
      </p>
    </main>
  );
}
  const addTrackingUpdate = async () => {
  if (!location.trim()) return;

  const { error: eventError } = await supabase
    .from("tracking_events")
    .insert({
      shipment_id: shipmentData.id,
      location: location.trim(),
      status,
      description:
        note.trim() || "Shipment tracking information updated.",
    });

  if (eventError) {
    console.error("Error saving tracking update:", eventError);
    alert("Failed to save the tracking update. Please try again.");
    return;
  }

  console.log("Updating shipment:", {
  shipmentId: shipmentData.id,
  location: location.trim(),
  status,
});
  const { error: shipmentError } = await supabase
    .from("shipments")
    .update({
      current_location: location.trim(),
      status,
    })
    .eq("id", shipmentData.id);

  if (shipmentError) {
    console.error("Error updating shipment:", shipmentError);
    alert("Tracking update was saved, but the shipment status could not be updated.");
    return;
  }

  const newUpdate = {
    location: location.trim(),
    status,
    date: new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    time: new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    }),
    note: note.trim() || "Shipment tracking information updated.",
  };

  setUpdates([newUpdate, ...updates]);
  setShipmentData({
    ...shipmentData,
    current_location: location.trim(),
    status,
  });

  setLocation("");
  setNote("");
  setSaved(true);

  setTimeout(() => {
    setSaved(false);
  }, 3000);
};
  const deleteShipment = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete shipment ${shipmentData.tracking_number}? This action cannot be undone.`
    );

    if (!confirmed) return;

    const { error: trackingError } = await supabase
      .from("tracking_events")
      .delete()
      .eq("shipment_id", shipmentData.id);

    if (trackingError) {
      console.error("Error deleting tracking history:", trackingError);
      alert("Failed to delete the shipment tracking history.");
      return;
    }

    const { error: shipmentError } = await supabase
      .from("shipments")
      .delete()
      .eq("id", shipmentData.id);

    if (shipmentError) {
      console.error("Error deleting shipment:", shipmentError);
      alert("Failed to delete the shipment.");
      return;
    }

    window.location.href = "/admin/shipments";
  };
  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <div>
            <a
              href="/admin/shipments"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-blue-700"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Shipments
            </a>

            <h1 className="mt-3 text-2xl font-black text-slate-950">
              Shipment Details
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage tracking information and shipment status.
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
        {/* Shipment Header Card */}
        <section className="rounded-2xl bg-gradient-to-r from-blue-950 to-blue-700 p-6 text-white shadow-xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                <Package className="h-7 w-7" />
              </div>

              <div>
                <p className="text-sm font-medium text-blue-200">
                  Tracking Number
                </p>

                <h2 className="mt-1 text-2xl font-black tracking-wide">
                  {shipmentData.tracking_number}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-3">
  <div className="rounded-full bg-blue-500/30 px-4 py-2 text-sm font-bold">
    {updates[0]?.status || "Processing"}
  </div>

  <button
    type="button"
    onClick={deleteShipment}
    className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-red-700"
  >
    <Trash2 className="h-4 w-4" />
    Delete Shipment
  </button>
</div>
          </div>
        </section>

        <div className="mt-7 grid gap-7 lg:grid-cols-[1.4fr_0.8fr]">
          {/* Left Column */}
          <div className="space-y-7">
            {/* Customer Information */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
                  <User className="h-5 w-5 text-blue-700" />
                </div>

                <div>
                  <h3 className="font-black text-slate-950">
                    Customer Information
                  </h3>

                  <p className="text-sm text-slate-500">
                    Shipment customer details
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                    Customer Name
                  </p>

                  <p className="mt-1 font-semibold text-slate-900">
                    {shipmentData.customer_name}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                    Phone
                  </p>

                  <p className="mt-1 font-semibold text-slate-900">
                    {shipmentData.customer_phone}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                    Email
                  </p>

                  <p className="mt-1 font-semibold text-slate-900">
                    {shipmentData.customer_email}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                    Shipment Created
                  </p>

                  <p className="mt-1 font-semibold text-slate-900">
                    {new Date(shipmentData.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </section>

            {/* Shipment Information */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
                  <Truck className="h-5 w-5 text-blue-700" />
                </div>

                <div>
                  <h3 className="font-black text-slate-950">
                    Shipment Information
                  </h3>

                  <p className="text-sm text-slate-500">
                    Package route and details
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                    Origin
                  </p>

                  <p className="mt-1 font-semibold text-slate-900">
                    {shipmentData.origin}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                    Destination
                  </p>

                  <p className="mt-1 font-semibold text-slate-900">
                    {[shipmentData.destination_city, shipmentData.destination_country]
  .filter(Boolean)
  .join(", ")}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                    Package Type
                  </p>

                  <p className="mt-1 font-semibold text-slate-900">
                    {shipmentData.package_description}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                    Weight
                  </p>

                  <p className="mt-1 font-semibold text-slate-900">
                    {shipmentData.package_weight ? `${shipmentData.package_weight} kg` : "Not provided"}
                  </p>
                </div>
              </div>
              <div>
  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
    Shipment Type
  </p>

  <p className="mt-1 font-semibold text-slate-900">
    {shipmentData.shipment_type || "Air Freight"}
  </p>
</div>
            </section>

            {/* Tracking History */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-black text-slate-950">
                    Tracking History
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Updates visible to the customer
                  </p>
                </div>

                <Clock3 className="h-5 w-5 text-slate-400" />
              </div>

              <div className="mt-7">
                {updates.map((update, index) => (
                  <div
                    key={`${update.date}-${update.time}-${index}`}
                    className="relative flex gap-4 pb-7 last:pb-0"
                  >
                    {index !== updates.length - 1 && (
                      <div className="absolute left-[11px] top-7 h-full w-px bg-slate-200" />
                    )}

                    <div className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100">
                      <div className="h-2.5 w-2.5 rounded-full bg-blue-700" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col justify-between gap-1 sm:flex-row">
                        <div>
                          <p className="font-bold text-slate-900">
                            {update.location}
                          </p>

                          <p className="mt-1 text-sm font-medium text-blue-700">
                            {update.status}
                          </p>
                        </div>

                        <div className="text-left sm:text-right">
                          <p className="text-xs font-semibold text-slate-500">
                            {update.date}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            {update.time}
                          </p>
                        </div>
                      </div>

                      <p className="mt-2 text-sm leading-6 text-slate-500">
                        {update.note}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div>
            {/* Update Tracking */}
            <section className="sticky top-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div>
                <h3 className="text-lg font-black text-slate-950">
                  Update Tracking
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Add a new location and status update for this shipment.
                </p>
              </div>

              <div className="mt-6 space-y-5">
                {/* Location */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Current Location
                  </label>

                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                    <input
                      type="text"
                      value={location}
                      onChange={(event) => setLocation(event.target.value)}
                      placeholder="e.g. Abuja Sorting Facility"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />
                  </div>
                </div>

                {/* Status */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Shipment Status
                  </label>

                  <select
                    value={status}
                    onChange={(event) => setStatus(event.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm font-medium outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  >
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

                {/* Note */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Tracking Note
                  </label>

                  <textarea
                    value={note}
                    onChange={(event) => setNote(event.target.value)}
                    rows={4}
                    placeholder="Add information about this shipment update..."
                    className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                {/* Save */}
                <button
                  type="button"
                  onClick={addTrackingUpdate}
                  disabled={!location.trim()}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Save className="h-5 w-5" />
                  Add Tracking Update
                </button>

                {saved && (
                  <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-700">
                    <CheckCircle2 className="h-5 w-5" />
                    Tracking update added successfully.
                  </div>
                )}
              </div>

              {/* Notice */}
              <div className="mt-6 rounded-xl bg-blue-50 p-4">
                <div className="flex gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />

                  <p className="text-xs leading-5 text-slate-600">
                    Every tracking update will eventually be visible to the
                    customer on the public tracking page.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}