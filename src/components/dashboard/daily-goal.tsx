"use client";

import { useState, useEffect } from "react";
import { ChevronRight, X } from "lucide-react";
import NextImage from "next/image";

const GOAL_KEY = "cs_daily_goal";
const COUNT_KEY = "cs_daily_count";

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

const milestones = [
  { frac: 0,    img: "/prog bar icons/stand-by_1.webp"   },
  { frac: 0.25, img: "/prog bar icons/man-walking_2.webp" },
  { frac: 0.5,  img: "/prog bar icons/run_3.webp"         },
  { frac: 0.75, img: "/prog bar icons/running_4.webp"     },
];

export function DailyGoal() {
  const [goal, setGoal] = useState(30);
  const [count, setCount] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [input, setInput] = useState("30");

  useEffect(() => {
    const savedGoal = parseInt(localStorage.getItem(GOAL_KEY) ?? "30", 10);
    const entry = JSON.parse(localStorage.getItem(COUNT_KEY) ?? "{}");
    const savedCount = entry[todayKey()] ?? 0;
    setGoal(savedGoal);
    setCount(savedCount);
    setInput(String(savedGoal));
  }, []);

  const progress = Math.min(count / goal, 1);

  function saveGoal() {
    const val = Math.max(1, parseInt(input, 10) || 30);
    setGoal(val);
    setInput(String(val));
    localStorage.setItem(GOAL_KEY, String(val));
    setModalOpen(false);
  }

  return (
    <>
      <div
        className="flex items-center gap-4 px-5 rounded-2xl"
        style={{
          backgroundColor: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.07)",
          height: "64px",
        }}
      >
        {/* Label */}
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-1.5 shrink-0 cursor-pointer group"
        >
          <span className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
            Your Daily Goal{" "}
            <strong style={{ color: "rgba(255,255,255,0.95)" }}>
              ({count}/{goal} Qs)
            </strong>
          </span>
          <ChevronRight
            className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
            style={{ color: "rgba(255,255,255,0.4)" }}
          />
        </button>

        {/* Track */}
        <div className="flex-1 relative" style={{ height: "40px" }}>
          {/* Base track line */}
          <div
            className="absolute w-full rounded-full"
            style={{ height: "3px", backgroundColor: "rgba(255,255,255,0.08)", top: "50%", transform: "translateY(-50%)" }}
          />
          {/* Progress fill */}
          <div
            className="absolute rounded-full transition-all duration-500"
            style={{
              height: "3px",
              width: `${progress * 100}%`,
              backgroundColor: "#60a5fa",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          />

          {/* Milestone stops — circles sitting on the bar */}
          {milestones.map(({ frac, img }, i) => (
            <div
              key={frac}
              className="absolute flex items-center justify-center rounded-full"
              style={{
                left: `${frac * 100}%`,
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: "30px",
                height: "30px",
                backgroundColor: "#353a3f",
              }}
            >
              <NextImage
                src={img}
                alt=""
                width={18}
                height={18}
                className="object-contain"
                style={{
                  filter: "brightness(0) invert(1)",
                  transform: i === 0 ? "scaleX(-1)" : "none",
                }}
              />
            </div>
          ))}

          {/* Finish stop */}
          <div
            className="absolute flex items-center justify-center rounded-full"
            style={{
              right: 0,
              top: "50%",
              transform: "translate(50%, -50%)",
              width: "30px",
              height: "30px",
            }}
          >
            <NextImage
              src="/prog bar icons/finish_5.webp"
              alt="finish"
              width={18}
              height={18}
              className="object-contain"
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </div>
        </div>
      </div>

      {/* Goal setter modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: "rgba(0,0,0,0.6)" }}>
          <div
            className="rounded-2xl p-6 flex flex-col gap-4 w-80"
            style={{ backgroundColor: "#1e2530", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <div className="flex items-center justify-between">
              <p className="font-bold" style={{ color: "rgba(255,255,255,0.9)" }}>Set Daily Goal</p>
              <button onClick={() => setModalOpen(false)} className="cursor-pointer" style={{ color: "rgba(255,255,255,0.4)" }}>
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
              How many questions do you want to solve each day?
            </p>
            <input
              type="number"
              min={1}
              max={200}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && saveGoal()}
              className="w-full rounded-xl px-4 py-3 text-sm font-bold outline-none"
              style={{
                backgroundColor: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.9)",
              }}
              autoFocus
            />
            <button
              onClick={saveGoal}
              className="w-full py-2.5 rounded-xl text-sm font-bold cursor-pointer transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#2563eb", color: "white" }}
            >
              Save goal
            </button>
          </div>
        </div>
      )}
    </>
  );
}
