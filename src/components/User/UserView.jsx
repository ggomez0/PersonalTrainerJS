import React from "react";
import { useEffect, useState } from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import FirebaseApp, { auth } from "../../firebase";
import { getAuth } from "firebase/auth";

export function UserView() {
  const firestore = getFirestore(FirebaseApp);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authUserEmail, setAuthUserEmail] = useState(null); // State to store the authenticated user's email
  const auth = getAuth(); // Get the Firebase Auth instance

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "driveurl"));
        const fetchedData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          driveurl: doc.data().driveurl,
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
  }, [firestore]);

  useEffect(() => {
    // Fetch the authenticated user's email when the component mounts
    const user = auth.currentUser;
    if (user) {
      setAuthUserEmail(user.email);
    }
  }, [auth]);

  const DriveURL = ({ email }) => {
    const usuario = data.find((user) => user.email === email);
    
    if (usuario && email === authUserEmail) {
      return <iframe className="w-96 h-96 " src={usuario.driveurl}></iframe>;
      
    }
    
    return (null); // Return null if user not authenticated or email does not match
  };

  return (
    <div>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        data.map((user) => (
          <div key={user.id}>
            <DriveURL email={user.email} />
          </div>
        ))
      )}
      {!loading && !data.some(user => user.email === authUserEmail) && (
        <h2>No se encontró URL para el usuario</h2>
      )}
    </div>
  );
}

export default UserView;
