import axios from "axios";
import { useEffect, useState } from "react";

const ImageUploadForm = () => {
  const [formData, setFormData] = useState([]);
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/formdata");
      setFormData(res.data);
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ✅ Add Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !file) return alert("Please provide name and file");

    const formDataToSend = new FormData();
    formDataToSend.append("name", name);
    formDataToSend.append("file", file);

    try {
      await axios.post("http://localhost:3000/addForm", formDataToSend);
      setName("");
      setFile(null);
      fetchData();
    } catch (error) {
      console.error("Add failed", error);
    }
  };

  // ✅ Delete user
  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:3000/formdata", {
        data: { _id: id },
      });
      fetchData();
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  // ✅ Start Edit
  const handleEditClick = (id, currentName) => {
    setEditingId(id);
    setEditName(currentName);
  };

  // ✅ Save Update
  const handleUpdate = async (id) => {
    try {
      await axios.put("http://localhost:3000/userUpdate", {
        _id: id,
        name: editName,
      });
      setEditingId(null);
      fetchData();
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-8">
      {/* ✅ Add Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-xl font-bold">Add New User</h2>
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>

      {/* ✅ List of Users */}
      <div>
        <h2 className="text-xl font-bold mb-4">All Users</h2>
        {formData.map((user) => (
          <div
            key={user._id}
            className="flex items-center gap-4 mb-4 border p-3 rounded shadow"
          >
            <img
              src={user.imageURL}
              alt={user.user}
              className="w-16 h-16 rounded-full object-cover"
            />
            {editingId === user._id ? (
              <>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="border p-1"
                />
                <button
                  onClick={() => handleUpdate(user._id)}
                  className="bg-green-600 text-white px-2 py-1 rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="bg-gray-400 text-white px-2 py-1 rounded"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <p className="flex-1 font-semibold">{user.user}</p>
                <button
                  onClick={() => handleEditClick(user._id, user.user)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="bg-red-600 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploadForm;
