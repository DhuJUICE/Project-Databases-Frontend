import { API_URL } from "./api-base-url";

// Follow a user
export const followUser = async (followedUsername) => {
  try {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');

    if (!username || !token) {
      return { success: false, message: 'User not logged in.' };
    }

    const response = await fetch(`${API_URL}/follow`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        username,
        target_username: followedUsername, // match backend key
      })
    });

    const data = await response.json();

    if (data.status === 'success') {
      return { success: true, message: data.message };
    } else {
      return { success: false, message: data.message || 'Failed to follow user.' };
    }

  } catch (error) {
    console.error('Error following user:', error);
    return { success: false, message: 'Something went wrong. Please try again.' };
  }
};

// Unfollow a user
export const unfollowUser = async (unfollowedUsername) => {
	try {
	  const username = localStorage.getItem('username');
	  const token = localStorage.getItem('token');
  
	  if (!username || !token) {
		return { success: false, message: 'User not logged in.' };
	  }
  
	  const response = await fetch(`${API_URL}/unfollow`, {
		method: 'DELETE',
		headers: {
		  'Content-Type': 'application/json',
		  'Authorization': `Bearer ${token}`
		},
		body: JSON.stringify({
		  username,
		  target_username: unfollowedUsername, // match backend key
		})
	  });
  
	  const data = await response.json();
  
	  if (data.status === 'success') {
		return { success: true, message: data.message };
	  } else {
		return { success: false, message: data.message || 'Failed to unfollow user.' };
	  }
  
	} catch (error) {
	  console.error('Error unfollowing user:', error);
	  return { success: false, message: 'Something went wrong. Please try again.' };
	}
  };
//=============================================================

// Like a post
export const likePost = async (postId) => {
  try {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');

    if (!username || !token) {
      return { success: false, message: 'User not logged in.' };
    }

    const response = await fetch(`${API_URL}/like`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        username,
        post_id: postId, // match backend key
      })
    });

    const data = await response.json();

    if (data.status === 'success') {
      return { success: true, message: data.message };
    } else {
      return { success: false, message: data.message || 'Failed to like post.' };
    }

  } catch (error) {
    console.error('Error liking post:', error);
    return { success: false, message: 'Something went wrong. Please try again.' };
  }
};

// Comment on a post
export const commentPost = async (postId, comment) => {
  try {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');

    if (!username || !token) {
      return { success: false, message: 'User not logged in.' };
    }

    const response = await fetch(`${API_URL}/comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        username,
        post_id: postId,      // match backend key
        comment_text: comment, // match backend key
      })
    });

    const data = await response.json();

    if (data.status === 'success') {
      return { success: true, message: data.message };
    } else {
      return { success: false, message: data.message || 'Failed to comment on post.' };
    }

  } catch (error) {
    console.error('Error commenting on post:', error);
    return { success: false, message: 'Something went wrong. Please try again.' };
  }
};
