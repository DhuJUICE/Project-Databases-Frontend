import { API_URL } from "./api-base-url"; // Import the API base URL

// Function to fetch developers (excluding the logged-in user)
export const fetchDevelopers = async () => {
	try {
	  const username = localStorage.getItem('username');
	  const token = localStorage.getItem('token');
  
	  if (!username || !token) {
		return { success: false, message: 'User not logged in.' };
	  }
  
	  const response = await fetch(`${API_URL}/user/followers`, {
		method: 'POST', // your gateway route
		headers: {
		  'Content-Type': 'application/json',
		  'Authorization': `Bearer ${token}`
		},
		body: JSON.stringify({ username })
	  });
  
	  const data = await response.json();
  
	  if (data.status === 'success') {
		return {
		  success: true,
		  followed: data.followed,
		  not_followed: data.not_followed
		};
	  } else {
		return { success: false, message: data.message || 'Failed to fetch developers.' };
	  }
	} catch (error) {
	  console.error('Error fetching developers:', error);
	  return { success: false, message: 'Something went wrong. Please try again.' };
	}
  };