import {ActionTypes} from "../contants/actionTypes"
import fakeStore from "../../apis/baseAPI"


export const fetchProducts = ()=> async function(dispatch){
    const response = await fakeStore.get("/getProducts")
    dispatch({type: ActionTypes.SET_PRODUCTS,payload:response.data.data})
}

export const fetchProduct = (id)=> async function(dispatch){
    const response = await fakeStore.get(`/getProduct/${id}`)
    dispatch({type: ActionTypes.SELECTED_PRODUCT,payload:response.data.data})
}

export const setProducts = (products)=>{
    return {
        type: ActionTypes.SET_PRODUCTS,
        payload: products
    }
}

export const selectedProduct = (products)=>{
    return {
        type: ActionTypes.SELECTED_PRODUCT,
        payload: products
    }
}

export const removeProduct = (products)=>{
    return {
        type: ActionTypes.REMOVE_SELECTED_PRODUCT,
    }
}