import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Products from "./components/Products";
import ProductDetails from "./components/ProductDetails";
import EditProduct from "./components/EditProduct";
import AddProduct from './components/AddProduct';

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-bg-page">
      <Navbar />

      <main className="max-w-7xl w-full mx-auto px-4 md:px-8 py-8 grow">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route  path="/update-product/:id" element={<EditProduct />} />
          <Route path="/add-product" element={<AddProduct />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;