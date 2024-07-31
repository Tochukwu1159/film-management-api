import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import FilmList from './components/FilmList';
import PurchaseHistory from './components/PurchaseHistory';
import CreateFilm from './components/CreateFilm';
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/films" element={<FilmList />} />
        <Route path="/purchases" element={<PurchaseHistory />} />
		<Route path="/create" element={<CreateFilm />} />
      </Routes>
    </Router>
  );
}

export default App;
