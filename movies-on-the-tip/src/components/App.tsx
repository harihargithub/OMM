import { BrowserRouter as Router } from 'react-router-dom';
import Home from './Home';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import MovieDetails from './movie-details/MovieDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/:title" element={<MovieDetails />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
