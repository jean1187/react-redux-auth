import React,{Fragment} from 'react';
import {withRouter} from 'react-router-dom'
import { useForm } from "react-hook-form";
// hooks react redux
import { useDispatch, useSelector } from "react-redux";

import { login } from "../redux/ducks/userDucks";

const LoginPage = (props) => {
  // declaramos displach para llamar a la acción o acciones
  const dispatch = useDispatch();

  const activo = useSelector((store) => store.auth.loggedIn);

  const { register, errors, handleSubmit } = useForm();

  const onSubmit = (data, e) => {
    dispatch(login(data.username, data.password));
    // limpiar campos
    e.target.reset();
  };

  React.useEffect(() => {
      //console.log(activo);
    if (activo) {
      //  console.log("Activo y reenviando a dahboard",activo)
      props.history.push("/");
    }
  }, [activo, props]);

  return (
    <Fragment>
      Login Page
      <div className="alert alert-info">
        Username: test
        <br />
        Password: test
      </div>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <label className="sr-only">Email address</label>
        <input
          type="text"
          name="username"
          className="form-control"
          placeholder="Username"
          ref={register({
            required: { value: true, message: "Ingrese un username" },
          })}
        />
        <span className="text-danger text-small d-block mb-2">
          {errors?.username?.message}
        </span>
        <label className="sr-only">Password</label>
        <input
          type="password"
          name="password"
          className="form-control"
          placeholder="Password"
          ref={register({
            required: { value: true, message: "Ingrese un password" },
          })}
        />
        <span className="text-danger text-small d-block mb-2">
          {errors?.password?.message}
        </span>
        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Sign in
        </button>
      </form>
    </Fragment>
  );
};
 
export default withRouter(LoginPage);