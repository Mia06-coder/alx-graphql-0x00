import React from "react";
import Link from "next/link";

const rickMortyBg =
  "bg-gradient-to-br from-green-200 via-yellow-100 to-blue-200";
const accentText = "text-[#00b5cc] font-bold";
const buttonStyle =
  "px-6 py-3 rounded-xl bg-[#b6ffb3] border-2 border-[#00b5cc] shadow-rick text-[#00b5cc] font-bold text-xl hover:bg-[#e0ffe0] transition-all duration-200";

const LandingPage: React.FC = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div
      className={`max-w-md p-10 rounded-2xl ${rickMortyBg} shadow-xl border-4 border-[#00b5cc] flex flex-col items-center`}
      style={{
        boxShadow:
          "0 0 40px 0 #00b5cc, 0 0 0 8px #ff9800 inset, 0 0 0 2px #b6ffb3 inset",
      }}
    >
      <h1
        className={`text-center text-4xl mb-10 tracking-widest ${accentText}`}
        style={{
          fontFamily: "'Luckiest Guy', 'Comic Sans MS', cursive",
          textShadow: "2px 2px 0 #ff9800, 4px 4px 0 #00b5cc",
        }}
      >
        Rick & Morty Explorer
      </h1>
      <div className="flex flex-col gap-6 w-full items-center">
        <Link href="/character">
          <button className={buttonStyle}>Single Character</button>
        </Link>
        <Link href="/characters">
          <button className={buttonStyle}>All Characters</button>
        </Link>
      </div>
    </div>
  </div>
);

export default LandingPage;
