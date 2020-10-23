import {
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS
} from "../constants/productConstants";
import axios from 'axios'

/*
An action is a plain JavaScript object that has a type field.
You can think of an action as an event that describes something that happened in the application.
The type field should be a string that gives this action a descriptive name.
An action object can have other fields with additional information about what happened. By convention, we put that information in a field called payload.

An action creator is a function that creates and returns an action object.
 */


export const listProducts = () => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_LIST_REQUEST})
        const {data} = await axios.get('/api/products/')
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message
        })
    }
}

export const listProductsDetails = (id) => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_DETAILS_REQUEST})
        const {data} = await axios.get(`/api/products/${id}`)
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message
        })
    }
}