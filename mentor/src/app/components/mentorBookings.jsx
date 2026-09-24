"use client";

import {
  CalendarDays,
  Clock3,
  Video,
  ArrowUpRight,
  MoreHorizontal,
  UserRound,
} from "lucide-react";
import { useEffect, useContext } from "react";
import MentorContext from "../context/mentor.context";
// const bookedSessions = [
//   {
//     initials: "AS",
//     name: "Arjun Sharma",
//     role: "Software Engineer",
//     topic: "Backend Development",
//     date: "18 Sep 2026",
//     time: "06:00 PM",
//     duration: "45 min",
//     status: "Upcoming",
//   },
//   {
//     initials: "RK",
//     name: "Rahul Kapoor",
//     role: "Frontend Developer",
//     topic: "System Design",
//     date: "19 Sep 2026",
//     time: "07:30 PM",
//     duration: "60 min",
//     status: "Upcoming",
//   },
//   {
//     initials: "NP",
//     name: "Neha Patel",
//     role: "Product Analyst",
//     topic: "Career Guidance",
//     date: "21 Sep 2026",
//     time: "05:00 PM",
//     duration: "45 min",
//     status: "Upcoming",
//   },
//   {
//     initials: "VM",
//     name: "Vivek Mehra",
//     role: "Software Developer",
//     topic: "Interview Preparation",
//     date: "23 Sep 2026",
//     time: "08:00 PM",
//     duration: "45 min",
//     status: "Upcoming",
//   },
// ];

export default function MentorBookedSessions() {

  const {fetchAllUpcomingSessionsMentors, bookedSessions} = useContext(MentorContext);
  console.log(bookedSessions)
  useEffect(el=>{
    fetchAllUpcomingSessionsMentors();
  },[])

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white">
          Upcoming Sessions
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Manage and prepare for your upcoming mentorship sessions.
        </p>
      </div>

      {/* Session Count */}
      <div className="flex items-center justify-between rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.035] px-5 py-4">
        <div className="flex items-center gap-3">
          <CalendarDays
            size={19}
            className="text-cyan-400"
          />

          <span className="text-sm text-slate-400">
            Upcoming Sessions
          </span>
        </div>

        <span className="text-lg font-bold text-cyan-400">
          {bookedSessions.length}
        </span>
      </div>

      {/* Sessions */}
      <div className="space-y-4">

        {bookedSessions.map((session) => (
          <div
            key={`${session.name}-${session.date}`}
            className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#101b27] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/25 hover:shadow-[0_15px_45px_rgba(0,210,255,.05)]"
          >

            {/* Hover Glow */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-cyan-400/[0.04] blur-3xl transition-all group-hover:bg-cyan-400/[0.08]" />

            <div className="relative flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">

              {/* Candidate */}
              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-cyan-400/25 bg-[#0d2a35]">
                  <span className="font-bold text-cyan-400">
                    {session.initials}
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-bold text-white">
                      {session.name}
                    </h3>

                    <span className="rounded-full border border-cyan-400/15 bg-cyan-400/[0.07] px-2.5 py-1 text-[10px] font-semibold text-cyan-400">
                      {session.status}
                    </span>
                  </div>

                  <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                    <UserRound size={13} />
                    {session.role}
                  </div>
                </div>

              </div>

              {/* Topic */}
              <div className="min-w-[180px]">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-600">
                  Session Topic
                </p>

                <p className="mt-2 text-sm font-semibold text-white">
                  {session.topic}
                </p>
              </div>

              {/* Date & Time */}
              <div className="min-w-[180px]">

                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <CalendarDays
                    size={15}
                    className="text-cyan-400"
                  />

                  {session.date}
                </div>

                <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                  <Clock3 size={14} />

                  {session.time} · {session.duration}
                </div>

              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">

                <button
                  className="flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-bold text-black transition-all hover:bg-cyan-300 hover:shadow-[0_0_25px_rgba(0,220,255,.18)]"
                >
                  <Video size={16} />
                  Start Session
                </button>

                <button
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-700 text-slate-400 transition hover:border-cyan-400/30 hover:text-cyan-400"
                >
                  <MoreHorizontal size={19} />
                </button>

              </div>

            </div>

            {/* Bottom */}
            <div className="relative mt-5 flex items-center justify-between border-t border-white/[0.05] pt-4">

              <p className="text-xs text-slate-600">
                Session link will be available before the scheduled time.
              </p>

              <button className="flex items-center gap-1 text-xs font-semibold text-cyan-400 transition hover:text-cyan-300">
                View Details
                <ArrowUpRight size={14} />
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}