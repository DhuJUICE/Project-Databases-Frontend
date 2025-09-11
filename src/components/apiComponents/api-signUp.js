import { API_URL } from "./api-base-url"; // Import the base API URL

// Register a new user
export const registerUser = async ({ firstname, lastname, email, username, password, confirmPassword }) => {
  try {
    const response = await fetch(`${API_URL}/user/register`, { // Express proxy endpoint
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({
        first_name: firstname,
        last_name: lastname,
        email: email,
        username: username,
        password: password,
        confirm_password: confirmPassword,
      }),
    });

    const data = await response.json();
    return data; // return the API response
  } catch (error) {
    console.error('Error during registration:', error);
    throw error; // rethrow to handle in your component
  }
};
