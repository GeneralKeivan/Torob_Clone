import React from 'react';
import {connect } from 'react-redux';
import { typeCustomer, typeSeller } from '../../actions/accountAction';
import history from '../../history'
import axios from "axios"
import { string } from 'prop-types';

//This code is for updating student id

class AccountType extends React.Component {
  constructor(props){
      super(props);
      const location = history.location
      this.state = location.state;
      this.handleUpdate = this.handleUpdate.bind(this);
  }


  handleUpdate(event) {
    event.preventDefault();
    console.log("this.state ", this.state)
    console.log("this.props ", this.props)

    var x = document.getElementById("customer");
    if(x.checked){
        this.props.typeCustomer();
    }
    else{
        this.props.typeSeller();
    }
  }

  render(){

    return(
      <div className="logInDetail">
          <h2>Choose Account Type</h2>
          <div></div>
          {
            <form onSubmit={this.handleUpdate}>

                <input type="radio" id="customer" className='customer' name="mode" value="Customer"/>
                <label for="customer">Customer</label><br/>
                <input type="radio" id="seller" name="mode" value="Seller"/>
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

const mapStateToProps = (state) => {
    return {
        accounts: state.accounts
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        typeSeller: () => dispatch(typeSeller()),
        typeCustomer: () => dispatch(typeCustomer()),
    }
}
  
export default connect(mapStateToProps,mapDispatchToProps)(AccountType);