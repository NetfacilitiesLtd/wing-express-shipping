"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  LockKeyhole,
  ShieldCheck,
  Truck,
  User,
} from "lucide-react";

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const { error } = await supabase.auth.signInWithPassword({
    email: username,
    password,
  });

  if (error) {
    alert("Invalid username or password.");
    return;
  }

  window.location.href = "/admin/dashboard";
};

return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left Side */}
        <section className="relative hidden overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-blue-800 lg:flex">
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-500/20" />
          <div className="absolute -bottom-40 -left-32 h-[500px] w-[500px] rounded-full bg-blue-400/10" />

          <div className="relative z-10 flex w-full flex-col justify-between p-12 xl:p-16">
            <a href="/" className="flex w-fit items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white">
                <Truck className="h-6 w-6 text-blue-700" />
              </div>

              <div>
                <p className="text-xl font-black text-white">
                  Wing Express
                </p>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">
                  Shipping
                </p>
              </div>
            </a>

            <div className="max-w-lg">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/10">
                <ShieldCheck className="h-8 w-8 text-blue-200" />
              </div>

              <h1 className="text-5xl font-black leading-tight text-white">
                Manage every shipment from one place.
              </h1>

              <p className="mt-6 text-lg leading-8 text-blue-100">
                Access your logistics dashboard to create shipments, manage
                tracking information and keep customers updated throughout
                the delivery process.
              </p>
            </div>

            <p className="text-sm text-blue-200">
              Wing Express Logistics Management Portal
            </p>
          </div>
        </section>

        {/* Login Side */}
        <section className="flex items-center justify-center px-6 py-12 sm:px-10">
          <div className="w-full max-w-md">
            <a
              href="/"
              className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-blue-700"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to website
            </a>

            {/* Mobile Brand */}
            <div className="mb-10 flex items-center gap-3 lg:hidden">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-700">
                <Truck className="h-6 w-6 text-white" />
              </div>

              <div>
                <p className="text-xl font-black text-slate-950">
                  Wing Express
                </p>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
                  Shipping
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-700">
                Admin Portal
              </p>

              <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950">
                Welcome back
              </h2>

              <p className="mt-3 leading-6 text-slate-500">
                Sign in to manage shipments and update package tracking
                information.
              </p>
            </div>

            <form
  className="mt-8 space-y-5"
  onSubmit={handleLogin}
>
              {/* Username */}
              <div>
                <label
                  htmlFor="username"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  Admin Username
                </label>

                <div className="relative">
                  <User className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                  <input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Enter your username"
                    autoComplete="username"
                    value={username}
  onChange={(e) => setUsername(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-12 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  Password
                </label>

                <div className="relative">
                  <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    value={password}
onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-12 pr-12 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Sign In */}
              <button
                type="submit"
                className="w-full rounded-xl bg-blue-700 px-5 py-3.5 font-bold text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800"
              >
                Sign In to Dashboard
              </button>
            </form>

            <div className="mt-7 flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />

              <p className="text-xs leading-5 text-slate-600">
                This portal is for authorized Wing Express Logistics
                personnel only.
              </p>
            </div>

            <p className="mt-8 text-center text-xs text-slate-400">
              © 2026 Wing Express Logistics. All rights reserved.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}