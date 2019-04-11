import React, { Component, Fragment } from "react";
import IntlMessages from "Util/IntlMessages";
import { Row, Card, CardTitle, Form, Label, Input, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import CustomSelectInput from "Components/CustomSelectInput";
import { Colxx } from "Components/CustomBootstrap";
import Select from "react-select";
import { connect } from "react-redux";
import { registerUser } from "Redux/actions";
import piranhaConfig from "../../../piranhaConfig";
import axios from "axios";

const selectData = [
  { label: "Chocolate", value: "chocolate", key: 0 },
  { label: "Vanilla", value: "vanilla", key: 1 },
  { label: "Strawberry", value: "strawberry", key: 2 },
  { label: "Caramel", value: "caramel", key: 3 },
  { label: "Cookies and Cream", value: "cookiescream", key: 4 },
  { label: "Peppermint", value: "peppermint", key: 5 }
];
class RegisterLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user : {
            username: "",
            email: "",
            password: "",
            confirm_password: "",
            forename: "",
            surname: "",
            gender: "",
            company: "",
            country: "",
      },
      error:{
            username: "",
            email: "",
            password: "",
            confirm_password: "",
      }
      
    };
  }
  country = selectedOptionLabelOver => {
    let user = {...this.state.user};
    user.country = selectedOptionLabelOver;
    this.setState({ user });
  };
  username = (e) =>{
    let user = {...this.state.user};
    user.username = e.target.value.trim();
    this.setState({user});
  }
  email = (e) => {
    let user = {...this.state.user};
    user.email = e.target.value.trim();
    this.setState({user});
  }
  password = (e) => {
    let user = {...this.state.user};
    user.password = e.target.value.trim();
    this.setState({user});
  }
  confirm_password = (e) => {
    let user = {...this.state.user};
    user.confirm_password = e.target.value.trim();
    this.setState({user});
  }
  forename = (e) => {
    let user = {...this.state.user};
    user.forename = e.target.value.trim();
    this.setState({user});
  }
  surname = (e) => {
    let user = {...this.state.user};
    user.surname = e.target.value.trim();
    this.setState({user});
  }
  gender = (e) => {
    let user = {...this.state.user};
    user.gender = e.target.value.trim();
    this.setState({user});
  }
  company = (e) => {
    let user = {...this.state.user};
    user.company = e.target.value.trim();
    this.setState({user});
  }
  resetError = () =>{
    let error = {
      username: "",
      email: "",
      password: "",
      confirm_password: "",
    }
    this.setState({error});
  }
  validateEmail = (email) =>{
     let pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     return pattern.test(email)
  }

  onUserRegister() {
    this.resetError();
    const { username, 
      email, password, 
      confirm_password, 
      forename, surname, 
      gender, company, 
      country} = this.state.user;
      if (username === '' || email === '' || password === '' || ( password.length < 8)) {
        let error = {...this.state.error};
        if (username === '') {          
          error.username = "Username Required";          
        }
        if (email === '') {
          error.email = "Email Required";
        }
        if (password === '') {
          error.password = "Password Required";
        }
        if (password.length < 8) {
          error.password = "Password length must be 8 characters";
        }
        this.setState({error});
        return;
      }
      
      else if (password !== confirm_password) {
        let error = {...this.state.error};
        error.password = "Password Mismatch";
        this.setState({error});
        return;
      }
      else if (!this.validateEmail(email)) {
        let error = {...this.state.error};
        error.email = "Invalid Email";
        this.setState({error});
        return;
      }
      let data = {
          username: username,
          email: email,
          password: password,
          confirm_password: confirm_password,
          forename: forename,
          surname: surname,
          gender: gender,
          company: company,
          country: country,
      }
      let comp_this = this;
      axios.defaults.headers.post["Content-Type"] = "application/json";
      axios.post(piranhaConfig.apiBaseUrl + piranhaConfig.route.register, data)
        .then(function (response) {
          comp_this.props.history.push('/login');
        })
        .catch(function (error) {
          console.log(error.response);
        });
      
  }

  componentDidMount() {
    document.body.classList.add("background");
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
                    <p className="text-white h2">MAGIC IS IN THE DETAILS</p>
                    <p className="white mb-0">
                      Please use this form to register. <br />
                      If you are a member, please{" "}
                      <NavLink to={`/login`} className="white">
                        login
                      </NavLink>
                      .
                    </p>
                  </div>
                  <div className="form-side">
                    <NavLink to={`/`} className="white">
                      <span className="logo-single" />
                    </NavLink>
                    <CardTitle className="mb-4">
                      <IntlMessages id="user.register" />
                    </CardTitle>
                    < Form >
                      <Row className = "h-100" >
                        <Colxx xxs="6" md="6" className="mx-auto my-auto">
                          <Label className="form-group has-float-label mb-4">
                            <Input onChange={this.username} type="text" value={this.state.user.username} />
                            <IntlMessages id="user.username" />
                            <p className={"error-msg"}>
                              {this.state.error.username}
                            </p>
                          </Label>
                          <Label className="form-group has-float-label mb-4">
                            <Input type="email" onChange={this.email} value={this.state.user.email} />
                            <IntlMessages id="user.email" />
                            <p className={"error-msg"}>
                              {this.state.error.email}
                            </p>
                          </Label>
                          <Label className="form-group has-float-label mb-4">
                            <Input type="text" onChange={this.forename} value={this.state.user.forename} />
                            < IntlMessages id = "user.forename" />
                          </Label>
                          <Label className="form-group has-float-label mb-4">
                            <Input type="text" onChange={this.surname} value={this.state.user.surname} />
                            < IntlMessages id = "user.surname" />
                          </Label>                         
                          <Label className="form-group has-float-label mb-4">
                            <Input type="text" onChange={this.gender} value={this.state.user.gender} />
                            < IntlMessages id = "user.gender" />
                          </Label>                              
                                                                               
                        </Colxx>
                        <Colxx xxs="6" md="6" className="">
                          
                          <Label className="form-group has-float-label mb-4">
                            <Input type="password" onChange={this.password} />
                            <IntlMessages
                              id="user.password"
                              value={this.state.user.password}
                            />
                            <p className={"error-msg"}>
                              {this.state.error.password}
                            </p>
                          </Label>
                          <Label className="form-group has-float-label mb-4">
                            <Input type="password" onChange={this.confirm_password} />
                            <IntlMessages
                              id = "user.confirmPassword"
                              value={this.state.user.confirm_password}
                            />
                            <p className={"error-msg"}>
                              {this.state.error.password}
                            </p>
                          </Label>
                          <Label className="form-group has-float-label mb-4">
                            <Input type="text" onChange={this.company} value={this.state.user.company} />
                            < IntlMessages id = "user.company" />
                          </Label>  
                          <div className="form-group has-float-label">
                            <Select
                              components={{ Input: CustomSelectInput }}
                              className="react-select"
                              classNamePrefix="react-select"
                              name="form-field-name"
                              value={this.state.user.country}
                              onChange={this.country}
                              options={selectData}
                            />
                            <IntlMessages id="user.country" />
                          </div>  
                          <div className="d-flex justify-content-end align-items-center">
                              <Button
                                color="primary"
                                className="btn-shadow"
                                size="lg"
                                onClick={() => this.onUserRegister()}
                              >
                                <IntlMessages id="user.register-button" />
                              </Button>
                          </div>
                          
                        </Colxx>
                      </Row>
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
  const { user, loading } = authUser;
  return { user, loading };
};

export default connect(
  mapStateToProps,
  {
    registerUser
  }
)(RegisterLayout);
