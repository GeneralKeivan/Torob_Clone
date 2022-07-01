import React from 'react';
import { getCustomers } from '../../actions/customerAction';
import { getSellers } from '../../actions/sellerAction'
import {connect } from 'react-redux';
import PropTypes from 'prop-types'
import history from '../../history'

var customers, sellers;
class LogIn extends React.Component {
  constructor(props){
      super(props);
      const location = history.location
      this.state = location.state;
      this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentDidMount() {
    this.props.getCustomers();
    this.props.getSellers();
  }

  static propTypes = {
    validateAccount: PropTypes.func.isRequired,
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
    var password = myForm["password"].value;


  var account = {
    userName: "",
    password: "",
    email: ""
  }
    account.email = userName;
    account.userName = userName;
    account.password = password;

    this.validateAccount(account);
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
          <h2>Log In</h2>
          <div></div>
          {
            <form name="myForm" onSubmit={this.handleUpdate}>
                <div className="form-group">
                    <label htmlFor="username">Enter Username or Email</label>
                    <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
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
                Log In
              </button>
            </form>

          }
          
      </div>
    );
  }

  validateAccount(account){
    console.log("validate account ", account);
    console.log("customers: ", customers)
    console.log("sellers: ", sellers)
  
    var c = customers.customers;
    var s = sellers.sellers;
    var correct = "non";
  
    for(var i = 0; i < c.length; i++){
        if(account.userName === c[i].userName || account.email === c[i].email){
            if(account.password === c[i].password){
                history.push('/accounts/customer/' + c[i]._id)
                i = c.length + 1;
                correct = "customer";
            }
        }
    }
  
    for(var i = 0; i < s.length; i++){
        if(account.userName === s[i].userName || account.email === s[i].email){
            if(account.password === s[i].password){
                history.push('/accounts/seller/' + s[i]._id)
                i = s + 1;
                correct = "seller";
            }
        }
    }
  
    if(correct === 'customer'){
        history.push('/accounts/customers');
    }
    else if(correct === 'seller'){
        history.push('/accounts/sellers');
    }
    else{
        window.alert("This account doesn't exist")
        //history.push('/accounts/log-in');
    }
  }

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
    }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(LogIn);