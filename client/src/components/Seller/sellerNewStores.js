import React from 'react';
import { addStore } from '../../actions/sellerAction';
import {connect } from 'react-redux';
import history from '../../history'

class SellerNewStores extends React.Component {
    constructor(props){
        super(props);
        const location = history.location
        this.state = location.state;
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    handleUpdate(event) {
        event.preventDefault();
        console.log("this.state ", this.state);
        console.log("this.props ", this.props);

        var storeName = document.forms["myForm"]["storeName"].value;
        var storeId = parseInt(this.state.seller.count) + 1;
        var storeCount = parseInt(this.state.seller.count + 1);
        this.state.seller.stores.push({name: storeName, id: storeId})
        this.state.seller.count = parseInt(storeCount);
        
        this.props.addStore(this.state.seller);
    }

    render(){
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
    }

}

const mapStateToProps = (state) => {
    return {
        sellers: state.sellerss
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addStore : seller => dispatch(addStore(seller))
    }
}
  

export default connect(mapStateToProps,mapDispatchToProps)(SellerNewStores);