import React from 'react';
import { updateSeller, getSellers } from '../../actions/sellerAction';
import {connect } from 'react-redux';
import history from '../../history'
import { getCustomers } from '../../actions/customerAction';
const API_URL = 'http://localhost:3001/api/';

const url = window.location.href.split('/');
const customerId = url[5];
const sellerId = url[7];
var customers, customer;
var sellers, seller;
var first;
var cont = false;

var radioButtons;
class CustomerReview extends React.Component {
    constructor(props){
      super(props);
      const location = history.location
      this.state = location.state;
      this.handleUpdate = this.handleUpdate.bind(this);
    }

    componentDidMount() {
      this.props.getCustomers();
      this.props.getSellers();
      console.log("props : ", this.props)
      first = true;
    }

  handleUpdate(event) {
      event.preventDefault();
      console.log("this.state ", this.state)
      console.log("this.props ", this.props)

      console.log("customers ", customers)
      console.log("sellers ", sellers)
      var reviewText = document.getElementById("review").value;

      let reviewType;
      for (const radioButton of radioButtons) {
          if (radioButton.checked) {
              reviewType = radioButton.value;
              break;
          }
      }

      seller.reviews.push({name: customer.userName, text: reviewText, type: reviewType});

      this.props.updateSeller(seller);
  }

//MAKE IT HAVE TWO OPTIONS?
  render(){

    customers = this.props.customers;
    sellers = this.props.sellers;
    if(first){
      for(var i = 0; i < customers.length; i++){
          if(customers[i]._id === customerId){
              customer = customers[i];
              break;
          }
      }

      for(var i = 0; i < sellers.length; i++){
        if(sellers[i]._id === sellerId){
            seller = sellers[i];
            break;
        }
    }
      first = false;
      cont = true;
      console.log("customer ", customer)
    }

    const reviewBox = (
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
    );

    if(cont){
      radioButtons = document.querySelectorAll('input[name="type"]');
      return(
          <div className="customerReview">
              <h2>Customer Review</h2>
              <div>
                <input type="radio" name="type" value="Report" id="report" />
                <label for="report">Report</label>

                <input type="radio" name="type" value="WrongPrice" id="wrongPrice" />
                <label for="wrongPrice">Wrong price</label>

                <input type="radio" name="type" value="Other" id="other" />
                <label for="other">Other</label>
              </div>
              
              <div className="row">
              <div className="col-lg-12 text-center">
              {
                radioButtons.checked ?  reviewBox: 'Choose a review type'
              }
              </div>
            </div>
          </div>
      );
    }
    else{
      return (
        <div></div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  customers: state.customers,
  sellers: state.sellers
})

const mapDispatchToProps = (dispatch) => ({
  getCustomers: () => dispatch(getCustomers()),
  getSellers: () => dispatch(getSellers()),
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomerReview);