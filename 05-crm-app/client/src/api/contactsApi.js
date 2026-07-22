export async function getContacts() {
  try {
    const response = await fetch("http://localhost:3000/contacts", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Could not fetch contacts");
    }
    const result = await response.json();

    return result.data;
  } catch (err) {
    console.error("Error fetching contacts", err.message);
    throw err;
  }
}
