import React from 'react';
import { getAccounts, validateAccount } from '../../actions/accountAction';
import {connect } from 'react-redux';
import PropTypes from 'prop-types'
import history from '../../history'

//This code is for updating student id

class LogIn extends React.Component {
  constructor(props){
      super(props);
      const location = history.location
      this.state = location.state;
      this.handleUpdate = this.handleUpdate.bind(this);
  }

  static propTypes = {
    validateAccount: PropTypes.func.isRequired,
    account: PropTypes.func.isRequired
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

    this.props.validateAccount(account);
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
}



const mapStateToProps = (state) => {
    return {
      //account: state.accounts
    }
  }
  const mapDispatchToProps = (dispatch) => {
    return {
        validateAccount: (account) => dispatch(validateAccount(account)),
    }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(LogIn);