import {GET_PRODUCT } from '../constants/ActionTypes';
import axios from "axios";
import history from '../history'
const API_URL = 'http://localhost:3001/api/';

export const getProduct = (searchValue) => dispach => {
    
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
