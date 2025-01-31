import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import MyCard from "../Components/MyCard";

function GetOneMovie() {
  const [movie, setMovie] = useState({});
  //  location history match
  const params = useParams();
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${params.movie_id}?api_key=14034fed4aea5c53440ec2af0a412467`
      )
      .then((res) => {
        setMovie(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  let poster = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
  let bdpath = `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`;
  return (
    <>
      <MyCard
        backdrop_path={bdpath}
        title={movie.title}
        poster_path={poster}
        overview={movie.overview}
        lang={movie.original_language}
        popularity={movie.popularity}
        vote={movie.vote_average}
        release_date={movie.release_date}
      ></MyCard>
    </>
  );
}

export default GetOneMovie;
