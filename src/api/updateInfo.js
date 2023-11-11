// Function to handle the update submission
const updateInfo = async (body) => {
  console.log(body);
  try {
    const response = await fetch(
      `${process.env.REACT_APP_serverUrl}/api/update`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body), // Send the updated data as JSON
      }
    );

    return response;
  } catch (error) {
    // Handle network errors or other exceptions
    console.error("Error:", error);
    return { message: "Error" };
  }
};

export default updateInfo;
