import {ADD_PRODUCT, GET_PRODUCTS, GET_PRODUCT} from '../constants/ActionTypes'
import axios from "axios";
import history from '../history'
import { resetWarningCache } from 'prop-types';
const API_URL = 'http://localhost:3001/api/';

export const getProducts = () => dispatch => {
    return fetch(API_URL + 'products')
    .then((response) => {
        return response.json();
       })
      .then(result => {
        console.log("products actions ", result);
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

export const updateProduct = (product, sellerId, storeId) => {
    console.log("udpate product ", product);
    return (dispatch) => {
        return axios.put(API_URL + 'products/', product)
            .then((res) => {
                console.log("response ", res);
                
                history.push(`/accounts/sellers/` + sellerId + "/stores/" + storeId)
            });
    }
}

export const getProduct = (searchValue) => dispatch => {
    
    var allProducts = fetch(API_URL + 'products');
    var products = [];

    for(var i = 0; i < allProducts.length; i++){
        if(allProducts[i].name.includes(searchValue) || allProducts[i].model.includes(searchValue) || allProducts[i].brand.includes(searchValue)){
            products.push(allProducts[i]);
        }
    }

    return products
    .then((response) => {
        return response.json();
    })
    .then(result => {
        console.log("customer actions ", result);
        dispatch({
            type: GET_PRODUCT,
            payload: result.students
        });
    });
}

