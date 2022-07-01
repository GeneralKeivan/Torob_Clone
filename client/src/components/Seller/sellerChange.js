import React from 'react';
import { updateSeller } from '../../actions/sellerAction';
import {connect } from 'react-redux';
import history from '../../history'

class SellerDetails extends React.Component {
    constructor(props){
        super(props);
        const location = history.location
        this.state = location.state;
        this.handleUpdate = this.handleUpdate.bind(this);
    }

handleChangeFor = (propertyName) => (event) => {
    const { seller } = this.state;
    const sellerDetails = {
      ...seller,
      [propertyName]: event.target.value
    };
    this.setState({ seller: sellerDetails });
  }

  handleUpdate(event) {
    event.preventDefault();
    console.log("this.state ", this.state)
    console.log("this.props ", this.props)

    var myForm = document.forms.myForm;
    var userName = myForm.userName.value;
    var email = myForm.email.value;
    var password = myForm.password.value;
    var phone = myForm.phone.value;


    var emailCheck = validateEmail(email);
    var userCheck = validateUser(userName, email);
    var passwordCheck = validatePassword(password);
    var phoneCheck = validatePhone(phone);

    if((emailCheck) && (userCheck) && passwordCheck && phoneCheck){
        this.state.account.userName = userName;
        this.state.account.email = email;
        this.state.account.password = password;
        this.state.account.type = "seller";

        this.props.updateSeller(this.state.seller);
    }


  }

  render(){

    return(
        <div className="sellerDetail">
            <h2>Seller Detail</h2>
                <div>
                </div>
            {
                <form name="myForm" onSubmit={this.handleUpdate}>
                    <div className="form-group">
                        <label htmlFor="userName">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="userName"
                            name="userName"
                            autoComplete="off"
                            value={this.state.seller.Name}
                            />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            className="form-control"
                            id="email"
                            name="email"
                            autoComplete="off"
                            value={this.state.seller.email}
                            />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input
                            type="text"
                            className="form-control"
                            id="phone"
                            name="phone"
                            autoComplete="off"
                            value={this.state.seller.phone}
                            />
                    </div>

                    <button type="submit" className="btn btn-success btn-lg">
                        UPDATE
                    </button>
               </form>

              }
            
        </div>
    );
  }
}

const validateUser = (userName, email) => {

  const API_URL = 'http://localhost:3001/api/';
  var a = fetch(API_URL + 'customers/')
  var b = fetch(API_URL + 'sellers/')
  var c = fetch(API_URL + 'admins/')
  console.log("a = ", a);
  console.log("b = ", b);
  console.log("c = ", c);
  for(var i = 0; i < a.accounts.length; i++){
      if((email == a.customers[i].email || email == b.sellers[i].email || email == c.admins[i].email) && (email !== this.state.sellers.email)){
          window.alert("A user with the same Email already exists");
          return false;
      }
      if((userName == a.customers[i].userName || userName == b.sellers[i].userName || userName == a.admins[i].userName) && (userName == this.state.sellers.userName)){
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
  if(isNaN(parseInt(phone)) && (phone.length !== 8 || phone.length !== 11)){
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

  var upper = String(password).toLowerCase();
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
      sellers: state.sellers
    }
  }
  const mapDispatchToProps = (dispatch) => {
    return {
    updateSeller : seller => dispatch(updateSeller(seller))
    }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(SellerDetails);