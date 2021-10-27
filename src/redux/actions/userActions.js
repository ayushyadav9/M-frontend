import {ActionTypes} from "../contants/actionTypes"
import fakeStore from "../../apis/fakeStore"

export const login = (email, password) => async dispatch => {
    try {
        dispatch({ type: ActionTypes.USER_LOGIN_REQUEST })
        const config = {
            headers: {'Content-Type': 'application/json',},
        }
        const { data } = await fakeStore.post('/login',
            { email, password },
            config
        )
        dispatch({ type: ActionTypes.USER_LOGIN_SUCCESS, payload: data })
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: ActionTypes.USER_LOGIN_FAIL,
            payload:error.response && error.response.data.message? error.response.data.message: error.message,
        })
    }
}