// /accounts/sellers/:id/stores

import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types'
import {connect } from 'react-redux';
import history from "../../history"
import sellerChange from './sellerChange';
import {getSeller} from '../../actions/sellerAction'

var sellerId;
class SellerStores extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {
        sellerId = windows.location.href.split('/')[4];
        this.props.getSeller(sellerId);
    }
    
    static propTypes = {
        getSeller: PropTypes.func.isRequired,
        seller: PropTypes.object.isRequired
    }

    render() {    

        const stores = this.props.stores;

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
              <Link to={'/account/seller/' + sellerId + '/stores/new'} ><button className="btn btn-success pull-right" >New Store</button></Link>
            </div>
            <div className="col-lg-12 text-center">
            {
              stores.length === 0 ? 'No Stores Create New Stores' :storeList
            }
            </div>
          </div>
        );
    }

}

const mapStateToProps = (state) => ({
    seller: state.seller,
})

const mapDispatchToProps = (dispatch) => ({
    getSeller: (SellerId) => dispatch(getSeller(sellerId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SellerStores);
