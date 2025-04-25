import React from 'react';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import './App.scss';
import HomePage from './Pages/HomePage/HomePage';
import AboutPage from './Pages/AboutPage/AboutPage';
import HousingPage from "./Pages/HousingPage/HousingPage"
import ErrorPage from './Pages/ErrorPage/ErrorPage';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';


function App() {
  return (


    <div className="App">
      <Router>
      <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/aboutpage' element={<AboutPage />} />
          <Route path='/housing/:id' element={<HousingPage />} />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
        <Footer />
      </Router>
     
    </div>
  );
}

export default App;
