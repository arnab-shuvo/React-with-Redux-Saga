import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import {
    Row,
    Card,
    CustomInput,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ButtonDropdown,
    UncontrolledDropdown,
    Collapse,
    DropdownMenu,
    DropdownToggle,
    DropdownItem,
    Input,
    CardBody,
    CardSubtitle,
    CardImg,
    Label,
    CardText,
    Badge
} from "reactstrap";
import { NavLink } from "react-router-dom";
import Select from "react-select";
import CustomSelectInput from "Components/CustomSelectInput";
import classnames from "classnames";

import IntlMessages from "Util/IntlMessages";
import { Colxx, Separator } from "Components/CustomBootstrap";
import { BreadcrumbItems } from "Components/BreadcrumbContainer";

import Pagination from "Components/List/Pagination";
import mouseTrap from "react-mousetrap";

import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
function collect(props) {
    return { data: props.data };
}
import { servicePath } from "Constants/defaultValues";
const apiUrl = servicePath + "/cakes/paging";
import axios from "axios";
import piranhaConfig from "../../../piranhaConfig.js";

class UserListLayout extends Component {
    constructor(props) {
        super(props);
        this.toggleDisplayOptions = this.toggleDisplayOptions.bind(this);
        this.toggleSplit = this.toggleSplit.bind(this);
        this.dataListRender = this.dataListRender.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.getIndex = this.getIndex.bind(this);
        this.onContextMenuClick = this.onContextMenuClick.bind(this);

        this.state = {
            displayMode: "thumblist",
            pageSizes: [8, 12, 24],
            selectedPageSize: 8,
            gender: [
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' }
            ],
            role: [
                { value: 'user', label: 'User' },
                { value: 'admin', label: 'Admin' }
            ],
            orderOptions: [
                { column: "username", label: "User Name" },
                { column: "forename", label: "Forename" },
                { column: "surname", label: "Surname" }
            ],
            selectedRole: null,
            selectedGender: null,
            selectedOrderOption: { column: "title", label: "Product Name" },
            dropdownSplitOpen: false,
            modalOpen: false,
            currentPage: 1,
            totalItemCount: 0,
            totalPage: 1,
            search: "",
            selectedItems: [],
            lastChecked: null,
            displayOptionsIsOpen: false,
            isLoading: false,
            user:{
                username:'',
                email:'',
                password:'',
                confirm_password:'',
                surname:'',
                forename:'',
                company:'',
                country:'',
                gender: '',
                role: '',
            },
            error:{
                username:'',
                email:'',
                password:''
            }
        };
    }
    componentWillMount() {
        this.props.bindShortcut(["ctrl+a", "command+a"], () =>
            this.handleChangeSelectAll(false)
        );
        this.props.bindShortcut(["ctrl+d", "command+d"], () => {
            this.setState({
                selectedItems: []
            });
            return false;
        });
    }

    toggleModal() {
        this.setState({
            modalOpen: !this.state.modalOpen
        });
    }
    toggleDisplayOptions() {
        this.setState({ displayOptionsIsOpen: !this.state.displayOptionsIsOpen });
    }
    toggleSplit() {
        this.setState(prevState => ({
            dropdownSplitOpen: !prevState.dropdownSplitOpen
        }));
    }
    changeOrderBy(column) {
        this.setState(
            {
                selectedOrderOption: this.state.orderOptions.find(
                    x => x.column === column
                )
            },
            () => this.dataListRender()
        );
    }
    changePageSize(size) {
        this.setState(
            {
                selectedPageSize: size,
                currentPage: 1
            },
            () => this.dataListRender()
        );
    }
    changeDisplayMode(mode) {
        this.setState({
            displayMode: mode
        });
        return false;
    }
    onChangePage(page) {
        this.setState(
            {
                currentPage: page
            },
            () => this.dataListRender()
        );
    }

    handleKeyPress(e) {
        if (e.key === "Enter") {
            this.setState(
                {
                    search: e.target.value.toLowerCase()
                },
                () => this.dataListRender()
            );
        }
    }

