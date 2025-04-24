import { useEffect, useState } from "react";
import axios from "axios";

interface User {
  user_id: string;
  userName: string;
  email: string;
}

const ManageUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editUser, setEditUser] = useState<Partial<User> | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:3900/user/allusers")
      .then((res) => setUsers(res.data.data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  const handleEdit = (user: User) => {
    setEditUser({ ...user });
  };

  const handleSave = () => {
    if (!editUser?.user_id) return;

    axios
      .put(`http://localhost:3900/user/${editUser.user_id}`, editUser)
      .then(() => {
        const updated = users.map((u) =>
          u.user_id === editUser.user_id ? { ...u, ...editUser } : u
        );
        setUsers(updated);
        setEditUser(null);
      })
      .catch((err) => console.error("Error updating user:", err));
  };

  const handleDelete = (userName: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

    axios
      .delete(`http://localhost:3900/user/${userName}`)
      .then(() => {
        const updated = users.filter((u) => u.userName !== userName);
        setUsers(updated);
      })
      .catch((err) => console.error("Error deleting user:", err));
  };

  return (
    <div className="p-4">
      <h2>Manage Users</h2>
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>User Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.user_id}>
              <td>
                {editUser?.user_id === user.user_id ? (
                  <input
                    value={editUser.userName || ""}
                    onChange={(e) =>
                      setEditUser({ ...editUser, userName: e.target.value })
                    }
                  />
                ) : (
                  user.userName
                )}
              </td>
              <td>
                {editUser?.user_id === user.user_id ? (
                  <input
                    value={editUser.email || ""}
                    onChange={(e) =>
                      setEditUser({ ...editUser, email: e.target.value })
                    }
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {editUser?.user_id === user.user_id ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="btn btn-outline-success btn-sm me-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditUser(null)}
                      className="btn btn-outline-secondary btn-sm"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <div className="d-flex gap-2">
                      <button
                        onClick={() => handleEdit(user)}
                        className="btn btn-outline-warning btn-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user.userName)}
                        className="btn btn-outline-danger btn-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;