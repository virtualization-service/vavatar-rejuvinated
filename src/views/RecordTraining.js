import React from 'react';

import {
    FormSelect, FormInput
} from "shards-react";

// reactstrap components
import {
    Button,
    Card,
    CardBody,
    FormGroup,
    Form,
    Row,
    Col
} from "reactstrap";

import AlbumRoundedIcon from '@material-ui/icons/AlbumRounded';

class RecordTraining extends React.Component {

    formRefRequest = React.createRef();
    formRefResponse = React.createRef();

    constructor(props) {
        super(props);

        this.state = {

        }

        this.getAuthenticationText = this.getAuthenticationText.bind(this);
    }

    getAuthenticationText(isAuthKey) {

        if (this.state.authenticationMethod === "basic") {
            return isAuthKey ? "Username" : "Password";
        }
        if (this.state.authenticationMethod === "token") {

            return isAuthKey ? "" : "Token";
        }

        if (this.state.authenticationMethod === "api") {

            return isAuthKey ? "API Auth Key" : "API Auth Value";
        }
        return "";
    }


    render() {

        return (
            <>
                <div className="content">
                    <Row>
                        <Col md="12">
                            <Card className="card-user">
                                <CardBody>
                                    <Form>
                                        <Row>
                                            <Col className="pr-1" md="8">
                                                <FormGroup>
                                                    <label>Service Endpoint</label>
                                                    <FormInput
                                                        onChange={this.handleChange}
                                                        placeholder="Service Endpoint"
                                                        type="url"
                                                        required
                                                        value={this.state.service}
                                                        name="service"
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col className="pr-1" md="2">
                                            </Col>
                                        </Row>

                                         <Row>
                      <div className="update ml-auto mr-auto">
                      <Button
                          className="btn-round"
                          color="success"
                          type="button">
                          Record
                        </Button>
                        <Button
                          className="btn-round"
                          color="danger"
                          type="button"
                          disabled
                          
                        >
                          Stop
                        </Button>
                      </div>
                    </Row>

                                        <Row>
                                            <Col className="pr-1" md="4">
                                                <FormGroup>
                                                    <label>Protocol</label>
                                                    <FormSelect onChange={this.handleChange}
                                                        name="protocol"
                                                        value={this.state.protocol}
                                                        required                          >
                                                        <option value={''}>Choose ...</option>
                                                        <option value={"soap"}>Soap</option>
                                                        <option value={"rest"}>Rest</option>
                                                    </FormSelect>
                                                </FormGroup>
                                            </Col>
                                            <Col className="px-1" md="4" hidden={this.state.protocol !== "soap"}>
                                                <FormGroup>
                                                    <label>Soap Action</label>
                                                    <FormInput
                                                        name="soapaction"
                                                        onChange={this.handleChange}
                                                        value={this.state.soapaction}
                                                        placeholder="Soap Action"
                                                        type="text"
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col className="p1-1" md="4" hidden={this.state.protocol !== "rest"}>
                                                <FormGroup>
                                                    <label>Soap Method</label>
                                                    <FormSelect
                                                        value={this.state.method}
                                                        name="method"
                                                        onChange={this.handleChange}>
                                                        <option>Choose ...</option>
                                                        <option value={"GET"}>GET</option>
                                                        <option value={"POST"}>POST</option>
                                                        <option value={"PUT"}>PUT</option>
                                                        <option value={"DELETE"}>DELETE</option>
                                                        <option value={"PATCH"}>PATCH</option>
                                                    </FormSelect>
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col className="pr-1" md="4">
                                                <FormGroup>
                                                    <label>Authentication</label>

                                                    <FormSelect
                                                        name="authenticationMethod"
                                                        value={this.state.authenticationMethod}
                                                        onChange={this.handleChange}>
                                                        <option>Choose ...</option>
                                                        <option value={"no"}>No Authentication</option>
                                                        <option value={"basic"}>Basic Authentication</option>
                                                        <option value={"token"}>Token Authentication</option>
                                                        <option value={"api"}>API Key</option>
                                                    </FormSelect>

                                                </FormGroup>
                                            </Col>
                                            <Col className="px-1" md="4" hidden={this.state.authenticationMethod === "" || this.state.authenticationMethod === "no" || this.state.authenticationMethod === "token"}>
                                                <FormGroup>
                                                    <label> {this.getAuthenticationText(true)}</label>
                                                    <FormInput
                                                        onChange={this.handleChange}
                                                        value={this.state.authenticationKey}
                                                        name="authenticationKey"
                                                        placeholder={this.getAuthenticationText(true)}
                                                        type="text"
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col className="p1-1" md="4" hidden={this.state.authenticationMethod === "" || this.state.authenticationMethod === "no"}>
                                                <FormGroup>
                                                    <label>{this.getAuthenticationText(false)}</label>
                                                    <FormInput
                                                        onChange={this.handleChange}
                                                        value={this.state.authenticationValue}
                                                        name="authenticationValue"
                                                        placeholder={this.getAuthenticationText(false)}
                                                        type="text"
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>


                                        <Row>
                                            <div className="update ml-auto mr-auto">
                                                <Button
                                                    onClick={this.handleReset}
                                                    className="btn-round"
                                                    color="secondary"
                                                    type="button">
                                                    Reset
                                                </Button>
                                                <Button
                                                    onClick={this.handleSubmit}
                                                    className="btn-round"
                                                    color="primary"
                                                    type="button">
                                                    Save
                                                </Button>
                                            </div>
                                        </Row>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </>
        );
    }
}

export default RecordTraining;