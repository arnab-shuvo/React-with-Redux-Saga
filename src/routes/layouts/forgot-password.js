import React, { Component, Fragment } from "react";
import IntlMessages from "Util/IntlMessages";
import { Row, Card, CardTitle, Form, Label, Input, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import piranhaConfig from "../../../piranhaConfig"
import { Colxx } from "Components/CustomBootstrap";
import axios from "axios";

class ForgotPasswordLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      error: ""
    };
  }

  componentDidMount() {
    document.body.classList.add("background");
  }
  componentWillUnmount() {
    document.body.classList.remove("background");
  }
  emailChange = (e) =>{
    let email = e.target.value;
    this.setState({email});
  }
  forgetEmail = () =>{
    let data = {
      email : this.state.email
    }
    if (data.email.length < 5) {
      this.setState({error : 'Invalid Email, Valid Email Required'})
      return;
    }
    let comp_this = this;
    axios.defaults.headers.post["Content-Type"] = "application/json";
    axios.post(piranhaConfig.apiBaseUrl + piranhaConfig.route.forgetPassword, data)
      .then(function (response) {
          if (response.status === 200) {
            comp_this.setState({error: "Varification link Sent to your Email"});
          }
        
      })
      .catch(function (error) {
        comp_this.setState({ error: error.response.data });
      });

    
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
                      Please use your e-mail to reset your password. <br />
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
                      <IntlMessages id="user.forgot-password" />
                    </CardTitle>
                    <Form>
                      <Label className="form-group has-float-label mb-4">
                        <Input type="email" onChange={this.emailChange} value={this.state.email} />
                        <IntlMessages id="user.email" />
                        <p className={"error-msg"}>
                          {this.state.error}
                        </p>
                      </Label>

                      <div className="d-flex justify-content-end align-items-center">
                        <Button
                          onClick={this.forgetEmail}
                          color="primary"
                          className="btn-shadow"
                          size="lg"
                        >
                          <IntlMessages id="user.reset-password-button" />
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

export default ForgotPasswordLayout;
