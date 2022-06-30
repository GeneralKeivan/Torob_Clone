import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types'
import {connect } from 'react-redux';
//import {searchProduct} from '../../actions/customerAction'
import history from "../../history"
const API_URL = 'http://localhost:3001/api/';

var products;
var searchedProducts = [];
var sortType = "none"
class Customer extends Component {

    constructor(props){
        super(props);
        const location = history.location
        this.state = location.state;
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    componentDidMount() {
        products = fetch(API_URL + 'products');
    }
    viewProduct = (viewProductDetail) => {
        var id = window.location.href.split('/')[4];
        console.log("this.state ", viewProductDetail);
        history.push('/customers/' + url + "/product/" + viewProductDetail._id, {'product' : viewProductDetail})
    }


    handleUpdate(event) {
        event.preventDefault();
        console.log("this.state ", this.state)
        console.log("this.props ", this.props)
    
    
        var searchBar = document.forms.myForm.searchBar.value;

        //might need to add a .products to the end of fetch
        for(var i = 0; i < products.length; i++){
            if(products[i].name.inludes(searchBar) || products[i].model.inludes(searchBar) || products[i].brand.inludes(searchBar)){
                searchedProducts.push(products[i])
            }
        }

        //this.props.updateSeller(this.state.seller);
    
    
    }
    /*componentDidMount() {
        var customerId = window.location.href.split('/')[4];
        this.props.getCustomer(customerId);
    }*/

    static propTypes = {
        //getCustomer: PropTypes.func.isRequired,
        products: PropTypes.object.isRequired
    }

    sort(t){
        sortType = t;
    }

    render() {
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
                    searchProducts.map((product,index) =>
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
                    <Link to={url + '/product/mobiles'} ><button className="btn btn-primary pull-left" >Mobiles</button></Link>
                    <Link to={url + '/product/tablets'} ><button className="btn btn-primary pull-left" >Tablets</button></Link>
                    <Link to={url + '/product/laptops'} ><button className="btn btn-primary pull-left" >Laptops</button></Link>
                    <Link to={url + '/product/favorites'} ><button className="btn btn-primary pull-left" >Favorites</button></Link>
                    <Link to={url + '/product/recents'} ><button className="btn btn-primary pull-left" >Recents</button></Link>
                </div>
                <div>
                    <button onclick="this.sort('low')">Lowest to Highest</button>
                    <button onclick="this.sort('high')">Highest to Lowest</button>
                    <button onclick="this.sort('recent')">Most Recent</button>
                </div>
                <form name="myForm" onSubmit={this.handleUpdate}>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            id="searchBar"
                            name="searchBar"
                            autoComplete="off"
                            value={"Search.."}
                            />
                    </div>
                    <button type="submit" className="btn btn-success btn-lg">
                        Search
                    </button>
                </form>

                <div className="row">
                    <div className="col-lg-12 text-center">
                    {
                        searchedProducts.length === 0 ? 'Search the name of the product you want' : (sortType === "low" ? productLowHigh : (sortType ==="high" ? productHighLow : (sortType === "recent" ? productRecent : productList)))
                    }
                    </div>
                </div>
                
            </div>
        );
    }
}

/*const mapStateToProps = (state) => ({
  //customer: state.customer
})

const mapDispatchToProps = (dispatch) => ({
   searchProduct: (searchBar) => dispatch(searchProduct(searchBar)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Customer);*/
export default (Customer)