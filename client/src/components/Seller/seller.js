import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types'
import {connect } from 'react-redux';
//import {getSellers} from '../../actions/sellerAction'
import history from "../../history"


const url = window.location.href.split('/');
const id = localStorage.getItem("sellerId");
//localStorage.removeItem("storeId")
class Sellers extends Component {

    constructor(props){
        super(props);
        //this.viewCustomer = this.viewCustomer.bind(this);
    }


    render() {
        return (
            <div>
                <Link to={'/accounts/sellers/' + id + '/change'} ><button className="btn btn-primary pull-left" >Change Details</button></Link>
                <Link to={'/accounts/sellers/' + id +'/reviews'} ><button className="btn btn-success pull-left" >View Reviews</button></Link>
                <Link to={'/accounts/sellers/' + id +'/stores'} ><button className="btn btn-success pull-left" >View Stores</button></Link>
                <Link to={'/accounts/'} ><button className="btn btn-primary pull-left" >Sign Out</button></Link>
            </div>
        );
    }
}


export default (Sellers)