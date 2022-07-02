import React from 'react';
import { updateSeller, getSellers } from '../../actions/sellerAction';
import { getCustomers } from '../../actions/customerAction';
import PropTypes from 'prop-types'
import {connect } from 'react-redux';
import history from '../../history'

var sellers, seller;
var customers;
var first;
var cont = false;
const url = window.location.href.split('/');
const id = localStorage.getItem("sellerId");
//localStorage.removeItem("storeId")
class SellerDetails extends React.Component {
    constructor(props){
        super(props);
        const location = history.location
        this.state = location.state;
        this.handleUpdate = this.handleUpdate.bind(this);
    }


  componentDidMount() {
    this.props.getSellers();
    this.props.getCustomers();
    first = true;
    console.log("sellerId ", id)
  }

  static propTypes = {
    updateSeller: PropTypes.func.isRequired,
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
    var userName = myForm["userName"].value;
    var email = myForm["email"].value;
    var phone = myForm["phone"].value;


    var emailCheck = validateEmail(email);
    var userCheck = validateUser(userName, email);
    var phoneCheck = validatePhone(phone);

    if(!emailCheck){
      window.alert("Incorrect email format");
    }

    if((emailCheck) && (userCheck) && phoneCheck){

        var account = {
          userName : "",
          email : "",
          type : "", 
          id : ""
        }
        account.userName = userName;
        account.email = email;
        account.type = "seller";
        account.id = id;



        this.props.updateSeller(account);
    }


  }

  render(){
    if(first){
      console.log("url ", url)
      console.log("id ", id)
      sellers = this.props.sellers.sellers;

      for(var i = 0; i < sellers.length; i++){
        if(sellers[i]._id === id){
          seller = sellers[i];
          break;
        }
      }
      first = false;
      cont = true;
      console.log("seller ", seller)
    }
    if(cont){
      customers = this.props.customers.customers;
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
                              //value={seller.userName}
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
                              //value={seller.email}
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
                              //value={seller.phone}
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
    else{
      return(
        <div></div>
      );
    }
  }
}

const validateUser = (userName, email) => {
  const API_URL = 'http://localhost:3001/api/';

  const b = sellers;
  const a = customers;

  console.log("customers = ", customers);
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
  if(isNaN(parseInt(phone)) && (phone.length !== 8 || phone.length !== 11)){
    window.alert("Phone Number is invalid")
    return false;
  }
  return true;
}

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
      updateSeller : seller => dispatch(updateSeller(seller))
    }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(SellerDetails);