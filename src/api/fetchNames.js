const fetchNames = async () => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_serverUrl}/api/names`,
      {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error fetching country names");
    }

    const data = await response.json();
    return data.names;
  } catch (error) {
    console.error("Error fetching country names:", error);
    throw error; // Re-throw the error to be caught higher up the call stack
  }
};

export default fetchNames;
