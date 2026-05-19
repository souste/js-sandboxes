import { getAllSpells, getSpellDetails } from "./api";
import { useState, useEffect } from "react";

export default function Spells() {
  const [spells, setSpells] = useState([]);
  const [selectedSpell, setSelectedSpell] = useState(null);

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

  return (
    <div>
      <ul>
        {spells.slice(0, 10).map((spell) => (
          <li onClick={() => generateSpellDetails(spell.url)} key={spell.index}>
            {spell.name}
          </li>
        ))}
      </ul>

      <div>
        {selectedSpell && (
          <div onClick={() => closeSpellDetails()}>
            <p>{selectedSpell.name}</p>
            <p>{selectedSpell.range}</p>
            <p>{selectedSpell.level}</p>
            <p>{selectedSpell.desc?.join(" ")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
