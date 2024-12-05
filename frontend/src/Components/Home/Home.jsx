import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [ads, setAds] = useState([]);
  const [newAd, setNewAd] = useState({
    title: "",
    description: "",
    category: "",
    price: 0,
  });
  const [editAd, setEditAd] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  /*const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");*/

  const fetchAds = async () => {
    try {
      const response = await axios.get("http://localhost:8080/ads", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setAds(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addAd = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/ad", newAd, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      alert("Annonce créée avec succès");
      setAds([...ads, response.data]);
      setNewAd({ title: "", description: "", category: "", price: 0 });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteAd = async (id) => {
    try {
      window.confirm("Voulez-vous vraiment supprimer cette annonce ?");
      await axios.delete(`http://localhost:8080/ad/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setAds(ads.filter((ad) => ad._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const startEdit = (ad) => {
    setEditAd(ad);
  };

  const updateAd = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:8080/ad/${editAd._id}`, editAd, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setAds(ads.map((ad) => (ad._id === editAd._id ? editAd : ad)));
      setEditAd(null);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredAds = ads.filter((ad) =>
    `${ad.category}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /*const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8080/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des catégories :", error);
    }
  };

  const handleCategoryChange = async (e) => {
    const category = e.target.value;
    setSelectedCategory(category);

    if (category) {
      try {
        const response = await axios.post("http://localhost:8080/filter", {
          category,
        });
        setAds(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des annonces :", error);
      }
    } else {
      setAds([]); // Réinitialiser les annonces si aucune catégorie n'est sélectionnée
    }
  };*/

  useEffect(() => {
    fetchAds();
    //fetchCategories();
  }, []);

  return (
    <div>
      <h1>Ajouter une annonce</h1>
      <form onSubmit={addAd} className="add-annonce">
        <input
          type="text"
          placeholder="Titre"
          value={newAd.title}
          onChange={(event) =>
            setNewAd({ ...newAd, title: event.target.value })
          }
        />
        <input
          type="text"
          placeholder="Description"
          value={newAd.description}
          onChange={(event) =>
            setNewAd({ ...newAd, description: event.target.value })
          }
        />
        <input
          type="text"
          placeholder="Catégorie"
          value={newAd.category}
          onChange={(event) =>
            setNewAd({ ...newAd, category: event.target.value })
          }
        />
        <input
          type="number"
          placeholder="Prix"
          value={newAd.price}
          onChange={(event) =>
            setNewAd({ ...newAd, price: event.target.value })
          }
        />
        <button type="submit">Add</button>
      </form>
      <h1>Liste des Annonces</h1>
      {/*<div>
        <label htmlFor="category-select">Choisissez une catégorie :</label>
        <select
          id="category-select"
          value={selectedCategory}
          onChange={handleCategoryChange}
          style={{ marginLeft: "10px", padding: "5px" }}
        >
          <option value="">--Sélectionnez une catégorie--</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>*/}
      <input
        className="search-bar"
        type="text"
        placeholder={"Recherche par catégorie"}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul className="annonces">
        {filteredAds.map((ad) => (
          <li key={ad._id} className="annonce-item">
            <h2>{ad.title}</h2>
            <p>Catégorie : {ad.category}</p>
            <p>Prix : {ad.price}€</p>
            <Link
              to={{
                pathname: `/adMoredetails`,
              }}
              state={{ ad }}
            >
              Voir l'annonce
            </Link>
            <button onClick={() => startEdit(ad)}>Editer</button>
            <button onClick={() => deleteAd(ad._id)}>Supprimer</button>
          </li>
        ))}
      </ul>
      {editAd && (
        <form onSubmit={updateAd} className="edit-annonce">
          <input
            type="text"
            value={editAd.title}
            onChange={(event) =>
              setEditAd({ ...editAd, title: event.target.value })
            }
          />
          <input
            type="text"
            value={editAd.description}
            onChange={(event) =>
              setEditAd({ ...editAd, description: event.target.value })
            }
          />
          <input
            type="text"
            value={editAd.category}
            onChange={(event) =>
              setEditAd({ ...editAd, category: event.target.value })
            }
          />
          <input
            type="text"
            value={editAd.price}
            onChange={(event) =>
              setEditAd({ ...editAd, price: event.target.value })
            }
          />
          <button type="submit">Mettre à jour</button>
        </form>
      )}
    </div>
  );
};

export default Home;
