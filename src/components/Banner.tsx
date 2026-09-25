import React from 'react';
import Image from "next/image";
const Banner = () => {
    return (
        <div>
           
        <div className=" mx-auto w-full max-w-7xl mt-12 rounded-3xl pt-8 px-8 bg-gray-800 p-13">
        <div className=' flex items-center justify-between' >
            <div>
                <h2 className=' text-lime-400 font-extrabold mb-5'>WORKOUT LIBRARY</h2>
               <span className=" text-5xl  font-extrabold uppercase tracking-wide text-white">TRAIN WITH INTENT. LOG <br/> EVERY SET.</span>
               <h2 className='mt-4'>FitLog is a dark, no-nonsense gym companion: pick a lift, lock It <br/> into today&apos;s plan, and watch the week&apos;s work add up.</h2>
               <button className="mt-12 rounded-md bg-lime-400 px-6 py-3 text-sm font-bold uppercase tracking-wide text-black transition hover:bg-lime-300">BROWSE WORKOUTS</button>
            </div>
            <div>
               <Image
                       src="/banner.png"
                       width={300}
                       height={400}
                       alt="FILOG logo"
                       className="h-60 w-60"
                     />
            </div>
        </div>
        </div >
        <div className='pt-8 px-40'>
           <span className=" text-2xl  font-extrabold uppercase tracking-wide text-white ">
                THE LIBRARY
            </span>
            <p className='text-xs '>Twelve lifts covering every major muscle group
            </p>
            </div>
        </div>
    );
};

export default Banner;