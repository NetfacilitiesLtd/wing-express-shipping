"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  Globe2,
  MapPin,
  Package,
  Plane,
  ShieldCheck,
  Truck,
} from "lucide-react";

export default function Home() {
  const router = useRouter();

  const handleTracking = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trackingInput = event.currentTarget.elements.namedItem(
      "trackingNumber"
    ) as HTMLInputElement;

    const trackingNumber = trackingInput.value.trim();

    if (!trackingNumber) {
      return;
    }

    router.push(`/track?number=${encodeURIComponent(trackingNumber)}`);
  };

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Navigation */}
      <header className="absolute left-0 right-0 top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
         <div className="flex items-center rounded-2xl bg-white p-2 shadow-lg ring-1 ring-white/20">
  <Image
    src="/images/wing-express-logistics-logo.png"
    alt="Wing Express Logistics"
    width={110}
    height={100}
    className="w-[90px] h-auto object-contain"
    priority
  />
</div>

          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#home"
              className="text-sm font-medium text-white transition hover:text-blue-200"
            >
              Home
            </a>

            <a
              href="#about"
              className="text-sm font-medium text-white transition hover:text-blue-200"
            >
              About
            </a>

            <a
              href="#services"
              className="text-sm font-medium text-white transition hover:text-blue-200"
            >
              Services
            </a>

            <a
              href="#tracking"
              className="text-sm font-medium text-white transition hover:text-blue-200"
            >
              Track Shipment
            </a>

            <a
              href="#contact"
              className="text-sm font-medium text-white transition hover:text-blue-200"
            >
              Contact
            </a>
          </nav>

          <a
            href="#tracking"
            className="hidden rounded-full bg-white px-5 py-2.5 text-sm font-bold text-blue-800 shadow-lg transition hover:bg-blue-50 sm:inline-flex"
          >
            Track Package
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden">
  {/* Shipping background image */}
  <Image
    src="/images/shipping-hero.jpg"
    alt="Air, sea and road shipping logistics"
    fill
    priority
    className="object-cover"
  />

  {/* Dark overlay for readability */}
 <div className="absolute inset-0 bg-gradient-to-r from-slate-950/65 via-slate-900/35 to-slate-900/10" />

  {/* Subtle blue overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-blue-950/70 via-blue-950/45 to-transparent" />

        <div className="relative mx-auto grid min-h-[720px] max-w-7xl items-center gap-12 px-6 pb-20 pt-36 lg:grid-cols-2 lg:px-8">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-300/30 bg-white/10 px-4 py-2 text-sm font-medium text-blue-100 backdrop-blur">
              <Globe2 className="h-4 w-4" />
              Reliable shipping across borders
            </div>

            <h1 className="text-5xl font-black leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
              Delivering
              <span className="block text-blue-300">
                Beyond Borders.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-blue-100 sm:text-xl">
              Fast, reliable and secure shipping solutions for individuals
              and businesses. From local deliveries to international
              logistics, Wing Express Logistics keeps your packages moving.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a
                href="#tracking"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 font-bold text-blue-800 shadow-xl transition hover:bg-blue-50"
              >
                Track Your Shipment
                <ArrowRight className="h-5 w-5" />
              </a>

              <a
                href="#services"
                className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-7 py-3.5 font-bold text-white backdrop-blur transition hover:bg-white/20"
              >
                Explore Services
              </a>
            </div>

            <div className="mt-10 grid max-w-lg grid-cols-3 gap-5 border-t border-white/15 pt-7">
              <div>
                <p className="text-2xl font-black text-white">24/7</p>
                <p className="mt-1 text-sm text-blue-200">
                  Shipment Tracking
                </p>
              </div>

              <div>
                <p className="text-2xl font-black text-white">Secure</p>
                <p className="mt-1 text-sm text-blue-200">
                  Package Handling
                </p>
              </div>

              <div>
                <p className="text-2xl font-black text-white">Global</p>
                <p className="mt-1 text-sm text-blue-200">
                  Delivery Network
                </p>
              </div>
            </div>
          </div>

          {/* Tracking Card */}
          <div
            id="tracking"
            className="relative lg:ml-auto lg:w-full lg:max-w-md"
          >
            <div className="rounded-3xl bg-white p-7 shadow-2xl sm:p-9">
              <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
                <Package className="h-7 w-7 text-blue-700" />
              </div>

              <h2 className="text-2xl font-extrabold text-slate-950">
                Track Your Shipment
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Enter your tracking number to see the latest location and
                delivery status of your package.
              </p>

              <form onSubmit={handleTracking} className="mt-7">
                <label
                  htmlFor="trackingNumber"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Tracking Number
                </label>

                <input
                  id="trackingNumber"
                  name="trackingNumber"
                  type="text"
                  placeholder="e.g. WEX-2026-000123"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />

                <button
  type="submit"
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3.5 font-bold text-white transition hover:bg-blue-800"
                >
                  Track Shipment
                  <ArrowRight className="h-5 w-5" />
                </button>
              </form>

              <div className="mt-6 flex items-start gap-3 rounded-xl bg-blue-50 p-4">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />

                <p className="text-xs leading-5 text-slate-600">
                  Your shipment information is securely managed and updated
                  by our logistics team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section
  id="services"
  className="bg-slate-50 px-6 pt-24 pb-16 lg:px-8"
