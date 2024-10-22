import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [userList, setUserList] = useState([]);
  const [randomMovies, setRandomMovies] = useState([]);

  const apiKey = ''; //USE YOUR APIKEY  FROM https://www.themoviedb.org/

  useEffect(() => {
    
    fetchRandomMovies(); 
  }, []);

  const fetchRandomMovies = async () => {
    try {
      
      const response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=random`);
      const data = await response.json();


      if (data && data.Search) {
        const randomMoviesList = data.Search.sort(() => Math.random() - 0.5).slice(0, 10);
        setRandomMovies(data.Search);
      }
    } catch (error) {
      console.error('Error fetching random movies:', error);
    }
  };

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetchMovies();
  };

  const handleBotonChange = () => {
    if (movies.length > 0) {
      const movie = movies[0];

      const isMovieInList = userList.find((item) => item.title === movie.Title);

      !isMovieInList
        ? setUserList((prevList) => [...prevList, { poster: movie.Poster, title: movie.Title }])
        : handleRemoveMovie(movie);
    }
  };

  const handleRemoveMovie = (movieToRemove) => {
    setUserList((prevList) => prevList.filter((movie) => movie.title !== movieToRemove.title));
  };

  const Item = ({ portada, nombre }) => {
    return (
      <div className='movieList'>
        <li>
          <img src={portada} alt={nombre} srcSet="" />
        </li>
      </div>
    );
  };

  const fetchMovies = async () => {
    try {
      const response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&t=${search}`);
      const data = await response.json();
      setMovies([data]);
    } catch (error) {
      console.error('Error fetching data from API:', error);
    }
  };

  const printData = (movie) => (
    <>
      <h2>{movie.Title}</h2>
      <div className='posterOverview'>
        <img src={movie.Poster} alt={movie.Title} />
        <p>Synopsis: {movie.Plot}</p>
      </div>
      <div>
        <li>Cast: {movie.Actors}</li>
        <li>Directed by: {movie.Director}</li>
        <li>Year: {movie.Year}</li>
        <li>Country: {movie.Country}</li>
        <li>Rated: {movie.Rated}</li>
      </div>
      <form>
        <div>
          <input type="button" value="Add to my list" onClick={handleBotonChange} />
        </div>
      </form>
    </>
  );

  const showList = () => {
    return (
      <div>
        <h2>My List</h2>
        <ul>
          {userList.map((item, index) => (
            <Item key={index} portada={item.poster} nombre={item.title} />
          ))}
        </ul>
      </div>
    );
  };

  return (
    <>
      <h1 className='principalTitle'>THE MOVIES DATABASE</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="movie"
          value={search}
          placeholder="Search a movie"
          onChange={handleInputChange}
        />
        <input type="submit" value="Let's go!" className="boton" />
      </form>

      <div className="listMovies">
        {movies.map((movie) => (
          <div key={movie.imdbID}>
            {movie.Response === 'False' && <p>Sorry, we can't find that movie. </p>}
            {movie.Response === 'True' && printData(movie)}
          </div>
        ))}
        <div className="myList">
          {userList.length === 0 && <p>Add movies to your list</p>}
          {userList.length > 0 && showList()}
        </div>
      </div>

    
      <div className='randomList'>
      
        <ul>
          {randomMovies.map((movie) => (
            <li key={movie.imdbID}> <img src={movie.Poster} alt={movie.Title} srcSet="" /></li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