    getIndex(value, arr, prop) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i][prop] === value) {
                return i;
            }
        }
        return -1;
    }
    componentDidMount() {
        this.dataListRender();
    }
    onContextMenuClick = (e, data, target) => {
        if (data.action === "delete") {
            let comp_this = this;
            axios.defaults.headers.delete["Authorization"] = localStorage.getItem(
                "session_key"
            );
            axios
                .delete(
                    piranhaConfig.apiBaseUrl +
                    piranhaConfig.route.deleteuser +
                    "/" +
                    data.data
                )
                .then(function (response) {
                    comp_this.dataListRender();
                })
                .catch(function (error) {
                    console.log(error.response);
                });
        }
        if (data.action === "view") {
            this.props.history.push("users/user-details/" + data.data);
        }
    };

    onContextMenu = (e, data) => {
        const clickeduserId = data.data;
        if (!this.state.selectedItems.includes(clickeduserId)) {
            this.setState({
                selectedItems: [clickeduserId]
            });
        }

        return true;
    };

    dataListRender() {
        const {
            selectedPageSize,
            currentPage,
            selectedOrderOption,
            search
        } = this.state;
        let comp_this = this;

        axios.defaults.headers.get["Authorization"] = localStorage.getItem(
            "session_key"
        );
        axios
            .get(piranhaConfig.apiBaseUrl + piranhaConfig.route.allusers)
            .then(function (response) {
                let total = response.data.length;
                let totalPage = Math.ceil(total / selectedPageSize);
                comp_this.setState({
                    totalPage: totalPage,
                    items: response.data,
                    selectedItems: [],
                    totalItemCount: response.data.length,
                    isLoading: true
                });
            })
            .catch(function (error) {
                console.log(error.response);
            });
    }

    gender = (selectedGender) =>{
        this.setState({ selectedGender });      
    }
    role = (selectedRole) =>{
        this.setState({ selectedRole });     
    }
    username = (e) =>{
        let user = {...this.state.user};
        user.username = e.target.value;
        this.setState({ user});
    }
    email = (e) =>{
        let user = {...this.state.user};
        user.email = e.target.value;
        this.setState({ user});
    }
    password = (e) =>{
        let user = {...this.state.user};
        user.password = e.target.value;
        this.setState({ user});
    }
    confirmPassword = (e) =>{
        let user = {...this.state.user};
        user.confirm_password = e.target.value;
        this.setState({ user});
    }
    company = (e) =>{
        let user = {...this.state.user};
        user.company = e.target.value;
        this.setState({ user});
    }
    forename = (e) =>{
        let user = {...this.state.user};
        user.forename = e.target.value;
        this.setState({ user});
    }
    surname = (e) =>{
        let user = {...this.state.user};
        user.surname = e.target.value;
        this.setState({ user});
    }
    country = (e) =>{
        let user = {...this.state.user};
        user.country = e.target.value;
        this.setState({ user});
    }
    reseterror = () =>{
        let error = {
            username:'',
                email:'',
                password:''
        }
        this.setState({error})
    }
    validateEmail = (email) =>{
        let pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(email)
    }
    resetUser = () =>{
        let user = {
            username:'',
            email:'',
            password:'',
            confirm_password:'',
            surname:'',
            forename:'',
            company:'',
            country:'',
            gender: '',
            role: '',
        }
        this.setState({user})
    }
    adduser = () =>{
        this.reseterror();
        let user = this.state.user;
        let error = this.state.error;
        user.role = this.state.selectedRole.value;
        user.gender = this.state.selectedGender.value;
        if(user.username === "" || user.email === "" || user.password === "" || user.confirm_password === ""){
            this.reseterror();
            switch ("") {
                case user.username:
                    error.username = "Username Required";
                case user.email:
                    error.email = "Email Required";
                case user.password:
                    error.password = "password Required";
                case user.confirm_password:
                    error.password = "password Required";
            }
            this.setState({error});
            return;
        }
        if (user.password !== user.confirm_password){
            error.password = "Password Mismatched";
            this.setState({error});
            return;
        }
        else if(user.password.length < 8){
            error.password = "Password must be minimum 8 Characters";
            this.setState({error});
            return;
        }
        else if (!this.validateEmail(user.email)) {
            error.email = "Invalid Email";
            this.setState({error});
            return;
        }
        let comp_this = this;
        axios.defaults.headers.post["Content-Type"] = "application/json";
        axios.post(piranhaConfig.apiBaseUrl + piranhaConfig.route.register, user)
            .then(function (response) {
                comp_this.resetUser();
                comp_this.dataListRender();
                comp_this.toggleModal();
            })
            .catch(function (error) {
                error.username = error.response.data;
                comp_this.setState({error});
            });


    }

    render() {
        console.log(localStorage);
        const startIndex =(this.state.currentPage - 1) * this.state.selectedPageSize;
        const endIndex = this.state.currentPage * this.state.selectedPageSize;
        const role = localStorage.getItem("role");
        const { messages } = this.props.intl;

        return !this.state.isLoading ? (
            <div className="loading" />
            ) : (
                <Fragment>
                    <div className="disable-text-selection">
                        <Row>
                            <Colxx xxs="12">
                                <div className="mb-2">
                                    <h1>
                                        <IntlMessages id="menu.thumb-list" />
                                    </h1>
                                    {role === "admin" && (
                                        <div className="float-sm-right">
                                            <Button
                                                color="primary"
                                                size="lg"
                                                onClick={this.toggleModal}
                                            >
                                                <IntlMessages id="layouts.add-new-user" />
                                            </Button>
                                            {"  "}

                                            <Modal
                                                isOpen={this.state.modalOpen}
                                                toggle={this.toggleModal}
                                                wrapClassName="modal-right"
                                                backdrop="static"
                                            >
                                                <ModalHeader toggle={this.toggleModal}>
                                                    <IntlMessages id="layouts.add-user-modal-title" />
                                                </ModalHeader>
                                                <ModalBody>
                                                    <Label>
                                                        <IntlMessages id="user.username" />
                                                    </Label>
                                                    <Input
                                                        value={this.state.user.username}
                                                        onChange={this.username}
                                                    />
                                                    <p className={"error-msg"}>
                                                        {this.state.error.username}
                                                    </p>
                                                    <Label>
                                                        <IntlMessages id="user.email" />
                                                    </Label>
                                                    <Input
                                                        value={this.state.user.email}
                                                        onChange={this.email}
                                                    />
                                                    <p className={"error-msg"}>
                                                        {this.state.error.email}
                                                    </p>
                                                    <Label>
                                                        <IntlMessages id="user.password" />
                                                    </Label>
                                                    <Input type="password"
                                                        value={this.state.user.password}
                                                        onChange={this.password}
                                                    />
                                                    <p className={"error-msg"}>
                                                        {this.state.error.password}
                                                    </p>
                                                    <Label>
                                                        <IntlMessages id="user.confirmPassword" />
                                                    </Label>
                                                    <Input type="password"
                                                        value={this.state.user.confirm_password}
                                                        onChange={this.confirmPassword}
                                                    />
                                                    <p className={"error-msg"}>
                                                        {this.state.error.password}
                                                    </p>
                                                    <Label>
                                                        <IntlMessages id="user.forename" />
                                                    </Label>
                                                    <Input
                                                        value={this.state.user.forename}
                                                        onChange={this.forename}
                                                    />
                                                    <Label>
                                                        <IntlMessages id="user.surname" />
                                                    </Label>
                                                    <Input
                                                        value={this.state.user.surname}
                                                        onChange={this.surname}
                                                    />
                                                    <Label>
                                                        <IntlMessages id="user.country" />
                                                    </Label>
                                                    <Input
                                                        value={this.state.user.country}
                                                        onChange={this.country}
                                                    />
                                                    <Label>
                                                        <IntlMessages id="user.company" />
                                                    </Label>
                                                    <Input
                                                        value={this.state.user.company}
                                                        onChange={this.company}
                                                    />
                                                    <Label className="mt-4">
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
                                                    <Label className="mt-4">
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
                                                </ModalBody>
                                                <ModalFooter>
                                                    <Button
                                                        color="secondary"
                                                        outline
                                                        onClick={this.toggleModal}
                                                    >
                                                        <IntlMessages id="layouts.cancel" />
                                                    </Button>
                                                    <Button color="primary" onClick={this.adduser}>
                                                        <IntlMessages id="layouts.submit" />
                                                    </Button>{" "}
                                                </ModalFooter>
                                            </Modal>
                                        </div>
                                    )}

                                    <BreadcrumbItems match={this.props.match} />
                                </div>

                                <div className="mb-2">
                                    <Button
                                        color="empty"
                                        className="pt-0 pl-0 d-inline-block d-md-none"
                                        onClick={this.toggleDisplayOptions}
                                    >
                                        <IntlMessages id="layouts.display-options" />{" "}
                                        <i className="simple-icon-arrow-down align-middle" />
                                    </Button>
                                    <Collapse
                                        isOpen={this.state.displayOptionsIsOpen}
                                        className="d-md-block"
                                        id="displayOptions"
                                    >
                                        <span className="mr-3 mb-2 d-inline-block float-md-left" />
                                        <div className="d-block d-md-inline-block">
                                            <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1">
                                                <DropdownToggle caret color="outline-dark" size="xs">
                                                    <IntlMessages id="layouts.orderby" />
                                                    {this.state.selectedOrderOption.label}
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                    {this.state.orderOptions.map((order, index) => {
                                                        return (
                                                            <DropdownItem
                                                                key={index}
                                                                onClick={() => this.changeOrderBy(order.column)}
                                                            >
                                                                {order.label}
                                                            </DropdownItem>
                                                        );
                                                    })}
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                            <div className="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
                                                <input
                                                    type="text"
                                                    name="keyword"
                                                    id="search"
                                                    placeholder={messages["menu.search"]}
                                                    onKeyPress={e => this.handleKeyPress(e)}
                                                />
                                            </div>
                                        </div>
                                        <div className="float-md-right">
                                            <span className="text-muted text-small mr-1">{`${startIndex}-${endIndex} of ${
                                                this.state.totalItemCount
                                                } `}</span>
                                            <UncontrolledDropdown className="d-inline-block">
                                                <DropdownToggle caret color="outline-dark" size="xs">
                                                    {this.state.selectedPageSize}
                                                </DropdownToggle>
                                                <DropdownMenu right>
                                                    {this.state.pageSizes.map((size, index) => {
                                                        return (
                                                            <DropdownItem
                                                                key={index}
                                                                onClick={() => this.changePageSize(size)}
                                                            >
                                                                {size}
                                                            </DropdownItem>
                                                        );
                                                    })}
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                        </div>
                                    </Collapse>
                                </div>
                                <Separator className="mb-5" />
                            </Colxx>
                        </Row>
                        <Row>
                            {this.state.items.map(user => {
                                if (this.state.displayMode === "thumblist") {
                                    return (
                                        <Colxx xxs="12" key={user.id} className="mb-3">
                                            <ContextMenuTrigger
                                                id="menu_id"
                                                data={user.id}
                                                collect={collect}
                                            >
                                                <Card
                                                    onClick={event =>
                                                        this.handleCheckChange(event, user.id)
                                                    }
                                                    className={classnames("d-flex flex-row", {
                                                        active: this.state.selectedItems.includes(user.id)
                                                    })}
                                                >
                                                    <NavLink to={`users/user-details/${user.id}`} className="d-flex">
                                                        <img
                                                            alt={user.username}
                                                            src={'http://portal.bilardo.gov.tr/assets/pages/media/profile/profile_user.jpg'}
                                                            className="list-thumbnail responsive border-0"
                                                        />
                                                    </NavLink>
                                                    <div className="pl-2 d-flex flex-grow-1 min-width-zero">
                                                        <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                                                            <NavLink
                                                                to={`users/user-details/${user.id}`}
                                                                className="w-40 w-sm-100"
                                                            >
                                                                <p className="list-item-heading mb-1 truncate">
                                                                    {user.forename + ' ' + user.surname}
                                                                </p>
                                                            </NavLink>

                                                            <div className="w-15 w-sm-100">
                                                                    {user.username}
                                                            </div>
                                                            <p className="mb-1 text-muted text-small w-15 w-sm-100">
                                                                {user.email}
                                                            </p>
                                                            <p className="mb-1 text-muted text-small w-15 w-sm-100">
                                                                {user.role}
                                                            </p>
                                                            <div className="w-15 w-sm-100">
                                                                    {user.country}
                                                            </div>
                                                            <div className="w-15 w-sm-100">
                                                                    {user.company}
                                                            </div>
                                                            <div className="w-15 w-sm-100">
                                                                    {user.gender}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Card>
                                            </ContextMenuTrigger>
                                        </Colxx>
                                    );
                                }
                            })}
                            {/* <Pagination
                currentPage={this.state.currentPage}
                totalPage={this.state.totalPage}
                onChangePage={i => this.onChangePage(i)}
              /> */}
                        </Row>
                    </div>

                    <ContextMenu
                        id="menu_id"
                        onShow={e => this.onContextMenu(e, e.detail.data)}
                    >
                        {role === "admin" && (
                            <MenuItem
                                onClick={this.onContextMenuClick}
                                data={{ action: "delete" }}
                            >
                                <i className="simple-icon-trash" /> <span>Delete</span>
                            </MenuItem>
                        )}
                        <MenuItem onClick={this.onContextMenuClick} data={{ action: "view" }}>
                            <i className="simple-icon-trash" /> <span>View</span>
                        </MenuItem>
                    </ContextMenu>
                </Fragment>
            );
    }
}
export default injectIntl(mouseTrap(UserListLayout));
