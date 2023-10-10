const deleteCountryInfo = async (country) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_serverUrl}/api/delete`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ country }), // Send the uniqueKey in the request body as JSON
      }
    );

    return response;
  } catch (error) {
    console.error(error);
    return { message: "Error" };
  }
};

export default deleteCountryInfo;
