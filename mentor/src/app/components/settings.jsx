"use client";

import { useState } from "react";
import {
  Settings,
  IndianRupee,
  CalendarDays,
  Clock3,
  Check,
  Save,
} from "lucide-react";

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
];

export default function MentorSettings() {
  const [price, setPrice] = useState("1000");

  const [availability, setAvailability] = useState(
    days.reduce((acc, day) => {
      acc[day] = {
        available: day !== "Sunday",
        from: "09:00 AM",
        to: "05:00 PM",
      };

      return acc;
    }, {})
  );

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

  const saveSettings = () => {
    const settings = {
      price: Number(price),
      availability,
    };

    console.log("Mentor Settings:", settings);

    // API call yahan baad mein:
    // await fetch("/api/mentor/settings", {
    //   method: "PUT",
    //   body: JSON.stringify(settings),
    // });
  };

  return (
    <div className="relative mx-auto max-w-4xl space-y-8">

      {/* ================= HEADER ================= */}

      <div>
        <div className="mb-3 inline-flex items-center gap-2 rounded-lg border border-cyan-400/20 bg-cyan-400/[0.06] px-3 py-2">
          <Settings size={15} className="text-cyan-400" />

          <span className="text-xs font-semibold tracking-[0.15em] text-cyan-400">
            MENTOR SETTINGS
          </span>
        </div>

        <h2 className="text-3xl font-bold text-white">
          Manage Your Availability
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Control your session price and choose when learners can
          book a session with you.
        </p>
      </div>

      {/* ================= PRICE ================= */}

      <div className="rounded-2xl border border-white/[0.07] bg-[#101b27] p-6 md:p-7">

        <div className="flex items-start gap-4">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/[0.07]">
            <IndianRupee
              size={20}
              className="text-cyan-400"
            />
          </div>

          <div>
            <h3 className="text-lg font-bold text-white">
              Session Price
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Set the amount you want to charge for one mentorship
              session.
            </p>
          </div>

        </div>

        <div className="mt-6">

          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">
            Price per session
          </label>

          <div className="relative max-w-md">

            <IndianRupee
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400"
            />

            <input
              type="number"
              min="500"
              max="5000"
              step="100"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-[#08121b] py-4 pl-11 pr-20 text-lg font-bold text-white outline-none transition focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/10"
            />

            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-600">
              / session
            </span>

          </div>

          <p className="mt-2 text-xs text-slate-600">
            Recommended range: ₹500 – ₹5,000
          </p>

        </div>

      </div>

      {/* ================= AVAILABILITY ================= */}

      <div className="rounded-2xl border border-white/[0.07] bg-[#101b27] p-6 md:p-7">

        <div className="flex items-start gap-4">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/[0.07]">
            <CalendarDays
              size={20}
              className="text-cyan-400"
            />
          </div>

          <div>
            <h3 className="text-lg font-bold text-white">
              Weekly Availability
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Turn days on or off and customize your available
              hours for each day.
            </p>
          </div>

        </div>

        {/* Days */}
        <div className="mt-7 space-y-3">

          {days.map((day) => {
            const data = availability[day];

            return (
              <div
                key={day}
                className={`rounded-xl border p-4 transition-all ${
                  data.available
                    ? "border-cyan-400/20 bg-cyan-400/[0.035]"
                    : "border-white/[0.05] bg-[#0b1520]"
                }`}
              >

                <div className="flex flex-col gap-4 lg:flex-row lg:items-center">

                  {/* Day */}
                  <div className="flex items-center justify-between lg:w-[190px]">

                    <div className="flex items-center gap-3">

                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-lg border ${
                          data.available
                            ? "border-cyan-400/30 bg-cyan-400/10 text-cyan-400"
                            : "border-white/[0.06] text-slate-600"
                        }`}
                      >
                        {data.available ? (
                          <Check size={15} strokeWidth={3} />
                        ) : (
                          <span className="text-[10px] font-bold">
                            {day.slice(0, 2).toUpperCase()}
                          </span>
                        )}
                      </div>

                      <span
                        className={`text-sm font-semibold ${
                          data.available
                            ? "text-white"
                            : "text-slate-500"
                        }`}
                      >
                        {day}
                      </span>

                    </div>

                    {/* Toggle */}
                    <button
                      type="button"
                      onClick={() => toggleDay(day)}
                      className={`relative h-6 w-11 rounded-full transition-all ${
                        data.available
                          ? "bg-cyan-400"
                          : "bg-slate-700"
                      }`}
                    >
                      <span
                        className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-all ${
                          data.available
                            ? "left-6"
                            : "left-1"
                        }`}
                      />
                    </button>

                  </div>

                  {/* Time */}
                  {data.available ? (
                    <div className="flex flex-1 items-center gap-3">

                      <TimeSelect
                        value={data.from}
                        onChange={(value) =>
                          updateTime(day, "from", value)
                        }
                      />

                      <span className="text-xs font-medium text-slate-600">
                        TO
                      </span>

                      <TimeSelect
                        value={data.to}
                        onChange={(value) =>
                          updateTime(day, "to", value)
                        }
                      />

                    </div>
                  ) : (
                    <div className="flex-1">
                      <span className="text-xs text-slate-700">
                        You are not accepting bookings on this day.
                      </span>
                    </div>
                  )}

                </div>

              </div>
            );
          })}

        </div>

      </div>

      {/* ================= SAVE ================= */}

      <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.025] p-5 sm:flex-row">

        <div>
          <p className="text-sm font-semibold text-white">
            Ready to update your settings?
          </p>

          <p className="mt-1 text-xs text-slate-600">
            Your new availability will be visible to learners.
          </p>
        </div>

        <button
          type="button"
          onClick={saveSettings}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 px-6 py-3.5 text-sm font-bold text-black transition-all hover:bg-cyan-300 hover:shadow-[0_0_30px_rgba(0,220,255,.18)] sm:w-auto"
        >
          <Save size={16} />
          Save Changes
        </button>

      </div>

    </div>
  );
}


/* ================= TIME SELECT ================= */

function TimeSelect({ value, onChange }) {
  return (
    <div className="relative flex-1">

      <Clock3
        size={15}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400"
      />

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-xl border border-white/[0.07] bg-[#07111a] py-3 pl-9 pr-9 text-sm font-semibold text-white outline-none transition focus:border-cyan-400/40"
      >
        {timeSlots.map((time) => (
          <option
            key={time}
            value={time}
            className="bg-[#07111a]"
          >
            {time}
          </option>
        ))}
      </select>

      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-600">
        ▼
      </span>

    </div>
  );
}