import { Link, useNavigate } from "react-router-dom";
import FirebaseApp from "../../firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, collection, setDoc } from "firebase/firestore";
import React, { useState } from "react";

const auth = getAuth(FirebaseApp);

export function Login() {
  const firestore = getFirestore(FirebaseApp);
  const navigate = useNavigate();
  const [values, setvalues] = useState({ email: "", pass: "" });
  const [errorMsg, setErrorMsg] = useState([]);
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const Loguearse = () => {
    if (!values.email || !values.pass) {
      setErrorMsg("Datos Incompletos");
      return;
    }
    setErrorMsg("");
    setSubmitButtonDisabled(true);
    signInWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        navigate("/Home");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };

  return (
    <section class="">
      <div class="flex flex-col items-center justify-center mx-auto md:h-screen lg:py-0">
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Iniciar Sesión
            </h1>
            <form class="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Correo Electronico
                </label>
                <input
                  type="email"
                  onChange={(event) =>
                    setvalues((prev) => ({
                      ...prev,
                      email: event.target.value,
                    }))
                  }
                  name="email"
                  id="email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                ></input>
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  onChange={(event) =>
                    setvalues((prev) => ({ ...prev, pass: event.target.value }))
                  }
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                ></input>
              </div>
              <button
                type="submit"
                disabled={submitButtonDisabled}
                onClick={Loguearse}
                class="btn btn-primary w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Ingresar
              </button>

              <p class="text-sm font-light text-red-600 dark:text-red-400">
                {errorMsg}
              </p>
              <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                No tenes cuenta?{" "}
                <a
                  href="/Signup"
                  class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Registrarse
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
