import React, { Component, ChangeEvent } from 'react';
import TabOptions from '../../utils/TabOptions';
import {
  getMovies,
  getMoviesFromSearching,
  addMovieToFavourite,
  deleteMovieFromFavourite,
} from '../../services/Movie';
import MovieCard from '../movie-list/MovieCard';

interface Props {
  tab: TabOptions;
  tabname: string;
}

interface State {
  status: string;
  movies: any[];
  error: Error | null;
  searchedText: string;
  show: boolean;
  response: string;
  responseText: string;
  searchQuery: string;
}

class MoviesList extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      status: 'LOADING',
      movies: [],
      error: null,
      searchedText: '',
      show: false,
      response: '',
      responseText: '',
      searchQuery: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.fetchSearchedData = this.fetchSearchedData.bind(this);
    this.addSelectedMovieToFavourite =
      this.addSelectedMovieToFavourite.bind(this);
  }

  handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = event.target.value;
    this.setState({ searchQuery }, () => {
      if (searchQuery.length > 2) {
        // Only search when the query is 3 or more characters
        this.fetchSearchedData(searchQuery);
      }
    });
  };

  handleSearch = () => {
    this.fetchSearchedData(this.state.searchQuery);
  };

  // Define the handleDelete method
  handleDelete = (id: string) => {
    const shouldDelete = window.confirm(
      'Do you want to remove the movie from favourites?',
    );
    if (shouldDelete) {
      deleteMovieFromFavourite(id)
        .then(() => {
          // Remove the movie from the state
          this.setState((prevState) => ({
            movies: prevState.movies.filter((movie) => movie.id !== id),
          }));
        })
        .catch((error: Error) => {
          console.error('Error deleting movie:', error);
        });
    }
  };

  // Ensure the error caught is of type Error
  fetchMovies = async (tab: TabOptions) => {
    try {
      const movies = await getMovies(tab);
      this.setState({ movies, status: 'LOADED' });
    } catch (error) {
      if (error instanceof Error) {
        this.setState({ error, status: 'ERROR' });
      }
    }
  };

  handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    this.setState({ searchedText: event.target.value });
  }

  async fetchSearchedData(text: string) {
    try {
      const movies = await getMoviesFromSearching(this.props.tab, text);
      this.setState({ movies, status: 'LOADED' });
    } catch (error) {
      if (error instanceof Error) {
        this.setState({ error, status: 'ERROR' });
      }
    }
  }

  async addSelectedMovieToFavourite(movie: any) {
    try {
      await addMovieToFavourite(movie);
      this.setState({
        show: true,
        response: 'Success',
        responseText: 'Successfully added to Favourite',
      });
    } catch (error) {
      this.setState({
        show: true,
        response: 'Error',
        responseText: 'Failed to add to Favourite',
      });
    }
  }

  render() {
    const { status, movies, error, searchQuery } = this.state;
    let el = null;

    switch (status) {
      case 'LOADING':
        el = <div>Loading...</div>;
        break;
      case 'LOADED':
        el = (
          <div style={{ textAlign: 'right' }}>
            <input
              type="text"
              value={searchQuery}
              onChange={this.handleSearchChange}
              placeholder="Search for a movie..."
            />
            <button onClick={this.handleSearch}>Search</button>

            <div className="movie-list">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  tabName={this.props.tabname}
                  onDelete={this.handleDelete}
                  onAddClick={() => this.addSelectedMovieToFavourite(movie)}
                />
              ))}
            </div>
          </div>
        );
        break;
      case 'ERROR':
        el = <div>Error: {error?.message}</div>;
        break;
      default:
        el = null;
    }

    return el;
  }

  componentDidMount() {
    this.fetchMovies(this.props.tab);
  }

  componentDidUpdate(oldProps: Props, oldState: State) {
    if (oldProps.tab !== this.props.tab) {
      this.fetchMovies(this.props.tab);
    }
    if (oldState.searchedText !== this.state.searchedText) {
      this.fetchSearchedData(this.state.searchedText);
    }
  }
}

export default MoviesList;
