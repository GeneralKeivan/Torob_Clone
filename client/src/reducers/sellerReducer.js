import {GET_SELLERS} from '../constants/ActionTypes'
const initialState = {
    sellers : [],
    seller : {}
}
const sellerReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SELLERS:
            return {
                ...state,
                sellers : action.payload,
                seller : {
                    isSingleSellerView : false
                }
            }
    }
}

export default sellerReducer;

//Fill the reducers after getting the actions