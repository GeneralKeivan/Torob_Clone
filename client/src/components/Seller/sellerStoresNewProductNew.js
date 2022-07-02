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
var first;
var cont = false;


class SellerStoresNewProductNew extends React.Component {
    constructor(props){
        super(props);
        const location = history.location
        this.state = location.state;
        this.handleUpdate = this.handleUpdate.bind(this);
    }
    
    static propTypes = {
        getProducts: PropTypes.func.isRequired,
        getSellers: PropTypes.func.isRequired,
        sellers: PropTypes.object.isRequired,
        products: PropTypes.object.isRequired
    }

    componentDidMount() {
        this.props.getProducts();
        this.props.getSellers();
        first = true;
      }

//find correct info for model and brand
    handleUpdate(event) {
        event.preventDefault();
        console.log("this.state ", this.state)
        console.log("this.props ", this.props)

        var product = {
            name : "",
            id : "",
            model : "",
            brand : "",
            last_updated : "",
            cheap : "",
            expensive : "",
            sellers : [
                {
                    name : "",
                    phone : "",
                    price : "",
                    link : ""
                }
            ],
            size : "",
            weight : "",
            battery : "",
            screen : ""
        }

        for(var i = 0; i < sellers.length; i++){
            if(sellers[i]._id === sellerId){
                seller = sellers[i];
                break;
            }
        }

        product.name = document.forms["newForm"]["name"].value;
        var model = String(document.forms["newForm"]["model"].value).toLowerCase();
        var brand = String(document.forms["newForm"]["brand"].value).toLowerCase();
        product.last_updated = new Date();
        product.size = document.forms["newForm"]["size"].value;
        product.weight = document.forms["newForm"]["weight"].value;
        product.battery = document.forms["newForm"]["battery"].value;
        product.screen = document.forms["newForm"]["screen"].value;


        var link = document.forms["newForm"]["link"].value;
        var price = parseInt(document.forms["newForm"]["price"].value);
        product.cheap = price;
        product.expensive = price;
        product.sellers.push({id:sellerId,name:seller.userName, phone:seller.phone, price:price, link:link});
        product.model = model;
        product.brand = brand;

        if(model !== "mobile" && model !== "tablet" && model !== "laptop"){
            window.alert("Model can only be mobile, tablet or laptop")
        }
        else{
            if(model === "mobile" || model === "tablet"){
                if(brand !== "samsung" && brand !== "xiaomi" && brand !== "apple"){
                    window.alert("Brand can only be Samsung, Xiaomi or Apple")
                }
                else{
                    if(isNaN(price)){
                        window.alert("The entered Price must be a number");
                    }
                    else{
                        console.log("product : ", product)
                        this.props.createProduct(product, sellerId, storeId)
                        console.log("This store ", seller.store)
                        console.log("This store Index ", parseInt(storeId) - 1)

                        seller.store[parseInt(storeId) - 1].products.push({name:product.name, model:product.model, brand:product.brand, price:price, link:link})
                        this.props.updateSeller(seller);
                    }
                }
            }
            else{
                if(!(brand === "lenovo" || brand === "asus" || brand === "apple")){
                    window.alert("Brand can only be Lenovo, Asus or Apple")
                }
                else{
                    if(isNaN(price)){
                        window.alert("The entered Price must be a number");
                    }
                    else{
                        console.log("product : ", product)
                        this.props.createProduct(product, sellerId, storeId)

                        seller.store[parseInt(storeId) - 1].products.push({name:product.name, model:product.model, brand:product.brand, price:price, link:link})
                        console.log("This store ", seller.store)
                        console.log("This store Index ", parseInt(storeId) - 1)
                        this.props.updateSeller(seller);
                    }
                }
            }

        }
    }

    render(){
        sellers = this.props.sellers.sellers;
        products = this.props.products.products;
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

        var modelButtons = document.querySelectorAll("model")
        return(
            <div className="addingType">
                <h2>Creating New Product</h2>
                <div></div>
                {
                    <div className="productDetail">
                    <h2>Product Detail</h2>
                        <div>
                        </div>
                    {
                    <form name="newForm" onSubmit={this.handleUpdate}>
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

                        <div className="form-group" id="model">
                            <label htmlFor="model">Model</label>
                            <input
                                type="text"
                                className="form-control"
                                id="model"
                                name="model"
                                autoComplete="off"
                                />
                        </div>

                        {
                            <div className="form-group" id="brand">
                                <label htmlFor="brand">Brand</label>
                                <input
                                type="text"
                                className="form-control"
                                id="brand"
                                name="brand"
                                autoComplete="off"
                                />
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
                }
            
            </div>
        );
    
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
  
  export default connect(mapStateToProps,mapDispatchToProps)(SellerStoresNewProductNew);