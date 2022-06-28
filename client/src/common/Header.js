import React from 'react';
import {Link} from 'react-router-dom';
const Header = () =>
  (
     <nav className="navbar navbar-expand-lg navbar-light bg-light">
     <Link className="navbar-brand" to="/">Torob Clone</Link>
     <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
       <span className="navbar-toggler-icon" />
     </button>
     <div className="collapse navbar-collapse" id="navbarSupportedContent">
       <ul className="navbar-nav mr-auto">
         <li className="nav-item { 'active': history.getCurrentLocation().pathname === '/' })}" >
           <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
         </li>
         <li className="nav-item { 'active': history.getCurrentLocation().pathname === '/accounts' })}">
           <Link className="nav-link" to="/accounts">Account</Link>
         </li>
       </ul>
     </div>
   </nav>
  )

export default Header;

//Probably need to change this page last for the view