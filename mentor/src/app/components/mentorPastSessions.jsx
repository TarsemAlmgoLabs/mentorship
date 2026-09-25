"use client";
import { useEffect, useContext } from "react";
import MentorContext from "../context/mentor.context";
import {
  CalendarDays,
  Clock3,
  IndianRupee,
  CheckCircle2,
  ArrowUpRight,
  Search,
} from "lucide-react";

// const pastSessions = [
//   {
//     initials: "AS",
//     name: "Arjun Sharma",
//     role: "Software Engineer",
//     topic: "Backend Development",
//     date: "12 Sep 2026",
//     duration: "45 min",
//     earning: 999,
//   },
//   {
//     initials: "RK",
//     name: "Rahul Kapoor",
//     role: "Frontend Developer",
//     topic: "System Design",
//     date: "08 Sep 2026",
//     duration: "60 min",
//     earning: 1199,
//   },
//   {
//     initials: "NP",
//     name: "Neha Patel",
//     role: "Product Analyst",
//     topic: "Career Guidance",
//     date: "05 Sep 2026",
//     duration: "45 min",
//     earning: 799,
//   },
//   {
//     initials: "VM",
//     name: "Vivek Mehra",
//     role: "Software Developer",
//     topic: "Interview Preparation",
//     date: "01 Sep 2026",
//     duration: "45 min",
//     earning: 999,
//   },
//   {
//     initials: "RK",
//     name: "Riya Kapoor",
//     role: "Full Stack Developer",
//     topic: "React & Next.js",
//     date: "28 Aug 2026",
//     duration: "60 min",
//     earning: 1499,
//   },
//   {
//     initials: "AM",
//     name: "Aditya Malhotra",
//     role: "Junior Developer",
//     topic: "Career Roadmap",
//     date: "24 Aug 2026",
//     duration: "45 min",
//     earning: 799,
//   },
// ];

export default function MentorPastSessions() {

  const {fetchPastEventsMentor, pastSessions} = useContext(MentorContext)

  useEffect(el=>{
    fetchPastEventsMentor();
  }, [])

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">

        {/* <div>
          <h2 className="text-2xl font-bold text-white">
            Past Sessions
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            View your completed mentorship sessions and earnings.
          </p>
        </div> */}

        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600"
          />

          <input
            type="text"
            placeholder="Search sessions..."
            className="w-full rounded-xl border border-white/[0.07] bg-[#101b27] py-3 pl-9 pr-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-cyan-400/30"
          />
        </div>

      </div>

      {/* Stats */}
      {/* <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

        <div className="rounded-2xl border border-white/[0.07] bg-[#101b27] p-5">
          <p className="text-xs text-slate-500">
            Total Sessions
          </p>

          <p className="mt-2 text-2xl font-black text-white">
            42
          </p>
        </div>

        <div className="rounded-2xl border border-white/[0.07] bg-[#101b27] p-5">
          <p className="text-xs text-slate-500">
            This Month
          </p>

          <p className="mt-2 text-2xl font-black text-cyan-400">
            12
          </p>
        </div>

        <div className="rounded-2xl border border-white/[0.07] bg-[#101b27] p-5">
          <p className="text-xs text-slate-500">
            Total Earned
          </p>

          <p className="mt-2 text-2xl font-black text-white">
            ₹42,650
          </p>
        </div>

      </div> */}

      {/* Session List */}
      <div className="space-y-3">

        {pastSessions.map((session) => (
          <div
            key={`${session.name}-${session.date}`}
            className="group rounded-2xl border border-white/[0.07] bg-[#101b27] p-5 transition-all duration-300 hover:border-cyan-400/25 hover:bg-[#111e2a]"
          >

            <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">

              {/* Candidate */}
              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-[#0d2a35]">
                  <span className="font-bold text-cyan-400">
                    {session.initials}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-white">
                    {session.name}
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    {session.role}
                  </p>
                </div>

              </div>

              {/* Topic */}
              <div className="min-w-[180px]">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-600">
                  Topic
                </p>

                <p className="mt-2 text-sm font-semibold text-white">
                  {session.topic}
                </p>
              </div>

              {/* Date */}
              <div className="min-w-[150px]">

                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <CalendarDays
                    size={15}
                    className="text-cyan-400"
                  />

                  {session.date}
                </div>

                <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                  <Clock3 size={14} />
                  {session.duration}
                </div>

              </div>

              {/* Status */}
              <div className="flex items-center gap-2">
                <CheckCircle2
                  size={16}
                  className="text-emerald-400"
                />

                <span className="text-xs font-medium text-emerald-400">
                  Completed
                </span>
              </div>

              {/* Earning */}
              <div className="flex items-center gap-2">

                <IndianRupee
                  size={16}
                  className="text-cyan-400"
                />

                <span className="text-base font-bold text-white">
                  {session.earning.toLocaleString("en-IN")}
                </span>

              </div>

              {/* Details */}
              <button
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 text-slate-500 transition hover:border-cyan-400/30 hover:text-cyan-400"
              >
                <ArrowUpRight size={17} />
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}