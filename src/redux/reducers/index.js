import { combineReducers } from "redux";
import { productReducer,selectedProductReducer } from "./productReducers";
import { userLoginReducer } from "./userReducers";

const reducers = combineReducers({
    allProducts: productReducer,
    product: selectedProductReducer,
    userLogin: userLoginReducer
})

export default reducers