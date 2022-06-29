import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types'
import {connect } from 'react-redux';
//import {getStudents, deleteStudent} from '../../actions/studentAction'
import './account.css';
import history from "../../history"

//This code is for the main screen that shows the log in / sign up buttons

class Accounts extends Component{
    constructor(props){
        super(props);
    }

    render() {

        return (
            <div>
                <Link to={'/accounts/log-in'} ><button className="btn btn-primary pull-left" >Log In</button></Link>
                <Link to={'/accounts/sign-up'} ><button className="btn btn-success pull-right" >Sign Up</button></Link>
            </div>
        );
    }
}

export default (Accounts);