import {GET_CUSTOMER } from '../constants/ActionTypes';
import axios from "axios";
import history from '../history'
const API_URL = 'http://localhost:3001/api/';



//Most probably wrong
//CHECK THIS ONE
export const getCustomer = (customerId) => {
    return (dispatch) => {
        return fetch(API_URL + 'customers/')
        .then((response) => {
            for(var i = 0; i < response.length; i++){
                if(response[i]._id === customerId){
                    return(response[i]);
                }
            }
        })
        .then(result => {
            console.log("customer actions ", result);
            dispatch({
                type: GET_CUSTOMER,
                payload: result.customer
            });
        });
    }
}

export const updateCustomerFavorite = (product, customerId) => {
    var allCustomers = fetch(API_URL + 'customers');
    var customer;

    for(var i = 0; i < allCustomers.length; i++){
        if(allCustomers[i]._id === customerId){
            customer = allCustomers[i];
            i = allCustomers.length + 1;
        }
    }

    customer.favorites.push({"name" : product.name, "link" : product.link});
    console.log("update customer ", customer);
    return (dispatch) => {
        return axios.put(API_URL + 'customers/', customer)
            .then((res) => {
                console.log("response ", res);
            });
    }
}

export const updateCustomerRecent = (product, customerId) => {
    var allCustomers = fetch(API_URL + 'customers');
    var customer;

    for(var i = 0; i < allCustomers.length; i++){
        if(allCustomers[i]._id === customerId){
            customer = allCustomers[i];
            i = allCustomers.length + 1;
        }
    }

    customer.recents.push(product.link);
    console.log("update customer ", customer);
    return (dispatch) => {
        return axios.put(API_URL + 'customers/' + customerId, customer)
            .then((res) => {
                console.log("response ", res);
            });
    }
}