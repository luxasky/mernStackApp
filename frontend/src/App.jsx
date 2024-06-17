import { BrowserRouter, Routes, Route } from 'react-router-dom';

// pages
import Home from './pages/Home';
import ArtGallery from './pages/ArtGallery';
import MyPortfolio from './pages/MyPortfolio';
import AddArtwork from './pages/AddArtwork';
import ArtworkProfile from './pages/ArtworkProfile';

// components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LogoutForm from './components/LogoutForm';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <div className="app">
      {/* Set up app routing, and include Navbar and Footer */}
      <BrowserRouter>
        <Navbar />

        {/* App Routes, including protected routes with private access */}
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/art-gallery" element={<ArtGallery />} />
            <Route
              path="/my-portfolio"
              element={
                <PrivateRoute>
                  <MyPortfolio />
                </PrivateRoute>
              }
            />
            <Route
              path="/add-artwork"
              element={
                <PrivateRoute>
                  <AddArtwork />
                </PrivateRoute>
              }
            />
            <Route path="/artworks/:id" element={<ArtworkProfile />} />
            <Route path="/logout" element={<LogoutForm />} />
          </Routes>
        </div>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
