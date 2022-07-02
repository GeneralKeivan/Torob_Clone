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
const sellerId = localStorage.getItem("sellerId")
var first;
var cont = false;
class SellerReviews extends Component {

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
        var x = document.getElementById("review");
        console.log(x)
        if (x.style.display !== 'none') {
            x.style.display = 'none';
        }
        else {
            x.style.display = 'block';
            x.innerHTML = review.text;
        }

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
            console.log("sellers ", seller)
            console.log("seller ", seller)
        }

        if(cont){
            const  reviewList = (
                <div id="rTable">
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
                <div id="review">
                    
                
                </div>
            )

            return (
            <div className="row">
                <div className="col-lg-12">
                    <Link to={`/accounts/sellers/` + sellerId} ><button className="btn btn-success pull-right" >Back</button></Link>
                </div>
                <div className="col-lg-12 text-center" id="change">
                    {reviewList}
                    {reviewText}
                    <br></br>
                    <br></br>
                    <br></br>
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

export default connect(mapStateToProps, mapDispatchToProps)(SellerReviews);