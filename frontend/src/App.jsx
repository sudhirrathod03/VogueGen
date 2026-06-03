import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Homepage from "./pages/Homepage";
import Signup from "./pages/Signup";

function App() {
  const path = window.location.pathname;
  const isSignupPage = path === "/signup" || path === "/register";

  if (isSignupPage) {
    return (
      <div className="min-h-screen bg-bg-page">
        <main className="min-h-screen p-2 sm:p-4">
          <Signup />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-bg-page">

      <Navbar />
      
      {/* Main App Content Area */}
      <main className="max-w-7xl w-full mx-auto px-4 md:px-8 py-8 grow">
        <Homepage />
      </main>

      {/* Footer component sits cleanly at the base */}
      <Footer />
    </div>
  )
}

export default App
