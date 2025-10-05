import { API_URL } from "./api-base-url"; // Import the API base URL

// Function to fetch the personalized feed for the logged-in user
export const fetchFeed = async () => {
  try {
    const username = localStorage.getItem('username'); // get username from localStorage
	const token = localStorage.getItem('token');       // get JWT token

    if (!username || !token) {
      return { success: false, message: 'User not logged in.' };
    }

    const response = await fetch(`${API_URL}/feed`, {
      method: 'POST', // matches your gateway route
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // pass JWT token
      },
      body: JSON.stringify({ username })
    });



    const data = await response.json();

    if (data.status === 'success') {
      return { success: true, feed: data.feed };
    } else {
      return { success: false, message: data.message || 'Failed to fetch feed.' };
    }
  } catch (error) {
    console.error('Error fetching feed:', error);
    return { success: false, message: 'Something went wrong. Please try again.' };
  }
};
