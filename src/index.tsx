import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

// Redux
import store from "./redux/store";
import { Provider } from "react-redux";

// Components
import { NavBar } from "./components/NavBar/NavBar";
import { HomePage } from "./components/HomePage/HomePage";
import { FavoritesPage } from "./components/FavoritesPage/FavoritesPage";

// Router
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <NavBar></NavBar>
        <Switch>
          <Route exact path="/" component={HomePage}></Route>
          <Route path="/favorites" component={FavoritesPage}></Route>
          <Redirect to="/" />
        </Switch>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
