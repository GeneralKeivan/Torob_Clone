
import React from 'react';
import { getSellers, updateSeller} from '../../actions/sellerAction';
import { createProduct, getProducts, updateProduct} from '../../actions/productAction';
import { typeExisting, typeNew } from '../../actions/sellerAction';
import {connect } from 'react-redux';
import PropTypes from 'prop-types'
import history from '../../history'
const API_URL = 'http://localhost:3001/api/';

var sellerId = localStorage.getItem("sellerId")
var seller, sellers;
var storeId = localStorage.getItem("storeId")
var products;
var existingProduct;
var first;
var cont = false;
var chosen = false;

var myProduct = {
    name : "",
    id : "",
    model : "",
    brand : "",
    last_updated : "",
    cheap : "",
    expensive : "",
    sellers : [
    ],
    size : "",
    weight : "",
    battery : "",
    screen : ""
}

class SellerStoresNewProductExisting extends React.Component {
    constructor(props){
        super(props);

        this.handleUpdate = this.handleUpdate.bind(this);
    }
    static propTypes = {
        getSellers: PropTypes.func.isRequired,
        sellers: PropTypes.object.isRequired,
        typeExisting: PropTypes.func.isRequired
    }

    componentDidMount() {
        this.props.getSellers();
        this.props.getProducts();
        first = true;
        chosen = sessionStorage.getItem("chosen")
        sessionStorage.removeItem("chosen");
        console.log("Fresh chosen ", chosen)
        if(chosen !== "true"){
            chosen = false;
        }
        else{
            chosen = true;
        }
      }

    handleUpdate(event) {
        event.preventDefault();
        console.log("this.state ", this.state)
        console.log("this.props ", this.props)

        for(var i = 0; i < sellers.length; i++){
            if(sellers[i]._id === sellerId){
                seller = sellers[i];
            }
        }
        storeId = localStorage.getItem("storeId")

        var price = parseInt(document.forms["myForm"]["price"].value);
        var link = document.forms["myForm"]["link"].value;

        myProduct = JSON.parse(sessionStorage.getItem("product"))
        sessionStorage.removeItem("product")

        myProduct.link = link;
        myProduct.price = price;
        if(price < myProduct.cheap){
            myProduct.cheap = price;
        }
        if(price > myProduct.expensive){
            myProduct.expensive = price;
        }

        console.log("myProducts ", myProduct)
        console.log("seller ", seller)
        myProduct.sellers.push({id:sellerId, name: seller.userName, phone: seller.phone, price: price, link: link})


        if(isNaN(price)){
            window.alert("The entered Price must be a number");
        }
        else{
            console.log("My Product = ", myProduct)
            this.props.updateProduct(myProduct, sellerId, storeId)
            //This might be wrong because of the id
            console.log("Store ", seller.store[parseInt(storeId) - 1])
            seller.store[parseInt(storeId) - 1].products.push({name: myProduct.name, model: myProduct.model, brand: myProduct.brand, price:price, link:link})
            this.props.updateSeller(seller);
        }
    }

    addThisProduct(product){


        product.last_updated = new Date();
        myProduct.size = product.size;
        myProduct.weight = product.weight;
        myProduct.battery = product.battery;
        myProduct.screen = product.screen;



        myProduct.name = product.name;
        myProduct.model = product.model;
        myProduct.brand = product.brand;

        myProduct.cheap = product.cheap;
        myProduct.expensive = product.expensive;
        myProduct.sellers = product.sellers;
        myProduct._id = product._id;


        chosen = true;
        sessionStorage.setItem("chosen", "true")
        sessionStorage.setItem("product", JSON.stringify(myProduct))
        window.location.reload();
    }

    render(){
        sellers = this.props.sellers.sellers;
        products = this.props.products.products;
        console.log("chosen ", chosen)
        if(first){

            for(var i = 0; i < sellers.length; i++){
                if(sellers[i]._id === sellerId){
                    seller = sellers[i];
                    break;
                }
            }
            first = false;
            cont = true;
            console.log("seller ", seller)
            console.log("products ", products)
        }
        if(cont){   

            const fillForm = (

                <div className="sellerDetail">
                    <h2>Seller Detail</h2>
                    <div>
                    </div>
                    {
                        <form name="myForm" onSubmit={this.handleUpdate}>
                            <div className="form-group">
                                <label htmlFor="price">Price</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="price"
                                    name="price"
                                    autoComplete="off"
                                    //value={seller.userName}
                                    />
                            </div>

                            <div className="form-group">
                                <label htmlFor="link">Link</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="link"
                                    name="link"
                                    autoComplete="off"
                                    //value={seller.email}
                                    />
                            </div>

                            <button type="submit" className="btn btn-success btn-lg">
                                Create
                            </button>
                        </form>

                    }
                    
                </div>
            );

            const productList = (
                <div>
                  <div className="col-lg-12 table-responsive">
    
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th scope="col">Name</th>
                          <th scope="col">Model</th>
                          <th scope="col">Brand</th>
                          <th scope="col">Size</th>
                          <th scope="col">Weight</th>
                          <th scope="col">Battery Power</th>
                          <th scope="col">Screen Type</th>
                          <th scope="col"></th>
    
                        </tr>
                      </thead>
                      <tbody>
          
                      {
                        products.map((product,index) =>
                          <tr key={index}>
                            <td>{product.name}</td>
                            <td>{product.model}</td>
                            <td>{product.brand}</td>
                            <td>{product.size}</td>
                            <td>{product.weight}</td>
                            <td>{product.battery}</td>
                            <td>{product.screen}</td>
                            <td> 
                                <i className="fa fa-edit btn btn-info" onClick={() => this.addThisProduct(product)}> </i>   &nbsp;
                            </td>
                          </tr>
                        )
                      }
                      </tbody>
                    </table>
                  </div>
                </div>
            )

            return(
                <div className="addingType">
                    <h2>Choose a existing product</h2>
                    <div></div>
                    {
                        chosen ? fillForm : productList
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

const mapStateToProps = (state) => {
    return {
      sellers: state.sellers,
      products: state.products
    }
  }
  const mapDispatchToProps = (dispatch) => {
    return {
        createProduct: (product, sellerId, storeId) => dispatch(createProduct(product, sellerId, storeId)),
        getProducts: () => dispatch(getProducts()),
        getSellers: () => dispatch(getSellers()),
        updateSeller : seller => dispatch(updateSeller(seller)),
        updateProduct : (product, sellerId, storeId) => dispatch(updateProduct(product, sellerId, storeId))
    }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(SellerStoresNewProductExisting);