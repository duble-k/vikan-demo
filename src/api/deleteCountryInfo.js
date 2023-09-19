const deleteCountryInfo = async (country, token) => {
    try {
      const response = await fetch('https://vikan-server.onrender.com/api/delete', {
        method: 'POST',
        headers: {
           Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ country }), // Send the uniqueKey in the request body as JSON
      });
  
      return response;
    } catch (error) {
      console.error(error);
      return {message: "Error"};
    }
  };

  export default deleteCountryInfo;