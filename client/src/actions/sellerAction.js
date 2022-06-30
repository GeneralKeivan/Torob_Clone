import {GET_SELLER, GET_SELLER} from '../constants/ActionTypes'
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

