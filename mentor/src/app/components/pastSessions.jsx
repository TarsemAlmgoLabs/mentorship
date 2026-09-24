"use client";

import { CalendarDays, Clock, ArrowUpRight } from "lucide-react";
import { useEffect, useContext } from "react";
import UserContext from "../context/user.context";

// const pastSessions = [
//   {
//     initials: "VK",
//     name: "Vikas Kumar",
//     role: "Senior Software Engineer",
//     company: "Google",
//     topic: "Backend Development",
//     date: "12 Sep 2026",
//     time: "6:00 PM",
//     duration: "45 min",
//   },
//   {
//     initials: "PM",
//     name: "Priya Mehta",
//     role: "Product Manager",
//     company: "Microsoft",
//     topic: "Product Management",
//     date: "05 Sep 2026",
//     time: "7:30 PM",
//     duration: "45 min",
//   },
//   {
//     initials: "AK",
//     name: "Aman Kapoor",
//     role: "Cloud Architect",
//     company: "Amazon",
//     topic: "Cloud & DevOps",
//     date: "28 Aug 2026",
//     time: "5:00 PM",
//     duration: "60 min",
//   },
//   {
//     initials: "SN",
//     name: "Sneha Nair",
//     role: "Senior UX Designer",
//     company: "Adobe",
//     topic: "UI/UX Design",
//     date: "20 Aug 2026",
//     time: "8:00 PM",
//     duration: "45 min",
//   },
// ];

export default function PastSessions() {
  const {Loading, pastSessions,fetchPastSessions} = useContext(UserContext);

  useEffect(el=>{
    fetchPastSessions();
  }, [])

  return (
    <div className="space-y-8">

      {/* Header */}
      {/* <div>
        <h2 className="text-2xl font-bold text-white">
          Session History
        </h2>

        <p className="mt-2 text-slate-400">
          View your previous mentorship sessions.
        </p>
      </div> */}

      {/* History */}
      <div className="space-y-4">
        {pastSessions.map((session) => (
          <div
            key={`${session.name}-${session.date}`}
            className="group flex items-center justify-between gap-6 rounded-2xl border border-cyan-400/15 bg-[#101b27] p-5 transition-all duration-200 hover:border-cyan-400/30 hover:bg-[#121f2c]"
          >
            {/* Mentor */}
            <div className="flex items-center gap-5">

              {/* Avatar */}
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-cyan-400/25 bg-[#0d2a35]">
                <span className="font-bold text-cyan-400">
                  {session.initials}
                </span>
              </div>

              {/* Info */}
              <div>
                <h3 className="font-bold text-white">
                  {session.name}
                </h3>

                <p className="mt-1 text-sm text-slate-400">
                  {session.role}
                </p>

                <p className="mt-1 text-sm text-cyan-400">
                  {session.company}
                </p>
              </div>
            </div>

            {/* Topic */}
            <div className="hidden min-w-[180px] md:block">
              <p className="text-xs uppercase tracking-wider text-slate-500">
                Topic
              </p>

              <p className="mt-2 text-sm font-medium text-white">
                {session.topic}
              </p>
            </div>

            {/* Date */}
            <div className="hidden min-w-[150px] lg:block">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <CalendarDays size={16} className="text-cyan-400" />
                {session.date}
              </div>

              <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                <Clock size={15} />
                {session.time} · {session.duration}
              </div>
            </div>

            {/* Status + Action */}
            <div className="flex items-center gap-4">
              <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs font-medium text-emerald-400">
                Completed
              </span>

              {/* <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 text-slate-400 transition hover:border-cyan-400/30 hover:text-cyan-400">
                <ArrowUpRight size={18} />
              </button> */}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}