import { Link, useLocation } from "react-router-dom";

const AdMoreDetails = () => {
  const location = useLocation();
  const ad = location.state?.ad; // Accéder aux données transmises

  if (!ad) {
    return <h2>Annonce non trouvée</h2>;
  }

  return (
    <div>
      <h2>{ad.title}</h2>
      <p>{ad.description}</p>
      <p>Catégorie : {ad.cuisineType}</p>
      <p>Prix : {ad.price}€</p>
      <p>Auteur : {ad.author.username}</p>
      <Link to="/home">Retour à la liste</Link>
    </div>
  );
};

export default AdMoreDetails;
