const fetchCountryNames = async (token) => {
    try {
      const response = await fetch('https://vikan-server.onrender.com/api/names', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Error fetching country names');
      }
  
      const data = await response.json();
      return data.countries;
    } catch (error) {
      console.error('Error fetching country names:', error);
      throw error; // Re-throw the error to be caught higher up the call stack
    }
  };
  

export default fetchCountryNames;