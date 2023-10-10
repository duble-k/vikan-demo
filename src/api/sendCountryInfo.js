const sendCountryInfo = async (input) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_serverUrl}/api/upload`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      }
    );
    return response;
    // Handle response as before
  } catch (error) {
    console.error("Error:", error);
  }
};

export default sendCountryInfo;
