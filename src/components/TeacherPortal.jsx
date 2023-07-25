

const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3001/logout', {
        method: 'POST',
      });
  
      const data = await response.json();
  
      // Check if there was an error in the response
      if (!response.ok) {
        throw new Error(data.error);
      }
  
      // Clear the token from local storage (if applicable)
      localStorage.removeItem('token');
  
      // Update state to display the success message
      setMessage(data.message);
      setError('');
    } catch (error) {
      // Update state to display the error message
      setError(error.message);
      setMessage('');
    }
  };
  