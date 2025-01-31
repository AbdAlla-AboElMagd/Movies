import GetAllMovies from "./GetAllMovies";

function Home() {
  let path = "https://api.themoviedb.org/3/movie/popular";
  path = "https://api.themoviedb.org/3/search/movie";
  let query = {
    api_key: "14034fed4aea5c53440ec2af0a412467",
    page: "1",
    query: "A",
  };
  return (
    <div>
      <GetAllMovies path={path} query={query}></GetAllMovies>
    </div>
  );
}

export default Home;
