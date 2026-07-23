import { lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
const Homepage = lazy(() => import("./pages/Homepage"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Products = lazy(() => import("./components/Products"));
const ProductDetails = lazy(() => import("./components/ProductDetails"));
const EditProduct = lazy(() => import("./components/EditProduct"));
const AddProduct = lazy(() => import("./components/AddProduct"));
const Profile = lazy(() => import("./pages/Profile"));
const CartPage = lazy(() => import("./pages/CartPage"));

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Routes, Route, Navigate } from "react-router-dom";
import Chatbot from "./components/Chatbot";
function App() {
  return (
    // Update bg-bg-page to include dark background classes and text transitions
    <div className="min-h-screen flex flex-col bg-bg-page dark:bg-slate-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Navbar />

      <main className="max-w-7xl w-full mx-auto px-4 md:px-8 py-8 grow">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />

            <Route
              path="/update-product/:id"
              element={
                localStorage.getItem("token") ? (
                  <EditProduct />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            <Route
              path="/add-product"
              element={
                localStorage.getItem("token") ? (
                  <AddProduct />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            <Route path="/profile" element={<Profile />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </Suspense>
      </main>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
      />
      <Chatbot />
      <Footer />
    </div>
  );
}



export default App;
