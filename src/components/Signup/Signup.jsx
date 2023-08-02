import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  getAuth,
} from "firebase/auth";
import FirebaseApp from "../../firebase";
import { getFirestore, doc, collection, setDoc } from "firebase/firestore";

export function Signup() {
   const navigate = useNavigate();
  const [values, setvalues] = useState({ name: "", email: "", pass: "", driveurl:"" });
  const [errorMsg, setErrorMsg] = useState([]);
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const firestore = getFirestore(FirebaseApp);
  const auth = getAuth(FirebaseApp);

  async function registrarUsuario(email, password, rol) {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        const user = res.user;
        const newProductRef = doc(collection(firestore, "driveurl"));
        setDoc(newProductRef, {
          email: values.email,
          driveurl:""
        })
        await updateProfile(user, {
          displayName: values.name,
        });
        const docuRef = doc(firestore, `usuarios/${user.uid}`);
        setDoc(docuRef, { correo: email, rol: rol });
        navigate("/Home");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  }

  const registro = () => {
    if (!values.email || !values.pass) {
      setErrorMsg("Llene todos los campos ");
      return;
    }
    registrarUsuario(values.email, values.pass, "user");
    setErrorMsg("");
    setSubmitButtonDisabled(true);
  };

  return (
    <section>
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Registrarse
              </h1>
              <form class="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo</label>
                      <input onChange={(event) =>
                    setvalues((prev) => ({
                      ...prev,
                      email: event.target.value,
                    }))
                  } type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="">
                  </input></div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
                      <input type="password" onChange={(event) =>
                    setvalues((prev) => ({
                      ...prev,
                      pass: event.target.value,
                    }))
                  } name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
                  </input></div>
                
                 
                  <button type="submit" onClick={registro} disabled={submitButtonDisabled} class="w-full btn text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Crear una cuenta</button>
                  <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                      Ya estas registrado? <a href="/" class="font-medium text-primary-600 hover:underline dark:text-primary-500">LOGIN</a>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
  );
}
