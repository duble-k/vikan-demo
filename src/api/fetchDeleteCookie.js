const fetchDeleteCookie = async () => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_serverUrl}/api/delete-cookie`,
      {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data.message;
  } catch (error) {
    console.log("error logging out: ", error)
    throw error; // Re-throw the error to be caught higher up the call stack
  }
};

export default fetchDeleteCookie;
