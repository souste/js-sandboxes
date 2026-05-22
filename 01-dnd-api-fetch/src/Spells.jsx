import { getAllSpells, getSpellDetails } from "./api";
import { useState, useEffect } from "react";
import Pagination from "./Pagination";
import SpellCard from "./SpellCard";

export default function Spells() {
  const [spells, setSpells] = useState([]);
  const [selectedSpell, setSelectedSpell] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [spellsPerPage, setSpellsPerPage] = useState(12);

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

  const filteredSpells = spells.filter((spell) =>
    spell.name.toLowerCase().includes(searchValue.toLowerCase()),
  );

  const lastSpellsIndex = currentPage * spellsPerPage;
  const firstSpellIndex = lastSpellsIndex - spellsPerPage;
  const currentSpells = filteredSpells.slice(firstSpellIndex, lastSpellsIndex);

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
        {currentSpells.map((spell) => (
          <li onClick={() => generateSpellDetails(spell.url)} key={spell.index}>
            {spell.name}
          </li>
        ))}
      </ul>

      <div>
        {selectedSpell && (
          <div>
            <SpellCard spell={selectedSpell} />
          </div>
        )}
      </div>
      <Pagination
        totalSpells={filteredSpells.length}
        spellsPerPage={spellsPerPage}
        setCurrentPage={setCurrentPage}
        spells={spells}
      />
    </div>
  );
}
