import { combineReducers } from 'redux'
import products from "./productReducer"
import customers from "./customerReducer";
import sellers from "./sellerReducer";
import admins from "./adminReducer";

const rootReducer = combineReducers({
  products,
  customers,
  sellers,
  admins
})

export default rootReducer

//