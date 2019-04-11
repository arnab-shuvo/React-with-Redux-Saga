import React, { Component, Fragment } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { IntlProvider } from 'react-intl';

import ColorSwitcher from 'Components/ColorSwitcher'
import { NotificationContainer } from "Components/ReactNotifications";

import { defaultStartPath } from 'Constants/defaultValues'

import { connect } from "react-redux";

import AppLocale from '../lang';
import MainRoute from 'Routes';
import login from 'Routes/layouts/login'
import register from 'Routes/layouts/register'
import error from 'Routes/layouts/error'
import forgotPassword from 'Routes/layouts/forgot-password'
import ConfirmForgetPassword from 'Routes/layouts/confirm_forget_password'
import 'Assets/css/vendor/bootstrap.min.css'
import 'react-perfect-scrollbar/dist/css/styles.css';


const InitialPath = ({ component: Component, loggedIn, ...rest }) =>
	<Route
		{...rest}
		render={props =>
			loggedIn
				?  <Redirect
					to={{
						pathname: '/login',
						state: { from: props.location }
					}}
				/>
				: <Component {...props} />
				}
	/>;

class App extends Component {
	render() {			
		const { location, match, user, locale } = this.props;
		const session_key = localStorage.getItem('session_key');
		const expires_at = localStorage.getItem('expires_at');
		const currentAppLocale = AppLocale[locale];
		const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
		let expiary = (now < expires_at);
		
		let notExpired = false;
		let loggedIn = false;
		if (now < expires_at) {
			notExpired = true;
		}
		if (!expiary){
			localStorage.removeItem('session_key');
			localStorage.removeItem("expires_at");
		}
		
		if (session_key && session_key !== "undefined" && expires_at !== "undefined" && notExpired) {
      		loggedIn = true;
    	}		
		
		if (location.pathname === '/' || location.pathname === '/app' || location.pathname === '/app/') {
			return (<Redirect to={defaultStartPath} />);
		}
		return (
			<Fragment>
				<IntlProvider
					locale={currentAppLocale.locale}
					messages={currentAppLocale.messages}
				>

					<Fragment>
						<NotificationContainer />
						<Switch>
							
							<Route path={`/app`} component={MainRoute} />
							<Route path={`/login`} component={login} />
							<Route path={`/register`} component={register} />
							<Route path={`/confirm_forget_password/:id`} component={ConfirmForgetPassword} />
							<Route path={`/forgot-password`} component={forgotPassword} />
							<Route path={`/error`} component={error} />
							<Redirect to="/error" />
						</Switch>
						<ColorSwitcher />
					</Fragment>
				</IntlProvider>
			</Fragment>
		);
	}
}

const mapStateToProps = ({ authUser, settings }) => {
	const { user, session_key, expires_at } = authUser;
	const { locale } = settings;
	return { user,session_key, expires_at, locale };
};

export default connect(mapStateToProps, {})(App);

