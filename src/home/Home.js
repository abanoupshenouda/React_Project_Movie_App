import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Header from '../../common/header/Header';
import './Home.css';
import FilterMovie from './FilterMovie';
import { getMovieSuccess , setSelectedMovie, unsetSelectedMovie} from '../../redux/movieReducer';
import { getFormattedReleaseDate } from '../../common/util/utils';


function Home(props) {

  
  const dispatch = useDispatch();

  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [releasedMovies, setReleasedMovies] = useState([]);


  useEffect(() => {
    dispatch(unsetSelectedMovie());
    fetch(props.baseUrl + "/movies/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Accept": "application/json;charset=UTF-8"
      }
    })
      .then((response) => response.json())
      .then((response) => {
        let allMovies = response.movies;
        dispatch(getMovieSuccess(allMovies));  
        setUpcomingMovies(allMovies.filter((movie) => movie.status === "PUBLISHED")) ;  
        setReleasedMovies(allMovies.filter((movie) => movie.status === "RELEASED"))   
      });
  }, [])

  const movieDetailsEventHandler = (e) => {
    e.preventDefault();
    dispatch(setSelectedMovie(e.target.id));
    props.history.push(`/movie/${e.target.id}`)
  }

  return (
  
  <div>
    <Header {...props} value={"Login"} />
    <section id="movieLists" >
      <div id="container">
        <div className='homeHeader'>
          Upcoming Movies
        </div>

        <div className="gridListContainer">
          <GridList className="gridList" cellHeight={250}>
            {upcomingMovies.map(movie => (
              <GridListTile key={movie.id} className="gridListTile">
                <img src={movie.poster_url} alt={movie.title} />
                <GridListTileBar title={movie.title} />
              </GridListTile>
            ))}
          </GridList>

        </div>
        <div className="mainContent">
          <div className="releasedMoviesSection">
            <GridList className="gridList" cols={4} cellHeight={350}>
              {releasedMovies.map(movie => (
                <GridListTile key={movie.id}  className="gridListTile" onClick={(e) => 
                movieDetailsEventHandler(e)}>
                  <img src={movie.poster_url} alt={movie.title} id={movie.id}/>
                  <GridListTileBar
                    title={movie.title}
                    subtitle={<span>Released Date: {getFormattedReleaseDate(movie.release_date)}</span>}
                     />
                </GridListTile>
              ))}
            </GridList>
          </div>
          <FilterMovie {...props} filterMovies={setReleasedMovies}/>

        </div>
      </div>
    </section>
  </div>
  )
}

export default Home