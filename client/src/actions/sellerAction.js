import {GET_SELLERS} from '../constants/ActionTypes'
import axios from "axios";
import history from '../history'
import { resetWarningCache } from 'prop-types';

const API_URL = 'http://localhost:3001/api/';

//Need to change this when visuals are up

export const updateSeller = (seller) => {
    console.log("udpate seller ", seller);
    return (dispatch) => {
        return axios.put(API_URL + 'accounts/', seller)
            .then((res) => {
                console.log("response ", res);
                
                history.push(`/accounts/sellers`)
            });
    }
}

export const addStore = (seller) => {
    return (dispatch) => {
        return axios.put(API_URL + 'accounts/', seller)
            .then((res) => {
                console.log("response ", res);
                history.push('/accounts/sellers/' + seller._id + '/stores')
            });
    }
}