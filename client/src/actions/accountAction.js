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

export const validateAccount = (account) => {
    console.log("validate account ", account);
    return (dispatch) => {
        /*return fetch(API_URL + 'accounts/')
            .then((res) => {
                console.log("response ", res);
                for(var i = 0; i < res.accounts.length; i++){
                    if(account.userName == res.accounts[i].userName || account.email == res.accounts[i].email){
                        if(account.password == res.accounts[i].password){
                            switch(res.accounts[i].type){
                                case "Admin":
                                    history.push('/accounts/admins/' + res.accounts[i]._id)
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
            });*/
        var c = fetch(API_URL + '/customers');
        var s = fetch(API_URL + '/sellers');
        var a = fetch(API_URL + '/admins');
        var correct = "non";

        for(var i = 0; i < a.admins.length; i++){
            if(account.userName == a.admins[i].userName || account.email == a.admins[i].email){
                if(account.password == a.admins[i].password){
                    history.push('/accounts/admin/' + a.admins[i]._id)
                    i = a.admins.length + 1;
                    correct = "admin";
                }
            }
        }

        for(var i = 0; i < c.customers.length; i++){
            if(account.userName == c.customers[i].userName || account.email == c.customers[i].email){
                if(account.password == c.customers[i].password){
                    history.push('/accounts/customer/' + c.customers[i]._id)
                    i = c.customers.length + 1;
                    correct = "customer";
                }
            }
        }

        for(var i = 0; i < a.admins.length; i++){
            if(account.userName == s.sellers[i].userName || account.email == s.sellers[i].email){
                if(account.password == s.sellers[i].password){
                    history.push('/accounts/seller/' + s.sellers[i]._id)
                    i = s.sellers + 1;
                    correct = "seller";
                }
            }
        }

        if(correct == "admin"){
            history.push('/accounts/admins');
            return(fetch(API_URL + '/admins'))
            .then(result => {
                console.log("account actions ", result);
                dispatch({
                    type: VALIDATE_ACCOUNT,
                    payload: result.accounts
                });
            });
        }
        else if(correct == 'customer'){
            history.push('/accounts/customers');
            return(fetch(API_URL + '/customers'))
            .then(result => {
                console.log("account actions ", result);
                dispatch({
                    type: VALIDATE_ACCOUNT,
                    payload: result.accounts
                });
            });
        }
        else if(correct == 'seller'){
            history.push('/accounts/sellers');
            return(fetch(API_URL + '/sellers'))
            .then(result => {
                console.log("account actions ", result);
                dispatch({
                    type: VALIDATE_ACCOUNT,
                    payload: result.accounts
                });
            });
        }
        else{
            history.push('/accounts/log-in');
        }


    }
    
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