>
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-700">
              Our Services
            </p>

            <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
              Shipping made simple.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Flexible logistics solutions designed to move your packages
              safely and efficiently.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Package,
                title: "Parcel Delivery",
                text: "Reliable delivery solutions for documents, parcels and packages.",
              },
              {
                icon: Globe2,
                title: "International Shipping",
                text: "Move shipments across borders with dependable logistics support.",
              },
              {
                icon: Truck,
                title: "Express Delivery",
                text: "Time-sensitive delivery options for packages that need to arrive fast.",
              },
              {
                icon: ShieldCheck,
                title: "Secure Handling",
                text: "Careful handling and shipment updates throughout the delivery journey.",
              },
            ].map((service) => {
              const Icon = service.icon;

              return (
                <div
                  key={service.title}
                  className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                    <Icon className="h-6 w-6 text-blue-700" />
                  </div>

                  <h3 className="mt-6 text-xl font-extrabold text-slate-950">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {service.text}
                  </p>

                  <a
                    href="#contact"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-900"
                  >
                    Learn more
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="px-6 py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-700">
              Why Wing Express
            </p>

            <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
              Your package is in good hands.
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              We are building Wing Express Logistics around a simple idea:
              shipping should be dependable, transparent and easy to track.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Real-time shipment status updates",
                "Professional package handling",
                "Local and international delivery solutions",
                "Clear communication throughout the delivery process",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-blue-700" />
                  <span className="font-medium text-slate-700">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 to-blue-950 p-8 shadow-2xl sm:p-12">
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/10" />
            <div className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-white/5" />

            <div className="relative">
              <MapPin className="h-12 w-12 text-blue-200" />

              <h3 className="mt-8 text-3xl font-black text-white">
                Know where your shipment is.
              </h3>

              <p className="mt-4 leading-7 text-blue-100">
                Our tracking system will give customers visibility from the
                moment a shipment is created until it reaches its destination.
              </p>

              <div className="mt-8 rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-white">
                    Shipment Progress
                  </span>

                  <span className="text-blue-200">Coming Soon</span>
                </div>

                <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/20">
                  <div className="h-full w-2/3 rounded-full bg-white" />
                </div>

                <div className="mt-4 flex justify-between text-xs text-blue-200">
                  <span>Picked Up</span>
                  <span>In Transit</span>
                  <span>Delivered</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="bg-blue-700 px-6 py-20 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <h2 className="text-3xl font-black text-white sm:text-4xl">
              Ready to ship with Wing Express?
            </h2>

            <p className="mt-3 max-w-2xl text-blue-100">
              Get in touch with our team to discuss your shipping and
              logistics needs.
            </p>
          </div>

          <a
            href="mailto:info@wingexpressshipping.com"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-7 py-3.5 font-bold text-blue-800 shadow-lg transition hover:bg-blue-50"
          >
            Contact Us
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 px-6 py-10 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">
  <div className="grid gap-10 md:grid-cols-3">
    {/* Company */}
    <div>
      <Image
        src="/images/wing-express-logistics-logo.png"
        alt="Wing Express Logistics"
        width={110}
        height={100}
        className="h-auto w-[85px] object-contain"
      />

      <p className="mt-4 text-sm text-slate-400">
        Reliable logistics. Wherever you need to go.
      </p>
    </div>

    {/* Quick Links */}
    <div>
      <h3 className="text-base font-bold text-white">Quick Links</h3>

      <div className="mt-4 flex flex-col gap-3 text-sm">
        <a href="#home" className="text-slate-400 transition hover:text-white">
          Home
        </a>
        <a
          href="#services"
          className="text-slate-400 transition hover:text-white"
        >
          Services
        </a>
        <a
          href="#tracking"
          className="text-slate-400 transition hover:text-white"
        >
          Track Shipment
        </a>
        <a
          href="#contact"
          className="text-slate-400 transition hover:text-white"
        >
          Contact Us
        </a>
      </div>
    </div>

    {/* Contact */}
    <div>
      <h3 className="text-base font-bold text-white">Contact Us</h3>

      <div className="mt-4 space-y-3 text-sm text-slate-400">
        <p>Email: info@wingxpresslogistics.com</p>
        <p>Phone: +44 73 554 53466</p>
        <p>
  Address: 88-90 Chorlton Rd, Old Trafford, Stretford,
  Manchester M15 4AN, United Kingdom
</p>
<p>Available for local and international shipping inquiries.</p>
      </div>
    </div>
  </div>

  {/* Bottom copyright */}
  <div className="mt-10 border-t border-slate-800 pt-6 text-center text-sm text-slate-500">
    © 2026 Wing Express Logistics. All rights reserved.
  </div>
</div>
      </footer>
    </main>
  );
}