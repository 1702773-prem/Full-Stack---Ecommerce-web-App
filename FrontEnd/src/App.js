import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import ProductPage from "./pages/ProductPage";
import Header from "./components/Header";
import Cart from "./components/Cart";
import { useState } from "react";
import Signup from "./pages/Signup";
import Admin from "./pages/Admin";
import AddProduct from "./pages/AddProduct";
import ProductForm from "./pages/ProductForm";
import Add from "./pages/Add";
function App() {



  let [isOpen, setIsOpen] = useState(false);
  

  return (
    <>
    <Header isOpen={isOpen} setIsOpen={setIsOpen}/>
    <Cart isOpen={isOpen} setIsOpen={setIsOpen}/>
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="category/:id" element={<CategoryPage />} />
      <Route path="product/:id" element={<ProductPage />} />
      <Route path="cart" element={<CartPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="signup" element={<Signup/>} />
      <Route path="admin" element={<Admin/>} />
      <Route path="admin/add" element={<AddProduct/>} />
      <Route path="/admin/product/:id" element={<ProductForm/>} />
      <Route path="/admin/product/add" element={<Add/>}/>
    </Routes>
    </>
    
  );
}

export default App;
