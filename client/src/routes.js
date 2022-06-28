import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './components/Home'


const routing = () =>(
    <div>
    <Switch>
    <Route exact path="/" component={Home} label="Home"/>

    </Switch>
    </div>
)
export default routing;

//We need to add routes for the following will add more
//when i realize we need more routes


// /accounts                                                     : shows the sign up or log in buttons


// /accounts/login                                               : login page
// /accounts/signup                                              : sign up page (can lead to login or main page)
// (put a choice for customer, seller, admin in login)
// (dont put admin in signup, admin is introduced manually)


// /accounts/admin/:id
// /accounts/customers/:id                                       : main customer page (happens after logging in) (sees all products, can click on products, can search products, can filter products)
// /accounts/sellers/:id                                         : main seller page (happens after logging in) (can view products, add products, change products)


// /accounts/customers/:id/product?searchedName                  : show searched product for customer (Dont know if we should use query like that) (search in all details entered for the products)
// /accounts/customers/:id/product/filterName                    : show all products in the filtered category (filterName includes: mobiles, tablets, laptops)
// /accounts/customers/:id/product/filterName/filterName2        : filterName2 is for the different brands(shown below)
// /accounts/customers/:id/product/:id                           : shows specific product to customer


// /accounts/sellers/:id/product/new                             : show create product page
// /accounts/sellers/:id/product/change                          : show change product page


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