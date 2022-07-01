import {GET_ACCOUNTS, VALIDATE_ACCOUNT, ADD_ACCOUNT} from '../constants/ActionTypes'
import axios from "axios";
import history from '../history'
import { resetWarningCache } from 'prop-types';

const API_URL = 'http://localhost:3001/api/';

export const getAccounts = () => dispatch => {
    return fetch(API_URL + 'accounts/')
    .then((response) => {
        return response.json();
    })
    .then(result => {
        console.log("account actions ", result);
        dispatch({
            type: GET_ACCOUNTS,
            payload: result.accounts
        });
    });
}


//add the account
export const addCustomer = (account) => {
    console.log("account ", account);
    return (dispatch) => {
        return axios.post(API_URL+'customers/', account)
            .then((res) => {
                console.log("response ", res);
                dispatch({ type: ADD_ACCOUNT, payload : res.data.result })
                history.push(`/accounts/log-in`)

            });
    }   
}

export const addSeller = (account) => {
    console.log("account ", account);
    return (dispatch) => {
        return axios.post(API_URL+'sellers/', account)
            .then((res) => {
                console.log("response ", res);
                dispatch({ type: ADD_ACCOUNT, payload : res.data.result })
                history.push(`/accounts/log-in`)

            });
    }   
}

export const typeSeller = () => {
    return (dispatch) => {
        history.push('/accounts/sign-up/seller');
    }   
}

export const typeCustomer = () => {
    return (dispatch) => {
        history.push('/accounts/sign-up/customer');
    }   
}