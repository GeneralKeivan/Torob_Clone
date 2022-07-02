import {GET_SELLERS} from '../constants/ActionTypes'
import axios from "axios";
import history from '../history'
import { resetWarningCache } from 'prop-types';

const API_URL = 'http://localhost:3001/api/';

//Need to change this when visuals are up



export const updateSeller = (seller) => {
    const sellerId = localStorage.getItem("sellerId")
    console.log("update seller ", seller);
    return (dispatch) => {
        return axios.put(API_URL + 'sellers/', seller)
            .then((res) => {
                console.log("response ", res);
                
                history.push("/accounts/sellers/" + sellerId)
            });
    }
}

export const addStore = (seller) => {
    const sellerId = localStorage.getItem("sellerId")
    return (dispatch) => {
        return axios.put(API_URL + 'sellers/', seller)
            .then((res) => {
                console.log("response ", res);
                history.push("/accounts/sellers/" + sellerId + "/stores")
            });
    }
}

export const getSellers = () => dispatch => {
    return fetch(API_URL + 'sellers')
    .then((response) => {
        return response.json();
       })
      .then(result => {
        console.log("sellers actions ", result);
        dispatch({
            type: GET_SELLERS,
            payload: result.sellers
          });
      });
}

export const typeExisting = () => {
    return (dispatch) => {
        const sellerId = localStorage.getItem("sellerId")
        const storeId = localStorage.getItem("storeId")
        history.push('/accounts/sellers/' + sellerId + "/stores/" + storeId + "/product/new/exists");
    }   
}

export const typeNew = () => {
    return (dispatch) => {
        const sellerId = localStorage.getItem("sellerId")
        const storeId = localStorage.getItem("storeId")
        history.push('/accounts/sellers/' + sellerId + "/stores/" + storeId + "/product/new/new");
    }   
}
