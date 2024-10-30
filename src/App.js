import React from 'react';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import './App.scss';
import HomePage from './Pages/HomePage/HomePage';
import AboutPage from './Pages/AboutPage/AboutPage';
import ErrorPage from './Pages/ErrorPage/ErrorPage';
import Header from './Components/Header/Header';


function App() {
  return (


    <div className="App">
      <Router>
      <Header />

        <Routes>

          <Route path='/' element={<HomePage />} />
          <Route path='/about' element={<AboutPage />} />

          <Route path='*' element={<ErrorPage />} />
        </Routes>
       




      </Router>
     
    </div>
  );
}

export default App;
