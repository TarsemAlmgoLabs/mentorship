// "use client";

// import { useState } from "react";
// import { Clock, DollarSign, CheckCircle2 } from "lucide-react";

// const days = [
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday",
//   "Sunday",
// ];

// const priceTiers = [
//   500,
//   1000,
//   1500,
//   2000,
//   2500,
//   3000,
//   3500,
//   4000,
//   4500,
//   5000,
// ];

// export default function RegisterAsMentor() {
//   const [availability, setAvailability] = useState(
//     days.reduce((acc, day) => {
//       acc[day] = {
//         available: false,
//         from: "09:00",
//         to: "17:00",
//       };

//       return acc;
//     }, {})
//   );

//   const [priceTier, setPriceTier] = useState("1000");

//   const toggleDay = (day) => {
//     setAvailability((prev) => ({
//       ...prev,
//       [day]: {
//         ...prev[day],
//         available: !prev[day].available,
//       },
//     }));
//   };

//   const updateTime = (day, field, value) => {
//     setAvailability((prev) => ({
//       ...prev,
//       [day]: {
//         ...prev[day],
//         [field]: value,
//       },
//     }));
//   };

//   return (
//     <div className="flex min-h-full justify-center px-4 py-10">
//       <div className="w-full max-w-3xl">

//         {/* Heading */}
//         <div className="mb-8 text-center">
//           <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/25 bg-cyan-400/10">
//             <CheckCircle2
//               size={27}
//               className="text-cyan-400"
//             />
//           </div>

//           <h1 className="text-3xl font-bold text-white">
//             Register Yourself as a Mentor
//           </h1>

//           <p className="mx-auto mt-3 max-w-xl text-slate-400">
//             Set your availability and session pricing so learners
//             can book mentorship sessions with you.
//           </p>
//         </div>

//         {/* Form */}
//         <div className="rounded-3xl border border-cyan-400/15 bg-[#101b27] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.2)] md:p-8">

//           {/* Availability */}
//           <div>
//             <div className="mb-6">
//               <h2 className="text-xl font-bold text-white">
//                 Your Availability
//               </h2>

//               <p className="mt-1 text-sm text-slate-500">
//                 Select the days and time slots when you are
//                 available for mentorship.
//               </p>
//             </div>

//             <div className="space-y-3">
//               {days.map((day) => {
//                 const dayData = availability[day];

//                 return (
//                   <div
//                     key={day}
//                     className={`rounded-xl border p-4 transition-all ${
//                       dayData.available
//                         ? "border-cyan-400/25 bg-cyan-400/[0.04]"
//                         : "border-slate-700/70 bg-[#0c1620]"
//                     }`}
//                   >
//                     <div className="flex flex-col gap-4 md:flex-row md:items-center">

//                       {/* Day */}
//                       <div className="flex w-full items-center justify-between md:w-40">
//                         <span
//                           className={`text-sm font-semibold ${
//                             dayData.available
//                               ? "text-white"
//                               : "text-slate-500"
//                           }`}
//                         >
//                           {day}
//                         </span>

//                         {/* Toggle */}
//                         <button
//                           type="button"
//                           onClick={() => toggleDay(day)}
//                           className={`relative h-6 w-11 rounded-full transition ${
//                             dayData.available
//                               ? "bg-cyan-400"
//                               : "bg-slate-700"
//                           }`}
//                         >
//                           <span
//                             className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all ${
//                               dayData.available
//                                 ? "left-6"
//                                 : "left-1"
//                             }`}
//                           />
//                         </button>
//                       </div>

//                       {/* Time */}
//                       {dayData.available ? (
//                         <div className="flex flex-1 items-center gap-3">

//                           <div className="relative flex-1">
//                             <Clock
//                               size={15}
//                               className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400"
//                             />

//                             <input
//                               type="time"
//                               value={dayData.from}
//                               onChange={(e) =>
//                                 updateTime(
//                                   day,
//                                   "from",
//                                   e.target.value
//                                 )
//                               }
//                               className="w-full rounded-lg border border-slate-700 bg-[#0b1520] py-2.5 pl-9 pr-3 text-sm text-white outline-none focus:border-cyan-400/50"
//                             />
//                           </div>

//                           <span className="text-sm text-slate-600">
//                             to
//                           </span>

