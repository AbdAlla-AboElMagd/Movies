import { useDispatch, useSelector } from "react-redux";
import MyCard from "../Components/MyCard";
function GetAllFavoriteMovies(props) {
  let favMovies = useSelector((state) => state.favMovie.favMovies);
  let totalFav = useSelector((state) => state.favMovie.totalFav);
  const dispatch = useDispatch();
  return (
    <div className="m-2">
      <p className="fs-1 fw-bold">Favorite Movies</p>
      <p>Total Results: {totalFav}</p>
      <div className="d-flex flex-row flex-wrap gap-4 justify-content-evenly align-items-center">
        {Object.entries(favMovies).map(([id, movie]) => {
          let poster = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
          return (
            <MyCard
              key={movie.id}
              title={movie.title}
              poster_path={poster}
              id={movie.id}
              path={`/moviedetail/${movie.id}`}
            ></MyCard>
          );
        })}
      </div>
    </div>
  );
}

export default GetAllFavoriteMovies;
