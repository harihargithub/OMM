import axios from 'axios';
import IMovie from '../models/IMovie';

const baseURL = 'http://localhost:4000';

const tabURLs: { [key: string]: string } = {
    'Movies in theaters': 'movies-in-theaters',
    'Coming soon': 'movies-coming',
    'Top rated Indian': 'top-rated-india',
    'Top rated movies': 'top-rated-movies',
    'Favourites': 'favourit',
  };

const getMovies = async (tabName: string, searchedText: string = '') => {
  const urlTabName = tabURLs[tabName];
  const response = await axios.get<IMovie[]>(`${baseURL}/${urlTabName}?title_like=${searchedText}`);
  return response.data;
}

const getMovieDetailsByID = async (tabName: string, id: string) => {
  const urlTabName = tabURLs[tabName];
  const response = await axios.get<IMovie>(`${baseURL}/${urlTabName}/${id}`);
  return response.data;
}

const getMovieDetailsByTitleAndYear = async (tabName: string, title: string, year: string) => {
  const urlTabName = tabURLs[tabName];
  const response = await axios.get<IMovie[]>(`${baseURL}/${urlTabName}?title=${title}&year=${year}`);
  return response.data;
}

const getMoviesFromSearching = async (tabName: string, searchText: string) => {
  const urlTabName = tabURLs[tabName];
  const response = await axios.get<IMovie[]>(`${baseURL}/${urlTabName}?title_like=${searchText}`);
  return response.data;
}

const addMovieToFavourite = async (movie: IMovie) => {
    // Get the current list of favourites
    const response = await axios.get(`${baseURL}/favourit`);
    const favourites = response.data;
  
    // Check if the movie is already in the favourites
    const isAlreadyFavourite = favourites.some((fav: IMovie) => fav.id === movie.id);
  
    if (isAlreadyFavourite) {
      // If the movie is already in the favourites, throw an error
      throw new Error('Movie is already in favourites');
    } else {
      // If the movie is not in the favourites, add it
      const shouldAdd = window.confirm('Do you want to add this movie to favourites?');
      if (shouldAdd) {const response = await axios.post(`${baseURL}/favourit`, movie);
      
      return response.data;
    }
    }
  };

const deleteMovieFromFavourite = async (id: string) => {
  const response = await axios.delete(`${baseURL}/favourit/${id}`);
  
  return response.data;
}

export { 
  getMovies, 
  getMovieDetailsByID, 
  getMovieDetailsByTitleAndYear, 
  getMoviesFromSearching, 
    addMovieToFavourite,
    deleteMovieFromFavourite }