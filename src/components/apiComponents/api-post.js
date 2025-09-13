import { API_URL } from "./api-base-url"; // Import the API base URL

// ---------------- Create a new post ----------------
export const createPost = async ({ caption, imgUrl, tags }) => {
  try {
    const username = localStorage.getItem('username'); // get username from localStorage
    const token = localStorage.getItem('token');       // get JWT token

    if (!username || !token) {
      return { success: false, message: 'User not logged in.' };
    }

    const response = await fetch(`${API_URL}/post`, {
      method: 'POST', // matches your gateway route
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // pass JWT token
      },
      body: JSON.stringify({
        username,
        caption,
        imgUrl: imgUrl || 'default.png', // fallback image
        tags: tags || ['general']        // default tag
      })
    });

    const data = await response.json();

    if (data.status === 'success') {
      return { success: true, post: data };
    } else {
      return { success: false, message: data.message || 'Failed to create post.' };
    }
  } catch (error) {
    console.error('Error creating post:', error);
    return { success: false, message: 'Something went wrong. Please try again.' };
  }
};

// ---------------- Get posts for the logged-in user ----------------
export const getMyPosts = async () => {
  try {
    const username = localStorage.getItem('username'); // get username from localStorage
    const token = localStorage.getItem('token');       // get JWT token

    if (!username || !token) {
      return { success: false, message: 'User not logged in.' };
    }

    const response = await fetch(`${API_URL}/post/get-posts`, {
      method: 'POST', // matches your gateway /get-posts route
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // pass JWT token
      },
      body: JSON.stringify({ username }) // send username in the body
    });

    const data = await response.json();

    if (data.status === 'success') {
      return { success: true, posts: data.posts };
    } else {
      return { success: false, message: data.message || 'Failed to fetch posts.' };
    }
  } catch (error) {
    console.error('Error fetching posts:', error);
    return { success: false, message: 'Something went wrong. Please try again.' };
  }
};
