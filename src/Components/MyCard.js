import { Link } from "react-router-dom/cjs/react-router-dom.min";
function MyCard(props) {
  return (
    <div
      style={
        props.backdrop_path && {
          backgroundImage: `url(${props.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }
      }
    >
      <div className="card" style={{ width: "25rem", minHeight: "750px" }}>
        {props.poster_path && (
          <img
            src={props.poster_path}
            style={{ height: "600px" }}
            className="card-img-top"
          ></img>
        )}

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
