import {ADD_PRODUCT, GET_PRODUCTS, GET_PRODUCT} from '../constants/ActionTypes'
const initialState = {
    products : [],
    product : {}
}
const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCT:
            return {
                ...state,
                products : action.payload,
                product : {
                    isSingleProductView : false
                }
            }
        case GET_PRODUCTS:
            return {
                ...state,
                products : action.payload,
                product : {
                    isSingleProductView : false
                }
            }
        case ADD_PRODUCT:
            return {
                ...state,
                products : [...state.products,...action.payload]
        }
    }
}

export default productReducer;

//Fill the reducers after getting the actions