

// "use client";

// import { useState } from "react";
// import {
//   Clock3,
//   DollarSign,
//   Check,
//   ChevronDown,
//   Sparkles,
//   CalendarDays,
// } from "lucide-react";
// import Link from "next/link";

// const days = [
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday",
//   "Sunday",
// ];

// const timeSlots = [
//   "06:00 AM",
//   "06:30 AM",
//   "07:00 AM",
//   "07:30 AM",
//   "08:00 AM",
//   "08:30 AM",
//   "09:00 AM",
//   "09:30 AM",
//   "10:00 AM",
//   "10:30 AM",
//   "11:00 AM",
//   "11:30 AM",
//   "12:00 PM",
//   "12:30 PM",
//   "01:00 PM",
//   "01:30 PM",
//   "02:00 PM",
//   "02:30 PM",
//   "03:00 PM",
//   "03:30 PM",
//   "04:00 PM",
//   "04:30 PM",
//   "05:00 PM",
//   "05:30 PM",
//   "06:00 PM",
//   "06:30 PM",
//   "07:00 PM",
//   "07:30 PM",
//   "08:00 PM",
//   "08:30 PM",
//   "09:00 PM",
//   "09:30 PM",
//   "10:00 PM",
//   "10:30 PM",
//   "11:00 PM",
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
//         from: "09:00 AM",
//         to: "05:00 PM",
//       };

//       return acc;
//     }, {})
//   );

//   const [priceTier, setPriceTier] = useState(1000);

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
//     <div className="relative min-h-screen overflow-hidden bg-[#050b10] px-4 py-14 text-white">

//       {/* ================= BACKGROUND ================= */}

//       <div className="pointer-events-none absolute inset-0 overflow-hidden">

//         {/* Grid */}
//         <div
//           className="absolute inset-0 opacity-[0.035]"
//           style={{
//             backgroundImage:
//               "linear-gradient(rgba(0,220,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(0,220,255,.8) 1px, transparent 1px)",
//             backgroundSize: "70px 70px",
//           }}
//         />

//         {/* Glow 1 */}
//         <div className="absolute -left-32 top-20 h-[420px] w-[420px] animate-pulse rounded-full bg-cyan-500/[0.08] blur-[120px]" />

//         {/* Glow 2 */}
//         <div className="absolute -right-32 top-[35%] h-[500px] w-[500px] animate-pulse rounded-full bg-blue-500/[0.07] blur-[140px]" />

//         {/* Floating Orb */}
//         <div className="absolute left-[15%] top-[20%] h-2 w-2 animate-bounce rounded-full bg-cyan-300 shadow-[0_0_25px_8px_rgba(0,220,255,.3)]" />

//         <div className="absolute right-[20%] top-[65%] h-1.5 w-1.5 animate-ping rounded-full bg-cyan-400" />

//       </div>

//       {/* ================= CONTENT ================= */}

//       <div className="relative z-10 mx-auto w-full max-w-4xl">

//         {/* Heading */}
//         <div className="mb-10 text-center">

//           <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/[0.06] px-4 py-2 backdrop-blur-md">
//             <Sparkles
//               size={15}
//               className="text-cyan-400"
//             />

//             <span className="text-xs font-semibold tracking-[0.2em] text-cyan-400">
//               BECOME A MENTOR
//             </span>
//           </div>

//           <h1 className="text-4xl font-black tracking-tight md:text-5xl">
//             Register Yourself as a{" "}
//             <span className="text-cyan-400">
//               Mentor
//             </span>
//           </h1>

//           <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-400 md:text-base">
//             Share your experience, guide ambitious learners and
//             build meaningful connections on VeStaff.
//           </p>
//         </div>

//         {/* ================= FORM CARD ================= */}

//         <div className="relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#0b151f]/90 p-5 shadow-[0_30px_100px_rgba(0,0,0,.45)] backdrop-blur-xl md:p-8">

//           {/* Top Glow */}
//           <div className="pointer-events-none absolute left-1/2 top-0 h-px w-[60%] -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

//           {/* ================= AVAILABILITY ================= */}

//           <div>

//             <div className="mb-7 flex items-start gap-4">

//               <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/[0.08]">
//                 <CalendarDays
//                   size={20}
//                   className="text-cyan-400"
//                 />
//               </div>

