import { Route, Routes } from "react-router-dom";
import AdminProducts from "../../components/screens/Admin/AdminProducts";
import CreateProduct from "../../components/screens/Admin/CreateProduct";
import ListUser from "../../components/screens/Admin/ListUser";
import UpdateProduct from "../../components/screens/Admin/UpdateProduct";

const Admin = () => {
  return (
    <Routes>
      <Route index element={<AdminProducts />} />
      <Route path="create-product" element={<CreateProduct />} />
      <Route path="update-product/:id" element={<UpdateProduct />} />
      <Route path="user" element={<ListUser />} />
    </Routes>
  );
};

export default Admin;
