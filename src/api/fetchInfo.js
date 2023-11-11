const fetchInfo = async (input) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_serverUrl}/api/receive`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      }
    );

    if (!response.ok) {
      // Handle error responses here
      console.error("Error:", response.statusText);
      return;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

export default fetchInfo;
