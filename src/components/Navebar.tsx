"use client"
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation"
import { useGym } from "../app/contex/gymContex";

const Navbar = () => {
  const pathname = usePathname(); // fixed: was usePathame() — undefined function, would throw
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { todayPlan, savedList } = useGym();

  return (
    <div className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0a0e14]/90 px-4 py-1 backdrop-blur-md sm:px-6 lg:px-8">

      <div className="mx-auto flex max-w-7xl items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2" aria-label="FitLog home">
          <Image
            src="/logo.png"
            width={32}
            height={32}
            alt="FILOG logo"
            className="h-6 w-6"
          />
          <h2 className="text-lg font-bold tracking-wide text-white sm:text-xl">
            FILOG
          </h2>
        </Link>

        {/* Main Navigation */}
        <ul className="flex items-center gap-2 p-1">
          <li>
           
            <Link
              href="/workout"
              className={`block cursor-pointer rounded-full px-3 py-1.5 text-xs font-medium transition ${
                pathname === "/workout"
                  ? "bg-lime-900/50 text-lime-400" 
                  : "text-gray-400" 
              }`}
            >
              Workout
            </Link>
          </li>

          <li>
           
            <Link
              href="/my-plan"
              className={`block cursor-pointer rounded-full px-3 py-1.5 text-xs font-medium transition ${
                pathname === "/my-plan"
                  ? "bg-lime-900/50 text-lime-400" 
                  : "text-gray-400" 
              }`}
            >
              My plan
              <span className="ml-1 rounded-full bg-white/10 px-2 py-0.5 text-xs tabular-nums text-white/75">
                {todayPlan.length}
              </span>
            </Link>
          </li>
        </ul>

        {/* Right Side */}
        <div className="hidden md:block">
          <ul className="flex items-center gap-5 text-xs text-gray-300" aria-label="Plan counts">
            <li className="flex items-center gap-2">
              <span>Plan</span>
              <span className="min-w-6 rounded-full bg-lime-400 px-2 py-1 text-center text-xs tabular-nums text-black">
                {todayPlan.length}
              </span>
            </li>
            <li className="flex items-center gap-2">
              <span>Saved</span>
              <span className="min-w-6 rounded-full bg-white/10 px-2 py-1 text-center text-xs tabular-nums text-lime-300">
                {savedList.length}
              </span>
            </li>
          </ul>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen((open) => !open)}
          className="rounded-lg border border-white/10 bg-white/5 p-2 text-gray-300 transition hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-300 md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          type="button"
        >
          {isMenuOpen ? <X aria-hidden="true" size={20} /> : <Menu aria-hidden="true" size={20} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div id="mobile-navigation" className="mt-3 border-t border-white/10 pt-3 md:hidden">
          <div className="flex items-center justify-between">
            {/* fixed: active state now driven by pathname instead of hardcoded */}
            <Link
              href="/workout"
              onClick={() => setIsMenuOpen(false)}
              className={`rounded-full px-4 py-2 text-sm font-medium ${
                pathname === "/workout"
                  ? "bg-lime-900/50 text-lime-400"
                  : "text-gray-400"
              }`}
            >
              Workout
            </Link>

            <Link
              href="/my-plan"
              onClick={() => setIsMenuOpen(false)}
              className={`rounded-full px-4 py-2 text-sm font-medium ${
                pathname === "/my-plan"
                  ? "bg-lime-900/50 text-lime-400"
                  : "text-gray-400"
              }`}
            >
              My plan
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;