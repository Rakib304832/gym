import React from 'react';
import Image from "next/image";
import {notFound } from "next/navigation";
import {Exercise} from "../../../type"
import Link from "next/link";
import { FiBookmark } from "react-icons/fi";
import { BiSave } from "react-icons/bi";

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
    <main className="mx-auto max-w-[1232px] px-6 py-10"> 
    <div className="grid gap-14 md:grid-cols-2">
      <div className="relative overflow-hidden rounded-2xl"> 
        <Image src={item.image} alt={item.name} fill className="object-cover" /> 
        
      </div>

      <div className="text-white"> 
        <h1 className="text-4xl font-bold uppercase">{item.name}</h1> 
        <p className="mt-2 text-white/70">{item.description}</p> 

        <div className="mt-4 flex gap-2"> 
          {item.muscleGroups.map((m) => ( 
            <span key={m} className="rounded-full bg-lime-400 px-3 py-1 text-xs font-bold text-black">
              {m} 
            </span> 
          ))} 
        </div> 

        <dl className="mt-6 divide-y divide-white/10 rounded-xl bg-[#141a3a] p-4"> 
          <div className="flex justify-between py-2"><dt>EQUIPMENT</dt><dd>{item.equipment}</dd></div> 
          <div className="flex justify-between py-2"><dt>DIFFICULT</dt><dd>{item.difficulty}</dd></div> 
          <div className="flex justify-between py-2"><dt>SETS</dt><dd>{item.sets} min</dd></div> 
          <div className="flex justify-between py-2"><dt>REPS</dt><dd>{item.reps} kcal</dd></div> 
          <div className="flex justify-between py-2"><dt>DURATION</dt><dd>{item.duration} kcal</dd></div> 
          <div className="flex justify-between py-2"><dt>CALORIES</dt><dd>{item.caloriesBurned} kcal</dd></div> 
          <div className="flex justify-between py-2"><dt>RATING</dt><dd>{item.rating} kcal</dd></div> 
        </dl> 

        <h3 className="mt-6 font-bold">INSTRUCTIONS</h3> 
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-white/80">
          {item.instructions.map((s, i) => ( 
            <li key={i}>{s}</li> 
          ))} 
        </ol>
           <div className="flex gap-3 mt-4">
    <Link href=""><button className="rounded-2xl text-black bg-lime-400 px-4 py-2 flex items-center gap-2 ">
      <BiSave />Add to today's plan
      </button></Link>
    <Link href=""><button className="rounded-2xl border  text-white border-white/30 px-4 py-2 flex items-center gap-2 ">

      <FiBookmark />Save for later
      </button ></Link>
    </div> 
      </div> 
    
    </div> 
   
  </main> 
); 

};