//               <div>
//                 <h2 className="text-xl font-bold">
//                   Your Availability
//                 </h2>

//                 <p className="mt-1 text-sm text-slate-500">
//                   Choose when learners can book a session with you.
//                 </p>
//               </div>

//             </div>

//             {/* Days */}
//             <div className="space-y-3">

//               {days.map((day) => {
//                 const data = availability[day];

//                 return (
//                   <div
//                     key={day}
//                     className={`rounded-2xl border p-4 transition-all duration-300 ${
//                       data.available
//                         ? "border-cyan-400/25 bg-cyan-400/[0.045] shadow-[0_0_25px_rgba(0,220,255,.035)]"
//                         : "border-white/[0.06] bg-white/[0.015] hover:border-white/[0.1]"
//                     }`}
//                   >

//                     <div className="flex flex-col gap-4 lg:flex-row lg:items-center">

//                       {/* Day */}
//                       <button
//                         type="button"
//                         onClick={() => toggleDay(day)}
//                         className="flex items-center gap-4 text-left lg:w-[190px]"
//                       >

//                         <div
//                           className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all ${
//                             data.available
//                               ? "border-cyan-400/40 bg-cyan-400 text-black shadow-[0_0_18px_rgba(0,220,255,.2)]"
//                               : "border-white/[0.08] bg-white/[0.03] text-slate-600"
//                           }`}
//                         >
//                           {data.available ? (
//                             <Check size={17} strokeWidth={3} />
//                           ) : (
//                             <span className="text-xs font-bold">
//                               {day.slice(0, 2).toUpperCase()}
//                             </span>
//                           )}
//                         </div>

//                         <div>
//                           <p
//                             className={`text-sm font-semibold ${
//                               data.available
//                                 ? "text-white"
//                                 : "text-slate-500"
//                             }`}
//                           >
//                             {day}
//                           </p>

//                           <p className="mt-0.5 text-[11px] text-slate-600">
//                             {data.available
//                               ? "Available"
//                               : "Unavailable"}
//                           </p>
//                         </div>

//                       </button>

//                       {/* Time Selection */}
//                       {data.available ? (
//                         <div className="flex flex-1 items-center gap-3">

//                           <TimeSelect
//                             value={data.from}
//                             onChange={(value) =>
//                               updateTime(day, "from", value)
//                             }
//                             label="FROM"
//                           />

//                           <div className="hidden h-px w-5 bg-slate-700 sm:block" />

//                           <TimeSelect
//                             value={data.to}
//                             onChange={(value) =>
//                               updateTime(day, "to", value)
//                             }
//                             label="TO"
//                           />

//                         </div>
//                       ) : (
//                         <div className="hidden flex-1 items-center lg:flex">
//                           <span className="text-xs text-slate-700">
//                             Turn on availability to set your hours
//                           </span>
//                         </div>
//                       )}

//                       {/* Toggle */}
//                       <button
//                         type="button"
//                         onClick={() => toggleDay(day)}
//                         className={`relative h-7 w-12 shrink-0 rounded-full transition-all ${
//                           data.available
//                             ? "bg-cyan-400"
//                             : "bg-slate-800"
//                         }`}
//                       >
//                         <span
//                           className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all ${
//                             data.available
//                               ? "left-6"
//                               : "left-1"
//                           }`}
//                         />
//                       </button>

//                     </div>
//                   </div>
//                 );
//               })}

//             </div>
//           </div>

//           {/* Divider */}
//           <div className="my-10 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

//           {/* ================= PRICE ================= */}

//           <div>

//             <div className="mb-6 flex items-start gap-4">

//               <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/[0.08]">
//                 <DollarSign
//                   size={20}
//                   className="text-cyan-400"
//                 />
//               </div>

//               <div>
//                 <h2 className="text-xl font-bold">
//                   Price Tier
//                 </h2>

//                 <p className="mt-1 text-sm text-slate-500">
//                   Set your price for a single mentorship session.
//                 </p>
//               </div>

//             </div>

//             {/* Price Options */}
//             <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">

//               {priceTiers.map((price) => {
//                 const selected = priceTier === price;

