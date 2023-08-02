import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Inicio } from "../components/Inicio/Inicio";
import { Login } from "../components/Login/Login";
import { Signup } from "../components/Signup/Signup";
import { Home } from "../components/Home/Home";
import { Error404 } from "../components/Inicio/Error404";

export function MyRoutes() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/Signup" element={<Signup />} />
        <Route exact path="/Home" element={<Home />} />
        <Route path="*" Component={Error404} />
      </Routes>
    </Router>
  );
}
