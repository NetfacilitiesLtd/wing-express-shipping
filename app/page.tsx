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
import { useLanguage } from "./i18n/LanguageContext";
import { translations } from "./i18n/translations";
export default function Home() {
  const router = useRouter();
const { language, setLanguage } = useLanguage();
const t = translations[language];
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
             {t.home}
            </a>

            <a
              href="#about"
              className="text-sm font-medium text-white transition hover:text-blue-200"
            >
              {t.about}
            </a>

            <a
              href="#services"
              className="text-sm font-medium text-white transition hover:text-blue-200"
            >
              {t.services}
            </a>

            <a
              href="#tracking"
              className="text-sm font-medium text-white transition hover:text-blue-200"
            >
              {t.trackShipment}
            </a>

            <a
              href="#contact"
              className="text-sm font-medium text-white transition hover:text-blue-200"
            >
              {t.contact}
            </a>
          </nav>
          <div className="ml-4">
  <select
    value={language}
    onChange={(event) =>
      setLanguage(event.target.value as "en" | "fr" | "nl" | "de")
    }
    className="rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-sm font-medium text-white outline-none backdrop-blur-sm"
  >
    <option value="en" className="text-slate-900">
      English
    </option>
    <option value="fr" className="text-slate-900">
      Français
    </option>
    <option value="nl" className="text-slate-900">
      Nederlands
    </option>
    <option value="de" className="text-slate-900">
      Deutsch
    </option>
  </select>
</div>

          <a
            href="#tracking"
            className="hidden rounded-full bg-white px-5 py-2.5 text-sm font-bold text-blue-800 shadow-lg transition hover:bg-blue-50 sm:inline-flex"
          >
            {t.trackShipment}
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
              {t.reliableShipping}
            </div>

            <h1 className="text-5xl font-black leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
  {t.delivering}
  <span className="block text-blue-300">
    {t.beyondBorders}
  </span>
</h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-blue-100 sm:text-xl">
              {t.heroDescription}
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a
                href="#tracking"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 font-bold text-blue-800 shadow-xl transition hover:bg-blue-50"
              >
                {t.trackYourShipment}
                <ArrowRight className="h-5 w-5" />
              </a>

              <a
                href="#services"
                className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-7 py-3.5 font-bold text-white backdrop-blur transition hover:bg-white/20"
              >
                {t.exploreServices}
              </a>
            </div>

            <div className="mt-10 grid max-w-lg grid-cols-3 gap-5 border-t border-white/15 pt-7">
              <div>
                <p className="text-2xl font-black text-white">24/7</p>
                <p className="mt-1 text-sm text-blue-200">
                  {t.shipmentTracking}
                </p>
              </div>

              <div>
                <p className="text-2xl font-black text-white">Secure</p>
                <p className="mt-1 text-sm text-blue-200">
                  {t.packageHandling}
                </p>
              </div>

              <div>
                <p className="text-2xl font-black text-white">Global</p>
                <p className="mt-1 text-sm text-blue-200">
                 {t.deliveryNetwork}
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
                {t.trackYourShipment}
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                {t.trackingDescription}
              </p>

              <form onSubmit={handleTracking} className="mt-7">
                <label
                  htmlFor="trackingNumber"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  {t.trackingNumber}
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
                  {t.track}
                  <ArrowRight className="h-5 w-5" />
                </button>
              </form>

              <div className="mt-6 flex items-start gap-3 rounded-xl bg-blue-50 p-4">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />

                <p className="text-xs leading-5 text-slate-600">
                  {t.securityNotice}
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
              {t.servicesLabel}
            </p>

            <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
              {t.servicesHeading}
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              {t.servicesDescription}
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Package,
                title: t.serviceParcelDelivery,
                text: t.serviceParcelDescription,
              },
              {
                icon: Globe2,
                title: t.serviceInternationalShipping,
                text: t.serviceInternationalDescription,
              },
              {
                icon: Truck,
                title: t.serviceExpressDelivery,
                text: t.serviceExpressDescription,
              },
              {
                icon: ShieldCheck,
                title: t.serviceSecureHandling,
                text: t.serviceSecureDescription,
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
                    {t.learnMore}
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
              {t.aboutWhy}
            </p>

            <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
              {t.aboutHeading}
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
             {t.aboutDescription}
            </p>

            <div className="mt-8 space-y-4">
              {[
                t.aboutRealTimeUpdates,
                t.aboutProfessionalHandling,
                t.aboutDeliverySolutions,
                t.aboutClearCommunication,
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
                {t.aboutTrackingHeading}
              </h3>

              <p className="mt-4 leading-7 text-blue-100">
                {t.aboutTrackingDescription}
              </p>

              <div className="mt-8 rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-white">
                    {t.shipmentProgress}
                  </span>

                  <span className="text-blue-200">{t.comingSoon}</span>
                </div>

                <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/20">
                  <div className="h-full w-2/3 rounded-full bg-white" />
                </div>

                <div className="mt-4 flex justify-between text-xs text-blue-200">
                  <span>{t.pickedUp}</span>
<span>{t.inTransit}</span>
<span>{t.delivered}</span>
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
              {t.contactHeading}
            </h2>

            <p className="mt-3 max-w-2xl text-blue-100">
              {t.contactDescription}
            </p>
          </div>

          <a
            href="mailto:info@wingexpressshipping.com"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-7 py-3.5 font-bold text-blue-800 shadow-lg transition hover:bg-blue-50"
          >
            {t.contactButton}
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
        {t.footerTagline}
      </p>
    </div>

    {/* Quick Links */}
    <div>
      <h3 className="text-base font-bold text-white">{t.quickLinks}</h3>

      <div className="mt-4 flex flex-col gap-3 text-sm">
        <a href="#home" className="text-slate-400 transition hover:text-white">
         {t.home}
        </a>
        <a
          href="#services"
          className="text-slate-400 transition hover:text-white"
        >
          {t.services}
        </a>
        <a
          href="#tracking"
          className="text-slate-400 transition hover:text-white"
        >
          {t.trackShipment}
        </a>
        <a
          href="#contact"
          className="text-slate-400 transition hover:text-white"
        >
          {t.contactUs}
        </a>
      </div>
    </div>

    {/* Contact */}
    <div>
      <h3 className="text-base font-bold text-white">{t.contactUs}</h3>

      <div className="mt-4 space-y-3 text-sm text-slate-400">
        <p>{t.footerEmail} info@wingxpresslogistics.com</p>
        <p>{t.footerPhone} +44 73 554 53466</p>
        <p>
  {t.footerAddress} 88-90 Chorlton Rd, Old Trafford, Stretford,
  Manchester M15 4AN, United Kingdom
</p>
<p>{t.contactAvailability}</p>
      </div>
    </div>
  </div>

  {/* Bottom copyright */}
  <div className="mt-10 border-t border-slate-800 pt-6 text-center text-sm text-slate-500">
    {t.copyright}
  </div>
</div>
      </footer>
    </main>
  );
}