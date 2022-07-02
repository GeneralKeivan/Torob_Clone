import {GET_CUSTOMER, GET_CUSTOMERS } from '../constants/ActionTypes';
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

export const updateCustomerFavorite = (customer) => {
    console.log("update customer ", customer);
    

    return (dispatch) => {
        return axios.put(API_URL + 'customers/', customer)
            .then((res) => {
                console.log("response ", res);
            });
    }
}

export const updateCustomerRecent = (product, customer) => {
    console.log("update customer ", customer);
    customer.recents.push({name:product.name, id:product.id});

    return (dispatch) => {
        return axios.put(API_URL + 'customers/', customer)
            .then((res) => {
                console.log("response ", res);
            });
    }
}

export const getCustomers = () => dispatch => {
    return fetch(API_URL + 'customers')
    .then((response) => {
        return response.json();
       })
      .then(result => {
        console.log("customer actions ", result);
        dispatch({
            type: GET_CUSTOMERS,
            payload: result.customers
          });
      });
}
