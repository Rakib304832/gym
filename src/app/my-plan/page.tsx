
"use client"; 

import { useState } from "react";
import { useGym } from "../contex/gymContex";
import ExerciseCard from "../../components/ExerciseCard";

export default function MyPlanPage() {
  const { todayPlan, savedList } = useGym();
  const [activeTab, setActiveTab] = useState<"today" | "saved">("today");
  const currentList = activeTab === "today" ? todayPlan : savedList;

 
  if (todayPlan.length === 0 && savedList.length === 0) {
    return (
      <div className="min-h-screen bg-[#0B0B0F] text-white">
      
      <div className="mt-8 px-8">
        {/* Page title */}
        <div className="mt-6">
          <h2 className="text-4xl">MY PLAN</h2>
          <p>Cap of five lifts for today. Finish them, load more.</p>
        </div>
 
        <div className="mt-6 grid grid-cols-3 divide-x divide-white/10 rounded-2xl border border-white/10 bg-white/[0.03] px-8 py-6">
      
          <div>
            <p className="text-white/50">Exercises</p>
            <p className="text-3xl text-[#C6F135]">2</p>
          </div>
          <div>
            <p className="text-white/50">Minutes</p>
            <p className="text-3xl">23</p>
          </div>
          <div>
            <p className="text-white/50">Calories</p>
            <p className="text-3xl">190</p>
          </div>
        </div>
        
 
        {/* Tabs + sort dropdown */}
        <div className="flex items-center justify-between  mt-6">
          <div className="tabs tabs-box bg-white/5 border border-white/10 rounded-xl p-1"> {/* কন্টেইনার: গোলাকার পিল শেপ, হালকা বর্ডার */}
  <input
    type="radio"
    name="my_tabs_1"
    className="tab rounded-xl px-4 py-1.5 text-white/60 checked:bg-white checked:text-black checked:font-semibold" 
   
    aria-label="Today's Plan"
  />
  <div className="tab-content bg-base-100 border border-base-300 p-6">
    
  </div>
  <input
    type="radio"
    name="my_tabs_1"
    className="tab rounded-xl px-4 py-1.5 text-white/60 checked:bg-white checked:text-black checked:font-semibold"
    aria-label="Saved"
    defaultChecked 
  />
  
</div>
 
          <div className=" flex items-center gap-2 text-sm text-white/60">
            <span>Sort By</span>
            <button className="rounded-full border border-white/10 px-3 py-1.5 text-white">
              Duration ▾
            </button>
          </div>
        </div>
 
        {/* Empty state — shown when there are no saved lifts yet */}
        <div className="mb-8 mt-6 flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] py-35 text-center">
          <h3 className="text-lg">NOTHING HERE YET</h3>
          <p className="mt-2 text-sm text-white/50">
            Browse the library and add a lift to get today moving.
          </p>
          <button className="mt-6 rounded-full bg-[#C6F135] px-6 py-2.5 text-sm text-black">
            Go to workouts
          </button>
        </div>
      </div>
    </div>
     
    );
  };

  return (
       <div className="min-h-screen bg-[#0B0B0F] px-8 py-8 text-white">
  
      <h2 className="text-4xl font-bold">MY PLAN</h2>
      <p className="mt-1 text-white/50">
        Cap of five lifts for today. Finish them, then load more.
      </p>
 
      {/* সামারি বক্স */}
      <div className="mt-6 grid grid-cols-3 divide-x divide-white/10 rounded-2xl border border-white/10 bg-white/[0.03] px-8 py-6">
        <div>
          <p className="text-white/50">Exercises</p>
          <p className="text-3xl text-[#C6F135]">{todayPlan.length + savedList.length}</p>
        </div>
        <div>
          <p className="text-white/50">Minutes</p>
          <p className="text-3xl">23</p>
        </div>
        <div>
          <p className="text-white/50">Calories</p>
          <p className="text-3xl">190</p>
        </div>
      </div>
 
      
      <div className="mt-6 flex items-center justify-between">
        <div className="flex rounded-xl border border-white/10 bg-white/5 p-1">
          <button
            onClick={() => setActiveTab("today")} 
            type="button"
            aria-pressed={activeTab === "today"}
            className={`rounded-xl px-4 py-1.5 text-sm ${
              activeTab === "today"
                ? "bg-white font-semibold text-black" // active হলে সাদা ব্যাকগ্রাউন্ড
                : "text-white/60"
            }`}
          >
            Today&apos;s Plan
          </button>
          <button
            onClick={() => setActiveTab("saved")} // ক্লিক করলে activeTab = "saved"
            type="button"
            aria-pressed={activeTab === "saved"}
            className={`rounded-xl px-4 py-1.5 text-sm ${
              activeTab === "saved"
                ? "bg-white font-semibold text-black"
                : "text-white/60"
            }`}
          >
            Saved
          </button>
        </div>
 
        <div className="flex items-center gap-2 text-sm text-white/60">
          <span>Sort By</span>
          <button className="rounded-full border border-white/10 px-3 py-1.5 text-white">
            Duration ▾
          </button>
        </div>
      </div>
 
      
      <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
        {currentList.length > 0 ? ( 
          <div className="grid gap-4">
            {currentList.map((item) => (
              <ExerciseCard key={item.id} item={item} /> 
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <h3 className="text-lg">NOTHING HERE YET</h3>
            <p className="mt-2 text-sm text-white/50">
              Browse the library and add a lift to get today moving.
            </p>
            <button
              type="button"
              className="mt-6 rounded-full bg-[#C6F135] px-6 py-2.5 text-sm text-black"
            >
              Go to workouts
            </button>
          </div>
        )}
      </div>
    </div>
  );
};