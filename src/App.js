import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginForm from "./Pages/LoginForm";
import RegisterForm from "./Pages/RegisterForm";
import LoginFormComp from "./Pages/LoginFormComp";
import Navbar from "./Components/Navbar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Home from "./Pages/Home";
import GetAllMovies from "./Pages/GetAllMovies";
import GetOneMovie from "./Pages/GetOneMovie";
import GetSearch from "./Pages/GetSearch";
import { useState } from "react";
import Error404 from "./Pages/Error404";

function App() {
  return (
    <div className="App">
      <div className="bg-dark text-light">
        <BrowserRouter>
          <Navbar></Navbar>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/Movies" component={Home} exact />
            <Route path="/login" component={LoginFormComp} exact />
            <Route path="/register" component={RegisterForm} exact />
            <Route path="/allmovies" component={GetAllMovies} exact />
            <Route
              path="/moviedetail/:movie_id"
              component={GetOneMovie}
              exact
            />
            <Route path="/search" component={GetSearch} exact />
            <Route path="*" component={Error404} exact />
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
