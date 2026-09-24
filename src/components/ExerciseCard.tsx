import Image from "next/image"; 
import { CiClock2, CiStar } from "react-icons/ci"; 
import { FaFire } from "react-icons/fa";
import {Exercise} from "../type" 
import Link from "next/link"; 


type Props = { 
  item: Exercise; 
}; 

const ExerciseCard = ({ item }: Props) => {
  return ( 
    <Link href={`/exercise/${item.id}`} >
   <div className="group overflow-hidden rounded-2xl border border-white/10 bg-[#141a3a] shadow-sm"> 
      <div className="relative h-64 w-full">
        <Image
          src={item.image} 
          alt={item.name} 
          fill 
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
      </div> 

      <div className="px-6 py-6 text-white">
        <div className="flex flex-wrap gap-2">
          {item.muscleGroups.map((m) => ( 
            <span key={m} className="rounded-full bg-lime-400 px-3 py-1 text-xs font-bold uppercase text-black"> 
              {m} 
            </span>
          ))} 
        </div> 

        <h3 className="mt-3 text-xl font-extrabold uppercase">{item.name}</h3> 
        <p className="text-sm text-gray-400">{item.equipment}</p> 

        <div className="mt-4 flex items-center gap-5 border-t border-white/10 pt-4 text-sm text-gray-300"> 
          <span className="flex items-center gap-1"><CiClock2 /> {item.duration} min</span> 
          <span className="flex items-center gap-1"><FaFire /> {item.caloriesBurned} kcal</span>
          <span className="flex items-center gap-1"><CiStar /> {item.rating}</span> 
        </div> 
      </div> 
    </div> 
    </Link>
  );
}; 


export default ExerciseCard; 