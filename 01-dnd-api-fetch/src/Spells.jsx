import { getAllSpells, getSpellDetails } from "./api";
import { useState, useEffect } from "react";

export default function Spells() {
  const [spells, setSpells] = useState([]);
  const [selectedSpell, setSelectedSpell] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const fetchSpells = async () => {
      const data = await getAllSpells();

      setSpells(data);
    };
    fetchSpells();
  }, []);

  const generateSpellDetails = async (spellUrl) => {
    const data = await getSpellDetails(spellUrl);
    console.log(data);
    setSelectedSpell(data);
  };

  const closeSpellDetails = () => {
    setSelectedSpell(null);
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="search-container">
      <label>Search for your favourite spells here</label>
      <input
        type="text"
        value={searchValue}
        placeholder="Search Spells"
        onChange={handleChange}
      />
      <p>Current Value: {searchValue}</p>
      <ul>
        {spells
          .filter((spell) =>
            spell.name.toLowerCase().includes(searchValue.toLowerCase()),
          )
          .slice(0, 100)
          .map((spell) => (
            <li
              onClick={() => generateSpellDetails(spell.url)}
              key={spell.index}
            >
              {spell.name}
            </li>
          ))}
      </ul>

      <div>
        {selectedSpell && (
          <div>
            <p>{selectedSpell.name}</p>
            <p>{selectedSpell.range}</p>
            <p>{selectedSpell.level}</p>
            <p>{selectedSpell.desc?.join(" ")}</p>
            <button onClick={() => closeSpellDetails()}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}
