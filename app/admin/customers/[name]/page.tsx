"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Mail,
  MapPin,
  Package,
  Truck,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function CustomerDetailsPage() {
  const params = useParams();
  const customerName = decodeURIComponent(params.name as string);

  const [shipments, setShipments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCustomerShipments() {
      const { data, error } = await supabase
        .from("shipments")
        .select("*")
        .eq("customer_name", customerName)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error loading customer shipments:", error);
      } else {
        setShipments(data || []);
      }

      setLoading(false);
    }

    loadCustomerShipments();
  }, [customerName]);

  const customerEmail = shipments[0]?.customer_email;

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-5 lg:px-8">
          <Link
            href="/admin/customers"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-blue-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Customers
          </Link>

          <div className="mt-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-2xl font-black text-slate-950">
                {customerName}
              </h1>

              {customerEmail && (
                <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                  <Mail className="h-4 w-4" />
                  {customerEmail}
                </p>
              )}
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-700">
              <Package className="h-7 w-7 text-white" />
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        {/* Summary */}
        <div className="rounded-2xl bg-gradient-to-r from-blue-950 to-blue-700 p-6 text-white shadow-lg">
          <p className="text-sm font-semibold text-blue-200">
            Customer Shipment Activity
          </p>

          <div className="mt-2 flex items-end gap-3">
            <p className="text-4xl font-black">{shipments.length}</p>
            <p className="mb-1 text-sm text-blue-100">
              Total Shipment{shipments.length === 1 ? "" : "s"}
            </p>
          </div>
        </div>

        {/* Shipments */}
        <div className="mt-7 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-6">
            <h2 className="text-lg font-black text-slate-950">
              Shipments
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              All shipments associated with this customer.
            </p>
          </div>

          {loading ? (
            <div className="p-10 text-center text-sm text-slate-500">
              Loading shipments...
            </div>
          ) : shipments.length === 0 ? (
            <div className="p-10 text-center text-sm text-slate-500">
              No shipments found for this customer.
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {shipments.map((shipment) => (
                <Link
                  key={shipment.tracking_number}
                  href={`/admin/shipments/${shipment.tracking_number}`}
                  className="flex flex-col justify-between gap-4 p-6 transition hover:bg-slate-50 sm:flex-row sm:items-center"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100">
                      <Truck className="h-5 w-5 text-blue-700" />
                    </div>

                    <div>
                      <Link
  href={`/admin/shipments/${shipment.tracking_number}`}
  className="font-bold text-blue-700 hover:text-blue-900 hover:underline"
>
  {shipment.tracking_number}
</Link>

                      <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-slate-500">
                        <MapPin className="h-4 w-4" />
                        {shipment.destination_city},{" "}
                        {shipment.destination_country}
                      </div>
                    </div>
                  </div>

                  <span
                    className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-bold ${
                      shipment.status === "Delivered"
                        ? "bg-emerald-100 text-emerald-700"
                        : shipment.status === "Processing"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {shipment.status}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}