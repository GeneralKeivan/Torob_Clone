// /accounts/sellers/:id/stores

import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types'
import {connect } from 'react-redux';
import history from "../../history"
import sellerChange from './sellerChange';
import {getSellers} from '../../actions/sellerAction'

var sellerId;
var sellerIndex;
class SellerStores extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {
        sellerId = windows.location.href.split('/')[4];
        this.props.getSellers();

        for(var i = 0; i < this.props.sellers.length; i++){
            if(sellerId === this.props.sellers[i]._id){
                sellerIndex = i;
                break;
            }
        }

    }
    
    static propTypes = {
        getSellers: PropTypes.func.isRequired,
        sellers: PropTypes.object.isRequired
    }

    render() {    

        const stores = this.props.sellers[sellerIndex].stores;

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
    sellers: state.sellers,
})

const mapDispatchToProps = (dispatch) => ({
    getSellers: () => dispatch(getSellers()),
})

export default connect(mapStateToProps, mapDispatchToProps)(SellerStores);
