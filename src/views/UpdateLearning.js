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

*/
import React from "react";
import { DataService } from 'services/DataService.js'
import {
  Card,
  CardBody,
  Row,
  CardHeader,
  Col,
  FormGroup,
  Button
} from "reactstrap";

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CustomTables from "views/CustomTables.js"

class UpdateLearning extends React.Component {

  static columns =
    [
      {
        Header: 'Request',
        accessor: 'request',
      },
      {
        Header: 'Response',
        accessor: 'response',
      },
      {
        Header: 'Created On',
        accessor: 'created_date',
      }
    ];

  constructor(props) {
    super(props);

    this.state = { operations: [], rowData: [], selectedOperation: '' }

    this.loadOperations = this.loadOperations.bind(this);
    this.loadServiceData = this.loadServiceData.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);

    this.loadOperations();
  }

  loadOperations() {
    var self = this;

    var service = new DataService()
    var operations = service.getAllOperations();

    operations.then(function (response) {
      var data = response.map(function (elem) {
        return { "Name": elem, "Operation": elem, "ServiceEndpoint": elem }
      });
      self.setState({ operations: data });
    });
  }

  loadServiceData(operation) {

    this.setState({ selectedOperation: operation ?? '' })
    if (operation && operation !== '') {

      var self = this;

      var service = new DataService()
      service.getResponses(operation)
        .then(response => response.json())
        .then(function (response) {

          var statefuleData = response && response.map ? response.map((elem, index) => {
            return {
              id: elem._id,
              request: elem.request.raw_data,
              response: elem.response.raw_data,
              created_date: elem.created_date
            }
          }) : []
          self.setState({ rowData: [...statefuleData] })
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    else {
      this.setState({ rowData: [] })
    }
  }

  onDeleteClick(data) {
    var service = new DataService();
    service.deleteResponse(this.state.selectedOperation, data.id)
      .then(resp => this.loadServiceData(this.state.selectedOperation));
  }

  render() {
    return (
      <div className="content">

        <Row>
          <Col md="12">
            <Card className="card-user">
              <CardHeader>
                <FormGroup>
                  <label>Select Operation</label>
                  <Autocomplete
                    onChange={e => this.loadServiceData(e.target.innerText)}
                    options={this.state.operations}
                    getOptionLabel={(option) => option.Operation}
                    style={{ width: 500, height: 50 }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </FormGroup>
              </CardHeader>
              <CardBody>
                <Row key={this.state.selectedOperation}>
                  <Col md='12' hidden={this.state.rowData && this.state.rowData.length > 0}>
                    <label>{this.state.selectedOperation === '' ? '' : 'No Trainings Found!'}</label>
                  </Col>
                </Row>
                <Row hidden={this.state.rowData === null || this.state.rowData.length === 0}>
                  <Col>
                    <CustomTables data={this.state.rowData} columns={UpdateLearning.columns} PageSize={5} edit={false} remove={true} paginationSize={5} onDelete={this.onDeleteClick} />
                  </Col>
                </Row>
                <Row>
                      <div className="update ml-auto mr-auto">
                      <Button
                          className="btn-round"
                          color="secondary"
                          type="button">
                          Reset
                        </Button>
                        <Button
                          className="btn-round"
                          color="primary"
                          type="button"
                        >
                          Train Requests
                        </Button>
                      </div>
                    </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

    );

  }
}

export default UpdateLearning;
