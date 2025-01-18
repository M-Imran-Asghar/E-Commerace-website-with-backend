import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from "./components/pages/Login.jsx";
import Register from "./components/pages/Register.jsx";
import Layout from "./components/layout/Layout.jsx";
import MainSection from "./components/pages/MainSection.jsx";
import UserProfile from "./components/pages/UserProfile.jsx";
import AddProduct from "./components/pages/AddProduct.jsx";
import AddToCart from "./components/pages/AddToCart.jsx";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="" element={<MainSection />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/AddProduct" element={<AddProduct />} />
        <Route path="/AddToCart" element={<AddToCart/>} />
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
