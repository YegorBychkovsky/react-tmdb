import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import './scss/libs/app.scss';
import { MainLayout } from './layouts/MainLayout';
import '@fontsource/roboto/400.css';
import Home from './pages/Home';
import MoviePage from './pages/MoviePage/index';
import TvPage from './pages/TvPage';
import SearchPage from './pages/SearchPage/index';
import ProfilePage from './pages/ProfilePage';

console.warn(process.env);

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/movie/:movieId" element={<MoviePage />} />
        <Route path="/tv/:tvId" element={<TvPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Route>
    </Routes>
  );
}

export default App;
