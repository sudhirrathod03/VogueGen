import React from 'react';
import Footer from './components/Footer';
function App() {

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9FC]">
      
      {/* Main App Content Area */}
      <main className="grow">
        <h1 className="text-2xl font-bold text-[#2C2C2A]">Welcome to VogueGen</h1>
        {/* Your other page sections go here */}
      </main>

      {/* Footer component sits cleanly at the base */}
      <Footer />
    </div>
  )
}

export default App
