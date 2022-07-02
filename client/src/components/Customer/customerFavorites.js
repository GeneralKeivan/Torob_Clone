
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types'
import {connect } from 'react-redux';
import history from "../../history"
import { getCustomers } from '../../actions/customerAction';

const url = window.location.href.split('/');
const customerId = localStorage.getItem("customerId");
var first;
var customers;
var customer;
var first;
var cont = false;
class CustomerFavorites extends Component {
    constructor(props){
        super(props);
        const location = history.location
        this.state = location.state;
    }

    componentDidMount() {
        this.props.getCustomers();
        console.log("props : ", this.props)
        first = true;
    }
    
    static propTypes = {
        getCustomers: PropTypes.func.isRequired,
        customers: PropTypes.object.isRequired
    }

    viewProduct(favorite){
        console.log("favorite ", favorite)
        localStorage.setItem("productId", favorite.id)
        history.push("/accounts/customers/" + customerId + "/product/" + favorite.id)
    }

    render() {    
        customers = this.props.customers.customers;
        if(first){
            console.log("id : ", customerId)
            for(var i = 0; i < customers.length; i++){
                if(customers[i]._id === customerId){
                    customer = customers[i];
                    break;
                }
            }
            first = false;
            cont = true;
            console.log("customer ", customer)
        }
        if(cont){
            var favorites = customer.favorites;
            const  productList = (
                <div>
                    <div className="col-lg-12 table-responsive">
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th scope="col">Product Name</th>
                                <th scope="col">Go to product page</th>
                            </tr>
                            </thead>
                            <tbody>
                
                            {
                            favorites.map((favorite,index) =>
                                <tr key={index}>
                                <td>{favorite.name}</td>
                                <td> <i className="fa fa-edit btn btn-info" onClick={() => this.viewProduct(favorite)}> </i></td>   &nbsp;
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
                <div className="col-lg-12 text-center">
                {
                    favorites.length === 0 ? 'You have not favorited any products' :productList
                }
                </div>
            </div>
            );
        }
        else{
            return (
                <div></div>
            );
        }
    }
}

const mapStateToProps = (state) => ({
    customers: state.customers,
})

const mapDispatchToProps = (dispatch) => ({
    getCustomers: () => dispatch(getCustomers()),
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomerFavorites);