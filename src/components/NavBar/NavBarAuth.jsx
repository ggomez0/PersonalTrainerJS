import { Navigate } from "react-router-dom";
import { auth } from "../../firebase";

export function NavBarAuth() {
  const handleLogout = async () => {
    try {
      await auth.signOut();
      Navigate("/");
    } catch (error) {
      // Manejar errores de cierre de sesión
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <nav className="">
      <div className="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto p-4">
        <a href="#" class="flex items-center">
          <img
            src="./src/assets/bnb.png"
            className="h-8 mr-3"
            alt="Personal Trainer"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Personal Trainer
          </span>
        </a>
        <div className="flex items-center md:order-2">
          <button
            className="btn bg-red-900 hover:bg-red-800"
            onClick={handleLogout}
          >
            Salir
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBarAuth;
