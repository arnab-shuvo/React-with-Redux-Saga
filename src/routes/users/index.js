import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Userdetails from './user-details'
import UserListLayout from './user-list'

const Users = ({ match }) => (
            <div className="dashboard-wrapper">
                <Switch>
                    <Route path={`${match.url}/user-details/:id`} component={Userdetails} />
                    <Route path={`${match.url}/user-list`} component={UserListLayout} />
                    <Route path={`${match.url}/`} component={UserListLayout} />
                    <Redirect to="/error" />

                </Switch>
            </div>
);

export default Users;