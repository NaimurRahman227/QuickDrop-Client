import { useState } from "react";
import CoverageMap from "./CoverageMap";
import District from '/src/assets/District.json'

const Coverage = () => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const suggestions = District.filter((d) =>
    d.district.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-6xl mx-auto bg-base-200">

      <h1 className="text-3xl font-bold mb-4 text-left">
        We are available in 64 Districts
      </h1>

      {/* SEARCH */}
      <div className="relative w-full md:w-1/2">
        <input
          type="text"
          placeholder="Search District..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
        />

        {search && (
          <ul className="absolute bg-white shadow rounded w-full z-50 max-h-48 overflow-y-auto">
            {suggestions.map((s, i) => (
              <li
                key={i}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setSelected(s);
                  setSearch(s.district);
                }}
              >
                {s.district}
              </li>
            ))}
          </ul>
        )}
      </div>

      <h1 className="mt-10 text-2xl text-gray-500">
        We deliver almost all over the Bangladesh
      </h1>

      {/* MAP */}
      <CoverageMap selectedDistrict={selected} />

    </div>
  );
};

export default Coverage;
