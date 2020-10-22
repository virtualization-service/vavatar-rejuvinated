/*!

=========================================================
* Paper Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

https://designrevision.com/demo/shards-dashboard-lite-react/components-overview?
https://github.com/DesignRevision/shards-dashboard-react/blob/master/src/components/components-overview/FormValidation.js


*/
import React from 'react';
import ServiceDetails from "views/ServiceDetails.js";
import { confirmAlert } from 'react-confirm-alert';
import DataService from 'services/DataService.js'

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

class NewTraining extends React.Component {

  formRefRequest = React.createRef();
  formRefResponse = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      service: "",
      protocol: "",
      authenticationMethod: "",
      method: "",
      soapaction :"",
      authenticationKey : "",
      authenticationValue : "",
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleSubmit(event){
    var request = {...this.state, request: {...this.formRefRequest.current.getFormattedData()}, response: {...this.formRefResponse.current.getFormattedData()}};

    var service = new DataService();
    var response = service.addNewOperation(request);

     response.then(function (response) {
              confirmAlert({
                title: 'Success',
                message: 'Successfully Saved! Please select Next Step.',
                buttons: [
                    {
                        label: 'Add More Requests',
                        onClick: () => alert('More Requests')
                    },
                    {
                        label: 'View Training',
                        onClick: () => alert('View Trainings')
                    },
                    {
                      label: 'View All Trainings',
                      onClick: () => alert('All Trainings Requests')
                  }
                ]
              });
                
            })
            .catch(function (error) {
              confirmAlert({
                title: 'Failure',
                message: 'There has been an unexpected failure.' + error,
                buttons: [
                    {
                        label: 'Ok',
                    }
                ]
              });
            });

    console.log( JSON.stringify(request));


  }


  handleReset(event){
    this.setState({
      service: "",
      protocol: "",
      authenticationMethod: "",
      method: "",
      soapaction :"",
      authenticationKey : "",
      authenticationValue : "",
    });
    this.formRefRequest.current.ResetControls();
    this.formRefResponse.current.ResetControls();

  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  };

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
                          <label>Service Url</label>
                          <FormInput
                            onChange = {this.handleChange}
                            placeholder="Service Endpoint"
                            type="url"
                            required
                            value={this.state.service}
                            name="service"
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col className="pr-1" md="4">
                        <FormGroup>
                          <label>Protocol</label>
                          <FormSelect onChange = {this.handleChange}
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
                            onChange = {this.handleChange}
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
                          onChange = {this.handleChange}>
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
                            onChange = {this.handleChange}>
                            <option>Choose ...</option>
                            <option value={"no"}>No Authentication</option>
                            <option value={"basic"}>Basic Authentication</option>
                            <option value={"token"}>Token Authentication</option>
                            <option value={"api"}>API Key</option>
                          </FormSelect>

                        </FormGroup>
                      </Col>
                      <Col className="px-1" md="4" hidden={this.state.authenticationMethod === "" || this.state.authenticationMethod === "no"}>
                        <FormGroup>
                          <label>User name</label>
                          <FormInput
                            onChange = {this.handleChange}
                            value={this.state.authenticationKey}
                            name="authenticationKey"
                            placeholder="username"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="p1-1" md="4" hidden={this.state.authenticationMethod === "" || this.state.authenticationMethod === "no"}>
                        <FormGroup>
                          <label>Password</label>
                          <FormInput
                            onChange = {this.handleChange}
                            value={this.state.authenticationValue}
                            name="authenticationValue"
                            placeholder="password"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6">
                        <ServiceDetails name="Request" serviceType={ "Request" } ref={this.formRefRequest} />
                      </Col>
                      <Col md="6">
                        <ServiceDetails name="Response" serviceType={ "Response"} ref={this.formRefResponse} />
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
                          type="button"
                        >
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

export default NewTraining;
