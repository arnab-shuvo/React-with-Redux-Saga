import React, {Component, Fragment} from 'react';
import axios from 'axios';
import piranhaConfig from '../../../piranhaConfig.js'
import { Row, Button, Input, Label,} from "reactstrap";
import { Colxx, Separator } from "Components/CustomBootstrap";
import { BreadcrumbItems } from "Components/BreadcrumbContainer";
import IntlMessages from "Util/IntlMessages";


class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password:{
                old_password: '',
                new_password: '',
                confirm_password: ''
            },
            error:{
                old_password: '',
                password: ''
            },
            feedback: ''
        };
    }
    oldpassword = (e) =>{
        let password = {...this.state.password}
        password.old_password = e.target.value;
        this.setState({password})
    }
    new_password = (e) =>{
        let password = {...this.state.password}
        password.new_password = e.target.value;
        this.setState({password})
    }
    confirm_password = (e) =>{
        let password = {...this.state.password}
        password.confirm_password = e.target.value;
        this.setState({password})
    }
    resetError = () =>{
        let error = {
            old_password: '',
            password: ""
        }
        this.setState({error});
    }
    updatePass = () =>{
        this.resetError();
        let password = this.state.password;
        let error = this.state.error;
        if (password.old_password === '' || password.new_password === '' || password.confirm_password === '' ){
            if (password.old_password === '') {
                error.old_password = 'Provide current password'
            }
            if (password.new_password === '') {
                error.password = 'Provide new password'
            }
            if (password.confirm_password === '') {
                error.password = 'Confirm new password'
            }
            this.setState({error});
            return;
        }
        else if (password.new_password !== password.confirm_password ){
            error.password = 'Password Mismatched';
            this.setState({error});
            return;
        }
        else if(password.new_password.length < 8){
            error.password = 'Password must be 8 characters long';
            this.setState({error});
            return;
        }
        let comp_this = this;
        axios.defaults.headers.put["Content-Type"] = "application/json";
        axios.defaults.headers.put["Authorization"] = localStorage.getItem('session_key');
        axios.put(piranhaConfig.apiBaseUrl + piranhaConfig.route.change_password, password)
            .then(function (response) {
                comp_this.setState({feedback: response.data});
            })
            .catch(function (error) {
                comp_this.setState({feedback: error.response.data});
            });
    }

    render() {
        return (
            <Fragment>
                <div className="disable-text-selection">
                    <Row>
                        <Colxx xxs="12">
                            <div className="mb-2 clearfix">
                                <h1>
                                    Change Password
                                </h1>

                                <BreadcrumbItems match={this.props.match} />
                            </div>


                            <Separator className="mb-5" />
                        </Colxx>
                        <Colxx xxs="9">
                            <Row>
                                <Colxx xxs="6">
                                    <Label>
                                        <IntlMessages id="user.oldpassword" />
                                    </Label>
                                    <Input type="password"
                                           value={this.state.password.old_password}
                                           onChange={this.oldpassword}
                                    />
                                    <p className={"error-msg"}>
                                        {this.state.error.old_password}
                                    </p>
                                    <Label>
                                        <IntlMessages id="user.new_password" />
                                    </Label>
                                    <Input type="password"
                                           value={this.state.password.new_password}
                                           onChange={this.new_password}
                                    />
                                    <p className={"error-msg"}>
                                        {this.state.error.password}
                                    </p>
                                    <Label>
                                        <IntlMessages id="user.confirm_password" />
                                    </Label>
                                    <Input type="password"
                                           value={this.state.password.confirm_password}
                                           onChange={this.confirm_password}
                                    />
                                    <p className={"error-msg"}>
                                        {this.state.error.password}
                                    </p>

                                    <p></p>
                                    <Button
                                        color="primary"
                                        className="btn-shadow "
                                        size="lg"
                                        onClick={() => this.updatePass()}
                                    >
                                        <IntlMessages id="user.update" />
                                    </Button>
                                    <h2 className={"error-msg"}>
                                        {this.state.feedback}
                                    </h2>

                                </Colxx>

                            </Row>
                        </Colxx>

                    </Row>
                </div>
            </Fragment>
        );
    }
}

export default ChangePassword;