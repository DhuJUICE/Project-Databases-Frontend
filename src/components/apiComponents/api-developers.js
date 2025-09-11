import { API_URL } from "./api-base-url"; // Import the API base URL

// Function to fetch developers (excluding the logged-in user)
export const fetchDevelopers = async () => {
  try {
    const username = localStorage.getItem('username'); // get username
    const token = localStorage.getItem('token');       // get JWT token

    if (!username || !token) {
      return { success: false, message: 'User not logged in.' };
    }

    const response = await fetch(`${API_URL}/user/get-developers`, {
      method: 'POST', // matches your Express gateway route
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // forward token
      },
      body: JSON.stringify({ username })
    });

    const data = await response.json();

    if (data.status === 'success') {
      return { success: true, developers: data.developers };
    } else {
      return { success: false, message: data.message || 'Failed to fetch developers.' };
    }
  } catch (error) {
    console.error('Error fetching developers:', error);
    return { success: false, message: 'Something went wrong. Please try again.' };
  }
};
