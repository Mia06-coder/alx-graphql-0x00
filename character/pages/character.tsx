import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import Link from "next/link"; // If using Next.js

const CHARACTER_QUERY = gql`
  query Character($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      type
      gender
    }
  }
`;

const rickMortyBg =
  "bg-gradient-to-br from-green-200 via-yellow-100 to-blue-200";
const cardBg = "bg-[#b6ffb3] border-2 border-[#00b5cc] shadow-rick";
const accentText = "text-[#00b5cc] font-bold";
const labelText = "text-[#ff9800] font-semibold";

const CharacterPage: React.FC = () => {
  const [characterId, setCharacterId] = useState(1);
  const { loading, error, data } = useQuery(CHARACTER_QUERY, {
    variables: { id: characterId },
  });

  return (
    <div
      className={`max-w-md mx-auto mt-10 p-8 rounded-2xl ${rickMortyBg} shadow-xl border-4 border-[#00b5cc]`}
      style={{
        boxShadow:
          "0 0 40px 0 #00b5cc, 0 0 0 8px #ff9800 inset, 0 0 0 2px #b6ffb3 inset",
      }}
    >
      <h1
        className={`text-center text-4xl mb-6 tracking-widest ${accentText}`}
        style={{
          fontFamily: "'Luckiest Guy', 'Comic Sans MS', cursive",
          textShadow: "2px 2px 0 #ff9800, 4px 4px 0 #00b5cc",
        }}
      >
        Rick & Morty Character
      </h1>
      <div className="mb-4 flex justify-center">
        <Link
          href="/"
          className="text-[#00b5cc] underline font-bold hover:text-[#ff9800] transition"
        >
          ← Back to Home
        </Link>
      </div>
      <div className="mb-6 flex justify-center items-center">
        <label className={`mr-2 ${labelText}`}>Pick a Dimension ID:</label>
        <select
          value={characterId}
          onChange={(e) => setCharacterId(Number(e.target.value))}
          className="p-2 rounded-lg border-2 border-[#00b5cc] bg-[#e0ffe0] text-[#00b5cc] font-bold shadow-md"
        >
          {[1, 2, 3, 4].map((id) => (
            <option key={id} value={id}>
              {id}
            </option>
          ))}
        </select>
      </div>
      {loading && (
        <p className="text-center text-lg text-[#00b5cc] font-bold animate-pulse">
          Loading portal...
        </p>
      )}
      {error && (
        <p className="text-center text-red-500 font-semibold">
          Error: {error.message}
        </p>
      )}
      {data && data.character && (
        <ul className="list-none p-0 m-0">
          <li className={`mb-4 p-3 rounded-xl ${cardBg} flex items-center`}>
            <span className={`mr-2 min-w-[80px] inline-block ${labelText}`}>
              ID:
            </span>
            <span className={accentText}>{data.character.id}</span>
          </li>
          <li className={`mb-4 p-3 rounded-xl ${cardBg} flex items-center`}>
            <span className={`mr-2 min-w-[80px] inline-block ${labelText}`}>
              Name:
            </span>
            <span className={accentText}>{data.character.name}</span>
          </li>
          <li className={`mb-4 p-3 rounded-xl ${cardBg} flex items-center`}>
            <span className={`mr-2 min-w-[80px] inline-block ${labelText}`}>
              Status:
            </span>
            <span className={accentText}>{data.character.status}</span>
          </li>
          <li className={`mb-4 p-3 rounded-xl ${cardBg} flex items-center`}>
            <span className={`mr-2 min-w-[80px] inline-block ${labelText}`}>
              Species:
            </span>
            <span className={accentText}>{data.character.species}</span>
          </li>
          <li className={`mb-4 p-3 rounded-xl ${cardBg} flex items-center`}>
            <span className={`mr-2 min-w-[80px] inline-block ${labelText}`}>
              Type:
            </span>
            <span className={accentText}>{data.character.type || "N/A"}</span>
          </li>
          <li className={`mb-4 p-3 rounded-xl ${cardBg} flex items-center`}>
            <span className={`mr-2 min-w-[80px] inline-block ${labelText}`}>
              Gender:
            </span>
            <span className={accentText}>{data.character.gender}</span>
          </li>
        </ul>
      )}
    </div>
  );
};

export default CharacterPage;
