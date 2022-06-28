import { combineReducers } from 'redux'
import customers from "./customerReducer";
import sellers from "./sellerReducer";
import admins from "./adminReducer";

const rootReducer = combineReducers({
  customers,
  sellers,
  admins
})

export default rootReducer

//