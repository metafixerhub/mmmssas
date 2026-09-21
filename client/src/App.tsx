import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import LanguageModal from './components/LanguageModal';
import { useLanguage } from './contexts/LanguageContext';
import { useLocation } from 'react-router-dom';

function App() {
  const { isFirstVisit } = useLanguage();
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="app-container">
      {isFirstVisit && !isAdmin && <LanguageModal />}
      {!isAdmin && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </main>
      <Routes>
        <Route path="/admin*" element={null} />
        <Route path="*" element={<Footer />} />
      </Routes>
    </div>
  );
}

export default App;
