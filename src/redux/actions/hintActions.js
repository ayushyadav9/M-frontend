import { ActionTypes } from "../contants/actionTypes";
import fakeStore from "../../apis/baseAPI";

export const getHint = () =>
  async function (dispatch) {
    const config = {
      headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
      }
    const response = await fakeStore.get("/getHint",config);
    
    dispatch({ type: ActionTypes.SET_HINT, payload: response.data.data });
  };