"use client";

import { useState } from "react";
import {
  CalendarCheck,
  Wallet,
  History,
  Settings,
  LayoutDashboard,
  MessageSquareQuote
} from "lucide-react";
import MentorBookedSessions from "../components/mentorBookings";
import MentorEarnings from "../components/earning";
import MentorPastSessions from "../components/mentorPastSessions";
import MentorSettings from "../components/settings";
import MentorReviews from "../components/mentorReviews";
const tabs = [
  {
    id: "booked",
    label: "Booked Sessions",
    icon: CalendarCheck,
    heading: "Booked Sessions",
    description: "Manage your upcoming mentorship sessions.",
  },
  {
    id: "earnings",
    label: "Earnings",
    icon: Wallet,
    heading: "Earnings",
    description: "Track your mentorship earnings and payouts.",
  },
  {
    id: "past",
    label: "Past Sessions",
    icon: History,
    heading: "Past Sessions",
    description: "View your completed mentorship sessions.",
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    heading: "Mentor Settings",
    description: "Manage your profile, availability and preferences.",
  },
  {
    id: "reviews",
    label: "Reviews",
    icon: MessageSquareQuote,
    heading: "Mentor Reviews",
    description: "Let's see what people says about you",
  },
];

export default function MentorDashboard() {
  const [activeTab, setActiveTab] = useState("booked");

  const active = tabs.find((tab) => tab.id === activeTab);

  return (
    <section className="min-h-screen bg-[#050d11] text-white">

      <div className="mx-auto flex min-h-screen max-w-[1500px]">

        {/* ================= SIDEBAR ================= */}

        <aside className="w-[280px] shrink-0 border-r border-cyan-500/10 bg-[#071117] px-5 py-8">

          {/* Logo / Brand */}
          <div className="mb-10">
            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/10">
                <span className="text-lg font-bold text-cyan-400">
                  V
                </span>
              </div>

              <div>
                <h2 className="text-lg font-bold tracking-wide">
                  VeStaff
                </h2>

                <p className="text-xs text-slate-500">
                  Mentor Dashboard
                </p>
              </div>

            </div>
          </div>

          {/* Mentor Profile Mini Card */}
          <div className="mb-7 rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.03] p-4">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/25 bg-[#0d2a35]">
                <span className="text-sm font-bold text-cyan-400">
                  VK
                </span>
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">
                  Vikas Kumar
                </p>

                <p className="mt-0.5 text-xs text-slate-500">
                  Mentor
                </p>
              </div>

            </div>

            <div className="mt-4 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,.6)]" />

              <span className="text-xs text-emerald-400">
                Available for Sessions
              </span>
            </div>

          </div>

          {/* Navigation */}
          <nav className="space-y-2">

            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group flex w-full items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition-all duration-200 ${
                    isActive
                      ? "border-cyan-400/25 bg-cyan-400/10 text-cyan-400 shadow-[0_0_25px_rgba(0,210,255,0.05)]"
                      : "border-transparent text-slate-400 hover:border-cyan-400/10 hover:bg-white/[0.03] hover:text-white"
                  }`}
                >
                  <Icon
                    size={19}
                    className={
                      isActive
                        ? "text-cyan-400"
                        : "text-slate-500 transition-colors group-hover:text-cyan-400"
                    }
                  />

                  <span className="text-sm font-medium">
                    {tab.label}
                  </span>
                </button>
              );
            })}

          </nav>

        </aside>

        {/* ================= MAIN CONTENT ================= */}

        <main className="relative flex-1 overflow-hidden px-8 py-10 lg:px-12">

          {/* Background Grid */}
          <div className="pointer-events-none absolute inset-0 opacity-30">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
                backgroundSize: "80px 80px",
              }}
            />
          </div>

          {/* Glow */}
          <div className="pointer-events-none absolute -right-40 -top-40 h-[450px] w-[450px] rounded-full bg-cyan-400/[0.035] blur-[120px]" />

          <div className="relative z-10">

            {/* Badge */}
            <div className="mb-7 inline-flex items-center gap-2 rounded-lg border border-cyan-400/20 bg-cyan-400/[0.06] px-4 py-2">

              <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#00d9ff]" />

              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
                Mentor Portal
              </span>

            </div>

            {/* Heading */}
            <div>
              <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">
                {active?.heading}
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                {active?.description}
              </p>

              <div className="mt-6 h-px w-full bg-gradient-to-r from-cyan-400/25 via-cyan-400/10 to-transparent" />
            </div>

            {/* ================= CONDITIONAL COMPONENTS ================= */}

            <div className="mt-8">

              {activeTab === "booked" && (
                <div>
                  <MentorBookedSessions />
                </div>
              )}

              {activeTab === "earnings" && (
                <div>
                  <MentorEarnings />
                </div>
              )}

              {activeTab === "past" && (
                <div>
                  <MentorPastSessions />
                </div>
              )}

              {activeTab === "settings" && (
                <div>
                  <MentorSettings />
                </div>
              )}

              {activeTab === "reviews" && (
                <div>
                  <MentorReviews />
                </div>
              )}

            </div>

          </div>
        </main>
      </div>
    </section>
  );
}