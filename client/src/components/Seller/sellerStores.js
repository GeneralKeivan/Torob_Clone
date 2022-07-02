// /accounts/sellers/:id/stores

import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types'
import {connect } from 'react-redux';
import {getSellers} from '../../actions/sellerAction'
import history from "../../history"


var sellers;
var seller;
var stores;
var sellerId = localStorage.getItem("sellerId")

var first;
var cont = false;
class SellerStores extends Component {

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

    viewStore = (store) => {
        console.log("this.state ", store);
        localStorage.setItem("sellerId", sellerId);
        console.log("this.state id ", store.id);
        localStorage.setItem("storeId", store.id);
        history.push("/accounts/sellers/" + sellerId + "/stores/" + store.id)
    }

    render() { 

        if(first){
            sellers = this.props.sellers.sellers;
            sellerId = localStorage.getItem("sellerId")
            for(var i = 0; i < sellers.length; i++){
              if(sellers[i]._id === sellerId){
                seller = sellers[i];
                break;
              }
            }
            first = false;
            cont = true;
            console.log("sellers ", seller)
            console.log("seller ", seller)

            stores = seller.store;
        }
        if(cont){
            const  storeList = (
                <div>
                    <div className="col-lg-12 table-responsive">
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th scope="col">Store Name</th>
                                <th scope="col">View Store</th>
                            </tr>
                            </thead>
                            <tbody>
                
                            {
                            stores.map((store,index) =>
                                <tr key={index}>
                                <td>{store.name}</td>
                                <td> <i className="fa fa-edit btn btn-info" onClick={() => this.viewStore(store)}> </i></td>   &nbsp;
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
                    <Link to={'/accounts/sellers/' + sellerId + '/stores/new'} ><button className="btn btn-success pull-right" >New Store</button></Link>
                </div>
                <div className="col-lg-12 text-center">
                {
                    stores.length === 0 ? 'No Stores Create New Stores' :storeList
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
    sellers: state.sellers,
})

const mapDispatchToProps = (dispatch) => ({
    getSellers: () => dispatch(getSellers()),
})

export default connect(mapStateToProps, mapDispatchToProps)(SellerStores);
