import React, { useState } from "react";
import Inicio from "../Inicio/Inicio";
import CreateProduct from "./CreateProd";
import ProductsCRUD from "./ProductsCRUD";

export function AdminView() {
  return (
    <div className="">
      <CreateProduct></CreateProduct>
      <ProductsCRUD></ProductsCRUD>
      <Inicio></Inicio>
    </div>
  );
}

export default AdminView;
