import React from 'react';
import { addSeller } from '../../actions/accountAction';
import { getCustomers } from '../../actions/customerAction';
import { getSellers } from '../../actions/sellerAction'
import {connect } from 'react-redux';
import history from '../../history'
import PropTypes from 'prop-types'
import axios from "axios"
import { string } from 'prop-types';

//This code is for updating student id
var account = {
  userName: "",
  password: "",
  email: "",
  phone: ""
}

var customers, sellers;
class SellerSignUp extends React.Component {
  constructor(props){
      super(props);
      this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentDidMount() {
    this.props.getCustomers();
    this.props.getSellers();
  }

  static propTypes = {
    addSeller: PropTypes.func.isRequired,
    getCustomers: PropTypes.func.isRequired,
    customers: PropTypes.object.isRequired,
    getSellers: PropTypes.func.isRequired,
    sellers: PropTypes.object.isRequired
  }

  handleUpdate(event) {
    event.preventDefault();
    console.log("this.state ", this.state)
    console.log("this.props ", this.props)

    var myForm = document.forms["myForm"];
    var userName = myForm["username"].value;
    var email = myForm["email"].value;
    var password = myForm["password"].value;
    var phone = myForm["phone"].value;


    var emailCheck = validateEmail(email);
    var userCheck = validateUser(userName, email);
    var passwordCheck = validatePassword(password);
    var phoneCheck = validatePhone(phone);


    if(!emailCheck){
      window.alert("Incorrect email format");
    }

    if(emailCheck && userCheck && passwordCheck && phoneCheck){
        account.userName = userName;
        account.email = email;
        account.password = password;
        account.phone = phone;
        account.type = "seller";

        this.props.addSeller(account);
    }
  }


  showPassword() {
    var x = document.getElementById("password");
    if (x.type === "password") {
        x.type = "text";    
    } else {
        x.type = "password";
    }
  }
  
  render(){
    customers = this.props.customers;
    sellers = this.props.sellers;

    return(
      <div className="logInDetail">
          <h2>Sign Up</h2>
          <div></div>
          {
            <form name="myForm" onSubmit={this.handleUpdate}>
                <div className="form-group">
                    <label htmlFor="username">Enter Username</label>
                    <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    autoComplete="off"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Enter Email</label>
                    <input
                    type="text"
                    className="form-control"
                    id="email"
                    name="email"
                    autoComplete="off"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="phone">Enter Phone Number</label>
                    <input
                    type="text"
                    className="form-control"
                    id="phone"
                    name="phone"
                    autoComplete="off"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Enter Password</label>
                    <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    autoComplete="off"
                    />
                    <label htmlFor="showPassword">Show Password</label>
                    <input type="checkbox" name="showPassword" onClick={()=>this.showPassword()}></input>
                </div>

              <button type="submit" className="btn btn-success btn-lg">
                Sign Up
              </button>
            </form>

          }
          
      </div>
    );
  }
}

//this is honestly a horrible way to do this and probably leads to lots of leaks
//but at the moment i cant think of another way
const validateUser = (userName, email) => {
  const API_URL = 'http://localhost:3001/api/';

  var b = sellers.sellers;
  var a = customers.customers;

  console.log("customer = ", customers);
  console.log("sellers = ", sellers);

  for(var i = 0; i < a.length ; i++){
      if(email === a[i].email){
          window.alert("A user with the same Email already exists");
          return false;
      }
      if(userName === a[i].userName){
          window.alert("A user with the same Username already exists");
          return false;
      }
  }

  for(var i = 0; i < b.length ; i++){
    if(email === b[i].email){
        window.alert("A user with the same Email already exists");
        return false;
    }
    if(userName === b[i].userName){
        window.alert("A user with the same Username already exists");
        return false;
    }
  }

  return true;
}

const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const validatePhone = (phone) => {
    if(isNaN(parseInt(phone))){
      window.alert("Phone Number is invalid")
      return false;
    }
    if(phone.length === 11 || phone.length === 8){
      return true;
    }
    window.alert("Phone Number is invalid")
    return false;
}

const validatePassword = (password) => {
    
    if((String(password).length < 8)){
        window.alert("Password needs to have atleast 8 characters");
        return false;
    }

    var upper = String(password).toUpperCase();
    var lower = String(password).toLowerCase();
    if(String(password) === upper || String(password) === lower){
        window.alert("Password needs to have atleast one Uppercase letter and one Lowercase letter");
        return false;
    }

    if(! /[0-9]/.test(String(password))){
        window.alert("Password needs to have atleast one number");
        return false;
    }
    
    return true;
};

const mapStateToProps = (state) => {
    return {
      customers: state.customers,
      sellers: state.sellers
    }
  }
  const mapDispatchToProps = (dispatch) => {
    return {
        getCustomers: () => dispatch(getCustomers()),
        getSellers: () => dispatch(getSellers()),
        addSeller: (account) => dispatch(addSeller(account)),
    }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(SellerSignUp);