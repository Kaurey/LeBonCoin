import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import ConnexionPage from "./Components/ConnexionPage/ConnexionPage";
import Wrapper from "./Components/Wrapper/Wrapper";
import User from "./Components/User/User";
import AdMoreDetails from "./Components/AdMoredetails/AdMoredetails";




function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Wrapper>
          <Routes>
            <Route path="/" element={<ConnexionPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/users" element={<User />} />
            <Route path="/adMoredetails" element={<AdMoreDetails />} />
          </Routes>
        </Wrapper>
      </BrowserRouter>
    </div>
  );
}

export default App;
