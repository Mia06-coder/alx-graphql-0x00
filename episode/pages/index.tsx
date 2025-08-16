import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";

const EPISODE_QUERY = gql`
  query Episode($id: ID!) {
    episode(id: $id) {
      id
      name
      air_date
      episode
    }
  }
`;

const rickMortyBg =
  "bg-gradient-to-br from-green-200 via-yellow-100 to-blue-200";
const cardBg = "bg-[#b6ffb3] border-2 border-[#00b5cc] shadow-rick";
const accentText = "text-[#00b5cc] font-bold";
const labelText = "text-[#ff9800] font-semibold";

const EpisodePage: React.FC = () => {
  const [episodeId, setEpisodeId] = useState(1);
  const { loading, error, data } = useQuery(EPISODE_QUERY, {
    variables: { id: episodeId },
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
        Rick & Morty Episode
      </h1>
      <div className="mb-6 flex justify-center items-center">
        <label className={`mr-2 ${labelText}`}>Pick an Episode ID:</label>
        <select
          value={episodeId}
          onChange={(e) => setEpisodeId(Number(e.target.value))}
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
      {data && data.episode && (
        <ul className="list-none p-0 m-0">
          <li className={`mb-4 p-3 rounded-xl ${cardBg} flex items-center`}>
            <span className={`mr-2 min-w-[80px] inline-block ${labelText}`}>
              ID:
            </span>
            <span className={accentText}>{data.episode.id}</span>
          </li>
          <li className={`mb-4 p-3 rounded-xl ${cardBg} flex items-center`}>
            <span className={`mr-2 min-w-[80px] inline-block ${labelText}`}>
              Name:
            </span>
            <span className={accentText}>{data.episode.name}</span>
          </li>
          <li className={`mb-4 p-3 rounded-xl ${cardBg} flex items-center`}>
            <span className={`mr-2 min-w-[80px] inline-block ${labelText}`}>
              Air Date:
            </span>
            <span className={accentText}>{data.episode.air_date}</span>
          </li>
          <li className={`mb-4 p-3 rounded-xl ${cardBg} flex items-center`}>
            <span className={`mr-2 min-w-[80px] inline-block ${labelText}`}>
              Episode:
            </span>
            <span className={accentText}>{data.episode.episode}</span>
          </li>
        </ul>
      )}
    </div>
  );
};

export default EpisodePage;
