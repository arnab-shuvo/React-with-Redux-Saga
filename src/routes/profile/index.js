import React, {Component} from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import MyProfile from './my_profile'
import ChangePassword from './change_password'

const Profile = ({ match }) => (
            <div className="dashboard-wrapper">
                <Switch>
                    <Route path={`${match.url}/change_password`} component={ChangePassword} />
                    <Route path={`${match.url}/my_profile`} component={MyProfile} />
                    <Redirect to="/error" />

                </Switch>
            </div>
);


export default Profile;