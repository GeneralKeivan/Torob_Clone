import React from 'react';
import { addSeller } from '../../actions/accountAction';
import {connect } from 'react-redux';
import history from '../../history'
import axios from "axios"
import { string } from 'prop-types';

//This code is for updating student id

class SellerSignUp extends React.Component {
  constructor(props){
      super(props);
      const location = history.location
      this.state = location.state;
      this.handleUpdate = this.handleUpdate.bind(this);
  }

  static propTypes = {
    addSeller: PropTypes.func.isRequired,
  }

  handleChangeFor = (propertyName) => (event) => {
    const { account } = this.state;
    const signUpDetails = {
      ...account,
      [propertyName]: event.target.value
    };
    this.setState({ account: signUpDetails });
  }

  handleUpdate(event) {
    event.preventDefault();
    console.log("this.state ", this.state)
    console.log("this.props ", this.props)

    var userName = document.forms["myForm"]["userName"].value;
    var email = document.forms["myForm"]["email"].value;
    var password = document.forms["myForm"]["password"].value;
    var phone = documnet.forms["myForm"]["phone"].value;


    var emailCheck = validateEmail(email);
    var userCheck = validateUser(userName, email);
    var passwordCheck = validatePassword(password);
    var phoneCheck = validatePhone(phone);

    if(emailCheck && userCheck && passwordCheck && phoneCheck){
        this.state.account.userName = userName;
        this.state.account.email = email;
        this.state.account.password = password;
        this.state.account.type = type;

        this.props.addSeller(this.state.account);
    }
  }


  render(){

    return(
      <div className="logInDetail">
          <h2>Sign Up</h2>
          <div></div>
          {
            <form onSubmit={this.handleUpdate}>
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
                    <input type="checkbox" onclick="showPassword()">Show Password</input>
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

function showPassword() {
    var x = document.getElementById("password");
    if (x.type === "password") {
        x.type = "text";    
    } else {
        x.type = "password";
    }
}

//this is honestly a horrible way to do this and probably leads to lots of leaks
//but at the moment i cant think of another way
const validateUser = (userName, email) => {
    const API_URL = 'http://localhost:3001/api/';
    a = fetch(API_URL + 'customers/')
    b = fetch(API_URL + 'sellers/')
    c = fetch(API_URL + 'admins/')
    console.log("a = ", a);
    console.log("b = ", b);
    console.log("c = ", c);
    for(var i = 0; i < a.accounts.length; i++){
        if(email == a.customers[i].email || email == b.sellers[i].email || email == c.admins[i].email){
            window.alert("A user with the same Email already exists");
            return false;
        }
        if(userName == a.customers[i].userName || userName == b.sellers[i].userName || userName == a.admins[i].userName){
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
    if(isNaN(parseInt(phone)) && (phone.length != 8 || phone.length != 11)){
      window.alert("Phone Number is invalid")
      return false;
    }
    return true;
}

const validatePassword = (password) => {
    
    if((String(password).length < 8)){
        window.alert("Password needs to have atleast 8 characters");
        return false;
    }

    upper = String(password).toLowerCase();
    if(String(password) == upper){
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
      accounts: state.accounts
    }
  }
  const mapDispatchToProps = (dispatch) => {
    return {
        addSeller: (account) => dispatch(addSeller(account)),
    }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(SellerSignUp);