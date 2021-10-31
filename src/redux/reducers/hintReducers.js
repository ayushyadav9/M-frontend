import { ActionTypes } from "../contants/actionTypes";
// console.log(JSON.parse(localStorage.getItem('hint')))
// JSON.parse(localStorage.getItem('hint'))?JSON.parse(localStorage.getItem('hint')):
const initialState = {
    hint:JSON.parse(localStorage.getItem('hint'))?JSON.parse(localStorage.getItem('hint')):
    {
      hint:{
        _id:null,
        hintStatement:"",
        category:"",
        level:0,
      },
      productId:0
    }
  };

export const hintReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case ActionTypes.SET_HINT:
        return { ...state, hint: payload };
      default:
        return state;
    }
  };