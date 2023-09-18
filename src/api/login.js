const login = async (username, password) => {
    try {
        const response = await fetch('https://vikan-server.onrender.com/api/authenticate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
        });

        return response;
      } catch (error) {
        console.error('Error:', error);
        return null;
      }
}

export default login;