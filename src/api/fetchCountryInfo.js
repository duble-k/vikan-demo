const fetchCountryInfo = async (input, token) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_serverUrl}/api/receive`, {
        method: 'POST',
        headers: {
           Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          input
        ),
      });
  
      if (!response.ok) {
        // Handle error responses here
        console.error('Error:', response.statusText);
        return;
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  };

  export default fetchCountryInfo;
  