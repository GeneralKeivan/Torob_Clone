import {GET_SELLER, ADD_PRODUCT, GET_PRODUCTS} from '../constants/ActionTypes'
import axios from "axios";
import history from '../history'
import { resetWarningCache } from 'prop-types';

const API_URL = 'http://localhost:3001/api/';

//Need to change this when visuals are up

export const updateSeller = (seller) => {
    console.log("udpate seller ", seller);
    return (dispatch) => {
        return axios.put(API_URL + 'sellers/', seller)
            .then((res) => {
                console.log("response ", res);
                
                history.push(`/accounts/sellers`)
            });
    }
}

export const addStore = (seller) => {
    return (dispatch) => {
        return axios.put(API_URL + 'sellers/', seller)
            .then((res) => {
                console.log("response ", res);
                history.push('/accounts/sellers/' + seller._id + '/stores')
            });
    }
}

export const getSeller = (sellerId) => {
    return (dispatch) => {
        var sellers = fetch(API_URL + 'sellers/')
        for(var i = 0; i < sellers.length; i++){
            if(sellers[i]._id == sellerId){
                return(sellers[i]);
            }
        }
    }
}

export const getProducts = () => dispatch => {
    return fetch(API_URL + 'products/')
    .then((response) => {
        return response.json();
       })
      .then(result => {
        console.log("seller actions ", result);
        dispatch({
            type: GET_PRODUCTS,
            payload: result.products
          });
      });
}

export const createProduct = (product, sellerId, storeId) => {
    console.log("product ", product);
        return (dispatch) => {
            return axios.post(API_URL + 'products/', product)
                .then((res) => {
                    console.log("response ", res);
                    dispatch({ type: ADD_PRODUCT, payload : res.data.result })
                    history.push('accounts/sellers/' + sellerId + '/stores/' + storeId)

                });
        }
}

