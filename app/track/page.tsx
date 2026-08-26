"use client";

import { FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Globe2,
  MapPin,
    Package,
  Search,
  ShieldCheck,
  Truck,
  Plane,
  Ship,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

type Shipment = {
  id: string;
  tracking_number: string;
  customer_name: string;
  origin_city: string;
  origin_country: string;
  destination_city: string;
  destination_country: string;
  current_location: string;
  status: string;
  shipment_type: string | null;
  estimated_delivery: string | null;
};

type TrackingEvent = {
  id: string;
  status: string;
  location: string;
  description: string | null;
  event_time: string;
};

export default function TrackPage() {
    const searchParams = useSearchParams();
  const [trackingNumber, setTrackingNumber] = useState("");
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [updates, setUpdates] = useState<TrackingEvent[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const searchShipment = async (trackingValue: string) => {
    

    const value = trackingValue.trim().toUpperCase();

    setError("");
    setShipment(null);
    setUpdates([]);

    if (!value) {
      setError("Please enter a tracking number.");
      return;
    }

    setLoading(true);

    try {
      const { data: shipmentData, error: shipmentError } = await supabase
        .from("shipments")
        .select(
          `
            id,
            tracking_number,
            customer_name,
            origin_city,
            origin_country,
            destination_city,
            destination_country,
            current_location,
            status,
            shipment_type,
            estimated_delivery
          `
        )
        .eq("tracking_number", value)
        .maybeSingle();

      if (shipmentError) {
        console.error(shipmentError);
        setError("Unable to search for the shipment right now.");
        return;
      }

      if (!shipmentData) {
        setError(
          "We could not find a shipment with that tracking number. Please check the number and try again."
        );
        return;
      }

      setShipment(shipmentData);

      const { data: trackingData, error: trackingError } = await supabase
        .from("tracking_events")
        .select(
          `
            id,
            status,
            location,
            description,
            event_time
          `
        )
        .eq("shipment_id", shipmentData.id)
        .order("event_time", { ascending: false });

      if (trackingError) {
        console.error(trackingError);
        setUpdates([]);
      } else {
        setUpdates(trackingData || []);
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong while tracking the shipment.");
    } finally {
      setLoading(false);
    }
  };
  const handleTrack = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await searchShipment(trackingNumber);
  };
    useEffect(() => {
    const numberFromUrl = searchParams.get("number");

    if (numberFromUrl) {
      setTrackingNumber(numberFromUrl.toUpperCase());
      searchShipment(numberFromUrl);
    }
  }, [searchParams]);
  const formatDate = (date: string | null) => {
    if (!date) return "Not available";

    return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatEventDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatEventTime = (date: string) => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };
const getShipmentIcon = () => {
  const status = shipment?.status?.toLowerCase();
  const type = shipment?.shipment_type?.toLowerCase();

  // Final delivery is always handled locally
  if (status === "out for delivery") return Truck;

  if (type === "air") return Plane;
  if (type === "sea") return Ship;

  return Truck;
};

const getTrackingStatusIcon = (status: string) => {
  const currentStatus = status.toLowerCase();

  if (currentStatus.includes("processing")) return Package;
  if (currentStatus.includes("awaiting")) return Clock3;

  if (
    currentStatus.includes("shipped") ||
    currentStatus.includes("transit")
  ) {
    return getShipmentIcon();
  }

  if (currentStatus.includes("out for delivery")) return Truck;
  if (currentStatus.includes("delivered")) return CheckCircle2;

  return CheckCircle2;
};
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <a href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-700">
              <Truck className="h-6 w-6 text-white" />
            </div>

            <div>
              <p className="text-lg font-black tracking-tight text-slate-950">
                Wing Express
              </p>

              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-blue-700">
                Shipping
              </p>
            </div>
          </a>

          <a
            href="/"
            className="hidden text-sm font-bold text-slate-600 transition hover:text-blue-700 sm:block"
          >
            Back to Website
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-950 via-blue-900 to-blue-700 px-6 py-16 text-white lg:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20">
            <Package className="h-7 w-7" />
          </div>

          <h1 className="mt-6 text-4xl font-black tracking-tight sm:text-5xl">
            Track Your Shipment
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-blue-100 sm:text-lg">
            Enter your Wing Express tracking number to see your package&apos;s
            latest location, status and tracking history.
          </p>

          {/* Search */}
          <form
            onSubmit={handleTrack}
            className="mx-auto mt-9 max-w-2xl rounded-2xl bg-white p-2 shadow-2xl"
          >
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                <input
                  type="text"
                  value={trackingNumber}
                  onChange={(event) =>
                    setTrackingNumber(event.target.value.toUpperCase())
                  }
                  placeholder="Enter tracking number"
                  className="w-full rounded-xl border border-transparent bg-slate-50 py-4 pl-12 pr-4 text-sm font-semibold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-7 py-4 text-sm font-bold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Searching..." : "Track Shipment"}
                {!loading && <ArrowRight className="h-5 w-5" />}
              </button>
            </div>
          </form>

          <p className="mt-4 text-xs text-blue-200">
            Try the sample tracking number:{" "}
            <span className="font-bold text-white">WEX-2026-000123</span>
          </p>
        </div>
      </section>

      {/* Error */}
      {error && (
        <div className="mx-auto max-w-4xl px-6 pt-8 lg:px-8">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm font-semibold text-red-700">
            {error}
          </div>
        </div>
      )}

      {/* Results */}
      {shipment && (
        <section className="mx-auto max-w-6xl px-6 py-10 lg:px-8">
          {/* Shipment Summary */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 p-6 sm:p-8">
              <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Tracking Number
                  </p>

                  <h2 className="mt-2 text-2xl font-black tracking-wide text-blue-700">
                    {shipment.tracking_number}
                  </h2>
                </div>

                <div className="inline-flex w-fit items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-bold text-blue-700">
                  <span className="h-2 w-2 rounded-full bg-blue-600" />
                  {shipment.status}
                </div>
              </div>
            </div>

            <div className="grid gap-6 p-6 sm:grid-cols-3 sm:p-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                  Origin
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <p className="font-bold text-slate-900">
                    {shipment.origin_city}, {shipment.origin_country}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                  Current Location
                </p>

                <div className="mt-2 flex items-center gap-2">
                  {(() => {
  const ShipmentIcon = getShipmentIcon();
  return <ShipmentIcon className="h-5 w-5 text-blue-600" />;
})()}
                  <p className="font-bold text-slate-900">
                    {shipment.current_location}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                  Destination
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <Globe2 className="h-5 w-5 text-blue-600" />
                  <p className="font-bold text-slate-900">
                    {shipment.destination_city},{" "}
                    {shipment.destination_country}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Estimated Delivery */}
          <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white">
                  <Clock3 className="h-5 w-5 text-blue-700" />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-blue-600">
                    Estimated Delivery
                  </p>

                  <p className="mt-1 font-black text-slate-900">
                    {formatDate(shipment.estimated_delivery)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm font-semibold text-emerald-700">
                <CheckCircle2 className="h-5 w-5" />
                Shipment status updated
              </div>
            </div>
          </div>

          {/* Tracking Timeline */}
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div>
              <h3 className="text-xl font-black text-slate-950">
                Tracking History
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Latest updates for your shipment
              </p>
            </div>

            {updates.length > 0 ? (
              <div className="mt-8">
                {updates.map((update, index) => (
                  <div
                    key={update.id}
                    className="relative flex gap-5 pb-9 last:pb-0"
                  >
                    {index !== updates.length - 1 && (
                      <div className="absolute left-[15px] top-8 h-full w-0.5 bg-blue-100" />
                    )}

                    <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-700 text-white shadow-sm">
                     {(() => {
  const StatusIcon = getTrackingStatusIcon(update.status);
  return <StatusIcon className="h-4 w-4" />;
})()}
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-col justify-between gap-2 sm:flex-row">
                        <div>
                          <h4 className="font-black text-slate-900">
                            {update.location}
                          </h4>

                          <p className="mt-1 text-sm font-bold text-blue-700">
                            {update.status}
                          </p>
                        </div>

                        <div className="text-left sm:text-right">
                          <p className="text-xs font-semibold text-slate-500">
                            {formatEventDate(update.event_time)}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            {formatEventTime(update.event_time)}
                          </p>
                        </div>
                      </div>

                      <p className="mt-3 text-sm leading-6 text-slate-500">
                        {update.description ||
                          "Shipment tracking information updated."}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-8 rounded-xl bg-slate-50 p-6 text-center">
                <p className="text-sm font-semibold text-slate-500">
                  No tracking updates have been added yet.
                </p>
              </div>
            )}
          </div>

          {/* Security Notice */}
          <div className="mt-6 flex gap-3 rounded-2xl border border-slate-200 bg-white p-5">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />

            <div>
              <p className="text-sm font-bold text-slate-900">
                Secure shipment tracking
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Shipment information is securely managed by Wing Express and
                updated by our logistics team.
              </p>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}