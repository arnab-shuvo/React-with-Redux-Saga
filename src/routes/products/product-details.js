import React, { Component, Fragment } from "react";
import axios from 'axios';
import piranhaConfig from '../../../piranhaConfig.js'
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
import { Colxx, Separator } from "Components/CustomBootstrap";
import { BreadcrumbItems } from "Components/BreadcrumbContainer";
import IntlMessages from "Util/IntlMessages";


class Productdetails extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            product : {},
            modalOpen: false,
         };
    }
    toggleModal() {
        this.setState({
            modalOpen: !this.state.modalOpen
        });
    }
    componentDidMount(){
        let id = this.props.match.params.id;
        let comp_this = this;

        axios.defaults.headers.get["Authorization"] = localStorage.getItem('session_key');
        axios.get(piranhaConfig.apiBaseUrl + piranhaConfig.route.products + '/' + id)
            .then(function (response) {
                comp_this.setState({ product: response.data})
            })
            .catch(function (error) {
                console.log(error.response);
            });
    }
    render() {      
        return (
            <Fragment>
                <div className="disable-text-selection">
                    <Row>
                        <Colxx xxs="12">
                            <div className="mb-2">
                                <h1>
                                    <IntlMessages id="menu.thumb-list" />
                                </h1>

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
                                    <span className="mr-3 mb-2 d-inline-block float-md-left">
                                    </span>
                                </Collapse>
                            </div>
                            <Separator className="mb-5" />
                        </Colxx>
                    </Row>     
                    {JSON.stringify(this.state.product)}
                </div>
            </Fragment>
        );
    }
}

export default Productdetails;