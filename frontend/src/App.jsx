import React from 'react';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Homepage from "./pages/Homepage";
function App() {

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9FC]">

      <Navbar />
      
      {/* Main App Content Area */}
      <main className="max-w-7xl w-full mx-auto px-4 md:px-8 py-8 flex-grow">
        <Homepage />
      </main>

      {/* Footer component sits cleanly at the base */}
      <Footer />
    </div>
  )
}

export default App
