// /accounts/sellers/:id/stores

import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types'
import {connect } from 'react-redux';
import history from "../../history"
import { getProducts } from '../../actions/productAction';
import { updateCustomerFavorite, updateCustomerRecent } from '../../actions/customerAction';


const customerId = localStorage.getItem("customerId");
const productId = localStorage.getItem("productId");
var products, product;
var first;
var cont = false;
class CustomerProduct extends Component {
    constructor(props){
        super(props);
        const location = history.location
        this.state = location.state;
    }

    componentDidMount() {
        this.props.getProducts();
        console.log("props : ", this.props)
        first = true;
        this.props.updateCustomerRecent(product, customerId);
    }

    static propTypes = {
        updateCustomerFavorite: PropTypes.func.isRequired,
        updateCustomerRecent: PropTypes.func.isRequired
    }
    favoriteProduct(){
        this.props.updateCustomerFavorite(product, customerId)
    }

    reviewStore(sellerId){
        localStorage.setItem("sellerId", sellerId)
        history.push('/accounts/customers/' + customerId + '/sellers/' + sellerId)
    }


    //Might need to change the data in <td>
    render() {    

        if(first){
            products = this.props.products;
            
            for(var i = 0; i < products.length; i++){
                if(products[i]._id === productId){
                    product = products[i];
                    break;
                }
            }
            first = false;
            cont = true;
            console.log("product ", product)
        }
        else{
            if(cont){
                const  productList = (
                    <div>
                        <div>
                            {
                            products.map((product,index) =>
                                <div>
                                    <div>Name : {product.name}</div>
                                    <div>Size : {product.size}</div>
                                    <div>Weight : {product.weight}</div>
                                    <div>Battery Power : {product.battery}</div>
                                    <div>Screen Type : {product.screen}</div>
                                </div>
                            )
                            }
                            <i className="fa fa-edit btn btn-info" onClick={() => this.favoriteProduct()}>Favorite</i>
                        </div>
                        <div className="col-lg-12 table-responsive">
                            <table className="table table-striped">
                                <thead>
                                <tr>
                                    <th scope="col">Price</th>
                                    <th scope="col">Seller</th>
                                    <th scope="col">Link</th>
                                    <th scope="col">Review</th>
                                </tr>
                                </thead>
                                <tbody>
                    
                                {
                                products.map((product,index) =>
                                    <tr key={index}>
                                    <td>{product.price}</td>
                                    <td>{product.seller.name}</td>
                                    <td>{product.link}</td>
                                    <td> <i className="fa fa-edit btn btn-info" onClick={() => this.reviewStore(product.seller._id)}>Review</i></td>   &nbsp;
                                    </tr>
                                )
                                }
                            
                                </tbody>
                            </table>
                        </div>
                    </div>
            )


            return (
            <div className="row">
                <div className="col-lg-12">

                </div>
                <div className="col-lg-12 text-center">
                {
                products.length === 0 ? 'No Products' :productList
                }
                </div>
            </div>
            );
        }
        else{
            return(
                <div></div>
            );
        }
        }
    }

}

const mapStateToProps = (state) => ({
    products: state.product,
})

const mapDispatchToProps = (dispatch) => ({
    //getSeller: (SellerId) => dispatch(getSeller(sellerId)),
    getProducts: () => dispatch(getProducts()),
    updateCustomerFavorite : (product, customerId) => dispatch(updateCustomerFavorite(product, customerId)),
    updateCustomerRecent : (product, customerId) => dispatch(updateCustomerRecent(product, customerId))
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomerProduct);