//                           <div className="relative flex-1">
//                             <Clock
//                               size={15}
//                               className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400"
//                             />

//                             <input
//                               type="time"
//                               value={dayData.to}
//                               onChange={(e) =>
//                                 updateTime(
//                                   day,
//                                   "to",
//                                   e.target.value
//                                 )
//                               }
//                               className="w-full rounded-lg border border-slate-700 bg-[#0b1520] py-2.5 pl-9 pr-3 text-sm text-white outline-none focus:border-cyan-400/50"
//                             />
//                           </div>

//                         </div>
//                       ) : (
//                         <span className="text-sm text-slate-600">
//                           Not available
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Divider */}
//           <div className="my-8 h-px bg-slate-700/60" />

//           {/* Price Tier */}
//           <div>
//             <div className="mb-5">
//               <h2 className="text-xl font-bold text-white">
//                 Price Tier
//               </h2>

//               <p className="mt-1 text-sm text-slate-500">
//                 Choose how much you want to charge per mentorship
//                 session.
//               </p>
//             </div>

//             <div className="relative">
//               <DollarSign
//                 size={18}
//                 className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400"
//               />

//               <select
//                 value={priceTier}
//                 onChange={(e) => setPriceTier(e.target.value)}
//                 className="w-full appearance-none rounded-xl border border-slate-700 bg-[#0b1520] px-12 py-4 text-base font-semibold text-white outline-none focus:border-cyan-400/50"
//               >
//                 {priceTiers.map((price) => (
//                   <option
//                     key={price}
//                     value={price}
//                     className="bg-[#0b1520]"
//                   >
//                     ₹{price.toLocaleString("en-IN")} / session
//                   </option>
//                 ))}
//               </select>

//               <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">
//                 ▼
//               </div>
//             </div>
//           </div>

//           {/* Submit */}
//           <button
//             type="button"
//             className="mt-8 w-full rounded-xl bg-cyan-400 px-6 py-4 text-base font-bold text-black transition-all hover:bg-cyan-300 hover:shadow-[0_0_30px_rgba(0,210,255,0.2)]"
//           >
//             Register as Mentor
//           </button>

//           <p className="mt-4 text-center text-xs text-slate-600">
//             You can update your availability and price tier later.
//           </p>

//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import {
  Clock3,
  DollarSign,
  Check,
  ChevronDown,
  Sparkles,
  CalendarDays,
} from "lucide-react";
import Link from "next/link";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const timeSlots = [
  "06:00 AM",
  "06:30 AM",
  "07:00 AM",
  "07:30 AM",
  "08:00 AM",
  "08:30 AM",
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "01:00 PM",
  "01:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
  "05:00 PM",
  "05:30 PM",
  "06:00 PM",
  "06:30 PM",
  "07:00 PM",
  "07:30 PM",
  "08:00 PM",
  "08:30 PM",
  "09:00 PM",
  "09:30 PM",
  "10:00 PM",
  "10:30 PM",
  "11:00 PM",
];

const priceTiers = [
  500,
  1000,
  1500,
  2000,
  2500,
  3000,
  3500,
  4000,
  4500,
  5000,
];

