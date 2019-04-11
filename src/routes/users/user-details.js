import React, { Component, Fragment } from "react";
import axios from 'axios';
import piranhaConfig from '../../../piranhaConfig.js'
import { Row, Button, Input, Label,} from "reactstrap";
import { Colxx, Separator } from "Components/CustomBootstrap";
import { BreadcrumbItems } from "Components/BreadcrumbContainer";
import IntlMessages from "Util/IntlMessages";
import Select from "react-select";


class Userdetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                username : '',
                forename : '',
                surname : '',
                email : '',
                gender : '',
                role : '',
                company : '',
                country : '',
            },
            disabled: false,
            selectedRole: null,
            selectedGender: null,
            gender: [
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' }
            ],
            role: [
                { value: 'user', label: 'User' },
                { value: 'admin', label: 'Admin' }
            ],
            error:{
                username:'',
                email:''
            },
            feedback: ''
        };
    }
    componentDidMount() {
        let id = this.props.match.params.id;
        let comp_this = this;

        axios.defaults.headers.get["Authorization"] = localStorage.getItem('session_key');
        axios.get(piranhaConfig.apiBaseUrl + piranhaConfig.route.users + '/' + id)
            .then(function (response) {
                let selectedRole = {};
                if (response.data.role === 'admin'){
                    selectedRole ={
                        value: 'admin', label: 'Admin'
                    }
                }
                else{
                    selectedRole ={
                        value: 'user', label: 'User'
                    }
                }
                let selectedGender= {};
                if (response.data.gender === 'male') {
                    selectedGender ={
                        value: 'male', label: 'Male'
                    }
                }
                else{
                    selectedGender ={
                        value: 'female', label: 'Female'
                    }
                }
                comp_this.setState({ user: response.data , selectedRole, selectedGender})
            })
            .catch(function (error) {
                console.log(error.response);
            });
    }
    gender = (selectedGender) =>{
        let user = {...this.state.user}
        user.gender = selectedGender.value;
        this.setState({ selectedGender, user });
    };
    role = (selectedRole) =>{
        let user = {...this.state.user}
        user.role = selectedRole.value;
        this.setState({ selectedRole, user });
    };
    username = (e) =>{
        let user = {...this.state.user};
        user.username = e.target.value;
        this.setState({ user});
    };
    email = (e) =>{
        let user = {...this.state.user};
        user.email = e.target.value;
        this.setState({ user});
    };
    company = (e) =>{
        let user = {...this.state.user};
        user.company = e.target.value;
        this.setState({ user});
    };
    forename = (e) =>{
        let user = {...this.state.user};
        user.forename = e.target.value;
        this.setState({ user});
    };
    surname = (e) =>{
        let user = {...this.state.user};
        user.surname = e.target.value;
        this.setState({ user});
    };
    country = (e) =>{
        let user = {...this.state.user};
        user.country = e.target.value;
        this.setState({ user});
    };
    validateEmail = (email) =>{
        let pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(email)
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
    updateuser = () =>{
        this.resetError();
        let id = this.props.match.params.id;
        const user = this.state.user;
        let error = this.state.error;
        if(user.username ==="" || user.email === ""){
            if (user.username === ""){
                error.username = "Username Required";
            }
            if (user.email === ""){
                error.email = "Email Required";
            }
            this.setState({error});
            return;
        }
        if (!this.validateEmail(user.email)) {
            error.email = "Invalid Email";
            this.setState({error});
            return;
        }
        let comp_this = this;
        axios.defaults.headers.put["Content-Type"] = "application/json";
        axios.defaults.headers.put["Authorization"] = localStorage.getItem('session_key');
        axios.put(piranhaConfig.apiBaseUrl + piranhaConfig.route.users+ '/' +id, user)
            .then(function (response) {
                comp_this.setState({feedback: response.data});
            })
            .catch(function (error) {
                comp_this.setState({feedback: error.response.data});
            });
    }
    render() {
        const user = this.state.user;
        return (
            <Fragment>
                <div className="disable-text-selection">
                    <Row>
                        <Colxx xxs="12">
                            <div className="mb-2 clearfix">
                                <h1>
                                    {user.forename + " " + user.surname}
                                </h1>

                                <BreadcrumbItems match={this.props.match} />
                            </div>


                            <Separator className="mb-5" />
                        </Colxx>
                        <Colxx xxs="9">
                            <Row>
                                <Colxx xxs="6">
                                    <Label>
                                        <IntlMessages id="user.forename" />
                                    </Label>
                                    <Input type="text"
                                           value={this.state.user.forename}
                                           onChange={this.forename}
                                           disabled = {(this.state.disabled)? "disabled" : ""}
                                    />
                                    <p className={"error-msg"}>
                                        
                                    </p>
                                    <Label>
                                        <IntlMessages id="user.surname" />
                                    </Label>
                                    <Input type="text"
                                           value={this.state.user.surname}
                                           onChange={this.surname}
                                           disabled = {(this.state.disabled)? "disabled" : ""}
                                    />
                                    <p className={"error-msg"}>
                                        
                                    </p>
                                    <Label>
                                        <IntlMessages id="user.company" />
                                    </Label>
                                    <Input type="text"
                                           value={this.state.user.company}
                                           onChange={this.company}
                                           disabled = {(this.state.disabled)? "disabled" : ""}
                                    />
                                    <p className={"error-msg"}>
                                        
                                    </p>
                                    <Label>
                                        <IntlMessages id="user.country" />
                                    </Label>
                                    <Input type="text"
                                           value={this.state.user.country}
                                           onChange={this.country}
                                           disabled = {(this.state.disabled)? "disabled" : ""}
                                    />
                                </Colxx>
                                <Colxx xxs="6">
                                    <Label>
                                        <IntlMessages id="user.username" />
                                    </Label>
                                    <Input type="text"
                                           value={this.state.user.username}
                                           onChange={this.username}
                                           disabled = {(this.state.disabled)? "disabled" : ""}
                                    />
                                    <p className={"error-msg"}>
                                        {this.state.error.username}
                                    </p>
                                    <Label>
                                        <IntlMessages id="user.email" />
                                    </Label>
                                    <Input type="text"
                                           value={this.state.user.email}
                                           onChange={this.email}
                                           disabled = {(this.state.disabled)? "disabled" : ""}
                                    />
                                    <p className={"error-msg"}>
                                        {this.state.error.email}
                                    </p>
                                    <Label>
                                        <IntlMessages id="user.role" />
                                    </Label>
                                    <Select
                                        value={this.state.selectedRole}
                                        onChange={this.role}
                                        options={this.state.role}
                                        className="react-select"
                                        classNamePrefix="react-select"
                                        name="form-field-name"
                                    />
                                    <p className={"error-msg"}>
                                        
                                    </p>
                                    <Label>
                                        <IntlMessages id="user.gender" />
                                    </Label>
                                    <Select
                                        value={this.state.selectedGender}
                                        onChange={this.gender}
                                        options={this.state.gender}
                                        className="react-select"
                                        classNamePrefix="react-select"
                                        name="form-field-name"
                                    />
                                    <p className={"error-msg"}>
                                        
                                    </p>
                                </Colxx>
                                <Colxx xxs="6" >
                                    <p></p>
                                    <Button
                                        color="primary"
                                        className="btn-shadow "
                                        size="lg"
                                        onClick={() => this.updateuser()}
                                    >
                                        <IntlMessages id="user.update" />
                                    </Button>
                                    <h2 className={"error-msg"}>
                                        {this.state.feedback}
                                    </h2>
                                </Colxx>

                            </Row>
                        </Colxx>
                        <Colxx xxs="3">
                            <img
                                alt={user.username}
                                src={'http://portal.bilardo.gov.tr/assets/pages/media/profile/profile_user.jpg'}
                                className="card-img-top responsive border-0"
                            />
                        </Colxx>

                    </Row>
                </div>
            </Fragment>
        );
    }
}

export default Userdetails;