//                 return (
//                   <button
//                     key={price}
//                     type="button"
//                     onClick={() => setPriceTier(price)}
//                     className={`relative rounded-xl border px-4 py-4 text-sm font-bold transition-all duration-200 ${
//                       selected
//                         ? "border-cyan-400 bg-cyan-400 text-black shadow-[0_0_25px_rgba(0,220,255,.15)]"
//                         : "border-white/[0.07] bg-white/[0.02] text-slate-400 hover:border-cyan-400/30 hover:text-white"
//                     }`}
//                   >
//                     ₹{price.toLocaleString("en-IN")}

//                     {selected && (
//                       <Check
//                         size={13}
//                         strokeWidth={3}
//                         className="absolute right-2 top-2"
//                       />
//                     )}
//                   </button>
//                 );
//               })}

//             </div>

//             {/* Selected Price */}
//             <div className="mt-5 flex items-center justify-between rounded-xl border border-cyan-400/10 bg-cyan-400/[0.035] px-5 py-4">

//               <span className="text-sm text-slate-500">
//                 Your session price
//               </span>

//               <span className="text-xl font-black text-cyan-400">
//                 ₹{priceTier.toLocaleString("en-IN")}
//                 <span className="ml-1 text-xs font-medium text-slate-600">
//                   / session
//                 </span>
//               </span>

//             </div>

//           </div>

//           {/* Submit */}
//           <Link
//             href={"/mentor"}
//             type="button"
//             className="group mt-9 flex w-full items-center justify-center gap-3 rounded-2xl bg-cyan-400 px-6 py-4 font-bold text-black transition-all duration-300 hover:bg-cyan-300 hover:shadow-[0_0_35px_rgba(0,220,255,.2)]"
//           >
//             <Check size={18} strokeWidth={3} />

//             Complete Mentor Registration

//             <span className="transition-transform duration-300 group-hover:translate-x-1">
//               →
//             </span>
//           </Link>

//           <p className="mt-4 text-center text-xs text-slate-600">
//             You can change your availability and price anytime.
//           </p>

//         </div>
//       </div>
//     </div>
//   );
// }


// /* =====================================================
//    CUSTOM TIME SELECT
// ===================================================== */

// function TimeSelect({ value, onChange, label }) {
//   const [open, setOpen] = useState(false);

//   return (
//     <div className="relative flex-1">

//       <button
//         type="button"
//         onClick={() => setOpen(!open)}
//         className={`flex w-full items-center justify-between rounded-xl border bg-[#07111a] px-4 py-3 text-left transition-all ${
//           open
//             ? "border-cyan-400/50 shadow-[0_0_20px_rgba(0,220,255,.06)]"
//             : "border-white/[0.07] hover:border-cyan-400/25"
//         }`}
//       >

//         <div>
//           <p className="mb-1 text-[9px] font-bold tracking-[0.2em] text-slate-600">
//             {label}
//           </p>

//           <div className="flex items-center gap-2">
//             <Clock3
//               size={15}
//               className="text-cyan-400"
//             />

//             <span className="text-sm font-semibold text-white">
//               {value}
//             </span>
//           </div>
//         </div>

//         <ChevronDown
//           size={16}
//           className={`text-slate-600 transition-transform ${
//             open ? "rotate-180 text-cyan-400" : ""
//           }`}
//         />

//       </button>

//       {/* Dropdown */}
//       {open && (
//         <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 max-h-60 overflow-y-auto rounded-xl border border-cyan-400/20 bg-[#0b151f] p-1.5 shadow-[0_20px_50px_rgba(0,0,0,.6)]">

//           {timeSlots.map((time) => (
//             <button
//               key={time}
//               type="button"
//               onClick={() => {
//                 onChange(time);
//                 setOpen(false);
//               }}
//               className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm transition ${
//                 value === time
//                   ? "bg-cyan-400/10 text-cyan-400"
//                   : "text-slate-400 hover:bg-white/[0.04] hover:text-white"
//               }`}
//             >
//               {time}

//               {value === time && (
//                 <Check size={14} />
//               )}
//             </button>
//           ))}

//         </div>
//       )}

//     </div>
//   );
// }
"use client";

