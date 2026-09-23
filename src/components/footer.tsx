import React from 'react';
import { Dumbbell } from "lucide-react"

const footer = () => {
    return (
        <footer className="border-t border-wite/10 px-6 py-8">
        <div className=" flex justify-between gap-4 md:flex-row">
        <div className='flex items-center gap-2'>
          <Dumbbell className='h-5 w-5 text-lime-400 '/>
          <span className="text-lg font-extrabold uppercase tracking-wide text-white">FitLog</span>
        </div>
        <div>
            <p className='text-sm text-gray-300'>© 2026 FitLog — Workout Library. Train hard, log honest.</p>
            </div>
        </div>
        </footer>
    );
};

export default footer;