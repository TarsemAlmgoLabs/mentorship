"use client";

import {
  CalendarDays,
  Clock,
  Video,
  ArrowUpRight,
  MoreHorizontal,
} from "lucide-react";
import UserContext from "../context/user.context";
import { useEffect, useContext } from "react";
// const bookedSessions = [
//   {
//     initials: "RS",
//     name: "Vikas Kumar",
//     role: "Senior Software Engineer",
//     company: "Google",
//     topic: "Backend Development",
//     date: "18 Sep 2026",
//     time: "6:00 PM",
//     duration: "45 min",
//     status: "Upcoming",
//   },
//   {
//     initials: "AK",
//     name: "Aman Kapoor",
//     role: "Cloud Architect",
//     company: "Amazon",
//     topic: "System Design",
//     date: "22 Sep 2026",
//     time: "7:30 PM",
//     duration: "60 min",
//     status: "Upcoming",
//   },
//   {
//     initials: "PM",
//     name: "Priya Mehta",
//     role: "Product Manager",
//     company: "Microsoft",
//     topic: "Product Strategy",
//     date: "28 Sep 2026",
//     time: "5:00 PM",
//     duration: "45 min",
//     status: "Upcoming",
//   },
// ];

export default function BookedSessions() {
  const {Loading, fetchAllUpcomingSessions,bookedSessions} = useContext(UserContext);
  useEffect(el=>{
    fetchAllUpcomingSessions();
  }, [])

  return (
    <div className="space-y-8">

      {/* Header */}
      {/* <div>
        <h2 className="text-2xl font-bold text-white">
          Booked Sessions
        </h2>

        <p className="mt-2 text-slate-400">
          Manage your upcoming mentorship sessions.
        </p>
      </div> */}

      {/* Sessions */}
      <div className="space-y-5">
        {bookedSessions.map((session) => (
          <div
            key={`${session.name}-${session.date}`}
            className="rounded-2xl border border-cyan-400/20 bg-[#101b27] p-6 transition-all duration-300 hover:border-cyan-400/35 hover:shadow-[0_10px_40px_rgba(0,210,255,0.06)]"
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

              {/* Mentor */}
              <div className="flex items-center gap-5">

                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-cyan-400/25 bg-[#0d2a35]">
                  <span className="font-bold text-cyan-400">
                    {session.initials}
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-bold text-white">
                      {session.name}
                    </h3>

                    <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2.5 py-1 text-[11px] font-semibold text-cyan-400">
                      {session.status}
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-slate-400">
                    {session.role}
                  </p>

                  <p className="mt-1 text-sm text-cyan-400">
                    {session.company}
                  </p>
                </div>
              </div>

              {/* Session Details */}
              <div className="flex flex-wrap gap-6">

                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-500">
                    Topic
                  </p>

                  <p className="mt-2 text-sm font-medium text-white">
                    {session.topic}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-500">
                    Date & Time
                  </p>

                  <div className="mt-2 flex items-center gap-2 text-sm text-slate-300">
                    <CalendarDays size={15} className="text-cyan-400" />
                    {session.date}
                  </div>

                  <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                    <Clock size={14} />
                    {session.time} · {session.duration}
                  </div>
                </div>

              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">

                <button
                  className="flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-black transition hover:bg-cyan-300"
                >
                  <Video size={17} />
                  Join Session
                </button>
{/* 
                <button
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-700 text-slate-400 transition hover:border-cyan-400/30 hover:text-cyan-400"
                >
                  <MoreHorizontal size={20} />
                </button> */}

              </div>
            </div>

            {/* Bottom Info */}
            <div className="mt-6 flex items-center justify-between border-t border-slate-700/60 pt-5">

              <p className="text-sm text-slate-500">
                Session link will be available before the scheduled time.
              </p>

              {/* <button className="flex items-center gap-1 text-sm font-medium text-cyan-400 transition hover:text-cyan-300">
                View Details
                <ArrowUpRight size={15} />
              </button> */}

            </div>
          </div>
        ))}
      </div>

    </div>
  );
}