import { useState , useEffect, useContext} from "react";
import MentorContext from "../context/mentor.context";
import axios from "axios";
import {
  Clock3,
  DollarSign,
  Check,
  ChevronDown,
  Sparkles,
  CalendarDays,
  User,
  Briefcase,
  Building2,
  Code2,
  Plus,
  X,
  GraduationCap,
} from "lucide-react";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const {registerMentor,fetchAllUpcomingSessions, fetchPastSessions} = useContext(MentorContext)
  // ================= PROFILE =================

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    company: "",
    expertise: "",
    experience: "",
    skillInput: "",
  });

  const [skills, setSkills] = useState([]);

  // ================= AVAILABILITY =================

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

  // ================= PRICE =================

  const [priceTier, setPriceTier] = useState(1000);

  // ================= LOADING =================

  const [loading, setLoading] = useState(false);

  // ================= INPUT CHANGE =================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= SKILLS =================

  const addSkill = () => {
    const skill = formData.skillInput.trim();

    if (!skill) return;

    if (
      skills.some(
        (item) => item.toLowerCase() === skill.toLowerCase()
      )
    ) {
      setFormData((prev) => ({
        ...prev,
        skillInput: "",
      }));

      return;
    }

    setSkills((prev) => [...prev, skill]);

    setFormData((prev) => ({
      ...prev,
      skillInput: "",
    }));
  };

  const removeSkill = (skillToRemove) => {
    setSkills((prev) =>
      prev.filter((skill) => skill !== skillToRemove)
    );
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  // ================= AVAILABILITY =================

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

  // ================= VALIDATION =================

  const validateForm = () => {
    if (!formData.name.trim()) {
      alert("Please enter your name");
      return false;
    }

    if (!formData.role.trim()) {
      alert("Please enter your current role");
      return false;
    }

    if (!formData.company.trim()) {
      alert("Please enter your company");
      return false;
    }

    if (!formData.expertise.trim()) {
      alert("Please enter your expertise");
      return false;
    }

    if (!formData.experience.trim()) {
      alert("Please enter your experience");
      return false;
    }

    if (skills.length === 0) {
      alert("Please add at least one skill");
      return false;
    }

    const hasAvailability = Object.values(
      availability
    ).some((day) => day.available);

    if (!hasAvailability) {
      alert("Please select at least one available day");
      return false;
    }

    return true;
  };

  // ================= REGISTER API =================

  const handleRegisterMentor = async () => {
    try{
      if (!validateForm()) return;


      // Convert UI availability into API format
      const weeklyAvailability = {};

      days.forEach((day) => {
        const data = availability[day];

        weeklyAvailability[day.toLowerCase()] = {
          enabled: data.available,
          startTime: data.available
            ? data.from
            : null,
          endTime: data.available
            ? data.to
            : null,
        };
      });

      const initials = formData.name
        .trim()
        .split(/\s+/)
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

      const payload = {
        name: formData.name.trim(),

        role: formData.role.trim(),

        company: formData.company.trim(),

        initials,

        expertise: formData.expertise.trim(),

        skills,

        experience: formData.experience.trim(),

        price: Number(priceTier),

        rating: 4,

        weeklyAvailability,
      };

      console.log(
        "REGISTER MENTOR PAYLOAD:",
        payload
      );

        const response = await registerMentor(payload);

        // SUCCESS
        if (response?.success) {
          router.push("/mentor");
        }
    }catch (error) {
      // ERROR
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Failed to register mentor";

      alert(message);
    }
    
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050b10] px-4 py-10 text-white md:py-14">

      {/* ================= BACKGROUND ================= */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,220,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(0,220,255,.8) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />

        <div className="absolute -left-32 top-20 h-[420px] w-[420px] rounded-full bg-cyan-500/[0.08] blur-[120px]" />

        <div className="absolute -right-32 top-[35%] h-[500px] w-[500px] rounded-full bg-blue-500/[0.07] blur-[140px]" />

        <div className="absolute left-[15%] top-[20%] h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_25px_8px_rgba(0,220,255,.3)]" />

      </div>

      {/* ================= MAIN ================= */}

      <div className="relative z-10 mx-auto w-full max-w-4xl">

        {/* ================= HEADER ================= */}

        <div className="mb-10 text-center">

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/[0.06] px-4 py-2">

            <Sparkles
              size={15}
              className="text-cyan-400"
            />

            <span className="text-xs font-semibold tracking-[0.2em] text-cyan-400">
              BECOME A MENTOR
            </span>

          </div>

          <h1 className="text-4xl font-black tracking-tight md:text-5xl">
            Register Yourself as{" "}
            <span className="text-cyan-400">
              Mentor
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-400 md:text-base">
            Share your experience, guide ambitious learners
            and build meaningful connections on VeStaff.
          </p>

        </div>

        {/* ================= CARD ================= */}

        <div className="relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#0b151f]/90 p-5 shadow-[0_30px_100px_rgba(0,0,0,.45)] backdrop-blur-xl md:p-8">

          <div className="pointer-events-none absolute left-1/2 top-0 h-px w-[60%] -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

          {/* =====================================================
              SECTION 1 - PROFILE
          ===================================================== */}

          <SectionHeader
            icon={<User size={20} />}
            title="Profile Details"
            description="Tell learners a little about yourself."
          />

          <div className="grid gap-5 md:grid-cols-2">

            <InputField
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Vikas Kumar"
              icon={<User size={17} />}
            />

            <InputField
              label="Current Role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="e.g. Senior Software Engineer"
              icon={<Briefcase size={17} />}
            />

            <InputField
              label="Company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="e.g. Google"
              icon={<Building2 size={17} />}
            />

            <InputField
              label="Experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              placeholder="e.g. 8+ Years"
              icon={<GraduationCap size={17} />}
            />

          </div>

          {/* =====================================================
              SECTION 2 - EXPERTISE
          ===================================================== */}

          <div className="my-10 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

          <SectionHeader
            icon={<Code2 size={20} />}
            title="Expertise & Skills"
            description="Tell learners what you can help them with."
          />

          <div className="space-y-5">

            <InputField
              label="Primary Expertise"
              name="expertise"
              value={formData.expertise}
              onChange={handleChange}
              placeholder="e.g. Backend Development"
              icon={<Code2 size={17} />}
            />

            {/* Skills */}

            <div>

              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                Skills
              </label>

              <div className="flex gap-2">

                <div className="relative flex-1">

                  <Code2
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400"
                  />

                  <input
                    type="text"
                    value={formData.skillInput}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        skillInput: e.target.value,
                      }))
                    }
                    onKeyDown={handleSkillKeyDown}
                    placeholder="e.g. Node.js, MongoDB, System Design"
                    className="w-full rounded-xl border border-white/[0.08] bg-[#07111a] py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-700 focus:border-cyan-400/40"
                  />

                </div>

                <button
                  type="button"
                  onClick={addSkill}
                  className="flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-xl bg-cyan-400 text-black transition hover:bg-cyan-300"
                >
                  <Plus size={20} />
                </button>

              </div>

              {/* Skill chips */}

              {skills.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">

                  {skills.map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center gap-2 rounded-lg border border-cyan-400/20 bg-cyan-400/[0.07] px-3 py-2 text-xs font-medium text-cyan-300"
                    >

                      {skill}

                      <button
                        type="button"
                        onClick={() =>
                          removeSkill(skill)
                        }
                        className="text-cyan-500 transition hover:text-red-400"
                      >
                        <X size={14} />
                      </button>

                    </div>
                  ))}

                </div>
              )}

              <p className="mt-2 text-[11px] text-slate-600">
                Press Enter or click + to add a skill.
              </p>

            </div>

          </div>

          {/* =====================================================
              SECTION 3 - AVAILABILITY
          ===================================================== */}

          <div className="my-10 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

          <SectionHeader
            icon={<CalendarDays size={20} />}
            title="Your Availability"
            description="Choose when learners can book a session with you."
          />

          <div className="space-y-3">

            {days.map((day) => {

              const data = availability[day];

              return (
                <div
                  key={day}
                  className={`rounded-2xl border p-4 transition-all ${
                    data.available
                      ? "border-cyan-400/25 bg-cyan-400/[0.045]"
                      : "border-white/[0.06] bg-white/[0.015]"
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
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${
                          data.available
                            ? "border-cyan-400/40 bg-cyan-400 text-black"
                            : "border-white/[0.08] bg-white/[0.03] text-slate-600"
                        }`}
                      >
                        {data.available ? (
                          <Check
                            size={17}
                            strokeWidth={3}
                          />
                        ) : (
                          <span className="text-xs font-bold">
                            {day
                              .slice(0, 2)
                              .toUpperCase()}
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

                    {/* Time */}

                    {data.available ? (
                      <div className="flex flex-1 items-center gap-3">

                        <TimeSelect
                          value={data.from}
                          onChange={(value) =>
                            updateTime(
                              day,
                              "from",
                              value
                            )
                          }
                          label="FROM"
                        />

                        <div className="hidden h-px w-5 bg-slate-700 sm:block" />

                        <TimeSelect
                          value={data.to}
                          onChange={(value) =>
                            updateTime(
                              day,
                              "to",
                              value
                            )
                          }
                          label="TO"
                        />

                      </div>
                    ) : (
                      <div className="hidden flex-1 lg:block">
                        <span className="text-xs text-slate-700">
                          Turn on availability to set your hours
                        </span>
                      </div>
                    )}

                    {/* Toggle */}

                    <button
                      type="button"
                      onClick={() => toggleDay(day)}
                      className={`relative h-7 w-12 shrink-0 rounded-full ${
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

          {/* =====================================================
              SECTION 4 - PRICE
          ===================================================== */}

          <div className="my-10 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

          <SectionHeader
            icon={<DollarSign size={20} />}
            title="Price Tier"
            description="Set your price for a single mentorship session."
          />

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">

            {priceTiers.map((price) => {

              const selected =
                priceTier === price;

              return (
                <button
                  key={price}
                  type="button"
                  onClick={() =>
                    setPriceTier(price)
                  }
                  className={`relative rounded-xl border px-4 py-4 text-sm font-bold transition ${
                    selected
                      ? "border-cyan-400 bg-cyan-400 text-black"
                      : "border-white/[0.07] bg-white/[0.02] text-slate-400 hover:border-cyan-400/30 hover:text-white"
                  }`}
                >

                  ₹{price.toLocaleString("en-IN")}

                  {selected && (
                    <Check
                      size={13}
                      className="absolute right-2 top-2"
                    />
                  )}

                </button>
              );
            })}

          </div>

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

          {/* =====================================================
              SUBMIT
          ===================================================== */}

          <button
            type="button"
            disabled={loading}
            onClick={handleRegisterMentor}
            className={`group mt-9 flex w-full items-center justify-center gap-3 rounded-2xl px-6 py-4 font-bold text-black transition ${
              loading
                ? "cursor-not-allowed bg-cyan-400/50"
                : "bg-cyan-400 hover:bg-cyan-300 hover:shadow-[0_0_35px_rgba(0,220,255,.2)]"
            }`}
          >

            {loading ? (
              <>
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                Registering...
              </>
            ) : (
              <>
                <Check
                  size={18}
                  strokeWidth={3}
                />

                Complete Mentor Registration

                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </>
            )}

          </button>

          <p className="mt-4 text-center text-xs text-slate-600">
            You can change your availability and price anytime.
          </p>

        </div>
      </div>
    </div>
  );
}


/* =====================================================
   SECTION HEADER
===================================================== */

function SectionHeader({
  icon,
  title,
  description,
}) {
  return (
    <div className="mb-7 flex items-start gap-4">

      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/[0.08] text-cyan-400">
        {icon}
      </div>

      <div>
        <h2 className="text-xl font-bold">
          {title}
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          {description}
        </p>
      </div>

    </div>
  );
}


/* =====================================================
   INPUT
===================================================== */

function InputField({
  label,
  name,
  value,
  onChange,
  placeholder,
  icon,
}) {
  return (
    <div>

      <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </label>

      <div className="relative">

        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400">
          {icon}
        </div>

        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full rounded-xl border border-white/[0.08] bg-[#07111a] py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-700 focus:border-cyan-400/40 focus:ring-1 focus:ring-cyan-400/10"
        />

      </div>

    </div>
  );
}


/* =====================================================
   TIME SELECT
===================================================== */

function TimeSelect({
  value,
  onChange,
  label,
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex-1">

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`flex w-full items-center justify-between rounded-xl border bg-[#07111a] px-4 py-3 text-left transition ${
          open
            ? "border-cyan-400/50"
            : "border-white/[0.07]"
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
            open
              ? "rotate-180 text-cyan-400"
              : ""
          }`}
        />

      </button>

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
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm ${
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