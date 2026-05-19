const BASE_URL = "https://www.dnd5eapi.co";

export async function getAllSpells() {
  const response = await fetch(BASE_URL + "/api/2014/spells");
  const data = await response.json();

  return data.results;
}

export async function getSpellDetails(spellUrl) {
  const response = await fetch(BASE_URL + spellUrl);
  return await response.json();
}

// export async function getAllSpells() {
//   const spellIndexes = await fetch(BASE_URL + "/api/2014/spells").then(
//     (response) => response.json(),
//   );
//   return Promise.all(
//     spellIndexes.results.map((spell) =>
//       fetch(BASE_URL + spell.url).then((response) => response.json()),
//     ),
//   );
// }

// export async function getAllSpells() {
//   try {
//     const response = await fetch(BASE_URL + "/api/2014/spells");
//     if (!response.ok) {
//       throw new Error(`Response status: ${response.status}`);
//     }
//     const data = await response.json();

//     const spellPromises = data.results.map(async (spell) => {
//       const spellResponse = await fetch(BASE_URL + spell.url);
//       return spellResponse.json();
//     });

//     const allSpells = await Promise.all(spellPromises);

//     return allSpells;
//   } catch (error) {
//     console.error(error.message);
//   }
// }
