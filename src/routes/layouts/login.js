import React, { Component, Fragment } from "react";
import IntlMessages from "Util/IntlMessages";
import { Row, Card, CardTitle, Form, Label, Input, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { Colxx } from "Components/CustomBootstrap";
import piranhaConfig from "../../../piranhaConfig";
import { connect } from "react-redux";
import { loginUser } from "Redux/actions";

class LoginLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      session_key: "",
      expires_at: "",
      error: {
        username: "",
        password: ""
      }
    };
  }
  resetError = () =>{
    let error =  {
      username: "",
      password: ""
    }    
    this.setState({ error});
  }
  onRegister = () =>{
    this.props.history.push('/register');
  }
  onUserLogin = () => {
    this.resetError();
    let username = this.state.username;
    let password = this.state.password;
    let error = { ...this.state.error };

    if (username === "" || password === "") {      
      if (username === "") {
        error.username = "Username Required !!!!";
      }
      if (password === "") {
        error.password = "Password Required !!!!";
      }
      this.setState({ error });
      return;
    }
    if (password.length < 8){
      error.password = "Password must be greater than 8 characters !!!!";
      this.setState({ error });
      return;
    }
    let data = { password: password, username: username};
    let comp_this = this;    
    let responseData = {
      session_key: '',
      expires_at: '',
      role: '',
      email: ''
    }
    axios.defaults.headers.post["Content-Type"] = "application/json";
    axios.post(piranhaConfig.apiBaseUrl + "auth", data)
      .then(function (response) {   

        responseData.session_key = response.data.session_key;
        responseData.expires_at = response.data.expires_at; 
        responseData.role = response.data.user.role; 
        responseData.email = response.data.user.email; 
        
        comp_this.storeToRedux(responseData);
      })
      .catch(function (error) {
        console.log(error);
      });

  };
  storeToRedux = (responseData) => {
    this.props.loginUser(responseData, this.props.history);
  }
  changeUserName = e => {
    let username = e.target.value.trim();
    this.setState({ username });
  };
  changePassword = e => {
    let password = e.target.value.trim();
    this.setState({ password });
  };

  componentDidMount() {
    document.body.classList.add("background");
    const session_key = localStorage.getItem('session_key');
    const expires_at = localStorage.getItem('expires_at');
    if (session_key && session_key !== "undefined" && expires_at && expires_at !== "undefined") {
     this.props.history.push('/app');
    }

  }
  componentWillUnmount() {
    document.body.classList.remove("background");
  }
  render() {    
    return (
      <Fragment>
        <div className="fixed-background" />
        <main>
          <div className="container">
            <Row className="h-100">
              <Colxx xxs="12" md="10" className="mx-auto my-auto">
                <Card className="auth-card">
                  <div className="position-relative image-side ">
                    <p className="text-white h2">MAGIC IS IN THE DETAILS </p>
                    <p className="white mb-0">
                      Please use your credentials to login.
                      <br />
                      If you are not a member, please{" "}
                      <NavLink to={`/register`} className="white">
                        register
                      </NavLink>
                      .
                    </p>
                  </div>
                  <div className="form-side">
                    <NavLink to={`/`} className="white">
                      <span className="logo-single" />
                    </NavLink>
                    <CardTitle className="mb-4">
                      <IntlMessages id="user.login-title" />
                    </CardTitle>
                    <Form>
                      <Label className="form-group has-float-label mb-4">
                        <Input
                          type="text"
                          onChange={this.changeUserName}
                          value={this.state.username}
                        />
                        <IntlMessages id="user.username" />
                        <p className={"error-msg"}>
                          {this.state.error.username}
                        </p>
                      </Label>
                      <Label className="form-group has-float-label mb-4">
                        <Input
                          type="password"
                          onChange={this.changePassword}
                          value={this.state.password}
                        />
                        <IntlMessages
                          id="user.password"
                          value={this.state.password}
                        />
                        <p className={"error-msg"}>
                          {this.state.error.password}
                        </p>
                      </Label>
                      <div className="d-flex justify-content-between align-items-center">
                        <NavLink to={`/forgot-password`}>
                          <IntlMessages id="user.forgot-password-question" />
                        </NavLink>
                        <Button
                          color="primary"
                          className="btn-shadow"
                          size="lg"
                          onClick={() => this.onUserLogin()}
                        >
                          <IntlMessages id="user.login-button" />
                        </Button>
                        <Button
                          color="primary"
                          className="btn-shadow"
                          size="lg"
                          onClick={() => this.onRegister()}
                        >
                          <IntlMessages id="user.register" />
                        </Button>
                      </div>
                    </Form>
                  </div>
                </Card>
              </Colxx>
            </Row>
          </div>
        </main>
      </Fragment>
    );
  }
}
const mapStateToProps = ({ authUser }) => {
  const {
    user,
    session_key,
    expires_at,
    loading
  } = authUser;
  return {
    user,
    loading,
    session_key,
    expires_at
  };
};

export default connect(
  mapStateToProps,
  {
    loginUser
  }
)(LoginLayout);
