"use client";

import {
  IndianRupee,
  TrendingUp,
  Clock3,
  CalendarCheck,
  ArrowUpRight,
  Wallet,
} from "lucide-react";

const earnings = [
  {
    candidate: "Arjun Sharma",
    topic: "Backend Development",
    date: "12 Sep 2026",
    amount: 999,
    status: "Paid",
  },
  {
    candidate: "Rahul Kapoor",
    topic: "System Design",
    date: "08 Sep 2026",
    amount: 1199,
    status: "Paid",
  },
  {
    candidate: "Neha Patel",
    topic: "Career Guidance",
    date: "05 Sep 2026",
    amount: 799,
    status: "Paid",
  },
  {
    candidate: "Vivek Mehra",
    topic: "Interview Preparation",
    date: "01 Sep 2026",
    amount: 999,
    status: "Pending",
  },
];

export default function MentorEarnings() {
  const totalEarnings = earnings.reduce(
    (total, item) => total + item.amount,
    0
  );

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white">
          Your Earnings
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Track your mentorship income and payment history.
        </p>
      </div>

      {/* ================= STATS ================= */}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">

        {/* Total */}
        <StatCard
          icon={Wallet}
          label="Total Earnings"
          value={`₹${totalEarnings.toLocaleString("en-IN")}`}
          change="+18.4%"
        />

        {/* Month */}
        <StatCard
          icon={TrendingUp}
          label="This Month"
          value="₹3,996"
          change="+12.8%"
        />

        {/* Pending */}
        <StatCard
          icon={Clock3}
          label="Pending Payout"
          value="₹999"
          change="Processing"
        />

        {/* Sessions */}
        <StatCard
          icon={CalendarCheck}
          label="Completed Sessions"
          value="24"
          change="+4 this month"
        />

      </div>

      {/* ================= EARNING OVERVIEW ================= */}

      <div className="rounded-2xl border border-white/[0.07] bg-[#101b27] p-6">

        <div className="flex items-center justify-between">

          <div>
            <h3 className="text-lg font-bold text-white">
              Earnings Overview
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              Your mentorship earnings for this month.
            </p>
          </div>

          <select className="rounded-lg border border-slate-700 bg-[#0b1520] px-3 py-2 text-xs text-slate-400 outline-none focus:border-cyan-400/40">
            <option>September 2026</option>
            <option>August 2026</option>
            <option>July 2026</option>
          </select>

        </div>

        {/* Fake Chart */}
        <div className="mt-8 flex h-48 items-end gap-3 border-b border-slate-700/50 pb-0">

          {[35, 55, 42, 68, 50, 82, 65, 92, 72, 88, 76, 100].map(
            (height, index) => (
              <div
                key={index}
                className="group relative flex h-full flex-1 items-end"
              >
                <div
                  style={{ height: `${height}%` }}
                  className="w-full rounded-t-md bg-cyan-400/20 transition-all duration-300 group-hover:bg-cyan-400/40"
                />

                {/* Hover value */}
                <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded-md border border-cyan-400/20 bg-[#071117] px-2 py-1 text-[10px] text-cyan-400 opacity-0 transition group-hover:opacity-100">
                  ₹{Math.round(height * 12)}
                </div>
              </div>
            )
          )}

        </div>

        <div className="mt-3 flex justify-between text-[10px] text-slate-600">
          <span>01 Sep</span>
          <span>05 Sep</span>
          <span>10 Sep</span>
          <span>15 Sep</span>
          <span>20 Sep</span>
          <span>25 Sep</span>
          <span>30 Sep</span>
        </div>

      </div>

      {/* ================= PAYMENT HISTORY ================= */}

      <div className="rounded-2xl border border-white/[0.07] bg-[#101b27] p-6">

        <div className="mb-6">
          <h3 className="text-lg font-bold text-white">
            Payment History
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            Recent earnings from your mentorship sessions.
          </p>
        </div>

        <div className="space-y-3">

          {earnings.map((earning) => (
            <div
              key={`${earning.candidate}-${earning.date}`}
              className="group flex flex-col gap-4 rounded-xl border border-white/[0.05] bg-[#0b1520] p-4 transition hover:border-cyan-400/15 md:flex-row md:items-center md:justify-between"
            >

              {/* Candidate */}
              <div className="flex items-center gap-4">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/15 bg-cyan-400/[0.06]">
                  <IndianRupee
                    size={18}
                    className="text-cyan-400"
                  />
                </div>

                <div>
                  <p className="text-sm font-semibold text-white">
                    {earning.candidate}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {earning.topic}
                  </p>
                </div>

              </div>

              {/* Date */}
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Clock3 size={14} />
                {earning.date}
              </div>

              {/* Status */}
              <span
                className={`w-fit rounded-full border px-3 py-1 text-[10px] font-semibold ${
                  earning.status === "Paid"
                    ? "border-emerald-400/20 bg-emerald-400/[0.06] text-emerald-400"
                    : "border-yellow-400/20 bg-yellow-400/[0.06] text-yellow-400"
                }`}
              >
                {earning.status}
              </span>

              {/* Amount */}
              <div className="flex items-center gap-3">
                <span className="text-base font-bold text-white">
                  ₹{earning.amount.toLocaleString("en-IN")}
                </span>

                <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-700 text-slate-500 transition hover:border-cyan-400/30 hover:text-cyan-400">
                  <ArrowUpRight size={15} />
                </button>
              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}


/* ================= STAT CARD ================= */

function StatCard({
  icon: Icon,
  label,
  value,
  change,
}) {
  return (
    <div className="group rounded-2xl border border-white/[0.07] bg-[#101b27] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/20">

      <div className="flex items-start justify-between">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/15 bg-cyan-400/[0.06]">
          <Icon
            size={18}
            className="text-cyan-400"
          />
        </div>

        <TrendingUp
          size={15}
          className="text-emerald-400 opacity-60"
        />

      </div>

      <p className="mt-5 text-xs text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-2xl font-black text-white">
        {value}
      </p>

      <p className="mt-2 text-[11px] text-emerald-400">
        {change}
      </p>

    </div>
  );
}