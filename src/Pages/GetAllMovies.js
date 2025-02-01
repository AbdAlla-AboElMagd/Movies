import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import MyCard from "../Components/MyCard";
import FooterPagination from "../Components/FooterPagination";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

function GetAllMovies(props) {
  const [list, setList] = useState([]);
  const params = useParams();
  const location = useLocation();
  // console.log("Hiiiiiiiiiiiiiiiii");
  // console.log(params);
  // console.log("---------------");
  // console.log(location);
  // console.log(location.search);
  // console.log("---------------");
  // console.log(props);
  // console.log("Bye");

  const [pageInfo, setPageInfo] = useState({
    page: 1,
    max: 500,
    min: 1,
  });

  const [stateInfo, setStateInfo] = useState({
    total_results: 0,
    total_pages: 1,
  });

  const [urlInfo, setUrlInfo] = useState({
    url: "https://api.themoviedb.org/3/movie/popular",
    query: {
      api_key: "14034fed4aea5c53440ec2af0a412467",
      page: "1",
      query: "A",
    },
  });

  useEffect(() => {
    let path;
    let queryObj;

    if (!props.path || props.path == "") {
      path = urlInfo.url;
    } else {
      path = props.path;
    }

    if (!props.query || props.query == "" || props.query == {}) {
      queryObj = urlInfo.query;
    } else {
      queryObj = props.query;
    }

    let MinPage = pageInfo.min;
    let MaxPage = pageInfo.max;
    let locationSearch = new URLSearchParams(location.search);
    let searchObj = Object.fromEntries(locationSearch.entries());
    queryObj = { ...queryObj, ...searchObj };
    let page = locationSearch.get("page");
    if (page === null) {
      page = 1;
    } else {
      page = parseInt(page);
      if (page < MinPage || page > MaxPage) {
        page = 1;
      }
    }
    setPageInfo({
      page: page,
      min: MinPage,
      max: MaxPage,
    });
    queryObj.page = page;
    setUrlInfo({
      url: path,
      query: queryObj,
    });

    let query = new URLSearchParams(queryObj).toString();
    let url = path + "?" + query;

    // call API
    axios
      .get(
        // `https://api.themoviedb.org/3/movie/popular?api_key=1c61f7854caf371b34a23ef611f0efed&page=${page}`
        url
      )
      .then((responce) => {
        setList(responce.data.results);
        setStateInfo({
          total_pages: responce.data.total_pages,
          total_results: responce.data.total_results,
        });

        setPageInfo({
          page: page,
          max:
            parseInt(responce.data.total_pages) >= 500
              ? 500
              : parseInt(responce.data.total_pages),
          min: 1,
        });
      })
      .catch((err) => console.log(err));
  }, [location.search, props.path, props.query]);
  return (
    <div className="m-2">
      <p className="fs-1 fw-bold">Movies</p>
      {props.showState && (
        <div key={`${stateInfo.total_results}-${stateInfo.total_pages}`}>
          {/* <p>total_pages: {stateInfo.total_pages}</p> */}
          <p>Total Results: {stateInfo.total_results}</p>
        </div>
      )}
      <div className="d-flex flex-row flex-wrap gap-4 justify-content-evenly align-items-center">
        {list.map((movie) => {
          let poster = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
          return (
            <MyCard
              key={movie.id}
              title={movie.title}
              poster_path={poster}
              path={`/moviedetail/${movie.id}`}
            ></MyCard>
          );
        })}
      </div>
      <FooterPagination
        key={`${pageInfo.page}-${pageInfo.max}`}
        min={pageInfo.min}
        max={pageInfo.max}
        maxShownBtns={10}
        current={pageInfo.page}
        total_results={stateInfo.total_results}
      ></FooterPagination>
    </div>
  );
}

export default GetAllMovies;
