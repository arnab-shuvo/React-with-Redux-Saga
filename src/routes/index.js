import React, { Component } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';

import TopNav from 'Containers/TopNav'
import Sidebar from 'Containers/Sidebar';

import dashboards from './dashboards';
import layouts from './layouts';
import applications from './applications';
import products from './products';
import Users from './users/index';
import Profile from './profile';
import ui from './ui';

import { connect } from 'react-redux';

class MainApp extends Component {
	componentDidMount(){		
		const session_key = localStorage.getItem('session_key');
		const expires_at = localStorage.getItem('expires_at');
		if ((session_key === null) || (session_key === "undefined") || (expires_at === null) || (expires_at === "undefined")) {
			this.props.history.push('/login');
		}
	}
	render() {
		const { match, containerClassnames} = this.props;
		return (
			<div id="app-container" className={containerClassnames}>
				<TopNav history={this.props.history} />
				<Sidebar/>
				<main>
					<div className="container-fluid">
						<Switch>
							<Route path={`${match.url}/applications`} component={applications} />
							<Route path={`${match.url}/dashboards`} component={dashboards} />
							<Route path={`${match.url}/layouts`} component={layouts} />
							<Route path={`${match.url}/products`} component={products} />
							<Route path={`${match.url}/users`} component={Users} />
							<Route path={`${match.url}/profile`} component={Profile} />
							<Route path={`${match.url}/ui`} component={ui} />
							<Redirect to="/error" />
						</Switch>
					</div>
				</main>
			</div>
		);
	}
}
const mapStateToProps = ({ menu }) => {
	const { containerClassnames} = menu;
	return { containerClassnames };
  }
  
export default withRouter(connect(mapStateToProps, {})(MainApp));