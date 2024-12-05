import "./User.css";
import axios from "axios";
import React, { useEffect, useState } from "react";

const User = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [editUser, setEditUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/users", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addUser = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/", newUser);
      alert("Utilisateur créé avec succès");
      setUsers([...users, response.data]);
      setNewUser({ email: "", username: "", password: "" });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      window.confirm("Voulez-vous vraiment supprimer cet utilisateur ?");
      await axios.delete(`http://localhost:8080/user/delete/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const startEdit = (user) => {
    setEditUser(user);
  };

  const updateUser = async (event) => {
    event.preventDefault();
    try {
      await axios.put(
        `http://localhost:8080/user/update/${editUser._id}`,
        editUser,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setUsers(
        users.map((user) => (user._id === editUser._id ? editUser : user))
      );
      setEditUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredUsers = users.filter((user) =>
    `${user.email} ${user.username}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Ajouter un utilisateur</h1>
      <form onSubmit={addUser} className="add-user">
        <input
          type="email"
          placeholder="email"
          value={newUser.email}
          onChange={(event) =>
            setNewUser({ ...newUser, email: event.target.value })
          }
        />
        <input
          type="text"
          placeholder="Username"
          value={newUser.username}
          onChange={(event) =>
            setNewUser({ ...newUser, username: event.target.value })
          }
        />
        <input
          type="password"
          placeholder="password"
          value={newUser.password}
          onChange={(event) =>
            setNewUser({ ...newUser, password: event.target.value })
          }
        />
        <button type="submit">Ajouter</button>
      </form>
      <h1>Utilisateurs</h1>
      <input
        type="text"
        placeholder={"Recherche"}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul className="users">
        {filteredUsers.map((user) => (
          <li key={user._id} className="user-item">
            <h2>{user.username}</h2>
            <p>{user.email}</p>
            <button onClick={() => deleteUser(user._id)}>Delete</button>
            <button onClick={() => startEdit(user)}>Edit</button>
          </li>
        ))}
      </ul>
      {editUser && (
        <form onSubmit={updateUser}>
          <input
            type="text"
            value={editUser.username}
            onChange={(event) =>
              setEditUser({ ...editUser, username: event.target.value })
            }
          />
          <input
            type="text"
            value={editUser.email}
            onChange={(event) =>
              setEditUser({ ...editUser, email: event.target.value })
            }
          />
          <button type="submit">Update</button>
        </form>
      )}
    </div>
  );
};

export default User;
