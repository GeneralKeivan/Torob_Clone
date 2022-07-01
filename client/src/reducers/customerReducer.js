import {GET_CUSTOMER, ADD_CUSTOMER, GET_CUSTOMERS} from '../constants/ActionTypes'
const initialState = {
    customers : [],
    customer : {}
}
const customerReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CUSTOMER:
            return {
                ...state,
                customers : action.payload,
                customer : {
                    isSingleCustomerView : false
                }
            }
        case GET_CUSTOMERS:
            return {
                ...state,
                customers : action.payload,
                customer : {
                    isSingleSellerView : false
                }
            }
        case ADD_CUSTOMER:
            return {
                ...state,
                customers : [...state.customers,...action.payload]
            }
        default: // need this for default case
            return state 
    }
}

export default customerReducer;

//Fill the reducers after getting the actions