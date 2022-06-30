import React from 'react';
import { updateSeller } from '../../actions/sellerAction';
import {connect } from 'react-redux';
import history from '../../history'
const API_URL = 'http://localhost:3001/api/';

var sellerId = window.location.href.split('/')[6];
var customerId = window.location.href.split('/')[4];
class CustomerReview extends React.Component {
    constructor(props){
        super(props);

        this.handleUpdate = this.handleUpdate.bind(this);
    }


handleUpdate(event) {
    event.preventDefault();
    console.log("this.state ", this.state)
    console.log("this.props ", this.props)

    var review = document.getElementById("review").value;

    var sellers = fetch(API_URL + 'sellers');
    var seller;

    for(var i = 0; i < sellers.length; i++){
        if(sellers[i]._id === sellerId){
            seller = sellers[i];
            i = seller.length + 1;
        }
    }

    var customers = fetch(API_URL + 'customers');
    var customer;

    for(var i = 0; i < customerss.length; i++){
        if(customers[i]._id === customerId){
            customer = customers[i];
            i = customer.length + 1;
        }
    }

    review = customer.userName + " : " + review;

    seller.reviews.push(review);

    this.props.updateSeller(seller);
}

//MAKE IT HAVE TWO OPTIONS?
  render(){

    return(
        <div className="customerReview">
            <h2>Customer Review</h2>
                <div>
                </div>
            {
                <form onSubmit={this.handleUpdate}>
                <div className="form-group">
                  <label htmlFor="review">Type your review here</label>
                    <textarea
                        id="review"
                        className="review"
                        placeholder="Your Review..."
                    />
                </div>
                <button type="submit" className="btn btn-success btn-lg">
                  Send
                </button>
               </form>

              }
            
        </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
      //customers: state.customers
    }
  }
  const mapDispatchToProps = (dispatch) => {
    return {
        //updateSeller : seller => dispatch(updateSeller(seller))
    }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(CustomerReview);