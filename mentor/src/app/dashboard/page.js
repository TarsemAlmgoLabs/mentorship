// "use client";

// import { useState } from "react";
// import { History, CalendarPlus, CalendarCheck } from "lucide-react";
// import Mentorship from "../components/landing";
// import NewBooking from "../components/newBooking";
// import PastSessions from "../components/pastSessions";
// import BookedSessions from "../components/bookedSessions";
// const tabs = [
//     {
//         id: "book",
//         label: "Book New Session",
//         icon: CalendarPlus,
//         heading: "Book a New Mentorship Session",
//     },
//     {
//         id: "past",
//         label: "Past Sessions",
//         icon: History,
//         heading: "Past Sessions",
//     },
//     {
//         id: "booked",
//         label: "Booked Sessions",
//         icon: CalendarCheck,
//         heading: "Booked Sessions",
//     },
// ];

// export default function MentorshipDashboard() {
//   const [activeTab, setActiveTab] = useState("past");

//   const active = tabs.find((tab) => tab.id === activeTab);

//   return (
//     <section className="min-h-screen bg-[#050d11] text-white">
//       <div className="mx-auto flex min-h-screen max-w-[1500px]">

//         {/* LEFT SIDEBAR */}
//         <aside className="w-[280px] shrink-0 border-r border-cyan-500/10 bg-[#071117] px-5 py-8">

//           {/* Brand */}
//           <div className="mb-10">
//             <div className="mb-2 flex items-center gap-3">
//               <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/10">
//                 <span className="text-lg font-bold text-cyan-400">V</span>
//               </div>

//               <div>
//                 <h2 className="text-lg font-bold tracking-wide">
//                   Mentorship
//                 </h2>
//                 <p className="text-xs text-slate-500">
//                   VeStaff
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Navigation */}
//           <nav className="space-y-3">
//             {tabs.map((tab) => {
//               const Icon = tab.icon;
//               const isActive = activeTab === tab.id;

//               return (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id)}
//                   className={`group flex w-full items-center gap-3 rounded-xl border px-4 py-4 text-left transition-all duration-200 ${
//                     isActive
//                       ? "border-cyan-400/30 bg-cyan-400/10 text-cyan-400 shadow-[0_0_25px_rgba(0,210,255,0.06)]"
//                       : "border-transparent text-slate-400 hover:border-cyan-400/10 hover:bg-white/[0.03] hover:text-white"
//                   }`}
//                 >
//                   <Icon
//                     size={19}
//                     className={
//                       isActive
//                         ? "text-cyan-400"
//                         : "text-slate-500 group-hover:text-cyan-400"
//                     }
//                   />

//                   <span className="text-sm font-medium">
//                     {tab.label}
//                   </span>
//                 </button>
//               );
//             })}
//           </nav>
//         </aside>

//         {/* RIGHT CONTENT */}
//         <main className="relative flex-1 overflow-hidden px-10 py-10">

//           {/* subtle grid */}
//           <div className="pointer-events-none absolute inset-0 opacity-30">
//             <div
//               className="absolute inset-0"
//               style={{
//                 backgroundImage:
//                   "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
//                 backgroundSize: "80px 80px",
//               }}
//             />
//           </div>

//           <div className="relative z-10">
//             {/* Top badge */}
//             <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2">
//               <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#00d9ff]" />
//               <span className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-400">
//                 Mentorship
//               </span>
//             </div>

//             {/* Conditional heading */}
//             {active && (
//               <div>
//                 <h1 className="text-4xl font-bold tracking-tight">
//                   {active.heading}
//                 </h1>

//                 <div className="mt-3 h-px w-full bg-gradient-to-r from-cyan-400/30 via-cyan-400/10 to-transparent" />
//               </div>
//             )}

