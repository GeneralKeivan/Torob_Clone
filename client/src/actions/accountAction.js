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


//validate username and password
//check user type and send to correct location
//might need some fixing in the end to work correctly
export const validateAccount = (account) => {
    console.log("validate account ", account);
    var correct = false;
    return (dispatch) => {
        return fetch(API_URL + 'accounts/')
            .then((res) => {
                console.log("response ", res);
                for(var i = 0; i < res.accounts.length; i++){
                    if(account.userName == res.accounts[i].userName || account.email == res.accounts[i].email){
                        if(account.password == res.accounts[i].password){
                            switch(res.accounts[i].type){
                                case "Admin":
                                    history.push('/accounts/admin/' + res.accounts[i]._id)
                                    i = res.accounts.length + 1;
                                    break;
                                case "Customer":
                                    history.push('/accounts/customers/' + res.accounts[i]._id + '/product')
                                    i = res.accounts.length + 1;
                                    break;
                                case "Seller":
                                    history.push('/accounts/sellers/' + res.accounts[i]._id)
                                    i = res.accounts.length + 1;
                                    break;
                            }
                            correct = true;
                        }
                    }
                }
                if(!correct){
                    history.push('/accounts/log-in');
                }
            })
            .then(result => {
                console.log("account actions ", result);
                dispatch({
                    type: VALIDATE_ACCOUNT,
                    payload: result.accounts
                });
            });
    }
    
}

//add the account
export const addAccount = (account) => {
    console.log("account ", account);
    return (dispatch) => {
        return axios.post(API_URL+'accounts/', account)
            .then((res) => {
                console.log("response ", res);
                dispatch({ type: ADD_ACCOUNT, payload : res.data.result })
                history.push(`/accounts/log-in`)

            });
    }   
}