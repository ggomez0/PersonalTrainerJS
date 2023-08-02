import { useState, useEffect } from "react";

export function Product() {
  const [articulos, setArticulos] = useState([]);
  const link = "https://scratchya.com.ar/react/datos.php";

  useEffect(() => {
    fetch(link)
      .then((response) => {
        return response.json();
      })
      .then((articulos) => {
        setArticulos(articulos);
      });
  }, []);

  return (
    <div>
      <table className="table" border="1">
        <thead>
          <tr>
            <th>Código</th>
            <th>Descripción</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {articulos.map((art) => {
            return (
              <tr key={art.codigo}>
                <td>{art.codigo}</td>
                <td>{art.descripcion}</td>
                <td>{art.precio}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Product;
