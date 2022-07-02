import React from 'react';
import { addStore, getSellers } from '../../actions/sellerAction';
import {connect } from 'react-redux';
import PropTypes from 'prop-types'
import history from '../../history'

var sellers, seller;
var first;
var cont = false;
const sellerId = localStorage.getItem("sellerId")
class SellerNewStores extends React.Component {
    constructor(props){
        super(props);
        const location = history.location
        this.state = location.state;
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    componentDidMount() {
        this.props.getSellers();
        first = true;
    }

    static propTypes = {
        getSellers: PropTypes.func.isRequired,
        sellers: PropTypes.object.isRequired,
        addStore: PropTypes.func.isRequired
    }

    handleUpdate(event) {
        event.preventDefault();
        console.log("this.state ", this.state);
        console.log("this.props ", this.props);

        var storeName = document.forms["myForm"]["storeName"].value;
        var storeId = parseInt(seller.store.length) + 1;
        localStorage.setItem("storeId", storeId);
        seller.store.push({name: storeName, id: storeId})
        
        this.props.addStore(seller);
    }

    render(){
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
            console.log("seller ", seller)
        }
        if(cont){
            return(
                <div className="courseDetail">
                    <h2>Store Details</h2>
                    <div></div>
                    {
                    <form name="myForm" onSubmit={this.handleUpdate}>
                        
                        <div className="form-group">
                            <label htmlFor="storeName">Store Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="storeName"
                                name="storeName"
                                autoComplete="off"
                            />
                        </div>

                        <button type="submit" className="btn btn-success btn-lg">
                            SAVE
                        </button>
                    </form>

                    }
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

const mapStateToProps = (state) => {
    return {
        sellers: state.sellers
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getSellers: () => dispatch(getSellers()),
        addStore : seller => dispatch(addStore(seller))
    }
}
  

export default connect(mapStateToProps,mapDispatchToProps)(SellerNewStores);