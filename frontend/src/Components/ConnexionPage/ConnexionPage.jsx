import { Link } from "react-router-dom";
import "./ConnexionPage.css";

const ConnexionPage = () => {
  return (
    <div>
      <h1>Page de connexion</h1>
      <Link to="/register">S'enregistrer</Link>
      <Link to="/login">Se connecter</Link>
    </div>
  );
};

export default ConnexionPage;
