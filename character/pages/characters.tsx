import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";

const CHARACTERS_QUERY = gql`
  query Characters($page: Int!) {
    characters(page: $page) {
      results {
        id
        name
        status
        image
      }
    }
  }
`;

interface Character {
  id: string;
  name: string;
  status: string;
  image: string;
}

const rickMortyBg =
  "bg-gradient-to-br from-green-200 via-yellow-100 to-blue-200";
const cardBg = "bg-[#b6ffb3] border-2 border-[#00b5cc] shadow-rick";
const accentText = "text-[#00b5cc] font-bold";
const labelText = "text-[#ff9800] font-semibold";

const CharacterPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const { loading, error, data } = useQuery(CHARACTERS_QUERY, {
    variables: { page },
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
        Rick & Morty Characters
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
        <label className={`mr-2 ${labelText}`}>Pick a Page:</label>
        <select
          value={page}
          onChange={(e) => setPage(Number(e.target.value))}
          className="p-2 rounded-lg border-2 border-[#00b5cc] bg-[#e0ffe0] text-[#00b5cc] font-bold shadow-md"
        >
          {[1, 2, 3, 4, 5].map((p) => (
            <option key={p} value={p}>
              {p}
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
      {data && data.characters && (
        <ul className="list-none p-0 m-0">
          {data.characters.results.map((character: Character) => (
            <li
              key={character.id}
              className={`mb-4 p-3 rounded-xl ${cardBg} flex items-center`}
            >
              <Image
                src={character.image}
                alt={character.name}
                width={16}
                height={16}
                className="w-16 h-16 rounded-full mr-4 border-2 border-[#00b5cc]"
              />
              <div>
                <div className={accentText}>{character.name}</div>
                <div className={labelText}>Status: {character.status}</div>
                <div className={labelText}>ID: {character.id}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CharacterPage;
