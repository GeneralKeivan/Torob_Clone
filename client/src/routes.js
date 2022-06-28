import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './components/Home'

import Admins                                   from './components/Admin/admin'


import Customers                                from './components/Customer/customer'
import CustomerSearch                           from './components/Customer/customerSearch'
import CustomerMobiles                          from './components/Customer/customerMobiles'
import CustomerTablets                          from './components/Customer/customerTablets'
import CustomerLaptops                          from './components/Customer/customerLaptops'
import CustomerProduct                          from './components/Customer/customerProduct'
import CustomerReview                           from './components/Customer/customerReview'
import CustomerFavorites                        from './components/Customer/customerFavorites'
import CustomerRecents                          from './components/Customer/customerRecents.js'


import Sellers                                  from './components/Seller/seller'
import SellerChange                             from './components/Seller/sellerChange'
import SellerReviews                            from './components/Seller/sellerReviews'
import SellerStores                             from './components/Seller/sellerStores'
import SellerNewStores                          from './components/Seller/sellerNewStores'
import SellerChangeStores                       from './components/Seller/sellerChangeStores'
import SellerStoresNewProduct                   from './components/Seller/sellerStoresNewProduct'
import SellerStoresChangeProduct                from './components/Seller/sellerStoresChangeProduct'



const routing = () =>(
    <div>
    <Switch>
    <Route exact path="/" component={Home} label="Home"/>


        <Route exact path="/accounts/admin/:id" component={Admins} /> 


        <Route exact path="/accounts/customers/:id/product" component={Customers} /> 
        <Route exact path="/accounts/customers/:id/product?q=react" component={CustomerSearch} /> 

        <Route exact path="/accounts/customers/:id/product/mobiles" component={CustomerMobiles} /> 
        <Route exact path="/accounts/customers/:id/product/tablets" component={CustomerTablets} /> 
        <Route exact path="/accounts/customers/:id/product/laptops" component={CustomerLaptops} />

        <Route exact path="/accounts/customers/:id/product/:id" component={CustomerProduct} /> 
        <Route exact path="/accounts/customers/:id/sellers/:id/review" component={CustomerReview} />
        <Route exact path="/accounts/customers/:id/favorites" component={CustomerFavorites} />  
        <Route exact path="/accounts/customers/:id/recents" component={CustomerRecents} /> 


        <Route exact path="/accounts/sellers/:id" component={Sellers} /> 
        <Route exact path="/accounts/sellers/:id/change" component={SellerChange} /> 
        <Route exact path="/accounts/sellers/:id/reviews" component={SellerReviews} /> 
        <Route exact path="/accounts/sellers/:id/stores" component={SellerStores} /> 
        <Route exact path="/accounts/sellers/:id/stores/new" component={SellerNewStores} /> 
        <Route exact path="/accounts/sellers/:id/stores/change" component={SellerChangeStores} /> 
        <Route exact path="/accounts/sellers/:id/stores/:id/product/new" component={SellerStoresNewProduct} /> 
        <Route exact path="/accounts/sellers/:id/stores/:id/product/change" component={SellerStoresChangeProduct} /> 



    </Switch>
    </div>
)
export default routing;

//We need to add routes for the following will add more
//when i realize we need more routes


// /accounts                                                                : shows the sign up or log in buttons


// /accounts/login                                                          : login page
// /accounts/signup                                                         : sign up page (can lead to login or main page)
// (put a choice for customer, seller, admin in login)
// (dont put admin in signup, admin is introduced manually)


// /accounts/admin/:id


// /accounts/customers/:id/product                                          : main customer page (happens after logging in) (sees all products, can click on products, can search products, can filter products)


// These two use the same route, the main code will check the query type
// /accounts/customers/:id/product?searchedName                             : show searched product for customer (Dont know if we should use query like that) (search in all details entered for the products)
// /accounts/customers/:id/product?SortBy(newest,cheapest,most expensive)   : sort the shown products (still dont know about queries)


// /accounts/customers/:id/product/filterName                               : show all products in the filtered category (filterName includes: mobiles, tablets, laptops)
// /accounts/customers/:id/product/filterName/filterName2                   : filterName2 is for the different brands(shown below)
// /accounts/customers/:id/product/:id                                      : shows specific product to customer (with the seller, can give review for seller)
// /accounts/customers/:id/sellers/:id/review                               : give review for seller
// /accounts/customers/:id/favorites                                        : see favorites (can also delete them)
// /accounts/customers/:id/recents                                          : see recent 5 products


// /accounts/sellers/:id                                                    : main seller page (happens after logging in) (can view products, add products, change products, view reviews)
// /accounts/sellers/:id/change                                             : change phone, email, name
// /accounts/sellers/:id/reviews                                            : show reviews
// /accounts/sellers/:id/stores                                             : show all stores
// /accounts/sellers/:id/stores/new                                         : add new store
// /accounts/sellers/:id/stores/change                                      : change store info
// /accounts/sellers/:id/stores/:id/product/new                             : show create product page for specific store
// /accounts/sellers/:id/stores/:id/product/change                          : show change product page for specific store



// will probably need two paths for adding product
// one uses an already introduced product and creates it based on that
// the other is from scratch


//Filters:
// mobiles/samsung
// mobiles/xiaomi
// mobiles/apple

// tablets/samsung
// tablets/xiaomi
// tablets/apple

// laptops/lenovo
// laptops/asus
// laptops/apple