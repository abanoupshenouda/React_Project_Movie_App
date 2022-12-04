import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    genres: ["Drama", "Crime", "Action", "Adventure", "Horror", "Suspense", "Social", "Scifi", "Thriller", "Comedy"],
    allMovies: [],
    selectedMovie: ""
}
export const movieListSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        getMovieSuccess: (state, action) => {
            state.allMovies = action.payload;
           
        },
        setSelectedMovie: (state, action) => {
            state.selectedMovie = action.payload;
        },
        unsetSelectedMovie: (state) => {
            state.selectedMovie = "";
        }

    }
});

export const selectAllMovies = ((state) => state.allMovies);

export const selectUpcomingMovies = ((state) => state.allMovies.filter((movie) => movie.status === "PUBLISHED"));

export const selectReleasedMovies = ((state) => state.allMovies.filter((movie) => movie.status === "RELEASED"));

export const allGenres = ((state) => state.allMovies.reduce((first, second) => [...first, ...second.genres], []));

// const selectMoviesBasedOnGenre = ((movies, genreFilter) => movies.filter((movie) => genreFilter.some(genre => movie.genres.includes(genre)))
//     );

export const getMovieDetailsById = ((state, id) => state.allMovies.filter((movie) => movie.id === id));

export const artistsOfTheMovie = ((state, id) => {
    let artists = [];
    state.allMovies.forEach(movie => {
        if (movie.artists && movie.id === id) {
            artists = movie.artists;
        }
    })
    return artists;
});


export const allArtistsByName = ((state) => {
    let artists = [];
    state.allMovies.forEach(movie => {
        let artistList = [];
        if (movie.artists) {
            //artists.push(movie.artists);
            artistList = (movie.artists.reduce((accumulator, artist) => [...accumulator, artist.first_name + " " + artist.last_name], []));
        }
        artists = [...artists, ...artistList];
    });
    return [...new Set(artists)];
});



export const { getMovieSuccess, setSelectedMovie, unsetSelectedMovie } = movieListSlice.actions;

export default movieListSlice.reducer;