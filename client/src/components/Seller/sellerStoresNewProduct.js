import React from 'react';
import { getSellers, updateSeller, createProduct, getProducts, updateProduct } from '../../actions/sellerAction';
import {connect } from 'react-redux';
import history from '../../history'
const API_URL = 'http://localhost:3001/api/';

var sellerId = window.location.href.split('/')[4];
var seller;
var storeId = window.location.href.split('/')[6];
var allProducts;
var selected = false;
var existingProduct;
var product = {
    product : {
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
}
class SellerStoresNewProduct extends React.Component {
    constructor(props){
        super(props);

        this.handleNewUpdate = this.handleNewUpdate.bind(this);
        this.handleExistUpdate = this.handleExistUpdate.bind(this);
    }
    static propTypes = {
        getSellers: PropTypes.func.isRequired,
        getProducts: PropTypes.func.isRequired,
        createProduct: PropTypes.func.isRequired,
        sellers: PropTypes.object.isRequired
    }

    componentDidMount(){
       allProducts = this.props.getProducts()
       sellers = this.props.getSellers();
    }
//find correct info for model and brand
    handleNewUpdate(event) {
        event.preventDefault();
        console.log("this.state ", this.state)
        console.log("this.props ", this.props)

        for(var i = 0; i < this.props.sellers.length; i++){
            if(this.props.sellers[i]._id === sellerId){
                seller = sellers[i];
            }
        }

        product.product.name = document.forms["newForm"]["name"].value;
        product.product.model = document.forms["newForm"]["MODEL"].value;
        product.product.brand = document.forms["newForm"]["BRAND"].value;
        product.product.last_updated = new Date();
        product.product.size = document.forms["newForm"]["size"].value;
        product.product.weight = document.forms["newForm"]["weight"].value;
        product.product.battery = document.forms["newForm"]["battery"].value;
        product.product.screen = document.forms["newForm"]["screen"].value;


        var link = documen.forms["newForm"]["link"].value;
        var price = parseInt(document.forms["newForm"]["price"].value);
        product.product.cheap = price;
        product.product.expensive = price;
        product.product.sellers.push({id:seller._id ,name:seller.userName, phone:seller.phone, price:price, link:link});


        var storeIndex;
        for(var i = 0; i < seller.store.length; i++){
            if(storeId === seller.store[i].id){
                storeIndex = i;
                break;
            }
        }

        if(isNaN(price)){
            window.alert("The entered Price must be a number");
        }
        else{
            this.props.createProduct(product.product, sellerId, storeId)

            for(var i = 0; i < prods.length; i++){
                for(var j = 0; j < prods[i].sellers.length; j++){
                    if(allProducts[i].seller[j].id === seller._id){
                        prod = allProducts[i];
                        i = prods.length + 1;
                        break;
                    }
                }
            }
            //This might be wrong because of the id
            seller.store[storeIndex].products.push({id: prod._id,name:product.product.name, model:product.product.model, brand:product.product.brand, price:price, link:link})
            this.props.updateSeller(seller);
        }

        
    
    }

    handleExistUpdate(event) {
        event.preventDefault();
        console.log("this.state ", this.state)
        console.log("this.props ", this.props)

        for(var i = 0; i < this.props.sellers.length; i++){
            if(this.props.sellers[i]._id === sellerId){
                seller = sellers[i];
            }
        }

        var storeIndex;
        for(var i = 0; i < seller.store.length; i++){
            if(storeId === seller.store[i].id){
                storeIndex = i;
                break;
            }
        }

        var price = document.forms["existForm"]["price"];
        var link = document.forms["existForm"]["link"];

        existingProduct.last_updated = new Date();
        existingProduct.sellers.push({id:sellerId, name: seller.name, phone: seller.phone, price: price, link: link})

        if(isNaN(price)){
            window.alert("The entered Price must be a number");
        }
        else{
            this.props.updateProduct(existingProduct, sellerId, storeId)
            //This might be wrong because of the id
            seller.store[storeIndex].products.push({id: existingProduct._id,name: existingProduct.name, model: existingProduct.model, brand: existingProduct.brand, price:price, link:link})
            this.props.updateSeller(seller);
        }
    }

    addExisitngProduct(p){
        selected = true;
        existingProduct = p;
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

    const existMode = (
        <div className="productDetail">
            <h2>Product Detail</h2>
                <div>
                </div>
            {
                <div>
                    <div>Product Name = {existingProduct.name}</div>
                    <div>Model = {existingProduct.model}</div>
                    <div>Brand = {existingProduct.brand}</div>
                    <div>Size = {existingProduct.size}</div>
                    <div>Weight = {existingProduct.weight}</div>
                    <div>Battery Power = {existingProduct.battery}</div>
                    <div>Screen Type = {existingProduct.screen}</div>

                    <form name="existForm" onSubmit={this.handleExistUpdate}>
                        
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

                        <button type="submit" className="btn btn-success btn-lg">
                            Create
                        </button>
                    </form>
                </div>
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
                  <th scope="col">Price Range</th>
                  <th scope="col">Number of Sellers</th>
                  <th scope="col">Add This Product</th>

                </tr>
              </thead>
              <tbody>
  
              {
                allProducts.map((p,index) =>
                  <tr key={index}>
                    <td>{p.name}</td>
                    <td>{p.model}</td>
                    <td>{p.brand}</td>
                    <td>{p.size}</td>
                    <td>{p.weight}</td>
                    <td>{p.battery}</td>
                    <td>{p.screen}</td>
                    <td>{p.cheap + "-" + p.expensive}</td>
                    <td>{p.sellers.length}</td>
                    <td> 
                        <i className="fa fa-edit btn btn-info" onClick={() => this.addExisitngProduct(p)}> </i>   &nbsp;
                    </td>
                  </tr>
                )
              }
            
              </tbody>
            </table>
          </div>
        </div>
    )

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

    const newMode = (
        <div className="productDetail">
            <h2>Product Detail</h2>
                <div>
                </div>
            {
                <form name="newForm" onSubmit={this.handleNewUpdate}>
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
              radioButtons.checked ?  (radioButtons[0].checked ? (selected ? existMode : productList) : newMode): 'Choose a type'
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
        createProduct: (product, sellerId, storeId) => dispatch(createProduct(product, sellerId, storeId)),
        getProducts: () => dispatch(getProducts()),
        getSellers: () => dispatch(getSellers()),
        updateSeller : seller => dispatch(updateSeller(seller)),
        updateProduct : (product, sellerId, storeId) => dispatch(updateProduct(product, sellerId, storeId))
    }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(SellerStoresNewProduct);