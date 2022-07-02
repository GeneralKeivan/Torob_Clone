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

class SellerStoresNewProduct extends React.Component {
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
    }

    handleUpdate(event) {
        event.preventDefault();
        console.log("this.state ", this.state)
        console.log("this.props ", this.props)

        var x = document.getElementById("exists");
        if(x.checked){
            this.props.typeExisting();
        }
        else{
            this.props.typeNew();
        }
    }

    render(){

        if(first){
            sellers = this.props.sellers.sellers;
            products = this.props.products.products;
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

            return(
                <div className="addingType">
                    <h2>How do you want to add the product?</h2>
                    <div></div>
                    {
                    <form onSubmit={this.handleUpdate}>
        
                        <input type="radio" id="exists" className='exist' name="mode" value="Exist"/>
                        <label htmlFor="exist">Add Existing Product</label><br/>
                        <input type="radio" id="newProduct" name="mode" value="NewProduct"/>
                        <label htmlFor="newProduct">Create new Product</label><br/>
        
                        <button type="submit" className="btn btn-success btn-lg">
                            Choose
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

const mapStateToProps = (state) => {
    return {
      sellers: state.sellers,
      products: state.products
    }
  }
  const mapDispatchToProps = (dispatch) => {
    return {
        typeExisting: () => dispatch(typeExisting()),
        typeNew: () => dispatch(typeNew()),
        createProduct: (product, sellerId, storeId) => dispatch(createProduct(product, sellerId, storeId)),
        getProducts: () => dispatch(getProducts()),
        getSellers: () => dispatch(getSellers()),
        updateSeller : seller => dispatch(updateSeller(seller)),
        updateProduct : (product, sellerId, storeId) => dispatch(updateProduct(product, sellerId, storeId))
    }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(SellerStoresNewProduct);