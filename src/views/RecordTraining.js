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
import { DataService } from 'services/DataService.js'
import { confirmAlert } from 'react-confirm-alert';
import { PlayFill, StopFill } from 'react-bootstrap-icons';
import CustomTables from "views/CustomTables.js"

function renderCellValues(cell) {
    return <>
  <>
      <Button
          onClick = {function(){handleRecordExisting(cell)}}
          className="btn-link btn-warn"
          color="primary"
          disabled={cell.value == true}>
          <PlayFill />
          Record
      </Button> 
  </>
  <>
      <Button
          onClick = {function(){handleRecordExisting(cell)}}
          className="btn-link btn-danger"
          color="primary"
          disabled={cell.value == false}>
          <StopFill />
              Stop
          </Button>
  </>
</>;
}

function handleRecordExisting (cell)  {
    
    var service = new DataService();
    var status = "Active";
    if(cell.row.values.Edit){
        status = "Inactive";
    }
    var response = service.recordExistingOperation(cell.row.values.VirtualEndpoint,status, !cell.row.values.Edit);

     response.then((response) => {
         this.loadOperations();
        })
            .catch((error) => {
              confirmAlert({
                message: 'There has been an unexpected failure, please retry.' + error,
                buttons: [
                    {
                        label: 'Ok',
                    }
                ]
              });
            });
    
  }


class RecordTraining extends React.Component {
    
    constructor() {
        super();

        this.state = {
            rowData: [],
            service: ""
        };
        this.loadOperations = this.loadOperations.bind(this);
        this.loadOperations();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this)
        this.getAuthenticationText = this.getAuthenticationText.bind(this);
        handleRecordExisting = handleRecordExisting.bind(this);
    }
    static columns = [
        {
            Header: 'Service Url',
            accessor: 'ServiceEndpoint',
        },
        {
            Header: 'Status',
            accessor: 'Status',
        },
        {
            Header: 'Virtual Url',
            accessor: 'VirtualEndpoint',
        },
        {
            Header: 'Edit',
            accessor: 'Edit',
            Cell: ({ cell }) => (renderCellValues(cell))
        }
    ];

    formRefRequest = React.createRef();
    formRefResponse = React.createRef();
    
    
    loadOperations() {
        var self = this;

        var service = new DataService()
        var operations = service.getAllRecordOperations();

        operations.then(function (response) {

            if (response) {

                var data = response.map(function (elem) {
                    return { "ServiceEndpoint": elem.ServiceEndpoint, "Status": elem.Status, "VirtualEndpoint": process.env.REACT_APP_CONTROLLER_SERVICE + "/" + elem.VirtualEndpoint, "Edit" : elem.Edit }
                });
                self.setState({ rowData: data });
            }
            else {
                self.setState({ rowData: [] })
            }
        });

    }
    

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
      };

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

    handleSubmit(event){
    
        var service = new DataService();
        var response = service.recordNewOperation(this.state.service);
    
         response.then((response) => {
            this.setState({ service: '' })
            this.loadOperations();
                })
                .catch((error) => {
                  confirmAlert({
                    message: 'There has been an unexpected failure, please retry recording.' + error,
                    buttons: [
                        {
                            label: 'Ok',
                            onClick: this.loadOperations()
                        }
                    ]
                  });
                });
        
        
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
                                                onClick = {this.handleSubmit}
                                                    className="btn-link btn-warn"
                                                    color="primary">
                                                    <PlayFill />
                                                    Record
                                                </Button>
                                            </div>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Card className="card-user">

                                                    <CardBody>
                                                        <Form>
                                                            <CustomTables data={this.state.rowData} columns={RecordTraining.columns} paginationSize={5} getTrProps = {this.handleRecordExisting} />
                                                        </Form>
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                        </Row>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                </div>
                <Row>

                </Row>
            </>
        );
    }
}

export default RecordTraining;