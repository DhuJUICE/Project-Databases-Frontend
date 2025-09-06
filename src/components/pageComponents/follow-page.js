import React, { useState } from "react";

// Developers JSON
const developers = [
  { id: "b1fa08e3-88db-4e9c-8ad3-3e54cdefd142", firstname: "Alice", lastname: "Smith", username: "alice_s" },
  { id: "e2d3d8dc-ef7c-4b42-a3f9-0c7d337b2427", firstname: "Bob", lastname: "Johnson", username: "bob_j" },
  { id: "bd9a10d0-253d-4bc3-9d3b-c1b30a40f58f", firstname: "Charlie", lastname: "Lee", username: "charlie_l" },
  { id: "533f3fb9-c3dd-47ad-b567-e895e5a121af", firstname: "Diana", lastname: "Wong", username: "diana_w" },
  { id: "89f2e008-69c4-42b3-8fda-95265bf297a2", firstname: "Ethan", lastname: "Brown", username: "ethan_b" },
  { id: "2c6636e0-3975-4f63-a7e7-ce7b8b1fe6ec", firstname: "Fatima", lastname: "Khan", username: "fatima_k" },
  { id: "a778218d-78df-48eb-8f5d-111c4d6ae41c", firstname: "George", lastname: "Miller", username: "george_m" },
  { id: "4cb0060c-ae0e-49db-99ef-a8e5e8cd3757", firstname: "Hannah", lastname: "Wilson", username: "hannah_w" },
  { id: "3a2b9b6f-4c0b-4f21-b42b-40165909c29e", firstname: "Ivan", lastname: "Petrov", username: "ivan_p" },
  { id: "b661e6ac-bd17-4374-a478-c9cea5cbd1fc", firstname: "Julia", lastname: "Garcia", username: "julia_g" }
];

const DeveloperFollow = () => {
  const [followed, setFollowed] = useState([]);

  const toggleFollow = (dev) => {
    if (followed.some((d) => d.id === dev.id)) {
      setFollowed(followed.filter((d) => d.id !== dev.id));
    } else {
      setFollowed([...followed, dev]);
    }
  };

  const notFollowed = developers.filter((d) => !followed.some((f) => f.id === d.id));

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Follow Developers</h2>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left column: Available to follow */}
        <div className="flex-1 bg-white rounded-2xl shadow-md p-4">
          <h3 className="text-xl font-semibold mb-4">Available to Follow</h3>
          <ul className="space-y-3 max-h-[70vh] overflow-y-auto">
            {notFollowed.length > 0 ? notFollowed.map((dev) => (
              <li key={dev.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-xl hover:bg-gray-100 transition">
                <div>
                  <p className="font-semibold">{dev.firstname} {dev.lastname}</p>
                  <span className="text-gray-500">@{dev.username}</span>
                </div>
                <button
                  onClick={() => toggleFollow(dev)}
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 font-semibold"
                >
                  Follow
                </button>
              </li>
            )) : <p className="text-gray-500 text-center">You're following everyone!</p>}
          </ul>
        </div>

        {/* Right column: Followed developers */}
        <div className="flex-1 bg-white rounded-2xl shadow-md p-4">
          <h3 className="text-xl font-semibold mb-4">Followed Developers</h3>
          <ul className="space-y-3 max-h-[70vh] overflow-y-auto">
            {followed.length > 0 ? followed.map((dev) => (
              <li key={dev.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-xl hover:bg-gray-100 transition">
                <div>
                  <p className="font-semibold">{dev.firstname} {dev.lastname}</p>
                  <span className="text-gray-500">@{dev.username}</span>
                </div>
                <button
                  onClick={() => toggleFollow(dev)}
                  className="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 font-semibold"
                >
                  Unfollow
                </button>
              </li>
            )) : <p className="text-gray-500 text-center">You haven't followed anyone yet.</p>}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DeveloperFollow;
