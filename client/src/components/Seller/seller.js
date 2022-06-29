import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types'
import {connect } from 'react-redux';
//import {getSellers} from '../../actions/sellerAction'
import history from "../../history"
class Sellers extends Component {

    constructor(props){
        super(props);
        //this.viewCustomer = this.viewCustomer.bind(this);
    }

    componentDidMount() {
        //this.props.getSellers();
    }

    /*static propTypes = {
        getSellers: PropTypes.func.isRequired,
        sellers: PropTypes.object.isRequired
    }*/

    render() {
        url = window.location.href;
        return (
            <div>
                <Link to={url + 'change'} ><button className="btn btn-primary pull-left" >Change Details</button></Link>
                <Link to={url + 'reviews'} ><button className="btn btn-success pull-left" >View Reviews</button></Link>
                <Link to={url + 'stores'} ><button className="btn btn-success pull-left" >View Stores</button></Link>
            </div>
        );
    }
}

/*const mapStateToProps = (state) => ({
  //sellers: state.sellers
})

const mapDispatchToProps = (dispatch) => ({
   //getSellers: () => dispatch(getSellers()),
})*/

//export default connect(mapStateToProps, mapDispatchToProps)(Sellers);
export default (Sellers)