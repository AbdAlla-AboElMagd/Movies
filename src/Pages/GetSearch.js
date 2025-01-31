import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import SearchBar from "../Components/SearhBar";
import GetAllMovies from "./GetAllMovies";
import { useState } from "react";

function GetSearch(props) {
  const history = useHistory();
  const [searchInfo, setSearchInfo] = useState({
    path: "https://api.themoviedb.org/3/search/movie",
    query: {
      api_key: "14034fed4aea5c53440ec2af0a412467",
      page: "1",
      query: "",
    },
  });

  const UpdatesearchText = (name) => {
    console.log("update Search Text");
    console.log(name);
    setSearchInfo({
      ...searchInfo,
      query: {
        ...searchInfo.query,
        query: name,
      },
    });
    history.push(`?query=${name}&page=${1}`);
  };

  return (
    <div>
      <SearchBar callback={UpdatesearchText}></SearchBar>
      <GetAllMovies
        path={searchInfo.path}
        query={searchInfo.query}
        showState={true}
      ></GetAllMovies>
    </div>
  );
}

export default GetSearch;
