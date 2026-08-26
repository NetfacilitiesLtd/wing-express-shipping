"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, Mail, Package, Search, Users } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCustomers() {
      const { data, error } = await supabase
        .from("shipments")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error loading customers:", error);
      } else {
        const uniqueCustomers = Array.from(
          new Map(
            (data || []).map((shipment) => [
              shipment.customer_name,
              {
                name: shipment.customer_name,
                email: shipment.customer_email,
                shipments: (data || []).filter(
                  (item) => item.customer_name === shipment.customer_name
                ).length,
              },
            ])
          ).values()
        );

        setCustomers(uniqueCustomers);
      }

      setLoading(false);
    }

    loadCustomers();
  }, []);

  const filteredCustomers = customers.filter((customer) =>
    customer.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <div>
            <Link
              href="/admin/dashboard"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-700"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>

            <h1 className="mt-3 text-2xl font-black text-slate-950">
              Customers
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              View customers and their shipment activity.
            </p>
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-700">
            <Users className="h-6 w-6 text-white" />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search customers..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm outline-none focus:border-blue-500 focus:bg-white"
            />
          </div>
        </div>

        <div className="mt-7 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-6">
            <h2 className="text-lg font-black text-slate-950">
              All Customers
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {filteredCustomers.length} customer
              {filteredCustomers.length === 1 ? "" : "s"} found
            </p>
          </div>

          {loading ? (
            <div className="p-10 text-center text-sm text-slate-500">
              Loading customers...
            </div>
          ) : filteredCustomers.length === 0 ? (
            <div className="p-10 text-center text-sm text-slate-500">
              No customers found.
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {filteredCustomers.map((customer) => (
                <Link
  key={customer.name}
  href={`/admin/customers/${encodeURIComponent(customer.name)}`}
  className="flex flex-col justify-between gap-4 p-6 transition hover:bg-slate-50 sm:flex-row sm:items-center"
>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
                      {customer.name?.charAt(0)?.toUpperCase()}
                    </div>

                    <div>
                      <p className="font-bold text-slate-900">
                        {customer.name}
                      </p>

                      {customer.email && (
                        <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                          <Mail className="h-4 w-4" />
                          {customer.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                    <Package className="h-5 w-5 text-blue-600" />
                    {customer.shipments} shipment
                    {customer.shipments === 1 ? "" : "s"}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}