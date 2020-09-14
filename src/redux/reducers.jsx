import { combineReducers } from "redux";

// import { authentication } from "./authentication.reducer";
// import { users } from "./users.reducer";
 import { alertReducer } from "./ducks/alertDucks";
 import { authenticationReducer } from "./ducks/userDucks";

const listReducers = combineReducers({
  alert: alertReducer,
  auth: authenticationReducer
});



export default listReducers;