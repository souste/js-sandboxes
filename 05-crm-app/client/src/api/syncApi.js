export async function syncUsersToContacts() {
  try {
    const response = await fetch("http://localhost:3000/sync", {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error("Could not sync contacts");
    }

    const result = await response.json();

    return result.data;
  } catch (err) {
    console.error("Error fetching contacts", err.message);
    throw err;
  }
}
