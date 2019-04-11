import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import ProductListLayout from './product-list';
import Productdetails from './product-details';

const Products = ({ match }) => (
    <div className="dashboard-wrapper">
        <Switch>
            <Route path={`${match.url}/product-details/:id`} component={Productdetails} />         
            <Route path={`${match.url}/product-list`} component={ProductListLayout} />
            <Route path={`${match.url}/`} component={ProductListLayout} />
            <Redirect to="/error" />
          
        </Switch>
    </div>
);

export default Products;