import { useEffect, useState } from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import FirebaseApp from "../../firebase";

export function Productos() {
  const firestore = getFirestore(FirebaseApp);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "products"));
        const fetchedData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          // category: doc.data().category,
          price: doc.data().price,
          name: doc.data().name,
          // description: doc.data().description,
        }));
        setData(fetchedData);
        setLoading(false);
      } 
      catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>

          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {data.map((product) => (
              <a key={product.id} href={product.href} className="group">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <h3 className="mt-4 text-sm">{product.name}</h3>
                <p className="mt-1 text-lg font-medium">$ {product.price}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Productos;
