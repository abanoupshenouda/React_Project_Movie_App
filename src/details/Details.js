import { GridList, GridListTile, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../common/header/Header'
import { useSelector } from 'react-redux';
import YouTube from 'react-youtube';
import StarRatingComponent from 'react-star-rating-component';

import { getFormattedReleaseDate } from "../../common/util/utils";
import { getMovieDetailsById, artistsOfTheMovie } from "../../redux/movieReducer";
import "./Details.css"

function Details(props) {
  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const { id } = props.match.params;
  const movieDetails = useSelector((state) => getMovieDetailsById(state.movies, id)[0]) || [];
  const artists = useSelector((state) => artistsOfTheMovie(state.movies, id));
  const [videoId, setVideoId] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (movieDetails.trailer_url) getVideoIdFromYTTrailerURL(movieDetails.trailer_url);

  }, [movieDetails])

  function getVideoIdFromYTTrailerURL(url) {
    const VID_REGEX = /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    setVideoId(url.match(VID_REGEX)[1]);
  }



  const onVideoReady = (e) => {

    e.target.pauseVideo();
  }

  const onStarClick = (value) => {
    // console.log("value", value)
    setRating(value);
  }

  return (

    <div>
      <Header {...props} />
      <section id="movieDetails">
        <div>
          <Typography className="back">
            <Link to="/">
              &#60; Back to Home
            </Link>
          </Typography>
        </div>
        <div className='movieDetailsContainer'>
          <div className='moviePosterSection'>
            <img src={movieDetails.poster_url} alt={movieDetails.title} />
          </div>
          <div className='movieDetailSection'>
            <Typography variant="headline" component="h2">
              {movieDetails.title}
            </Typography>

            <Typography ><strong>Genre:</strong> {movieDetails && movieDetails.genres && movieDetails.genres.toString()}</Typography>
            <Typography ><strong>Duration:</strong> {movieDetails && movieDetails.duration}</Typography>
            <Typography ><strong>Release Date:</strong> {movieDetails && movieDetails.release_date && getFormattedReleaseDate(movieDetails.release_date)}</Typography>
            <Typography ><strong>Rating:</strong> {movieDetails && movieDetails.rating}</Typography>
            <div className="plot">
              <Typography ><strong>Plot:</strong>
                <Link to={"" + movieDetails.wiki_url}>
                  Wiki Link
                </Link>
                {movieDetails && movieDetails.storyline}
              </Typography>
            </div>

            <div className="trailer">
              <Typography ><strong>Trailer:</strong> </Typography>
              <YouTube videoId={videoId} opts={opts} onReady={(e) => onVideoReady(e)} />
            </div>
          </div>
          <div className='movieArtistAndRateSection'>
            <Typography  ><strong>Rate this movie:</strong></Typography>
            <StarRatingComponent
              name="rating"
              starCount={5}
              value={rating}
              onStarClick={(value) => onStarClick(value)}
              emptyStarColor="#808080"
            />

            <div className='artistsSection'>
              <Typography  ><strong>Artists:</strong></Typography>

              <GridList className="gridList" cols={2} >
                {artists && artists.map(artist => (
                  <GridListTile key={artist.id} className="gridListTile" >
                    <img src={artist.profile_url} alt={artist.first_name} />
                  </GridListTile>
                ))}
              </GridList>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Details