//             {/* Components will come here later */}
//             <div className="mt-8">
//               {/* { */}
//                 {activeTab === "book" && <NewBooking />}
//                 {activeTab === "past" && <PastSessions />}
//                 {activeTab === "booked" && <BookedSessions />}
//               {/* } */}
//             </div>
//           </div>
//         </main>
//       </div>
//     </section>
//   );
// }


"use client";

import { useState } from "react";
import { History, CalendarPlus, CalendarCheck } from "lucide-react";
import NewBooking from "../components/newBooking";
import PastSessions from "../components/pastSessions";
import BookedSessions from "../components/bookedSessions";

const tabs = [
  {
    id: "book",
    label: "Book New Session",
    icon: CalendarPlus,
    heading: "Book a New Mentorship Session",
  },
  {
    id: "past",
    label: "Past Sessions",
    icon: History,
    heading: "Past Sessions",
  },
  {
    id: "booked",
    label: "Booked Sessions",
    icon: CalendarCheck,
    heading: "Booked Sessions",
  },
];

export default function MentorshipDashboard() {
  const [activeTab, setActiveTab] = useState("booked");

  const active = tabs.find((tab) => tab.id === activeTab);

  return (
    <section className="min-h-screen bg-[#050d11] text-white">
      <div className="mx-auto flex min-h-screen max-w-[1500px] flex-col lg:flex-row">

        {/* ================= LEFT SIDEBAR ================= */}
        <aside
          className="
            w-full shrink-0
            border-b border-cyan-500/10
            bg-[#071117]
            px-4 py-5
            lg:w-[280px]
            lg:border-b-0
            lg:border-r
            lg:px-5
            lg:py-8
          "
        >
          {/* Brand */}
          <div className="mb-5 lg:mb-10">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/10">
                <span className="text-lg font-bold text-cyan-400">
                  V
                </span>
              </div>

              <div>
                <h2 className="text-lg font-bold tracking-wide">
                  Mentorship
                </h2>

                <p className="text-xs text-slate-500">
                  VeStaff
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav
            className="
              flex gap-2 overflow-x-auto pb-1
              lg:flex-col
              lg:space-y-3
              lg:gap-0
              lg:overflow-visible
              lg:pb-0
            "
          >
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    group flex shrink-0 items-center gap-2
                    rounded-xl border px-4 py-3
                    text-left transition-all duration-200

                    sm:gap-3
                    sm:px-4
                    sm:py-3.5

                    lg:w-full
                    lg:py-4

                    ${
                      isActive
                        ? "border-cyan-400/30 bg-cyan-400/10 text-cyan-400 shadow-[0_0_25px_rgba(0,210,255,0.06)]"
                        : "border-transparent text-slate-400 hover:border-cyan-400/10 hover:bg-white/[0.03] hover:text-white"
                    }
                  `}
                >
                  <Icon
                    size={18}
                    className={
                      isActive
                        ? "shrink-0 text-cyan-400"
                        : "shrink-0 text-slate-500 group-hover:text-cyan-400"
                    }
                  />

                  <span className="whitespace-nowrap text-xs font-medium sm:text-sm">
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* ================= RIGHT CONTENT ================= */}
        <main
          className="
            relative flex-1 overflow-hidden
            px-4 py-6
            sm:px-6 sm:py-8
            md:px-8
            lg:px-10 lg:py-10
          "
        >
          {/* Subtle grid */}
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

          <div className="relative z-10">
            {/* Top badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-1.5 sm:mb-8 sm:px-4 sm:py-2">
              <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#00d9ff]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-400 sm:text-xs">
                Mentorship
              </span>
            </div>

            {/* Heading */}
            {active && (
              <div>
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
                  {active.heading}
                </h1>

                <div className="mt-3 h-px w-full bg-gradient-to-r from-cyan-400/30 via-cyan-400/10 to-transparent" />
              </div>
            )}

            {/* Content */}
            <div className="mt-6 sm:mt-8">
              {activeTab === "book" && <NewBooking />}

              {activeTab === "past" && <PastSessions />}

              {activeTab === "booked" && <BookedSessions />}
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}