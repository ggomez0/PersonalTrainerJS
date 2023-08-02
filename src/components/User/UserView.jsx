import React from "react";
import { useEffect, useState } from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import FirebaseApp from "../../firebase";

export function UserView() {
  const firestore = getFirestore(FirebaseApp);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "driveurl"));
        const fetchedData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          url: doc.data().url,
          email: doc.data().email,
        }));
        setData(fetchedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const DriveURL = ({ email }) => {
    const usuario = data.find((user) => user.email === email);

    if (usuario) {
      return <iframe src={usuario.url}></iframe>;
    } else {
      return <h2>No se encontró URL para el usuario</h2>;
    }
  };

  return (
    <div>
      <h1>Imágenes de usuarios</h1>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        data.map((user) => (
          <div key={user.id}>
            <h3>{user.email}</h3>
            <DriveURL email={user.email} />
          </div>
        ))
      )}
    </div>
  );
}

export default UserView;
