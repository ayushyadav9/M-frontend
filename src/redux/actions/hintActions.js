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
    localStorage.setItem("hint", JSON.stringify(response.data.data))
    dispatch({ type: ActionTypes.SET_HINT, payload: response.data.data });
  };

  export const removeHint = () => {
    return {
      type: ActionTypes.REMOVE_HINT,
    };
  };
