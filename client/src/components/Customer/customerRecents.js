
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types'
import {connect } from 'react-redux';
import history from "../../history"
import {getCustomer} from '../../actions/customerAction'

var customerId, product;
class CustomerRecents extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {
        customerId = window.location.href.split('/')[4];
        this.props.getCustomer(customerId);
    }
    
    static propTypes = {
        getCustomer: PropTypes.func.isRequired,
        customer: PropTypes.object.isRequired
    }

    viewProduct(favorite){
        var spl = favorite.link.split("/")
        var productId = spl.slice(-1);

        history.push("accounts/customers/" + this.props.customer._id + "/products/" + productId)
    }

    render() {    

        const recents = this.props.recents;

        const  productList = (
            <div>
                <div className="col-lg-12 table-responsive">
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th scope="col">Product Name</th>
                            <th scope="col">Go to product page</th>
                        </tr>
                        </thead>
                        <tbody>
            
                        {
                        recents.map((recent,index) =>
                            <tr key={index}>
                            <td>{recent.name}</td>
                            <td> <i className="fa fa-edit btn btn-info" onClick={() => this.viewProduct(recent)}> </i></td>   &nbsp;
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
            <div className="col-lg-12 text-center">
            {
              recents.length === 0 ? 'You have not favorited any products' :productList
            }
            </div>
          </div>
        );
    }

}

const mapStateToProps = (state) => ({
    customer: state.customer,
})

const mapDispatchToProps = (dispatch) => ({
    getCustomer: (customerId) => dispatch(getCustomer(customerId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomerRecents);
