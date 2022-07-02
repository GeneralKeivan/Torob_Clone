// /accounts/sellers/:id/stores

import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types'
import {connect } from 'react-redux';
import history from "../../history"
import { getProducts } from '../../actions/productAction';
import { updateCustomerFavorite, updateCustomerRecent, getCustomers } from '../../actions/customerAction';


var customerId = localStorage.getItem("customerId");
var productId = localStorage.getItem("productId");
var customers, customer;
var products, product;
var first;
var cont = false;
var customerFound = false;
class CustomerProduct extends Component {
    constructor(props){
        super(props);
        const location = history.location
        this.state = location.state;
    }

    componentDidMount() {
        this.props.getProducts();
        this.props.getCustomers();
        console.log("props : ", this.props)
        first = true;

    }

    static propTypes = {
        updateCustomerFavorite: PropTypes.func.isRequired,
        updateCustomerRecent: PropTypes.func.isRequired,
        getCustomers: PropTypes.func.isRequired,
        getProducts: PropTypes.func.isRequired,
        customers: PropTypes.object.isRequired,
        products: PropTypes.object.isRequired,
    }
    favoriteProduct(){

        customerId = localStorage.getItem("customerId")
        for(var i = 0; i < customers.length; i++){
            if(customers[i]._id === customerId){
                customer = customers[i];
                break;
            }
        }

        customer.favorites.push({name: product.name, id:product._id});

        console.log("customer favorite ", customer)
        this.props.updateCustomerFavorite(customer)
    }

    reviewStore(seller){
        console.log("products ", products)
        console.log("seller ", seller)
        localStorage.setItem("sellerId", seller.id)
        customerId = localStorage.getItem("customerId")
        history.push('/accounts/customers/' + customerId + '/sellers/' + seller.id + "/review")
    }


    //Might need to change the data in <td>
    render() {   
        products = this.props.products.products;
        //customers = this.props.customers.customers;

        if(first){
            first = false;
            cont = true;

        }
        else{
            for(var i = 0; i < 10; i++){
                products = this.props.products.products;
                customers = this.props.customers.customers;


                console.log("customers ", customers)
                console.log("products ", products)
            }
            if(cont){

                productId = localStorage.getItem("productId");
                for(var i = 0; i < products.length; i++){
                    if(products[i]._id === productId){
                        product = products[i];
                        break;
                    }
                }
                console.log("productId ", productId)
                const  productList = (
                    <div>
                        <div>
                            
                            <div>
                                <div>Name : {product.name}</div>
                                <div>Size : {product.size}</div>
                                <div>Weight : {product.weight}</div>
                                <div>Battery Power : {product.battery}</div>
                                <div>Screen Type : {product.screen}</div>
                            </div>
                            
                            <i className="fa fa-edit btn btn-info" onClick={() => this.favoriteProduct()}>Favorite</i>
                        </div>
                        <div className="col-lg-12 table-responsive">
                            <table className="table table-striped">
                                <thead>
                                <tr>
                                    <th scope="col">Price</th>
                                    <th scope="col">Seller</th>
                                    <th scope="col">Seller Phone</th>
                                    <th scope="col">Link</th>
                                    <th scope="col">Review</th>
                                </tr>
                                </thead>
                                <tbody>
                    
                                {
                                product.sellers.map((seller,index) =>
                                
                                    <tr key={index}>
                                    <td>{seller.price}</td>
                                    <td>{seller.name}</td>
                                    <td>{seller.phone}</td>
                                    <td><i className="fa fa-edit btn btn-info" onClick={() => {var url = "http://" + seller.link; window.open(url)}}>Go to page</i></td>
                                    <td> <i className="fa fa-edit btn btn-info" onClick={() => this.reviewStore(seller)}>Review</i></td>   &nbsp;
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
        return(
            <div></div>
        );
    }

}

const mapStateToProps = (state) => ({
    products: state.products,
    customers: state.customers,
})

const mapDispatchToProps = (dispatch) => ({
    //getSeller: (SellerId) => dispatch(getSeller(sellerId)),
    getCustomers: () => dispatch(getCustomers()),
    getProducts: () => dispatch(getProducts()),
    updateCustomerFavorite : (product, customer) => dispatch(updateCustomerFavorite(product, customer)),
    updateCustomerRecent : (product, customer) => dispatch(updateCustomerRecent(product, customer))
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomerProduct);
