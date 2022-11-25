import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import DefaultLayout from "./components/layouts/DefaultLayout/DefaultLayout";
import MainScreen from "./components/screens/MainScreen/MainScreen";

import "bootstrap/dist/css/bootstrap.min.css";
import Admin from "./pages/Admin/Admin";
import Contacts from "./components/screens/Contacts";
import Login from "./components/screens/Auth/Login";
import Registration from "./components/screens/Auth/Registration";
import MyAccount from "./components/screens/MainScreen/MyAccount/MyAccount";

function App() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route index element={<MainScreen />} />
        <Route path="contacts" element={<Contacts />} />
        <Route path="login" element={<Login />} />
        <Route path="registration" element={<Registration />} />
        <Route path="my-account" element={<MyAccount />} />

        <Route path="admin" element={<Admin />} />
        <Route path="admin/*" element={<Admin />} />
      </Route>
    </Routes>
  );
}

export default App;
