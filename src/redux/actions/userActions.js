import {ActionTypes} from "../contants/actionTypes"
import fakeStore from "../../apis/baseAPI"

export const login = (tokenId) => async dispatch => {
    try {
        dispatch({ type: ActionTypes.USER_LOGIN_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const data = {
            tokenId
        }
        const res = await fakeStore.post('/googleSignup',data,config)

        dispatch({ type: ActionTypes.USER_LOGIN_SUCCESS, payload: res.data })
        localStorage.setItem('userInfo', JSON.stringify(res.data))
        
    } catch (error) {
        dispatch({
            type: ActionTypes.USER_LOGIN_FAIL,
            payload:error.response && error.response.data.message? error.response.data.message: error.message,
        })
    }
}