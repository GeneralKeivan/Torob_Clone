import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types'
import {connect } from 'react-redux';
import {getSellers} from '../../actions/sellerAction'
//import './customers.css';
import history from "../../history"

var version = true;
var reviewMain;
var seller;
var sellerId;
class SellerReviews extends Component {

    constructor(props){
        super(props);
    }

    componentDidMount() {
        sellerId = window.location.href.split('/')[4];
        var sellers = getSellers();

        for(var i = 0; i < sellers.length; i++){
            if(sellerId === sellers[i]._id){
                seller = sellers[i];
                break;
            }
        }
    }

    showReview(review){
        reviewMain = review;
        version = false;
    }
    backToView(){
        version = true;
    }

    render() {

        const  reviewList = (
            <div>
                <div className="col-lg-12 table-responsive">
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Type</th>
                            <th scope="col">See Review</th>
                        </tr>
                        </thead>
                        <tbody>

                        {
                            seller.reviews.map((review,index) =>
                                <tr key={index}>
                                    <td>{review.name}</td>
                                    <td>{review.type}</td>
                                    <td> <i className="fa fa-edit btn btn-info" onClick={() => this.showReview(review)}> </i>   &nbsp; </td>
                                </tr>
                            )
                        }
                    
                        </tbody>
                    </table>
                </div>
            </div>
        )

        const  reviewText = (
            <div>
                <div>{reviewMain.text}</div>
                <div><i className="fa fa-edit btn btn-info" onClick={() => this.backToView()}> </i></div>
            </div>
        )


        return (
        <div className="row">
            <div className="col-lg-12">
                <Link to={`/accounts/sellers/`} ><button className="btn btn-success pull-right" >Back</button></Link>
            </div>
            <div className="col-lg-12 text-center">
                {
                    version ? reviewList :reviewText
                }
            </div>
        </div>
        );
    }
}

const mapStateToProps = (state) => ({
  //customers: state.customers
})

const mapDispatchToProps = (dispatch) => ({
   //agetCustomers: () => dispatch(getCustomers()),
   getSellers: () => dispatch(getSellers())
})

export default connect(mapStateToProps, mapDispatchToProps)(SellerReviews);