export default function RegisterAsMentor() {
  const [availability, setAvailability] = useState(
    days.reduce((acc, day) => {
      acc[day] = {
        available: false,
        from: "09:00 AM",
        to: "05:00 PM",
      };

      return acc;
    }, {})
  );

  const [priceTier, setPriceTier] = useState(1000);

  const toggleDay = (day) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        available: !prev[day].available,
      },
    }));
  };

  const updateTime = (day, field, value) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value,
      },
    }));
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050b10] px-4 py-14 text-white">

      {/* ================= BACKGROUND ================= */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,220,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(0,220,255,.8) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />

        {/* Glow 1 */}
        <div className="absolute -left-32 top-20 h-[420px] w-[420px] animate-pulse rounded-full bg-cyan-500/[0.08] blur-[120px]" />

        {/* Glow 2 */}
        <div className="absolute -right-32 top-[35%] h-[500px] w-[500px] animate-pulse rounded-full bg-blue-500/[0.07] blur-[140px]" />

        {/* Floating Orb */}
        <div className="absolute left-[15%] top-[20%] h-2 w-2 animate-bounce rounded-full bg-cyan-300 shadow-[0_0_25px_8px_rgba(0,220,255,.3)]" />

        <div className="absolute right-[20%] top-[65%] h-1.5 w-1.5 animate-ping rounded-full bg-cyan-400" />

      </div>

      {/* ================= CONTENT ================= */}

      <div className="relative z-10 mx-auto w-full max-w-4xl">

        {/* Heading */}
        <div className="mb-10 text-center">

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/[0.06] px-4 py-2 backdrop-blur-md">
            <Sparkles
              size={15}
              className="text-cyan-400"
            />

            <span className="text-xs font-semibold tracking-[0.2em] text-cyan-400">
              BECOME A MENTOR
            </span>
          </div>

          <h1 className="text-4xl font-black tracking-tight md:text-5xl">
            Register Yourself as a{" "}
            <span className="text-cyan-400">
              Mentor
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-400 md:text-base">
            Share your experience, guide ambitious learners and
            build meaningful connections on VeStaff.
          </p>
        </div>

        {/* ================= FORM CARD ================= */}

        <div className="relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#0b151f]/90 p-5 shadow-[0_30px_100px_rgba(0,0,0,.45)] backdrop-blur-xl md:p-8">

          {/* Top Glow */}
          <div className="pointer-events-none absolute left-1/2 top-0 h-px w-[60%] -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

          {/* ================= AVAILABILITY ================= */}

          <div>

            <div className="mb-7 flex items-start gap-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/[0.08]">
                <CalendarDays
                  size={20}
                  className="text-cyan-400"
                />
              </div>

              <div>
                <h2 className="text-xl font-bold">
                  Your Availability
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Choose when learners can book a session with you.
                </p>
              </div>

            </div>

            {/* Days */}
            <div className="space-y-3">

              {days.map((day) => {
                const data = availability[day];

                return (
                  <div
                    key={day}
                    className={`rounded-2xl border p-4 transition-all duration-300 ${
                      data.available
                        ? "border-cyan-400/25 bg-cyan-400/[0.045] shadow-[0_0_25px_rgba(0,220,255,.035)]"
                        : "border-white/[0.06] bg-white/[0.015] hover:border-white/[0.1]"
                    }`}
                  >

                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center">

                      {/* Day */}
                      <button
                        type="button"
                        onClick={() => toggleDay(day)}
                        className="flex items-center gap-4 text-left lg:w-[190px]"
                      >

                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all ${
                            data.available
                              ? "border-cyan-400/40 bg-cyan-400 text-black shadow-[0_0_18px_rgba(0,220,255,.2)]"
                              : "border-white/[0.08] bg-white/[0.03] text-slate-600"
                          }`}
                        >
                          {data.available ? (
                            <Check size={17} strokeWidth={3} />
                          ) : (
                            <span className="text-xs font-bold">
                              {day.slice(0, 2).toUpperCase()}
                            </span>
                          )}
                        </div>

                        <div>
                          <p
                            className={`text-sm font-semibold ${
                              data.available
                                ? "text-white"
                                : "text-slate-500"
                            }`}
                          >
                            {day}
                          </p>

                          <p className="mt-0.5 text-[11px] text-slate-600">
                            {data.available
                              ? "Available"
                              : "Unavailable"}
                          </p>
                        </div>

                      </button>

                      {/* Time Selection */}
                      {data.available ? (
                        <div className="flex flex-1 items-center gap-3">

                          <TimeSelect
                            value={data.from}
                            onChange={(value) =>
                              updateTime(day, "from", value)
                            }
                            label="FROM"
                          />

                          <div className="hidden h-px w-5 bg-slate-700 sm:block" />

                          <TimeSelect
                            value={data.to}
                            onChange={(value) =>
                              updateTime(day, "to", value)
                            }
                            label="TO"
                          />

                        </div>
                      ) : (
                        <div className="hidden flex-1 items-center lg:flex">
                          <span className="text-xs text-slate-700">
                            Turn on availability to set your hours
                          </span>
                        </div>
                      )}

                      {/* Toggle */}
                      <button
                        type="button"
                        onClick={() => toggleDay(day)}
                        className={`relative h-7 w-12 shrink-0 rounded-full transition-all ${
                          data.available
                            ? "bg-cyan-400"
                            : "bg-slate-800"
                        }`}
                      >
                        <span
                          className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all ${
                            data.available
                              ? "left-6"
                              : "left-1"
                          }`}
                        />
                      </button>

                    </div>
                  </div>
                );
              })}

            </div>
          </div>

          {/* Divider */}
          <div className="my-10 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

          {/* ================= PRICE ================= */}

          <div>

            <div className="mb-6 flex items-start gap-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/[0.08]">
                <DollarSign
                  size={20}
                  className="text-cyan-400"
                />
              </div>

              <div>
                <h2 className="text-xl font-bold">
                  Price Tier
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Set your price for a single mentorship session.
                </p>
              </div>

            </div>

            {/* Price Options */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">

              {priceTiers.map((price) => {
                const selected = priceTier === price;

                return (
                  <button
                    key={price}
                    type="button"
                    onClick={() => setPriceTier(price)}
                    className={`relative rounded-xl border px-4 py-4 text-sm font-bold transition-all duration-200 ${
                      selected
                        ? "border-cyan-400 bg-cyan-400 text-black shadow-[0_0_25px_rgba(0,220,255,.15)]"
                        : "border-white/[0.07] bg-white/[0.02] text-slate-400 hover:border-cyan-400/30 hover:text-white"
                    }`}
                  >
                    ₹{price.toLocaleString("en-IN")}

                    {selected && (
                      <Check
                        size={13}
                        strokeWidth={3}
                        className="absolute right-2 top-2"
                      />
                    )}
                  </button>
                );
              })}

            </div>

            {/* Selected Price */}
            <div className="mt-5 flex items-center justify-between rounded-xl border border-cyan-400/10 bg-cyan-400/[0.035] px-5 py-4">

              <span className="text-sm text-slate-500">
                Your session price
              </span>

              <span className="text-xl font-black text-cyan-400">
                ₹{priceTier.toLocaleString("en-IN")}
                <span className="ml-1 text-xs font-medium text-slate-600">
                  / session
                </span>
              </span>

            </div>

          </div>

          {/* Submit */}
          <Link
            href={"/mentor"}
            type="button"
            className="group mt-9 flex w-full items-center justify-center gap-3 rounded-2xl bg-cyan-400 px-6 py-4 font-bold text-black transition-all duration-300 hover:bg-cyan-300 hover:shadow-[0_0_35px_rgba(0,220,255,.2)]"
          >
            <Check size={18} strokeWidth={3} />

            Complete Mentor Registration

            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>

          <p className="mt-4 text-center text-xs text-slate-600">
            You can change your availability and price anytime.
          </p>

        </div>
      </div>
    </div>
  );
}


