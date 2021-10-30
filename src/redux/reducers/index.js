import { combineReducers } from "redux";
import { productReducer,selectedProductReducer } from "./productReducers";
import { userLoginReducer } from "./userReducers";
import {hintReducer} from "./hintReducers"

const reducers = combineReducers({
    allProducts: productReducer,
    product: selectedProductReducer,
    userLogin: userLoginReducer,
    hint: hintReducer
})

export default reducers