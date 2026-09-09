"use client";

import { useState } from "react";
import {
  Search,
  Star,
  Clock3,
  CalendarDays,
  ArrowUpRight,
  CheckCircle2,
  Video,
  Users,
  X,
} from "lucide-react";

const mentors = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "Senior Software Engineer",
    company: "Google",
    initials: "RS",
    expertise: "Backend Development",
    skills: ["Node.js", "System Design", "AWS"],
    experience: "8+ Years",
    rating: "4.9",
    sessions: "320+",
    price: "999",
    availability: "Available Today",
  },
  {
    id: 2,
    name: "Priya Mehta",
    role: "Product Manager",
    company: "Microsoft",
    initials: "PM",
    expertise: "Product Management",
    skills: ["Product Strategy", "PM", "Analytics"],
    experience: "7+ Years",
    rating: "4.8",
    sessions: "240+",
    price: "799",
    availability: "Available Tomorrow",
  },
  {
    id: 3,
    name: "Arjun Kapoor",
    role: "AI / ML Engineer",
    company: "Amazon",
    initials: "AK",
    expertise: "Artificial Intelligence",
    skills: ["Python", "Machine Learning", "GenAI"],
    experience: "6+ Years",
    rating: "5.0",
    sessions: "190+",
    price: "1199",
    availability: "Available Today",
  },
  {
    id: 4,
    name: "Neha Verma",
    role: "UX Design Lead",
    company: "Adobe",
    initials: "NV",
    expertise: "UI/UX Design",
    skills: ["UX Research", "Figma", "Portfolio"],
    experience: "6+ Years",
    rating: "4.9",
    sessions: "170+",
    price: "699",
    availability: "Available This Week",
  },
  {
    id: 5,
    name: "Vikram Singh",
    role: "Engineering Manager",
    company: "Microsoft",
    initials: "VS",
    expertise: "Career & Leadership",
    skills: ["Leadership", "Interviews", "Career"],
    experience: "11+ Years",
    rating: "4.9",
    sessions: "410+",
    price: "1499",
    availability: "Available Tomorrow",
  },
  {
    id: 6,
    name: "Ananya Rao",
    role: "Data Scientist",
    company: "Flipkart",
    initials: "AR",
    expertise: "Data Science",
    skills: ["Python", "SQL", "Data Science"],
    experience: "5+ Years",
    rating: "4.8",
    sessions: "150+",
    price: "899",
    availability: "Available Today",
  },
];

