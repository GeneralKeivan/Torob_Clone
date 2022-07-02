import React from 'react';
import { updateSeller, getSellers } from '../../actions/sellerAction';
import {connect } from 'react-redux';
import history from '../../history'
import PropTypes from 'prop-types'
import { getCustomers } from '../../actions/customerAction';
const API_URL = 'http://localhost:3001/api/';

const url = window.location.href.split('/');
var customerId = localStorage.getItem("customerId");
var sellerId = localStorage.getItem("sellerId");
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

    static propTypes = {
      updateSeller: PropTypes.func.isRequired,
      getCustomers: PropTypes.func.isRequired,
      customers: PropTypes.object.isRequired,
      getSellers: PropTypes.func.isRequired,
      sellers: PropTypes.object.isRequired,
    }

    handleUpdate(event) {
      event.preventDefault();
      console.log("this.state ", this.state)
      console.log("this.props ", this.props)

      console.log("customers ", customers)
      console.log("sellers ", sellers)
      var reviewText = document.getElementById("review").value;

      var x = document.getElementById("report");
      var y = document.getElementById("wrongPrice");
      var z = document.getElementById("other");
      
      if(!x.checked && !y.checked && !z.checked){
        window.alert("Check a review type")
      }

      else{

        var reviewType;

        if(x.checked){
          reviewType = "report";
        }
        else if(y.checked){
          reviewType = "wrongPrece";
        }
        else{
          reviewType = "other"
        }

        console.log("sellerId ", sellerId)
        for(var i = 0; i < sellers.length; i++){
          if(sellers[i]._id === sellerId){
              seller = sellers[i];
              break;
          }
        }

        seller.reviews.push({name: customer.userName, text: reviewText, type: reviewType});

        this.props.updateSeller(seller);
      } 
  }

//MAKE IT HAVE TWO OPTIONS?
  render(){
    for(var i = 0; i < 5; i++){
      customers = this.props.customers.customers;
      sellers = this.props.sellers.sellers;
    }

    if(first){
      customerId = localStorage.getItem("customerId"); 
      sellerId = localStorage.getItem("sellerId");

      for(var i = 0; i < customers.length; i++){
          if(customers[i]._id === customerId){
              customer = customers[i];
              break;
          }
      }

      first = false;
      cont = true;

      console.log("customer ", customer)
      console.log("seller ", seller)
    }

    const reviewBox = (
      <form onSubmit={this.handleUpdate}>
      <div className="form-group">
          <textarea
              id="review"
              className="review"
              placeholder="Your Review..."
              rows = "10"
              cols = "100"
          />
      </div>
      <button type="submit" className="btn btn-success btn-lg">
        Send
      </button>
     </form>
    );

    if(cont){
      return(
          <div className="customerReview">
              <h2>Customer Review</h2>
              <div>
                <input type="radio" name="type" value="Report" id="report" />
                <label for="report">Report</label>
                <br></br>
                <input type="radio" name="type" value="WrongPrice" id="wrongPrice" />
                <label for="wrongPrice">Wrong price</label>
                <br></br>
                <input type="radio" name="type" value="Other" id="other" />
                <label for="other">Other</label>
                <br></br>
              </div>
              
              <div className="row">
              <div className="col-lg-12 text-center">
                <br></br>
                <br></br>
              {
                reviewBox
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
  updateSeller : seller => dispatch(updateSeller(seller))
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomerReview);