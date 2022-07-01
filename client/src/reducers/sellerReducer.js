import {GET_SELLER} from '../constants/ActionTypes'
const initialState = {
    sellers : [],
    seller : {}
}
const sellerReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SELLER:
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