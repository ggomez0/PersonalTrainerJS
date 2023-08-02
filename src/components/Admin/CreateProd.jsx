import { useState } from "react";
import FirebaseApp from "../../firebase";
import { getFirestore, doc, collection, setDoc } from "firebase/firestore";
import { Navigate } from "react-router-dom";

export function CreateProduct() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [values, setvalues] = useState({
    name: "",
    price: 0,
    description: "",
    category: "",
  });
  const firestore = getFirestore();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Push the new product data to the database
    const newProductRef = doc(collection(firestore, "products"));
    setDoc(newProductRef, {
      name: values.name,
      price: values.price,
      description: values.description,
      category: values.category,
    })
      .then(() => {
        console.log("Data saved successfully!");
        closeModal();
        window.location.reload(false);
      })
      .catch((error) => {
        console.error("Error saving data:", error);
      });
  };

  return (
    <div>
      <div className="flex justify-center m-5">
        <button
          onClick={openModal}
          className="btn btn-warning block bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          type="button"
        >
          Crear Producto
        </button>
      </div>

      {isModalOpen && (
        <div
          id="defaultModal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-75"
        >
          <div className="relative p-4 w-full max-w-2xl mx-auto bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Agregar Producto
              </h3>
              <button
                onClick={closeModal}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <form>
              <div class="grid gap-4 mb-4 sm:grid-cols-2">
                <div>
                  <label
                    for="name"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Nombre
                  </label>
                  <input
                    onChange={(event) =>
                      setvalues((prev) => ({
                        ...prev,
                        name: event.target.value,
                      }))
                    }
                    type="text"
                    name="name"
                    id="name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type product name"
                    required=""
                  ></input>
                </div>

                <div>
                  <label
                    for="price"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Precio
                  </label>
                  <input
                    onChange={(event) =>
                      setvalues((prev) => ({
                        ...prev,
                        price: event.target.value,
                      }))
                    }
                    type="number"
                    name="price"
                    id="price"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="$2999"
                    required=""
                  ></input>
                </div>
                <div>
                  <label
                    for="category"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    onChange={(event) =>
                      setvalues((prev) => ({
                        ...prev,
                        category: event.target.value,
                      }))
                    }
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option selected="">Select category</option>
                    <option value="TV">TV/Monitors</option>
                    <option value="PC">PC</option>
                    <option value="GA">Gaming/Console</option>
                    <option value="PH">Phones</option>
                  </select>
                </div>
                <div>
                  <label
                    for="fileinput"
                    class=" text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Imagen
                  </label>
                  <input type="file" className="file-input file-input-ghost w-full max-w-xs"/>

                </div>
                <div class="sm:col-span-2">
                  <label
                    for="description"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Descripción
                  </label>
                  <textarea
                    onChange={(event) =>
                      setvalues((prev) => ({
                        ...prev,
                        description: event.target.value,
                      }))
                    }
                    id="description"
                    rows="4"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Descripción del producto"
                  ></textarea>
                </div>
              </div>
              <button
                type="submit"
                onClick={handleFormSubmit}
                className="btn btn-primary text-white inline-flex items-center bg-primary-700
               hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium
                rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700
                 dark:focus:ring-primary-800"
              >
                Agregar producto
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateProduct;
