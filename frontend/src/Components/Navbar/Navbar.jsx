import "./Navbar.css";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import LogoutButton from "../LogoutButton/LogoutButton";

const NavBar = () => {
  const getUsernameFromToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      return decodedToken.username;
    }
    return null;
  };

  const username = getUsernameFromToken();

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/home" className="link-navbar">
              Annonces
            </Link>
          </li>
          <li>
            <Link to="/users" className="link-navbar">
              Utilisateurs
            </Link>
          </li>
          <li>
            <div className="bienvenue">
              <p>Bonjour, {username}</p>
              <LogoutButton />
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
