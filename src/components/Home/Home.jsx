import React from "react";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { AdminView } from "../Admin/AdminView";
import { UserView } from "../User/UserView";
import FirebaseApp from "../../firebase";

const firestore = getFirestore(FirebaseApp);
const auth = getAuth(FirebaseApp);

export function Home() {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName);
        setUserWithFirebaseAndRol(user);
      } else {
        setUserName("");
        setUser(null);
        setLoading(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  async function getRol(uid) {
    const docuRef = doc(firestore, `usuarios/${uid}`);
    const docuCifrada = await getDoc(docuRef);
    const rol_uid = docuCifrada.data().rol;
    return rol_uid;
  }

  function setUserWithFirebaseAndRol(usuarioFirebase) {
    getRol(usuarioFirebase.uid).then((rol) => {
      const userData = {
        uid: usuarioFirebase.uid,
        email: usuarioFirebase.email,
        rol: rol,
      };
      setUser(userData);
      setLoading(false);
    });
  }

  if (loading) {
    return (
      <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div class="mx-auto max-w-screen-sm text-center">
          <span className="loading loading-infinity loading-lg"></span>
        </div>
      </div>
    );
  }

  return (
    <div>{user && user.rol === "admin" ? <AdminView /> : <UserView />}</div>
  );
}

export default Home;
