const login = async (username, password) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_serverUrl}/api/authenticate`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      }
    );

    return response;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

export default login;