export default function Mentorship() {
  const [search, setSearch] = useState("");
  const [selectedMentor, setSelectedMentor] = useState(null);

  const filteredMentors = mentors.filter((mentor) => {
    const query = search.toLowerCase();

    return (
      mentor.name.toLowerCase().includes(query) ||
      mentor.role.toLowerCase().includes(query) ||
      mentor.expertise.toLowerCase().includes(query) ||
      mentor.skills.some((skill) =>
        skill.toLowerCase().includes(query)
      )
    );
  });

  return (
    <div className="min-h-screen bg-[#070d11] text-white">

      {/* ================= BACKGROUND GRID ================= */}

      <div
        className="fixed inset-0 pointer-events-none opacity-[0.45]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)
          `,
          backgroundSize: "59px 59px",
        }}
      />

      {/* Cyan ambient glow */}

      <div className="fixed left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-cyan-500/[0.035] blur-[130px] pointer-events-none" />


      {/* ================= CONTENT ================= */}

      <div className="relative mx-auto max-w-[1500px] px-6 py-12 md:px-10 lg:px-14">

        {/* ================= HERO ================= */}

        <div className="mx-auto max-w-4xl text-center">

          {/* Badge */}

          <div className="mx-auto mb-7 inline-flex items-center gap-2 rounded-lg border border-cyan-400/30 bg-cyan-400/[0.08] px-5 py-2.5">

            <Users
              size={17}
              className="text-cyan-400"
            />

            <span className="text-sm font-semibold tracking-[0.22em] text-cyan-400">
              MENTORSHIP
            </span>

          </div>


          {/* Heading */}

          <h1 className="text-5xl font-bold tracking-tight md:text-6xl lg:text-[64px]">
            Learn From{" "}
            <span className="text-cyan-400">
              Industry Experts
            </span>
          </h1>


          {/* Description */}

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#8ea7c5] md:text-xl">

            Get personalized guidance from experienced
            professionals and accelerate your career with
            one-on-one mentorship.

          </p>


          {/* Verified */}

          <div className="mx-auto mt-8 inline-flex items-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.025] px-5 py-2.5">

            <CheckCircle2
              size={16}
              className="text-cyan-400"
            />

            <span className="text-sm text-[#91a5bd]">
              Verified by VeStaff
            </span>

          </div>

        </div>


        {/* ================= SECTION HEADER ================= */}

        <div className="mt-20 flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">

          <div>

            <h2 className="text-2xl font-bold md:text-3xl">
              Available Mentors on VeStaff
            </h2>

            <p className="mt-2 text-base text-[#7189a6]">
              Find the right mentor to help you reach your goals.
            </p>

          </div>


          {/* Search */}

          <div className="relative w-full lg:w-[420px]">

            <Search
              size={22}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-cyan-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search mentors..."
              className="h-[60px] w-full rounded-2xl border border-[#26374a] bg-[#172232] pl-14 pr-5 text-base text-white outline-none placeholder:text-[#7186a2] transition focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20"
            />

          </div>

        </div>


        {/* ================= MENTOR GRID ================= */}

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {filteredMentors.map((mentor) => (

            <MentorCard
              key={mentor.id}
              mentor={mentor}
              onBook={() => setSelectedMentor(mentor)}
            />

          ))}

        </div>


        {/* Empty state */}

        {filteredMentors.length === 0 && (

          <div className="mt-10 rounded-2xl border border-[#203246] bg-[#101925] py-20 text-center">

            <Search
              size={35}
              className="mx-auto mb-4 text-[#526b87]"
            />

            <h3 className="text-xl font-semibold">
              No mentors found
            </h3>

            <p className="mt-2 text-sm text-[#7189a6]">
              Try searching for a different skill or role.
            </p>

          </div>

        )}


        {/* ================= BOTTOM TRUST ================= */}

        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 border-t border-white/[0.07] py-8">

          <TrustItem
            icon={<CheckCircle2 size={17} />}
            text="Verified Mentors"
          />

          <TrustItem
            icon={<Video size={17} />}
            text="1:1 Video Sessions"
          />

          <TrustItem
            icon={<CalendarDays size={17} />}
            text="Flexible Scheduling"
          />

          <TrustItem
            icon={<CheckCircle2 size={17} />}
            text="Secure Payments"
          />

        </div>

      </div>


      {/* ================= BOOKING MODAL ================= */}

      {selectedMentor && (

        <BookingModal
          mentor={selectedMentor}
          onClose={() => setSelectedMentor(null)}
        />

      )}

    </div>
  );
}


/* ========================================================= */
/* MENTOR CARD */
/* ========================================================= */

function MentorCard({ mentor, onBook }) {

  return (

    <div className="group relative overflow-hidden rounded-2xl border border-[#173b4e] bg-[#101925] transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/50 hover:shadow-[0_0_35px_rgba(0,217,255,0.08)]">

      {/* Top Cyan Line */}

      <div className="absolute left-0 right-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent opacity-70" />


      <div className="p-7">

        {/* ================= TOP ================= */}

        <div className="flex items-start justify-between">

          {/* Avatar */}

          <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-cyan-400/25 bg-cyan-400/[0.08] text-lg font-bold text-cyan-400">

            {mentor.initials}

          </div>


          {/* Rating */}

          <div className="flex items-center gap-1.5 rounded-lg border border-[#26384d] bg-[#0b141e] px-3 py-2">

            <Star
              size={15}
              className="fill-yellow-400 text-yellow-400"
            />

            <span className="text-sm font-semibold">
              {mentor.rating}
            </span>

          </div>

        </div>


        {/* ================= NAME ================= */}

        <div className="mt-6">

          <h3 className="text-xl font-bold">
            {mentor.name}
          </h3>

          <p className="mt-1 text-sm text-[#8aa0bb]">
            {mentor.role}
          </p>

          <p className="mt-1 text-sm font-medium text-cyan-400">
            {mentor.company}
          </p>

        </div>


        {/* ================= EXPERTISE ================= */}

        <div className="mt-6">

          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-cyan-400">
            {mentor.expertise}
          </p>

          <div className="flex flex-wrap gap-2">

            {mentor.skills.map((skill) => (

              <span
                key={skill}
                className="rounded-md border border-[#26384d] bg-[#0d1722] px-2.5 py-1.5 text-xs text-[#8ea2ba]"
              >
                {skill}
              </span>

            ))}

          </div>

        </div>


        {/* ================= STATS ================= */}

        <div className="mt-6 grid grid-cols-2 gap-3 border-y border-[#213143] py-5">

          <div>

            <p className="text-xs text-[#617891]">
              Experience
            </p>

            <p className="mt-1 text-sm font-semibold">
              {mentor.experience}
            </p>

          </div>


          <div>

            <p className="text-xs text-[#617891]">
              Sessions Completed
            </p>

            <p className="mt-1 text-sm font-semibold">
              {mentor.sessions}
            </p>

          </div>

        </div>


        {/* ================= AVAILABILITY ================= */}

        <div className="mt-5 flex items-center gap-2">

          <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,217,255,0.7)]" />

          <span className="text-sm text-[#8197b1]">
            {mentor.availability}
          </span>

        </div>


        {/* ================= FOOTER ================= */}

        <div className="mt-6 flex items-center justify-between">

          <div>

            <span className="text-2xl font-bold">
              ₹{mentor.price}
            </span>

            <span className="ml-1 text-xs text-[#617891]">
              / session
            </span>

          </div>


          <button
            onClick={onBook}
            className="group/btn flex cursor-pointer items-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-bold text-[#061016] transition-all hover:bg-cyan-300 hover:shadow-[0_0_20px_rgba(0,217,255,0.25)]"
          >

            Book Session

            <ArrowUpRight
              size={16}
              className="transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
            />

          </button>

        </div>

      </div>

    </div>

  );
}


/* ========================================================= */
/* TRUST ITEM */
/* ========================================================= */

function TrustItem({ icon, text }) {

  return (

    <div className="flex items-center gap-2 text-sm text-[#617891]">

      <span className="text-cyan-400">
        {icon}
      </span>

      {text}

    </div>

  );

}


/* ========================================================= */
/* BOOKING MODAL */
/* ========================================================= */

function BookingModal({ mentor, onClose }) {

  const [duration, setDuration] = useState(30);
  const [selectedDate, setSelectedDate] = useState("Today");
  const [selectedTime, setSelectedTime] = useState("12:30 PM");

  const dates = [
    { day: "Today", date: "09" },
    { day: "Tomorrow", date: "10" },
    { day: "Fri", date: "11" },
    { day: "Sat", date: "12" },
    { day: "Sun", date: "13" },
  ];

  const times = [
    "10:00 AM",
    "12:30 PM",
    "3:00 PM",
    "5:30 PM",
    "7:00 PM",
    "8:30 PM",
  ];

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">

      <div className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-[#24445a] bg-[#0d1722] shadow-[0_0_60px_rgba(0,217,255,0.08)]">

        {/* Cyan Top */}

        <div className="absolute left-0 right-0 top-0 h-[2px] bg-cyan-400" />


        {/* Close */}

        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-lg p-2 text-[#70869e] transition hover:bg-white/[0.06] hover:text-white"
        >
          <X size={20} />
        </button>


        <div className="p-7 md:p-8">

          {/* Header */}

          <div className="flex items-center gap-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-cyan-400/25 bg-cyan-400/[0.08] font-bold text-cyan-400">
              {mentor.initials}
            </div>

            <div>

              <p className="text-xs uppercase tracking-wider text-cyan-400">
                Book Mentorship
              </p>

              <h3 className="mt-1 text-xl font-bold">
                {mentor.name}
              </h3>

              <p className="text-sm text-[#7189a6]">
                {mentor.role} · {mentor.company}
              </p>

            </div>

          </div>


          {/* Duration */}

          <div className="mt-8">

            <h4 className="mb-3 text-sm font-semibold">
              Select Session Duration
            </h4>

            <div className="grid grid-cols-2 gap-3">

              {[30, 60].map((time) => (

                <button
                  key={time}
                  onClick={() => setDuration(time)}
                  className={`rounded-xl border p-4 text-left transition ${
                    duration === time
                      ? "border-cyan-400/60 bg-cyan-400/[0.08]"
                      : "border-[#26384d] bg-[#111d2a] hover:border-[#3b526b]"
                  }`}
                >

                  <div className="flex items-center justify-between">

                    <span className="text-sm font-semibold">
                      {time} Minutes
                    </span>

                    {duration === time && (
                      <CheckCircle2
                        size={17}
                        className="text-cyan-400"
                      />
                    )}

                  </div>

                  <p className="mt-1 text-xs text-[#6e849d]">
                    ₹
                    {time === 30
                      ? mentor.price
                      : mentor.price * 2 - 199}
                  </p>

                </button>

              ))}

            </div>

          </div>


          {/* Date */}

          <div className="mt-7">

            <h4 className="mb-3 text-sm font-semibold">
              Choose Date
            </h4>

            <div className="grid grid-cols-5 gap-2">

              {dates.map((item) => (

                <button
                  key={item.day}
                  onClick={() => setSelectedDate(item.day)}
                  className={`rounded-xl border py-3 transition ${
                    selectedDate === item.day
                      ? "border-cyan-400/60 bg-cyan-400/[0.1] text-cyan-400"
                      : "border-[#26384d] bg-[#111d2a] text-[#7189a6]"
                  }`}
                >

                  <p className="text-[11px]">
                    {item.day}
                  </p>

                  <p className="mt-1 text-sm font-bold">
                    {item.date}
                  </p>

                </button>

              ))}

            </div>

          </div>


          {/* Time */}

          <div className="mt-7">

            <h4 className="mb-3 text-sm font-semibold">
              Available Time
            </h4>

            <div className="grid grid-cols-3 gap-2">

              {times.map((time) => (

                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`rounded-xl border py-3 text-xs font-medium transition ${
                    selectedTime === time
                      ? "border-cyan-400/60 bg-cyan-400/[0.1] text-cyan-400"
                      : "border-[#26384d] bg-[#111d2a] text-[#7189a6] hover:border-[#3b526b]"
                  }`}
                >
                  {time}
                </button>

              ))}

            </div>

          </div>


          {/* Summary */}

          <div className="mt-7 rounded-xl border border-[#25394c] bg-[#101c28] p-4">

            <div className="flex items-center justify-between">

              <span className="text-sm text-[#7189a6]">
                {duration} min session
              </span>

              <span className="text-lg font-bold">
                ₹
                {duration === 30
                  ? mentor.price
                  : mentor.price * 2 - 199}
              </span>

            </div>

            <div className="mt-2 flex items-center gap-2 text-xs text-[#617891]">

              <CalendarDays size={14} />

              {selectedDate} · {selectedTime}

            </div>

          </div>


          {/* CTA */}

          <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 py-4 text-sm font-bold text-[#061016] transition hover:bg-cyan-300 hover:shadow-[0_0_25px_rgba(0,217,255,0.2)]">

            Continue to Payment

            <ArrowUpRight size={17} />

          </button>


          <p className="mt-3 text-center text-[11px] text-[#536a82]">
            Secure payment · Easy rescheduling · 1:1 video session
          </p>

        </div>

      </div>

    </div>

  );
}