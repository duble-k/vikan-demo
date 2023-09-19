  // Function to handle the update submission
  const updateCountryInfo = async (token, body) => {
    console.log(body)
    try {
      const response = await fetch(`https://vikan-server.onrender.com/api/update`, {
        method: 'PUT',
        headers: {
           Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body), // Send the updated data as JSON
      });
      
      return response;
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Error:', error);
      return {message: "Error"};
    }
  };

  export default updateCountryInfo;