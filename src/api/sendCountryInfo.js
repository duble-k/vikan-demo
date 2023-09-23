const sendCountryInfo = async ( input, token) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_serverUrl}/api/upload`, {
        method: 'POST',
        headers: {
           Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          input
        ),
      });
      return response;
      // Handle response as before
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  export default sendCountryInfo;