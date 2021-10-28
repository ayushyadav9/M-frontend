import { ActionTypes } from "../contants/actionTypes";

const initialState = {
  products: [],
  categoryProd: [],
};

export const productReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_PRODUCTS:
      return { ...state, products: payload };
    case ActionTypes.SET_CATEGORY_PRODUCTS:
      return { ...state, categoryProd: payload };
    case ActionTypes.REMOVE_CATEGORY_PRODUCTS:
      return {};
    default:
      return state;
  }
};

export const selectedProductReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ActionTypes.SELECTED_PRODUCT:
      return { ...state, ...payload };
    case ActionTypes.REMOVE_SELECTED_PRODUCT:
      return {};
    default:
      return state;
  }
};
