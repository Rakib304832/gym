"use client"
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { BsCircleFill } from "react-icons/bs"; // fixed: "Bs0CircleFill" isn't a valid export
import { usePathname } from "next/navigation"

const Navbar = () => {
  const pathname = usePathname(); // fixed: was usePathame() — undefined function, would throw
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0a0e14]/90 px-4 py-3 backdrop-blur-md sm:px-6 lg:px-8">

      <div className="mx-auto flex max-w-7xl items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image
            src="/logo.png"
            width={32}
            height={32}
            alt="FILOG logo"
            className="h-8 w-8"
          />
          <h2 className="text-2xl font-bold tracking-wide text-white sm:text-3xl">
            FILOG
          </h2>
        </div>

        {/* Main Navigation */}
        <ul className="flex items-center gap-2 p-1">
          <li>
           
            <Link
              href="/"
              className={`block cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition ${
                pathname === "/"
                  ? "bg-lime-900/50 text-lime-400" 
                  : "text-gray-400" 
              }`}
            >
              Workout
            </Link>
          </li>

          <li>
            {/* fixed: check against "/" to match the actual Link href */}
            <Link
              href="/"
              className={`block cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition hover:bg-white/10 hover:text-white ${
                pathname === ""
                  ? "bg-lime-900/50 text-lime-400"
                  : "text-gray-400"
              }`}
            >
              MyPlan
            </Link>
          </li>
        </ul>

        {/* Right Side */}
        <div className="hidden md:block">
          <ul className="flex items-center gap-5 text-sm text-gray-300">
            <li className="flex cursor-pointer items-center gap-2 transition hover:text-white">
              <span>Plan</span>
              <BsCircleFill className="text-xs text-lime-400" />
            </li>
            <li className="flex cursor-pointer items-center gap-2 transition hover:text-white">
              <span>Saved</span>
              <BsCircleFill className="text-xs text-lime-400" />
            </li>
          </ul>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="rounded-lg border border-white/10 bg-white/5 p-2 text-xl text-gray-300 transition hover:bg-white/10 hover:text-white md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          type="button"
        >
          ☰
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div id="mobile-navigation" className="mt-3 border-t border-white/10 pt-3 md:hidden">
          <div className="flex items-center justify-between">
            {/* fixed: active state now driven by pathname instead of hardcoded */}
            <Link
              href="/Home"
              className={`rounded-full px-4 py-2 text-sm font-medium ${
                pathname === "/Home"
                  ? "bg-lime-900/50 text-lime-400"
                  : "text-gray-400"
              }`}
            >
              Workout
            </Link>

            <Link
              href="/"
              className={`rounded-full px-4 py-2 text-sm font-medium ${
                pathname === "/"
                  ? "bg-lime-900/50 text-lime-400"
                  : "text-gray-400"
              }`}
            >
              Saved
            </Link>
            {/* removed: duplicate plain-text "Saved" span that followed this */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;