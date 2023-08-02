import React, { useState, useEffect } from "react";
import { auth } from "./firebase";
import { MyRoutes } from "./routes/routes";
import { NavBar } from "./components/NavBar/NavBar";
import { Footer } from "./components/footer/footer";
import NavBarAuth from "./components/NavBar/NavBarAuth";

export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Función para escuchar cambios en el estado de autenticación de Firebase
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // El usuario está autenticado
        setIsLoggedIn(true);
      } else {
        // El usuario no está autenticado
        setIsLoggedIn(false);
      }
    });

    // Limpiar el listener cuando el componente se desmonte
    return () => unsubscribe();
  }, []);

  return (
    <div className="mx-auto max-w-screen-xl">
      {isLoggedIn ? <NavBarAuth /> : <NavBar />}
      <MyRoutes />
      <Footer />
    </div>
  );
}

export default App;
