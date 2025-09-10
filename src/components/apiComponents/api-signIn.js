import { API_URL } from "./api-base-url"; // Import the API base URL

// Function to handle the sign-in API call
export const signIn = async (userName, userPassword) => {
  try {
    const response = await fetch(`${API_URL}/login`, { // updated to match your gateway endpoint
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: userName, password: userPassword }),
    });

    const data = await response.json();

    if (data.token) { // check for token returned from gateway
      // Save token in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.username); // optional: store username

      return { success: true };
    } else {
      return { success: false, message: data.detail || 'Login failed. Please check your credentials.' };
    }
  } catch (error) {
    console.error('Error during sign-in:', error);
    return { success: false, message: 'Something went wrong. Please try again.' };
  }
};
