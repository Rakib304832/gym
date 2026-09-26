"use client";

import { Bookmark, ListPlus } from "lucide-react";
import type { Exercise } from "../type";
import { useGym } from "../app/contex/gymContex";
import { useToast } from "./ToastContext";

export default function PlanButtons({ item }: { item: Exercise }) {
  const { todayPlan, savedList, addToToday, saveForLater } = useGym();
  const { showToast } = useToast();
  const alreadyPlanned = todayPlan.some((exercise) => exercise.id === item.id);
  const alreadySaved = savedList.some((exercise) => exercise.id === item.id);
  const planIsFull = todayPlan.length >= 5;

  const handleAdd = () => {
    const result = addToToday(item);
    if (result === "added") showToast("Added to today's plan");
    if (result === "already-added") showToast("This exercise is already planned");
    if (result === "limit-reached") showToast("Your daily plan is limited to five exercises");
  };

  const handleSave = () => {
    const result = saveForLater(item);
    showToast(result === "saved" ? "Saved for later" : "Already in your saved list");
  };

  return (
    <div className="mt-6 flex flex-wrap gap-3">
      <button
        type="button"
        onClick={handleAdd}
        disabled={alreadyPlanned || planIsFull}
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-lime-400 px-4 py-2 text-sm font-semibold text-black transition hover:bg-lime-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-300 disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/50"
      >
        <ListPlus aria-hidden="true" size={18} />
        {alreadyPlanned ? "In today's plan" : planIsFull ? "Plan is full" : "Add to today's plan"}
      </button>
      <button
        type="button"
        onClick={handleSave}
        disabled={alreadySaved}
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:border-lime-300 hover:text-lime-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-300 disabled:cursor-not-allowed disabled:border-white/10 disabled:text-white/45"
      >
        <Bookmark aria-hidden="true" size={18} />
        {alreadySaved ? "Saved for later" : "Save for later"}
      </button>
    </div>
  );
}