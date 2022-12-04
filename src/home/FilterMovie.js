
import React, { useState } from 'react'
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from '@material-ui/core/TextField';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';

import { selectAllMovies, allGenres, allArtistsByName } from '../../redux/movieReducer';

const styles = theme => ({
    filterMoviesSection: {
        width: "24%",
        padding: "10px"
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: "240px",
        maxWidth: "240px"
    },
    filterCardStyle: {
        margin: "auto",
    },
    marginTitle: {
        margin: theme.spacing.unit,
    },
})

const FilterMovie = (props) => {
    const { classes } = props;
    const [movieName, setMovieName] = useState();
    const [movieStartDate, setMovieStartDate] = useState();
    const [movieEndDate, setMovieEndDate] = useState();
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [selectedArtists, setSelectedArtists] = useState([]);
    const genres = [...new Set(useSelector(state => allGenres(state.movies)))];
    const artists = useSelector(state => allArtistsByName(state.movies));
    const allMovies = useSelector(state => selectAllMovies(state.movies))
    // const genres =useSelector((state) => state.movies.genres);

    const genresChangeHandler = (e) => {
        const { value } = e.target;
        const selectedGenresList = [...new Set(value)];
        setSelectedGenres(selectedGenresList);
    }

    const artistsChangeHandler = (e) => {
        const { value } = e.target;
        const selectedArtistsList = [...new Set(value)];
        setSelectedArtists(selectedArtistsList);
    }

    const filterMovie = () => {
        let moviesFiltered = allMovies;
        if (selectedGenres.length > 0) {
            moviesFiltered = filterMoviesBasedOnGenre(allMovies, selectedGenres);
        }
        if (selectedArtists.length > 0) {
            moviesFiltered = filterMoviesBasedOnArtist(moviesFiltered, selectedArtists);
        }
        if (movieName) moviesFiltered = filterMoviesBasedOnName(moviesFiltered, movieName);



        props.filterMovies(moviesFiltered.length > 0 ? moviesFiltered : allMovies);


    }

    const filterMoviesBasedOnGenre = ((movies, genreFilter) => movies.filter((movie) => genreFilter.some(genre => movie.genres.includes(genre)))
    );

    const filterMoviesBasedOnArtist = ((movies, artistsFilter) => movies.filter((movie) => artistsFilter.some(
        artist => {
            const artistFirstName = artist.split(" ")[0];

            if (movie.artists) {
                const yesNo = movie.artists.filter((movie) => movie.first_name === artistFirstName);
                return yesNo.length > 0 ? true : false;
            }

            return false;
        })))

    const filterMoviesBasedOnName = ((movies, movieName) => movies.filter((movie) => movie.title.match(movieName)));




    return (
        <div className={classes.filterMoviesSection}>
            <Card className={classes.filterCardStyle}>
                <CardContent >
                    <Typography variant="subheading" component="h4" color="primary" className={classes.marginTitle}>
                        FIND MOVIES BY:
                    </Typography>

                    <div>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="name">
                                <Typography color="textSecondary" variant="body2">Movie Name</Typography>
                            </InputLabel>
                            <Input id="name"
                                value={movieName}
                                onChange={(e) => { setMovieName(e.target.value) }} />
                        </FormControl>
                    </div>
                    <br />

                    <div >
                        <FormControl className={classes.formControl}>
                            {/* <TextField
                                id="genresSelect"
                                label="Genres"
                                select
                                value={selectedGenres}
                                placeholder="Genres"
                                onChange={(e) => genresChangeHandler(e)}
                                SelectProps={{
                                    multiple:true,
                                }}> */}
                            <InputLabel htmlFor="genresCheckBoxSelect">Genres</InputLabel>
                            <Select
                                multiple
                                value={selectedGenres}
                                onChange={(e) => genresChangeHandler(e)}
                                input={<Input id="genresCheckBoxSelect" />}
                                renderValue={selected => selected.join(', ')}
                            >
                                {genres.map((genre) => (
                                    <MenuItem key={genre} value={genre} name={genre}>
                                        <Checkbox checked={selectedGenres.indexOf(genre) > -1} />
                                        <ListItemText primary={genre} />
                                    </MenuItem>
                                ))}
                            </Select>

                            {/* </TextField> */}
                        </FormControl>
                    </div>
                    <br />

                    <div >
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="artistsCheckBoxSelect">Artists</InputLabel>
                            <Select
                                multiple
                                autoWidth={true}
                                value={selectedArtists}
                                onChange={(e) => artistsChangeHandler(e)}
                                input={<Input id="artistsCheckBoxSelect" />}
                                renderValue={selected => selected.join(', ')}
                            >
                                {artists.map((artist) => (
                                    <MenuItem key={artist} value={artist}>
                                        <Checkbox checked={selectedArtists.indexOf(artist) > -1} />
                                        <ListItemText primary={artist} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <br />

                    <div>
                        <FormControl className={classes.formControl}>
                            <TextField
                                id="releaseDateStart"
                                value={movieStartDate}
                                label="Release Date Start"
                                type="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </FormControl>
                    </div>
                    <br />
                    <div>
                        <FormControl className={classes.formControl}>
                            <TextField
                                id="releaseDateEnd"
                                value={movieEndDate}
                                label="Release Date End"
                                type="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </FormControl>
                    </div>
                    <br /><br />
                    <FormControl className={classes.formControl}>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={() => filterMovie()}
                        >
                            APPLY
                        </Button>
                    </FormControl>

                </CardContent>
            </Card>
        </div>
    )
}

export default withStyles(styles, { withTheme: true })(FilterMovie);
