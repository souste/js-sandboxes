async function getData() {
  const url = "https://randomuser.me/api/";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}

module.exports = { getData };
