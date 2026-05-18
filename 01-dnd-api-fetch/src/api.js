const BASE_URL = "https://www.dnd5eapi.co";

export async function getAllSpells() {
  try {
    const response = await fetch(BASE_URL + "/api/2014/spells");
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error.message);
  }
}

getAllSpells();
