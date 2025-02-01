import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { AddFav, DelFav } from "../Redux/Actions/ChangeFav";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

function MyCard(props) {
  let favMovies = useSelector((state) => state.favMovie.favMovies);
  let total_fav = useSelector((state) => state.favMovie.totalFav);
  const dispatch = useDispatch();
  function MovieObj(id, title, poster_path, path) {
    return {
      id: id,
      title: title,
      poster_path: poster_path,
      path: path,
    };
  }
  const handleFav = (id, title, poster_path, path) => {
    let myPayload = {};
    myPayload.id = id;
    myPayload.data = MovieObj(id, title, poster_path, path);

    favMovies[id] == undefined
      ? dispatch(AddFav(myPayload))
      : dispatch(DelFav(myPayload));
  };
  return (
    <div
    // style={
    //   props.backdrop_path && {
    //     backgroundImage: `url(${props.backdrop_path})`,
    //     backgroundSize: "cover",
    //     backgroundPosition: "center",
    //     backgroundRepeat: "no-repeat",
    //   }
    // }
    >
      <div
        className="card"
        style={{ width: props.isOne ? "100%" : "25rem", minHeight: "750px" }}
      >
        {props.poster_path && (
          <img
            src={props.poster_path}
            style={{ height: "600px" }}
            className="card-img-top"
          ></img>
        )}
        <div
          style={{
            position: "absolute",
            right: "1rem",
            top: "1rem",
            cursor: "pointer",
          }}
          onClick={() => {
            handleFav(props.id, props.title, props.poster_path, props.path);
          }}
        >
          {favMovies[props.id] == undefined ? (
            <FaHeart color="grey" size="2rem" />
          ) : (
            <FaHeart color="red" size="2rem" />
          )}
        </div>
        <div className="card-body d-flex flex-wrap flex-column justify-content-center align-items-center">
          {props.title && (
            <p className="card-title fs-5 fw-bold">{props.title}</p>
          )}
          {props.lang && <p className="card-text">Language: {props.lang}</p>}
          {props.lang && (
            <p className="card-text">Release Date: {props.release_date}</p>
          )}
          {props.popularity && (
            <p className="card-text">Popularity: {props.popularity}</p>
          )}

          {props.vote && <p className="card-text">Vote: {props.vote}</p>}
          {props.overview && (
            <p className="card-text">Overview: {props.overview} </p>
          )}
        </div>
        {/* <div className="m-2">
          <button
            className="btn btn-danger"
            onClick={() => {
              handleFav(props.id, props.title, props.poster_path, props.path);
            }}
          >
            {favMovies[props.id] == undefined
              ? "Add To Favorite"
              : "Remove From Favorites"}
          </button>
        </div> */}
        <div>
          {props.path && (
            <Link
              to={props.path}
              className="btn btn-dark w-100 d-flex align-items-center justify-content-center fw-bold"
              style={{ height: "50px" }}
            >
              View More Details
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
export default MyCard;
