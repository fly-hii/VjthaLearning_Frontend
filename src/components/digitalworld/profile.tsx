import { useEffect, useState } from 'react';
import axios from 'axios';

const ProfilePage = ({ userId }) => {
  const [user, setUser] = useState({ name: '', email: '' });
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/api/users/${userId}`);
        setUser(res.data);
        setNewName(res.data.name);
      } catch (err) {
        console.error('Error fetching user', err);
      }
    };

    fetchUser();
  }, [userId]);

  const handleUpdate = async () => {
    try {
      const res = await axios.put(`/api/users/${userId}`, { name: newName });
      setUser(res.data);
      setEditing(false);
    } catch (err) {
      console.error('Failed to update user', err);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">User Profile</h2>

      <div className="mb-4">
        <label className="text-sm">Email</label>
        <input
          type="text"
          value={user.email}
          disabled
          className="w-full border px-3 py-2 rounded bg-gray-100"
        />
      </div>

      <div className="mb-4">
        <label className="text-sm">Name</label>
        <input
          type="text"
          value={editing ? newName : user.name}
          onChange={(e) => setNewName(e.target.value)}
          disabled={!editing}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      {editing ? (
        <div className="flex gap-2">
          <button onClick={handleUpdate} className="bg-green-600 text-white px-4 py-2 rounded">
            Save
          </button>
          <button
            onClick={() => {
              setEditing(false);
              setNewName(user.name);
            }}
            className="bg-gray-400 px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={() => setEditing(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Edit Name
        </button>
      )}
    </div>
  );
};

export default ProfilePage;
