
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
class CustomerRecents extends Component {
    constructor(props){
        super(props);
        const location = history.location
        this.state = location.state;
    }

    componentDidMount() {
        this.props.getCustomers();
        console.log("props : ", this.props)
        console.log("broken url: ", url)
        console.log("id: ", customerId)
        first = true;
    }
    
    static propTypes = {
        getCustomers: PropTypes.func.isRequired,
        customers: PropTypes.object.isRequired
    }

    viewProduct(recent){

        history.push("accounts/customers/" + customerId + "/products/" + recent._id)
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
            var recents = customer.recents;
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
                            recents.map((recent,index) =>
                                <tr key={index}>
                                <td>{recents.name}</td>
                                <td> <i className="fa fa-edit btn btn-info" onClick={() => this.viewProduct(recent)}> </i></td>   &nbsp;
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
                    recents.length === 0 ? 'There are no recent products' :productList
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

export default connect(mapStateToProps, mapDispatchToProps)(CustomerRecents);