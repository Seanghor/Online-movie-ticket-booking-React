import { Route, Routes , useLocation} from 'react-router-dom';

import ContactUs from './pages/ContactPage';
import Movie from './pages/MoviePage';
import Cinemas from './pages/CinemaPage';
import HomePage from './pages/HomePage';
import Promotion from './pages/PromotionPage';
import SignUp from './pages/SignUpPage';
import MovieDetail from './components/MovieDetail';
import LoginPage from './pages/LoginPage';
import Footer from './components/Footer';
import CinemaShowTimeDetail from './components/CinemaShowTimeDetail';
import CinemaMoreInforDetail from './components/CinemaMoreInforDetail';
import BillingDetailPage from './pages/BillingDetailPage';
import Navbar from './components/navbar';

function App() {
  const location = useLocation();

  // Check if the current route is the sign-in page
  const hideFooter = location.pathname === '/login' || location.pathname === '/signup' ;
  return (
    <header>
      <Navbar />
      <Routes>
        <Route path="/" element={< HomePage />} />
        <Route path="/login" element={< LoginPage />} />
        <Route path='/movie' element={< Movie />} />
        <Route path="/cinema" element={< Cinemas />} />
        <Route path="/promotion" element={< Promotion />} />
        <Route path='/contactus' element={<ContactUs />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/cinema/showtime" element={<CinemaShowTimeDetail />} />
        <Route path="/cinema/moreinfiormation" element={<CinemaMoreInforDetail />} />
        <Route path="/bill_detail" element={<BillingDetailPage />} />
      </Routes>
      {!hideFooter && <Footer />}

    </header>
  );
}

export default App;