/* =====================================================
   CUSTOM TIME SELECT
===================================================== */

function TimeSelect({ value, onChange, label }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex-1">

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`flex w-full items-center justify-between rounded-xl border bg-[#07111a] px-4 py-3 text-left transition-all ${
          open
            ? "border-cyan-400/50 shadow-[0_0_20px_rgba(0,220,255,.06)]"
            : "border-white/[0.07] hover:border-cyan-400/25"
        }`}
      >

        <div>
          <p className="mb-1 text-[9px] font-bold tracking-[0.2em] text-slate-600">
            {label}
          </p>

          <div className="flex items-center gap-2">
            <Clock3
              size={15}
              className="text-cyan-400"
            />

            <span className="text-sm font-semibold text-white">
              {value}
            </span>
          </div>
        </div>

        <ChevronDown
          size={16}
          className={`text-slate-600 transition-transform ${
            open ? "rotate-180 text-cyan-400" : ""
          }`}
        />

      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 max-h-60 overflow-y-auto rounded-xl border border-cyan-400/20 bg-[#0b151f] p-1.5 shadow-[0_20px_50px_rgba(0,0,0,.6)]">

          {timeSlots.map((time) => (
            <button
              key={time}
              type="button"
              onClick={() => {
                onChange(time);
                setOpen(false);
              }}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm transition ${
                value === time
                  ? "bg-cyan-400/10 text-cyan-400"
                  : "text-slate-400 hover:bg-white/[0.04] hover:text-white"
              }`}
            >
              {time}

              {value === time && (
                <Check size={14} />
              )}
            </button>
          ))}

        </div>
      )}

    </div>
  );
}