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
    <div className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0a0e14]/90 px-3 py-2 backdrop-blur-md sm:px-6 lg:px-8">

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2">

        <button
          onClick={() => setIsMenuOpen((open) => !open)}
          className="order-1 shrink-0 rounded-lg border border-white/10 bg-white/5 p-2 text-gray-300 transition hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-300 md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          type="button"
        >
          {isMenuOpen ? <X aria-hidden="true" size={20} /> : <Menu aria-hidden="true" size={20} />}
        </button>

        {/* Logo */}
        <Link href="/" className="order-2 flex shrink-0 items-center gap-2 md:order-1" aria-label="FitLog home">
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
        <ul className="order-2 hidden items-center gap-2 p-1 md:flex">
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
        <div className="order-3">
          <ul className="flex items-center gap-2 text-[11px] text-gray-300 sm:gap-5 sm:text-xs" aria-label="Plan counts">
            <li className="flex items-center gap-1.5 sm:gap-2">
              <Link href="/my-plan" className="flex items-center gap-1.5 sm:gap-2">
                <span>Plan</span>
                <span className="min-w-6 rounded-full bg-lime-400 px-2 py-1 text-center text-xs tabular-nums text-black">
                  {todayPlan.length}
                </span>
              </Link>
            </li>
            <li className="flex items-center gap-1.5 sm:gap-2">
              <Link href="/my-plan" className="flex items-center gap-1.5 sm:gap-2">
                <span>Saved</span>
                <span className="min-w-6 rounded-full bg-white/10 px-2 py-1 text-center text-xs tabular-nums text-lime-300">
                  {savedList.length}
                </span>
              </Link>
            </li>
          </ul>
        </div>

      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div id="mobile-navigation" className="absolute left-3 top-full w-48 rounded-b-lg border border-t-0 border-white/10 bg-[#0f172a] p-2 shadow-xl md:hidden">
          <div className="flex flex-col gap-1">
            {/* fixed: active state now driven by pathname instead of hardcoded */}
            <Link
              href="/workout"
              onClick={() => setIsMenuOpen(false)}
              className={`w-full rounded-lg px-3 py-3 text-sm font-medium ${
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
              className={`flex w-full items-center justify-between rounded-lg px-3 py-3 text-sm font-medium ${
                pathname === "/my-plan"
                  ? "bg-lime-900/50 text-lime-400"
                  : "text-gray-400"
              }`}
            >
              My plan
            </Link>
            <Link
              href="/my-plan"
              onClick={() => setIsMenuOpen(false)}
              className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-sm font-medium text-gray-400 hover:bg-white/5 hover:text-white"
            >
              <span>Plan</span>
              <span className="min-w-6 rounded-full bg-lime-400 px-2 py-1 text-center text-xs tabular-nums text-black">
                {todayPlan.length}
              </span>
            </Link>
            <Link
              href="/my-plan"
              onClick={() => setIsMenuOpen(false)}
              className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-sm font-medium text-gray-400 hover:bg-white/5 hover:text-white"
            >
              <span>Saved</span>
              <span className="min-w-6 rounded-full bg-white/10 px-2 py-1 text-center text-xs tabular-nums text-lime-300">
                {savedList.length}
              </span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;