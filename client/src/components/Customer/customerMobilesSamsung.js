import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types'
import { getProducts } from '../../actions/productAction';
import {connect } from 'react-redux';
//import {searchProduct} from '../../actions/customerAction'
import history from "../../history"
const API_URL = 'http://localhost:3001/api/';

var products;
var mobileProducts = [];
var searchedProducts = [];
var lowHighProducts = [];
var highLowProducts = [];
var recentProducts = [];
const url = window.location.href.split('/');
const id = localStorage.getItem("customerId");
var sortType = "none"
var first;
var found = false;
class CustomerMobileSamsung extends Component {

    constructor(props){
        super(props);
        const location = history.location
        this.state = location.state;
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    componentDidMount() {
      sortType = sessionStorage.getItem("type")
      found = sessionStorage.getItem("found")
      if(found === "true"){
        found = true;
      }
      else{
        found = false;
      }
      sessionStorage.removeItem("found");
      sessionStorage.removeItem("type");

      searchedProducts = JSON.parse(localStorage.getItem("searchedProducts"))
      localStorage.removeItem("searchedProducts")
      console.log("Got from storage ", searchedProducts)
      console.log("sortType ", sortType);
      console.log("found ", found)
      if(searchedProducts === null){
        searchedProducts = [];
      }

      lowHighProducts = searchedProducts.sort(function (x, y) {
        console.log(x, y)
        return parseInt(x.cheap) - parseInt(y.cheap);
      });

      highLowProducts = searchedProducts.sort(function (x, y) {
          return parseInt(y.cheap) - parseInt(x.cheap);
      });

      recentProducts = searchedProducts.sort(function (x, y) {
          let a = new Date(x.last_updated)
          let b = new Date(y.last_updated)
          return b - a
      });
      

      this.props.getProducts();
      console.log("broken url: ", url)
      console.log("id: ", id)
      first = true;
    }

    static propTypes = {
      getProducts: PropTypes.func.isRequired,
      products: PropTypes.object.isRequired
    }

    viewProduct = (viewProductDetail) => {
        console.log("this.state ", viewProductDetail);
        localStorage.setItem("productId", viewProductDetail._id);
        history.push('/accounts/customers/' + id + "/product/" + viewProductDetail._id, {'product' : viewProductDetail})
    }


    handleUpdate(event) {
        event.preventDefault();
        console.log("this.state ", this.state)
        console.log("this.props ", this.props)
    
        searchedProducts = [];
        var searchBar = String(document.forms["myForm"]["searchBar"].value).toLowerCase();

        //might need to add a .products to the end of fetch
        for(var i = 0; i < products.length; i++){
            if(String(products[i].name.toLowerCase().includes(searchBar)) && products[i].brand === "samsung" && products[i].model === "mobile"){
                searchedProducts.push(products[i])
            }
        }

        if(searchedProducts.length === 0){
          found = false;
        }
        
        lowHighProducts = searchedProducts;
        highLowProducts = searchedProducts;
        recentProducts  = searchedProducts;

        //this.props.updateSeller(this.state.seller);
        lowHighProducts.sort(function (x, y) {
            return parseInt(x.cheap) - parseInt(y.cheap);
        });

        highLowProducts.sort(function (x, y) {
            return parseInt(y.expensive) - parseInt(x.expensive);
        });

        recentProducts.sort(function (x, y) {
            let a = new Date(x.last_updated)
            let b = new Date(y.last_updated)
            return b - a
        });
        sessionStorage.setItem("found", true)
        localStorage.setItem("searchedProducts", JSON.stringify(searchedProducts))
        window.location.reload();
    }
    
    sort(t){
        sortType = t;
        sessionStorage.setItem("type", sortType)
        sessionStorage.setItem("found", true)
        localStorage.setItem("searchedProducts", JSON.stringify(searchedProducts))
        window.location.reload();
    }

    specificPhone(name){
        console.log("this.state ", name);
        history.push('/accounts/customers/' + id + "/product/mobiles/" + name)
    }

    render() {
      products = this.props.products.products;

      if(first){
        console.log("products: ", products)
        mobileProducts = [];
        for(var i = 0; i < products.length; i++){
            if(products[i].model === "mobile" && products[i].brand === "samsung"){
                mobileProducts.push(products[i])
            }
        }

        lowHighProducts = mobileProducts;
        highLowProducts = mobileProducts;
        recentProducts  = mobileProducts;

        //this.props.updateSeller(this.state.seller);
        lowHighProducts.sort(function (x, y) {
            return x.cheap - y.cheap;
        });

        highLowProducts.sort(function (x, y) {
            return y.expensive - x.expensive;
        });

        recentProducts.sort(function (x, y) {
            let a = new Date(x.last_updated)
            let b = new Date(y.last_updated)
            return b - a
        });
        first = false;
      }
        //might need to change this customer
        const productList = (
            <div>
              <div className="col-lg-12 table-responsive">

                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Price Range</th>
                      <th scope="col">Number of Sellers</th>
                      <th scope="col"></th>

                    </tr>
                  </thead>
                  <tbody>
      
                  {
                    searchedProducts.map((product,index) =>
                      <tr key={index}>
                        <td>{product.name}</td>
                        <td>{product.cheap + " - " + product.expensive}</td>
                        <td>{product.sellers.length}</td>
                        <td> 
                            <i className="fa fa-edit btn btn-info" onClick={() => this.viewProduct(product)}> </i>   &nbsp;
                        </td>
                      </tr>
                    )
                  }
                
                  </tbody>
                </table>
              </div>
            </div>
        )

        const productMobile = (
          <div>
            <div className="col-lg-12 table-responsive">

              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Price Range</th>
                    <th scope="col">Number of Sellers</th>
                    <th scope="col"></th>

                  </tr>
                </thead>
                <tbody>
    
                {
                  mobileProducts.map((product,index) =>
                    <tr key={index}>
                      <td>{product.name}</td>
                      <td>{product.cheap + " - " + product.expensive}</td>
                      <td>{product.sellers.length}</td>
                      <td> 
                          <i className="fa fa-edit btn btn-info" onClick={() => this.viewProduct(product)}> </i>   &nbsp;
                      </td>
                    </tr>
                  )
                }
              
                </tbody>
              </table>
            </div>
          </div>
        )
        
        const productLowHigh = (
            <div>
              <div className="col-lg-12 table-responsive">

                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Price Range</th>
                      <th scope="col">Number of Sellers</th>
                      <th scope="col"></th>

                    </tr>
                  </thead>
                  <tbody>
      
                  {
                    lowHighProducts.map((product,index) =>
                      <tr key={index}>
                        <td>{product.name}</td>
                        <td>{product.cheap + " - " + product.expensive}</td>
                        <td>{product.sellers.length}</td>
                        <td> 
                            <i className="fa fa-edit btn btn-info" onClick={() => this.viewProduct(product)}> </i>   &nbsp;
                        </td>
                      </tr>
                    )
                  }
                
                  </tbody>
                </table>
              </div>
            </div>
        )

        const productHighLow = (
            <div>
              <div className="col-lg-12 table-responsive">

                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Price Range</th>
                      <th scope="col">Number of Sellers</th>
                      <th scope="col"></th>

                    </tr>
                  </thead>
                  <tbody>
      
                  {
                    highLowProducts.map((product,index) =>
                      <tr key={index}>
                        <td>{product.name}</td>
                        <td>{product.cheap + " - " + product.expensive}</td>
                        <td>{product.sellers.length}</td>
                        <td> 
                            <i className="fa fa-edit btn btn-info" onClick={() => this.viewProduct(product)}> </i>   &nbsp;
                        </td>
                      </tr>
                    )
                  }
                
                  </tbody>
                </table>
              </div>
            </div>
        )

        const productRecent = (
            <div>
              <div className="col-lg-12 table-responsive">

                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Price Range</th>
                      <th scope="col">Number of Sellers</th>
                      <th scope="col"></th>

                    </tr>
                  </thead>
                  <tbody>
      
                  {
                    recentProducts.map((product,index) =>
                      <tr key={index}>
                        <td>{product.name}</td>
                        <td>{product.cheap + " - " + product.expensive}</td>
                        <td>{product.sellers.length}</td>
                        <td> 
                            <i className="fa fa-edit btn btn-info" onClick={() => this.viewProduct(product)}> </i>   &nbsp;
                        </td>
                      </tr>
                    )
                  }
                
                  </tbody>
                </table>
              </div>
            </div>
        )

        return (
            <div>
                <div>
                    <Link to={'/accounts/customers/' + id} ><button className="btn btn-primary pull-left" >Main Page</button></Link>
                    <Link to={'/accounts/customers/' + id + '/product/mobiles/'} ><button className="btn btn-primary pull-left" >Mobiles</button></Link>
                    <Link to={'/accounts/customers/' + id + '/product/tablets/'} ><button className="btn btn-primary pull-left" >Tablets</button></Link>
                    <Link to={'/accounts/customers/' + id + '/product/laptops/'} ><button className="btn btn-primary pull-left" >Laptops</button></Link>
                    <Link to={'/accounts/customers/' + id + '/favorites/'} ><button className="btn btn-primary pull-left" >Favorites</button></Link>
                    <Link to={'/accounts/customers/' + id + '/recents/'} ><button className="btn btn-primary pull-left" >Recents</button></Link>
                    <Link to={'/accounts/'} ><button className="btn btn-primary pull-left" >Sign Out</button></Link>
                </div>
                <div>
                    <button onClick={()=>this.sort('low')}>Lowest to Highest</button>
                    <button onClick={()=>this.sort('high')}>Highest to Lowest</button>
                    <button onClick={()=>this.sort('recent')}>Most Recent</button>

                    <button onClick={()=>this.specificPhone('samsung')}>Samsung</button>
                    <button onClick={()=>this.specificPhone('xiaomi')}>Xiaomi</button>
                    <button onClick={()=>this.specificPhone('apple')}>Apple</button>
                </div>
                <form name="myForm" onSubmit={this.handleUpdate}>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            id="searchBar"
                            name="searchBar"
                            autoComplete="off"
                            placeholder='Search..'
                            />
                    </div>
                    <button type="submit" className="btn btn-success btn-lg">
                        Search
                    </button>
                </form>

                <div className="row">
                    <div className="col-lg-12 text-center">
                    {
                        !found ? productMobile : (sortType === "low" ? productLowHigh : (sortType ==="high" ? productHighLow : (sortType === "recent" ? productRecent : productList)))
                    }
                    </div>
                </div>
                
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
  //customer: state.customer
  products: state.products,
})

const mapDispatchToProps = (dispatch) => ({
    getProducts: () => dispatch(getProducts()),
    //searchProduct: (searchBar) => dispatch(searchProduct(searchBar)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomerMobileSamsung);