import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
const Banner = () => {
    return (
        <div>
           
        <div className="mx-auto mt-6 w-full max-w-7xl rounded-3xl bg-gray-800 px-4 py-8 sm:mt-10 sm:px-6 lg:mt-12 lg:px-8">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
            <div className="min-w-0 flex-1">
                <h2 className="mb-5 font-extrabold text-lime-400">WORKOUT LIBRARY</h2>
               <span className="block text-3xl font-extrabold uppercase tracking-wide text-white sm:text-4xl lg:text-5xl">TRAIN WITH INTENT. LOG EVERY SET.</span>
               <h2 className="mt-4 max-w-xl">FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.</h2>
                             <Link href="/workout#library" className="mt-8 inline-flex min-h-12 items-center gap-3 rounded-lg bg-lime-400 px-5 py-3 text-sm font-bold uppercase text-black transition hover:bg-lime-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-300">
                                 Browse workouts <ArrowRight aria-hidden="true" size={18} />
                             </Link>
            </div>
                <div className="shrink-0">
               <Image
                       src="/banner.png"
                       width={300}
                       height={400}
                       alt="FILOG logo"
                       className="h-40 w-40 object-contain sm:h-52 sm:w-52"
                     />
            </div>
        </div>
        </div >
        <div className="mx-auto w-full max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
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