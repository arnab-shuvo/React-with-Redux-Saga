import React, { Component, Fragment } from "react";
import IntlMessages from "Util/IntlMessages";
import { Row, Card, CardTitle, Form, Label, Input, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { Colxx } from "Components/CustomBootstrap";
import piranhaConfig from "../../../piranhaConfig";
import { connect } from "react-redux";
import { loginUser } from "Redux/actions";

class ConfirmForgetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password:{
                new_password: "",
                confirm_password: "",
            },
            error: {
                password: ""
            },
            feedback: ''
        };
    }
    resetError = () =>{
        let error =  {
            password: ""
        }
        this.setState({ error});
    }
    changePassword = (e) =>{
        let password = {...this.state.password}
        password.new_password = e.target.value;
        this.setState({password})
    }
    confirm_password = (e) =>{
        let password = {...this.state.password}
        password.confirm_password = e.target.value;
        this.setState({password})
    }
    onPasswordChange = () =>{
        this.resetError();
        let password = {...this.state.password}
        let error = {...this.state.error}
        if(password.new_password === "" || password.confirm_password === ""){
            error.password = "Password And Confirm Password Required";
            this.setState({error});
            return;
        }
        else if (password.new_password !== password.confirm_password){
            error.password = "Password And Confirm Password Mismatched";
            this.setState({error});
            return;
        }
        else if (password.new_password.length < 8){
            error.password = "Password Must be 8 Characters Long";
            this.setState({error});
            return;
        }
        let comp_this = this;
        axios.defaults.headers.post["Content-Type"] = "application/json";
        axios.defaults.headers.post["ResetToken"] = this.props.match.params.id;
        axios.post(piranhaConfig.apiBaseUrl + piranhaConfig.route.reset_password, password)
            .then(function (response) {
                let feedback = response.data;
                comp_this.setState({feedback})
            })
            .catch(function (error) {
                let feedback = error.response.data;
                comp_this.setState({feedback})
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
                                            {/*<IntlMessages id="user.change-password" />*/}
                                            {this.state.feedback}
                                        </CardTitle>
                                        <Form>
                                            <Label className="form-group has-float-label mb-4">
                                                <Input
                                                    type="password"
                                                    onChange={this.changePassword}
                                                    value={this.state.password.new_password}
                                                />
                                                <IntlMessages
                                                    id="user.password"
                                                />
                                                <p className={"error-msg"}>
                                                    {this.state.error.password}
                                                </p>
                                            </Label><Label className="form-group has-float-label mb-4">
                                                <Input
                                                    type="password"
                                                    onChange={this.confirm_password}
                                                    value={this.state.password.confirm_password}
                                                />
                                                <IntlMessages
                                                    id="user.password"
                                                />
                                                <p className={"error-msg"}>
                                                    {this.state.error.password}
                                                </p>
                                            </Label>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <Button
                                                    color="primary"
                                                    className="btn-shadow"
                                                    size="lg"
                                                    onClick={() => this.onPasswordChange()}
                                                >
                                                    <IntlMessages id="user.change-password" />
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

export default ConfirmForgetPassword;