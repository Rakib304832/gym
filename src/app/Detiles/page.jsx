"use client";

import { useGym } from "../contex/gymContex";
import { FiBookmark } from "react-icons/fi";
import { BiSave } from "react-icons/bi";

export default function PlanButtons({ item }) {
  const { addToToday, saveForLater } = useGym();

  return (
    <div className="mt-4 flex gap-3">
      <button
        type="button"
        onClick={() => addToToday(item)}
        className="flex items-center gap-2 rounded-2xl bg-lime-400 px-4 py-2 text-black"
      >
        <BiSave />
        Add to today&apos;s plan
      </button>

      <button
        type="button"
        onClick={() => saveForLater(item)}
        className="flex items-center gap-2 rounded-2xl border border-white/30 px-4 py-2 text-white"
      >
        <FiBookmark />
        Save for later
      </button>
    </div>
  );
}