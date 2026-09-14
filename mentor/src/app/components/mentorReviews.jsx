"use client";

import {
  Star,
  MessageSquareQuote,
  ThumbsUp,
} from "lucide-react";

const reviews = [
  {
    initials: "AS",
    name: "Arjun Sharma",
    role: "Software Engineer",
    rating: 5,
    date: "12 Sep 2026",
    review:
      "Vikas explained backend concepts really clearly. The session was practical and helped me understand where I was going wrong in my interview preparation.",
  },
  {
    initials: "RK",
    name: "Rahul Kapoor",
    role: "Frontend Developer",
    rating: 5,
    date: "08 Sep 2026",
    review:
      "Really valuable session. The system design discussion was detailed and Vikas gave me a clear roadmap of what I should focus on next.",
  },
  {
    initials: "NP",
    name: "Neha Patel",
    role: "Product Analyst",
    rating: 4,
    date: "05 Sep 2026",
    review:
      "Very helpful and easy to communicate with. I got some great career advice and actionable feedback from the session.",
  },
  {
    initials: "VM",
    name: "Vivek Mehra",
    role: "Software Developer",
    rating: 5,
    date: "01 Sep 2026",
    review:
      "One of the best mentorship sessions I have had. The feedback was honest, specific and very useful for my upcoming interviews.",
  },
  {
    initials: "RK",
    name: "Riya Kapoor",
    role: "Full Stack Developer",
    rating: 5,
    date: "28 Aug 2026",
    review:
      "Excellent mentor. The session was structured really well and I came away with a much better understanding of what I need to improve.",
  },
];

export default function MentorReviews() {
  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <div className="mb-3 inline-flex items-center gap-2 rounded-lg border border-cyan-400/20 bg-cyan-400/[0.06] px-3 py-2">
          <MessageSquareQuote
            size={15}
            className="text-cyan-400"
          />

          <span className="text-xs font-semibold tracking-[0.15em] text-cyan-400">
            REVIEWS
          </span>
        </div>

        <h2 className="text-3xl font-bold text-white">
          What Learners Say
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          See what learners think about their mentorship experience.
        </p>
      </div>

      {/* ================= RATING OVERVIEW ================= */}

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[280px_1fr]">

        {/* Overall Rating */}
        <div className="rounded-2xl border border-cyan-400/15 bg-[#101b27] p-7">

          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
            Overall Rating
          </p>

          <div className="mt-4 flex items-end gap-3">
            <span className="text-5xl font-black text-white">
              4.9
            </span>

            <span className="mb-2 text-sm text-slate-500">
              / 5
            </span>
          </div>

          <div className="mt-4 flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={19}
                fill="currentColor"
                className="text-yellow-400"
              />
            ))}
          </div>

          <p className="mt-4 text-xs text-slate-500">
            Based on 42 learner reviews
          </p>

        </div>

        {/* Rating Breakdown */}
        <div className="rounded-2xl border border-white/[0.07] bg-[#101b27] p-7">

          <h3 className="text-sm font-bold text-white">
            Rating Breakdown
          </h3>

          <div className="mt-5 space-y-3">

            <RatingBar
              stars="5"
              percentage="92%"
              width="92%"
            />

            <RatingBar
              stars="4"
              percentage="6%"
              width="6%"
            />

            <RatingBar
              stars="3"
              percentage="2%"
              width="2%"
            />

            <RatingBar
              stars="2"
              percentage="0%"
              width="0%"
            />

            <RatingBar
              stars="1"
              percentage="0%"
              width="0%"
            />

          </div>

        </div>

      </div>

      {/* ================= REVIEWS ================= */}

      <div>

        <div className="mb-5 flex items-center justify-between">

          <div>
            <h3 className="text-xl font-bold text-white">
              Recent Reviews
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              Feedback from your recent mentorship sessions.
            </p>
          </div>

          <span className="rounded-lg border border-white/[0.07] bg-[#101b27] px-3 py-2 text-xs text-slate-500">
            42 Reviews
          </span>

        </div>

        <div className="space-y-4">

          {reviews.map((review) => (
            <div
              key={`${review.name}-${review.date}`}
              className="group rounded-2xl border border-white/[0.07] bg-[#101b27] p-6 transition-all duration-300 hover:border-cyan-400/20"
            >

              <div className="flex flex-col gap-5">

                {/* Top */}
                <div className="flex items-start justify-between">

                  <div className="flex items-center gap-4">

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/20 bg-[#0d2a35]">
                      <span className="text-sm font-bold text-cyan-400">
                        {review.initials}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-white">
                        {review.name}
                      </h4>

                      <p className="mt-1 text-xs text-slate-500">
                        {review.role}
                      </p>
                    </div>

                  </div>

                  <span className="text-xs text-slate-600">
                    {review.date}
                  </span>

                </div>

                {/* Stars */}
                <div className="flex items-center gap-1">

                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={15}
                      fill={
                        star <= review.rating
                          ? "currentColor"
                          : "none"
                      }
                      className={
                        star <= review.rating
                          ? "text-yellow-400"
                          : "text-slate-700"
                      }
                    />
                  ))}

                </div>

                {/* Review */}
                <p className="max-w-4xl text-sm leading-6 text-slate-400">
                  "{review.review}"
                </p>

                {/* Bottom */}
                <div className="flex items-center gap-2 border-t border-white/[0.05] pt-4">

                  <ThumbsUp
                    size={14}
                    className="text-cyan-400"
                  />

                  <span className="text-xs text-slate-600">
                    Helpful feedback
                  </span>

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}


/* ================= RATING BAR ================= */

function RatingBar({ stars, percentage, width }) {
  return (
    <div className="flex items-center gap-4">

      <div className="flex w-10 items-center gap-1">
        <span className="text-xs text-slate-400">
          {stars}
        </span>

        <Star
          size={12}
          fill="currentColor"
          className="text-yellow-400"
        />
      </div>

      <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-cyan-400 transition-all duration-700"
          style={{ width }}
        />
      </div>

      <span className="w-10 text-right text-xs text-slate-500">
        {percentage}
      </span>

    </div>
  );
}