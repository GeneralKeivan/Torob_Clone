import React from 'react';
import { updateSeller } from '../../actions/sellerAction';
import {connect } from 'react-redux';
import history from '../../history'
const API_URL = 'http://localhost:3001/api/';

var sellerId = window.location.href.split('/')[6];
class SellerStoresNewProduct extends React.Component {
    constructor(props){
        super(props);

        this.handleUpdate = this.handleUpdate.bind(this);
    }


handleUpdate(event) {
    event.preventDefault();
    console.log("this.state ", this.state)
    console.log("this.props ", this.props)

    var reviewText = document.getElementById("review").value;

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

  render(){

    /*const reviewBox = (
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
    );*/

    const lModelChoices = (
        <div>
            <label htmlFor="lenovo">Lenovo</label>
            <input type="radio" name="lenovo" value="lenovo" id="lenovo"/>
            <label for="lenovo">Lenovo</label>

            <input type="radio" name="asus" value="asus" id="asus"/>
            <label for="asus">Asus</label>

            <input type="radio" name="apple" value="apple" id="apple"/>
            <label for="apple">Apple</label>
        </div>
    );

    const mtModelChoices = (
        <div>
            <label htmlFor="samsung">Samsung</label>
            <input type="radio" name="samsung" value="samsung" id="samsung"/>
            <label for="samsung">Samsung</label>

            <input type="radio" name="xiaomi" value="xiaomi" id="xiaomi"/>
            <label for="xiaomi">Xiaomi</label>

            <input type="radio" name="apple" value="apple" id="apple"/>
            <label for="apple">Apple</label>
        </div>
    );

    const existMode = (
        <div></div>
    );

    const newMode = (
        <div className="productDetail">
            <h2>Product Detail</h2>
                <div>
                </div>
            {
                <form name="myForm" onSubmit={this.handleUpdate}>
                    <div className="form-group">
                        <label htmlFor="name">Product Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            autoComplete="off"
                            />
                    </div>

                    <div className="form-group" id="MODEL">
                        <label htmlFor="model">Model</label>
                        <input type="radio" name="mobile" value="Mobile" id="mobile"/>
                        <label for="mobile">Mobile Phone</label>

                        <input type="radio" name="tablet" value="Tablet" id="tablet"/>
                        <label for="tablet">Tablet</label>

                        <input type="radio" name="laptop" value="Laptop" id="laptop"/>
                        <label for="laptop">Laptop</label>
                    </div>

                    {
                        <div className="form-group" id="BRAND">
                        {
                          modelButtons.checked ?  (modelButtons[0].checked || modelButtons[1].checked ? mtModelChoices : lModelChoices ) : ''
                        }
                        </div>
                    }   

                    <div className="form-group">
                        <label htmlFor="price">Price</label>
                        <input
                            type="text"
                            className="form-control"
                            id="price"
                            name="price"
                            autoComplete="off"
                            />
                    </div>

                    <div className="form-group">
                        <label htmlFor="link">Store Link</label>
                        <input
                            type="text"
                            className="form-control"
                            id="link"
                            name="link"
                            autoComplete="off"
                            />
                    </div>

                    <div className="form-group">
                        <label htmlFor="size">Size</label>
                        <input
                            type="text"
                            className="form-control"
                            id="size"
                            name="size"
                            autoComplete="off"
                            />
                    </div>

                    <div className="form-group">
                        <label htmlFor="weight">Weight</label>
                        <input
                            type="text"
                            className="form-control"
                            id="weight"
                            name="weight"
                            autoComplete="off"
                            />
                    </div>

                    <div className="form-group">
                        <label htmlFor="battery">Battery Power</label>
                        <input
                            type="text"
                            className="form-control"
                            id="battery"
                            name="battery"
                            autoComplete="off"
                            />
                    </div>

                    <div className="form-group">
                        <label htmlFor="screen">Screen Type</label>
                        <input
                            type="text"
                            className="form-control"
                            id="screen"
                            name="screen"
                            autoComplete="off"
                            />
                    </div>

                    <button type="submit" className="btn btn-success btn-lg">
                        Create
                    </button>
               </form>

              }
            
        </div>
    );

    radioButtons = document.querySelectorAll('input[name="type"]');
    return(
        <div className="customerReview">
            <h2>How do you want to add the product</h2>
            <div>
              <input type="radio" name="exists" value="Exists" id="exists" />
              <label for="exists">Product already exists on website</label>

              <input type="radio" name="newProduct" value="NewProduct" id="newProduct" />
              <label for="newProduct">Create a new Product</label>

            </div>
            
            <div className="row">
            <div className="col-lg-12 text-center">
            {
              radioButtons.checked ?  (radioButtons[0].checked ? existMode : newMode): 'Choose a type'
            }
            </div>
          </div>
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
  
  export default connect(mapStateToProps,mapDispatchToProps)(SellerStoresNewProduct);