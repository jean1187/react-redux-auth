import React from "react";
// Importar
import { withRouter, NavLink, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {logout} from "../redux/ducks/userDucks"

const Navbar = (props) => {
  const dispatch = useDispatch();

  const cerrar = () => {
    dispatch(logout());
    props.history.push("/login");
  };

  const activo = useSelector((store) => store.auth.loggedIn);
  
  return (
    <div className="navbar navbar-dark bg-dark">
      <Link to="/" className="navbar-brand">
        Titulo
      </Link>
      <div>
        <div className="d-flex">
          {activo ? (
            <>
              <NavLink className="btn btn-dark mr-2" to="/" exact>
                Lis Users
              </NavLink>
              <button className="btn btn-dark" onClick={() => cerrar()}>
                cerrar Sesión
              </button>
            </>
          ) : (
            <NavLink className="btn btn-dark mr-2" to="/login" exact>
              Login
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default withRouter(Navbar);
