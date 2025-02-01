import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";
import InputText from "./InputText";
import InputSearch from "./InputSearch";
import { useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa";

function Navbar() {
  const history = useHistory();
  let total_fav = useSelector((state) => state.favMovie.totalFav);
  const [searchText, setSearchText] = useState("");

  const updateTextValue = (name, searchbarText) => {
    setSearchText(searchbarText);
  };

  const handleSearchBtn = (e) => {
    e.preventDefault();
    history.push(`/search?query=${searchText}&page=1`);
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-black sticky-top">
        <div className="container-fluid">
          <Link className="nav-link active fw-bold" aria-current="page" to="/">
            Moives Home
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/allmovies">
                  All Movies
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/search">
                  Search
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/fav">
                  Favorites
                </Link>
              </li>
            </ul>

            <div className="d-flex justify-content-center align-items-center">
              <div className="me-2 d-flex flex-row justify-content-center align-items-center">
                <Link className="nav-link" aria-current="page" to="/fav">
                  <FaHeart className="mb-2" color="red" size="2rem" />{" "}
                  <span className="fs-2"> {total_fav} </span>
                </Link>
              </div>
              <div className="me-2">
                <InputSearch
                  Name="Search"
                  checkReg={/^[^\s]+.*$/}
                  errMsg=""
                  cbName="searchName"
                  cbErrName="errItem"
                  CallbackOnChange={updateTextValue}
                ></InputSearch>
              </div>

              <button
                className="btn btn-outline-success"
                onClick={(e) => {
                  handleSearchBtn(e);
                }}
              >
                Search
              </button>
            </div>
            <Link to="/login" className="btn btn-primary m-1">
              Login
            </Link>
            <Link to="/register" className="btn btn-success m-1">
              Register
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
export default Navbar;
