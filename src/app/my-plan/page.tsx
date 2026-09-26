
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Check, Clock3, Flame, Plus, Star, X } from "lucide-react";
import { useGym } from "../contex/gymContex";
import { useToast } from "../../components/ToastContext";

type SortOption = "duration-asc" | "duration-desc" | "name";

const iconActionClass =
  "inline-flex size-9 shrink-0 items-center justify-center rounded-lg text-white/65 transition hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-300 disabled:cursor-not-allowed disabled:text-lime-300";

export default function MyPlanPage() {
  const {
    todayPlan,
    savedList,
    doneIds,
    markAsDone,
    removeFromToday,
    removeFromSaved,
    addToToday,
  } = useGym();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<"today" | "saved">("today");
  const [sortBy, setSortBy] = useState<SortOption>("duration-asc");
  const currentList = activeTab === "today" ? todayPlan : savedList;
  const sortedList = [...currentList].sort((first, second) => {
    if (sortBy === "name") return first.name.localeCompare(second.name);
    const difference = first.duration - second.duration;
    return sortBy === "duration-asc" ? difference : -difference;
  });
  const totalMinutes = currentList.reduce((total, exercise) => total + exercise.duration, 0);
  const totalCalories = currentList.reduce(
    (total, exercise) => total + exercise.caloriesBurned,
    0
  );

  const handleAdd = (itemId: number) => {
    const item = savedList.find((exercise) => exercise.id === itemId);
    if (!item) return;
    const result = addToToday(item);
    if (result === "added") showToast("Added to today's plan");
    if (result === "already-added") showToast("This exercise is already planned");
    if (result === "limit-reached") showToast("Your daily plan is limited to five exercises");
  };

  return (
    <div className="flex-1 bg-[#0e1016]">
      <main className="mx-auto min-h-[70vh] w-full max-w-5xl px-5 py-7 text-white sm:px-7">
      <header>
        <h1 className="text-xl font-extrabold uppercase">My plan</h1>
        <p className="mt-1 text-sm text-white/55">
          Cap of five lifts for today. Finish them, load more.
        </p>
      </header>

      <section aria-label={`${activeTab === "today" ? "Today's plan" : "Saved exercises"} totals`} className="mt-3 grid grid-cols-3 divide-x divide-white/10 rounded-xl border border-white/10 bg-white/3 px-4 py-4 sm:px-5">
        <div className="pr-3 sm:pr-5">
          <p className="text-xs text-white/50">Exercises</p>
          <p className="mt-1 text-3xl font-bold leading-none text-lime-300">{currentList.length}</p>
        </div>
        <div className="px-3 sm:px-5">
          <p className="text-xs text-white/50">Minutes</p>
          <p className="mt-1 text-3xl font-bold leading-none">{totalMinutes}</p>
        </div>
        <div className="pl-3 sm:pl-5">
          <p className="text-xs text-white/50">Calories</p>
          <p className="mt-1 text-3xl font-bold leading-none">{totalCalories}</p>
        </div>
      </section>

      <section className="mt-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex rounded-lg border border-white/10 bg-white/5 p-0.5" role="group" aria-label="Plan lists">
            <button
              type="button"
              onClick={() => setActiveTab("today")}
              aria-pressed={activeTab === "today"}
              className={`min-h-7 rounded-md px-4 text-xs font-medium transition focus-visible:outline-2 focus-visible:outline-lime-300 ${activeTab === "today" ? "bg-white font-semibold text-black" : "text-white/60 hover:text-white"}`}
            >
              Today <span className="ml-1 tabular-nums">{todayPlan.length}</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("saved")}
              aria-pressed={activeTab === "saved"}
              className={`min-h-7 rounded-md px-4 text-xs font-medium transition focus-visible:outline-2 focus-visible:outline-lime-300 ${activeTab === "saved" ? "bg-white font-semibold text-black" : "text-white/60 hover:text-white"}`}
            >
              Saved <span className="ml-1 tabular-nums">{savedList.length}</span>
            </button>
          </div>

          <label className="flex items-center gap-2 text-xs text-white/60">
            <span>Sort By</span>
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value as SortOption)}
              className="min-h-7 rounded-lg border border-white/15 bg-[#141a3a] px-2 text-xs text-white outline-none focus:border-lime-300 focus:ring-2 focus:ring-lime-300/30"
            >
              <option value="duration-asc">Duration</option>
              <option value="duration-desc">Duration: longest first</option>
              <option value="name">Name A to Z</option>
            </select>
          </label>
        </div>

        {sortedList.length > 0 ? (
          <ul className="mt-4 grid gap-3">
            {sortedList.map((item, index) => {
              const isDone = doneIds.includes(item.id);
              return (
                <li key={item.id} className="flex flex-wrap items-center gap-3 rounded-xl border border-white/10 bg-[#14171f] p-2.5 transition hover:border-white/20 sm:flex-nowrap sm:gap-4">
                  <Link href={`/exercise/${item.id}`} className="flex min-w-0 flex-1 items-center gap-3">
                     <div className="relative h-24 w-25 shrink-0 overflow-hidden rounded-md">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="100px"
                        priority={index === 0}
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <h2 className="truncate text-sm font-bold uppercase">{item.name}</h2>
                      <p className="mt-0.5 truncate text-xs text-white/55">{item.equipment}</p>
                      <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/70">
                        <span className="inline-flex items-center gap-1"><Clock3 aria-hidden="true" size={13} className="text-lime-400" />{item.duration} min</span>
                        <span className="inline-flex items-center gap-1"><Flame aria-hidden="true" size={13} className="text-lime-400" />{item.caloriesBurned} kcal</span>
                        <span className="inline-flex items-center gap-1"><Star aria-hidden="true" size={13} className="text-lime-400" />{item.rating}</span>
                      </div>
                    </div>
                  </Link>
                  <div className="ml-auto flex shrink-0 items-center gap-1">
                    {activeTab === "today" ? (
                      <button
                        type="button"
                        onClick={() => {
                          markAsDone(item.id);
                          showToast(`${item.name} marked complete`);
                        }}
                        disabled={isDone}
                        className={iconActionClass}
                        aria-label={isDone ? `${item.name} completed` : `Mark ${item.name} complete`}
                        title={isDone ? "Completed" : "Mark complete"}
                      >
                        <Check aria-hidden="true" size={17} />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleAdd(item.id)}
                        disabled={todayPlan.length >= 5 || todayPlan.some((exercise) => exercise.id === item.id)}
                        className={iconActionClass}
                        aria-label={`Add ${item.name} to today's plan`}
                        title="Add to today's plan"
                      >
                        <Plus aria-hidden="true" size={17} />
                      </button>
                    )}
                    <Link
                      href={`/exercise/${item.id}`}
                      className="inline-flex min-h-8 items-center justify-center rounded-full border border-white/15 px-3 text-xs font-medium text-white transition hover:border-lime-300 hover:text-lime-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-300"
                    >
                      View Details
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        if (activeTab === "today") removeFromToday(item.id);
                        else removeFromSaved(item.id);
                        showToast("Exercise removed");
                      }}
                      className={iconActionClass}
                      aria-label={`Remove ${item.name} from ${activeTab === "today" ? "today's plan" : "saved exercises"}`}
                      title="Remove"
                    >
                      <X aria-hidden="true" size={17} />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="py-20 text-center">
            <h2 className="text-xl font-semibold">
              {activeTab === "today" ? "Your plan is clear" : "No saved exercises yet"}
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-white/55">
              {activeTab === "today"
                ? "Choose a lift from the library to start building today's session."
                : "Save exercises from their detail pages and they will appear here."}
            </p>
            <Link
              href="/workout#library"
              className="mt-5 inline-flex min-h-11 items-center justify-center rounded-lg bg-lime-400 px-4 py-2 text-sm font-semibold text-black transition hover:bg-lime-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-300"
            >
              Browse workouts
            </Link>
          </div>
        )}
      </section>
      </main>
    </div>
  );
}