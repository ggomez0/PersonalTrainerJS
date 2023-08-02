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
  const [values, setvalues] = useState({ name: "", email: "", pass: "" });
  const [errorMsg, setErrorMsg] = useState([]);
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const firestore = getFirestore(FirebaseApp);
  const auth = getAuth(FirebaseApp);

  async function registrarUsuario(email, password, rol) {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        const user = res.user;
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
    if (!values.name || !values.email || !values.pass) {
      setErrorMsg("Llene todos los campos ");
      return;
    }
    registrarUsuario(values.email, values.pass, "user");
    setErrorMsg("");
    setSubmitButtonDisabled(true);
  };

  return (
    <div className="flex  ">
      <div>
        <h1>Registro</h1>
        <InputControl
          label="Nombre"
          placeholder="Nombre"
          onChange={(event) =>
            setvalues((prev) => ({ ...prev, name: event.target.value }))
          }
        />

        <InputControl
          label="Email"
          placeholder="Email"
          onChange={(event) =>
            setvalues((prev) => ({ ...prev, email: event.target.value }))
          }
        />

        <InputPass
          label="Password"
          placeholder="Contraseña"
          onChange={(event) =>
            setvalues((prev) => ({ ...prev, pass: event.target.value }))
          }
        />

        <div>
          <b>{errorMsg}</b>
          <button onClick={registro} disabled={submitButtonDisabled}>
            Registrarse
          </button>

          <p>
            Si ya tienes una cuenta
            <span>
              <Link to="/Login"> Iniciar Sesion</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
