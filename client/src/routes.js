import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './components/Home'

import Accounts                                 from './components/Account/account'
import AccountType                              from './components/Account/accountType'
import CustomerSignUp                           from './components/Account/accountCustomerSignUp'
import SellerSignUp                             from './components/Account/accountSellerSignUp'
import LogIn                                    from './components/Account/accountLogIn'

import Admins                                   from './components/Admin/admin'

import Customers                                from './components/Customer/customer'

import CustomerMobiles                          from './components/Customer/customerMobiles'
import CustomerMobileSamsung                    from './components/Customer/customerMobilesSamsung'
import CustomerMobileXiaomi                     from './components/Customer/customerMobilesXiaomi'
import CustomerMobileApple                      from './components/Customer/customerMobilesApple'

import CustomerTablets                          from './components/Customer/customerTablets'
import CustomerTabletSamsung                    from './components/Customer/customerTabletsSamsung'
import CustomerTabletXiaomi                     from './components/Customer/customerTabletsXiaomi'
import CustomerTabletApple                      from './components/Customer/customerTabletsApple'

import CustomerLaptops                          from './components/Customer/customerLaptops'
import CustomerLaptopLenovo                     from './components/Customer/customerLaptopsLenovo'
import CustomerLaptopAsus                       from './components/Customer/customerLaptopsAsus'
import CustomerLaptopApple                      from './components/Customer/customerLaptopsApple'

import CustomerProduct                          from './components/Customer/customerProduct'
import CustomerReview                           from './components/Customer/customerReview'
import CustomerFavorites                        from './components/Customer/customerFavorites'
import CustomerRecents                          from './components/Customer/customerRecents.js'


import Sellers                                  from './components/Seller/seller'
import SellerChange                             from './components/Seller/sellerChange'
import SellerReviews                            from './components/Seller/sellerReviews'
import SellerStores                             from './components/Seller/sellerStores'
import SellerViewStore                          from './components/Seller/sellerViewStore'
import SellerNewStores                          from './components/Seller/sellerNewStores'
import SellerStoresNewProduct                   from './components/Seller/sellerStoresNewProduct'
import SellerStoresNewProductExisting           from './components/Seller/sellerStoresNewProductExisting'
import SellerStoresNewProductNew                from './components/Seller/sellerStoresNewProductNew'



const routing = () =>(
    <div>
    <Switch>
    <Route exact path="/" component={Home} label="Home"/>
        <Route exact path="/accounts/" render = {props => <Accounts {...props}/>} />
        <Route exact path="/accounts/sign-up" render = {props => <AccountType {...props}/>} />
        <Route exact path="/accounts/sign-up/customer" component={CustomerSignUp} />
        <Route exact path="/accounts/sign-up/seller" component={SellerSignUp} />
        <Route exact path="/accounts/log-in" component={LogIn} />

        <Route exact path="/accounts/admin/:id" component={Admins} /> 

        <Route exact path="/accounts/customers/:id" render = {props => <Customers {...props}/>} /> 


        <Route exact path="/accounts/sellers/:id" render = {props => <Sellers {...props}/>} /> 
        

        <Route exact path="/accounts/customers/:id/product/mobiles" component={CustomerMobiles} /> 
        <Route exact path="/accounts/customers/:id/product/tablets" component={CustomerTablets} /> 
        <Route exact path="/accounts/customers/:id/product/laptops" component={CustomerLaptops} />

        <Route exact path="/accounts/customers/:id/product/mobiles/samsung" component={CustomerMobileSamsung} /> 
        <Route exact path="/accounts/customers/:id/product/mobiles/xiaomi" component={CustomerMobileXiaomi} /> 
        <Route exact path="/accounts/customers/:id/product/mobiles/apple" component={CustomerMobileApple} /> 

        <Route exact path="/accounts/customers/:id/product/tablets/samsung" component={CustomerTabletSamsung} /> 
        <Route exact path="/accounts/customers/:id/product/tablets/xiaomi" component={CustomerTabletXiaomi} /> 
        <Route exact path="/accounts/customers/:id/product/tablets/apple" component={CustomerTabletApple} /> 

        <Route exact path="/accounts/customers/:id/product/laptops/lenovo" component={CustomerLaptopLenovo} /> 
        <Route exact path="/accounts/customers/:id/product/laptops/asus" component={CustomerLaptopAsus} /> 
        <Route exact path="/accounts/customers/:id/product/laptops/apple" component={CustomerLaptopApple} /> 

        <Route exact path="/accounts/customers/:id/product/:id" component={CustomerProduct} /> 
        <Route exact path="/accounts/customers/:id/sellers/:id/review" component={CustomerReview} />
        <Route exact path="/accounts/customers/:id/favorites" component={CustomerFavorites} />  
        <Route exact path="/accounts/customers/:id/recents" component={CustomerRecents} /> 


        <Route exact path="/accounts/sellers/:id/change" render = {props => <SellerChange {...props}/>} /> 
        <Route exact path="/accounts/sellers/:id/reviews" component={SellerReviews} /> 
        <Route exact path="/accounts/sellers/:id/stores" component={SellerStores} /> 
        <Route exact path="/accounts/sellers/:id/stores/new" render = {props => <SellerNewStores {...props}/>} /> 
        <Route exact path="/accounts/sellers/:id/stores/:id" component={SellerViewStore} /> 
        <Route exact path="/accounts/sellers/:id/stores/:id/product/new" component={SellerStoresNewProduct} /> 
        <Route exact path="/accounts/sellers/:id/stores/:id/product/new/exists" render = {props => <SellerStoresNewProductExisting {...props}/>} /> 
        <Route exact path="/accounts/sellers/:id/stores/:id/product/new/new" render = {props => <SellerStoresNewProductNew {...props}/>} /> 



    </Switch>
    </div>
)
export default routing;

//removed <Route exact path="/accounts/customers/:id/product?q=react" component={CustomerSearch} /> 

//We need to add routes for the following will add more
//when i realize we need more routes


// /accounts                                                                : shows the sign up or log in buttons


// /accounts/log-in                                                          : login page
// /accounts/sign-up                                                         : sign up page (can lead to login or main page)
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