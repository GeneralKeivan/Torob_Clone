import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types'
import {connect } from 'react-redux';
import {getSellers} from '../../actions/sellerAction'
//import './customers.css';
import history from "../../history"

var version = true;
var reviewMain = "";
var sellers;
var seller;
var store;
const sellerId = localStorage.getItem("sellerId")
var storeId = localStorage.getItem("storeId");
var first;
var cont = false;
class SellerViewStore extends Component {

    constructor(props){
        super(props);
        const location = history.location
        this.state = location.state;
    }

    componentDidMount() {
        this.props.getSellers();
        first = true;
    }

    static propTypes = {
        getSellers: PropTypes.func.isRequired,
        sellers: PropTypes.object.isRequired
    }

    showReview(review){
        reviewMain = review.text;
        version = false;
    }

    backToView(){
        version = true;
    }

    render() {

        if(first){
            sellers = this.props.sellers.sellers;

            for(var i = 0; i < sellers.length; i++){
              if(sellers[i]._id === sellerId){
                seller = sellers[i];
                break;
              }
            }
            first = false;
            cont = true;
            console.log("view sellers ", seller)
            console.log("view seller ", seller)
            console.log("view storeId ", storeId)

            store = seller.store[storeId];
            console.log("view store ", store)
        }

        if(cont){
            const  productList = (
                <div>
                    <div className="col-lg-12 table-responsive">
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th scope="col">Product Name</th>
                                <th scope="col">Model</th>
                                <th scope="col">Brand</th>
                                <th scope="col">Price</th>
                                <th scope="col">Link</th>
                            </tr>
                            </thead>
                            <tbody>

                            {
                                store.products.map((product,index) =>
                                    <tr key={index}>
                                        <td>{product.name}</td>
                                        <td>{product.model}</td>
                                        <td>{product.brand}</td>
                                        <td>{product.price}</td>
                                        <td>{product.link}</td>
                                    </tr>
                                )
                            }
                        
                            </tbody>
                        </table>
                    </div>
                </div>
            )

            return (
            <div className="row">
                <div className="col-lg-12">
                    <Link to={`/accounts/sellers/` + sellerId + "/stores"} ><button className="btn btn-info pull-right" >Back</button></Link>
                </div>
                <div className="col-lg-12">
                    <Link to={`/accounts/sellers/` + sellerId + "/stores/" + storeId + "/product/new"} ><button className="btn btn-success pull-right" >New Product</button></Link>
                </div>
                <div className="col-lg-12 text-center">
                    {
                        store.products.length === 0 ? "This store has no products" :productList
                    }
                </div>
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

const mapStateToProps = (state) => ({
    sellers: state.sellers
})

const mapDispatchToProps = (dispatch) => ({
    getSellers: () => dispatch(getSellers())
})

export default connect(mapStateToProps, mapDispatchToProps)(SellerViewStore);