import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;