import React, { Fragment } from "react";
import { Switch,Router, Route } from "react-router-dom";
import { history } from "./_helpers";
// hooks react redux
import { useSelector } from "react-redux";
import NavBar from "./components/Navbar";
import { PrivateRoute } from "./router";

//import views
import LoginPage from './views/LoginPage'
import DashBoard from "./views/DashBoard";

function App() {
  // crearmos el state utilizando nuestra tienda
  // store.alert lo sacamos de la tienda
  const alert = useSelector((store) => store.alert);
  return (
    <Fragment>
      <Router history={history}>
        <NavBar />
        <div className="jumbotron">
          <div className="container">
            <div className="col-sm-8 col-sm-offset-2">
              {alert.message && (
                <div className={`alert ${alert.type}`}>{alert.message}</div>
              )}

              <div>
                <Switch>
                  <PrivateRoute component={DashBoard} path="/" exact />
                  <Route component={LoginPage} path="/login" exact />
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
