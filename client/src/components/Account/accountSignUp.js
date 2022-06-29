import React from 'react';
import { addAccounts } from '../../actions/accountAction';
import {connect } from 'react-redux';
import history from '../../history'
import axios from "axios"
import { string } from 'prop-types';

//This code is for updating student id

class SignUp extends React.Component {
  constructor(props){
      super(props);
      const location = history.location
      this.state = location.state;
      this.handleUpdate = this.handleUpdate.bind(this);
  }

  static propTypes = {
    addAccount: PropTypes.func.isRequired,
  }

  handleChangeFor = (propertyName) => (event) => {
    const { account } = this.state;
    const signUpDetails = {
      ...account,
      [propertyName]: event.target.value
    };
    this.setState({ account: logInDetails });
  }

  handleUpdate(event) {
    event.preventDefault();
    console.log("this.state ", this.state)
    console.log("this.props ", this.props)

    var userName = document.forms["myForm"]["userName"].value;
    var email = document.forms["myForm"]["email"].value;
    var password = document.forms["myForm"]["password"].value;


    var type;
    if(document.forms["myForm"]["seller"].checked){
        type = "seller";
    }
    else{
        type = "customer";
    }

    var emailCheck = validateEmail(email);
    var userCheck = validateUser(userName, email);
    var passwordCheck = validatePassword(password);

    if(emailCheck && userCheck && passwordCheck){
        this.state.account.userName = userName;
        this.state.account.email = email;
        this.state.account.password = password;
        this.state.account.type = type;

        this.props.addAccount(this.state.account);
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

                <input type="radio" id="customer" className='customer' name="mode" value="HTML"/>
                <label for="customer">Customer</label><br/>
                <input type="radio" id="seller" classname='customer' name="mode" value="CSS"/>
                <label for="seller">Seller</label><br/>

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
    a = fetch(API_URL + 'accounts/')
    console.log("a = ", a);
    for(var i = 0; i < a.accounts.length; i++){
        if(email == a.accounts[i].email){
            window.alert("A user with the same Email already exists");
            return false;
        }
        if(userName == a.accounts[i].userName){
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
        checkDuplicateAccounts: (account) => dispatch(addAccount(account)),
    }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(SignUp);