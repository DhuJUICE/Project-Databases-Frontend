// DeveloperFollow.js
import React, { useState, useEffect } from "react";
import { fetchDevelopers } from "../../apiComponents/api-developers";
import { followUser, unfollowUser } from "../../apiComponents/api-relationships";

const DeveloperFollow = () => {
  const [notFollowed, setNotFollowed] = useState([]);
  const [followed, setFollowed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDevelopers = async () => {
      setLoading(true);
      const result = await fetchDevelopers();

      if (result.success) {
        setFollowed(result.followed || []);
        setNotFollowed(result.not_followed || []);
      } else {
        setError(result.message);
      }

      setLoading(false);
    };

    loadDevelopers();
  }, []);

  const handleFollow = async (dev) => {
    const result = await followUser(dev.username);
    if (result.success) {
      setFollowed([...followed, dev]);
      setNotFollowed(notFollowed.filter((d) => d.id !== dev.id));
    } else {
      alert(result.message);
    }
  };

  const handleUnfollow = async (dev) => {
    const result = await unfollowUser(dev.username);
    if (result.success) {
      setFollowed(followed.filter((d) => d.id !== dev.id));
      setNotFollowed([...notFollowed, dev]);
    } else {
      alert(result.message);
    }
  };

  if (loading)
    return (
      <p className="text-center mt-6 text-gray-500 animate-pulse">
        Loading developers...
      </p>
    );

  if (error)
    return (
      <p className="text-center mt-6 text-red-500">{error}</p>
    );

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <h2 className="text-2xl font-bold text-center mb-8">
        Follow Developers
      </h2>

      <div className="flex flex-col md:flex-row gap-6 max-w-6xl mx-auto">
        {/* Available to Follow */}
        <div className="flex-1 bg-white rounded-2xl shadow-md p-5 max-h-[70vh] overflow-y-auto">
          <h3 className="text-xl font-semibold mb-4">Available to Follow</h3>
          {notFollowed.length > 0 ? (
            notFollowed.map((dev) => (
              <div
                key={dev.id}
                className="flex justify-between items-center bg-gray-50 p-3 rounded-xl mb-3 hover:bg-gray-100 transition"
              >
                <div>
                  <p className="font-semibold text-gray-800">
                    {dev.first_name} {dev.last_name}
                  </p>
                  <span className="text-gray-500">@{dev.username}</span>
                </div>
                <button
                  className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition"
                  onClick={() => handleFollow(dev)}
                >
                  Follow
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">You're following everyone!</p>
          )}
        </div>

        {/* Followed */}
        <div className="flex-1 bg-white rounded-2xl shadow-md p-5 max-h-[70vh] overflow-y-auto">
          <h3 className="text-xl font-semibold mb-4">Followed Developers</h3>
          {followed.length > 0 ? (
            followed.map((dev) => (
              <div
                key={dev.id}
                className="flex justify-between items-center bg-gray-50 p-3 rounded-xl mb-3 hover:bg-gray-100 transition"
              >
                <div>
                  <p className="font-semibold text-gray-800">
                    {dev.first_name} {dev.last_name}
                  </p>
                  <span className="text-gray-500">@{dev.username}</span>
                </div>
                <button
                  className="px-4 py-2 bg-red-500 text-white font-semibold rounded-full hover:bg-red-600 transition"
                  onClick={() => handleUnfollow(dev)}
                >
                  Unfollow
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">You haven't followed anyone yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeveloperFollow;
