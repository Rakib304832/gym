import React from 'react';
import Image from "next/image";
import {notFound } from "next/navigation";
import {Exercise} from "../../../type"
import PlanButtons from "../../../components/PlanButtons";


type PageProps = {
    params: Promise<{id: string}>
}

const gymDetails = async ():Promise<Exercise[]> => {
  const res = await fetch("https://api.abcz.workers.dev/api/fitlog")
  const data = await res.json()
  return data;
}

export default async function gymData({ params }: PageProps) {

    const { id } = await params;
    const items = await gymDetails();
    const item = items.find((m) => (m.id === Number(id)))
    if (!item) notFound()

    return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-10">
    <div className="grid min-w-0 grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-12">
      <div className="relative aspect-4/5 w-full overflow-hidden rounded-2xl">
        <Image src={item.image} alt={item.name} fill className="object-cover" /> 
      </div>

      <div className="min-w-0 text-white">
        <h1 className="wrap-break-word text-3xl font-bold uppercase sm:text-4xl">{item.name}</h1>
        <p className="mt-2 text-white/70">{item.description}</p> 

        <div className="mt-4 flex flex-wrap gap-2">
          {item.muscleGroups.map((m) => ( 
            <span key={m} className="rounded-full bg-lime-400 px-3 py-1 text-xs font-bold text-black">
              {m} 
            </span> 
          ))} 
        </div> 

        <dl className="mt-6 divide-y divide-white/10 rounded-xl bg-[#141a3a] p-4">
          <div className="grid grid-cols-2 gap-4 py-2"><dt>EQUIPMENT</dt><dd className="wrap-break-word text-right">{item.equipment}</dd></div>
          <div className="grid grid-cols-2 gap-4 py-2"><dt>DIFFICULT</dt><dd className="wrap-break-word text-right">{item.difficulty}</dd></div>
          <div className="grid grid-cols-2 gap-4 py-2"><dt>SETS</dt><dd className="wrap-break-word text-right">{item.sets} min</dd></div>
          <div className="grid grid-cols-2 gap-4 py-2"><dt>REPS</dt><dd className="wrap-break-word text-right">{item.reps} kcal</dd></div>
          <div className="grid grid-cols-2 gap-4 py-2"><dt>DURATION</dt><dd className="wrap-break-word text-right">{item.duration} kcal</dd></div>
          <div className="grid grid-cols-2 gap-4 py-2"><dt>CALORIES</dt><dd className="wrap-break-word text-right">{item.caloriesBurned} kcal</dd></div>
          <div className="grid grid-cols-2 gap-4 py-2"><dt>RATING</dt><dd className="wrap-break-word text-right">{item.rating} kcal</dd></div>
        </dl> 

        <h3 className="mt-6 font-bold">INSTRUCTIONS</h3> 
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-white/80">
          {item.instructions.map((s, i) => ( 
            <li key={i}>{s}</li> 
          ))} 
        </ol>
        <PlanButtons item={item} />
          
    </div> 
    </div> 
   
  </main> 
); 

};

