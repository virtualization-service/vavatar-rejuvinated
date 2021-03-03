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
import React from 'react';


import { DataService } from 'services/DataService.js'


// reactstrap components
import { Card, CardBody, Row, Col, Form } from "reactstrap";

import CustomTables from "views/CustomTables.js"


class ViewTrainings extends React.Component {

  static columns = [
    {
      Header: 'Name',
      accessor: 'Name',
    },
    {
      Header: 'Operation',
      accessor: 'Operation',
    },
    {
      Header: 'Service Url',
      accessor: 'ServiceEndpoint',
    }
  ];

  constructor(props) {
    super(props);

    this.state = {
      rowData:[]};
      this.loadOperations = this.loadOperations.bind(this);
      this.onDeleteClick = this.onDeleteClick.bind(this);

      this.loadOperations();
  }

  loadOperations(){
    var self = this;

    var service = new DataService()
    var operations = service.getAllOperations();

    operations.then(function(response){

      if(response) {

        var data = response.map(function(elem){
          return {"Name" : elem, "Operation" : elem, "ServiceEndpoint": elem}
        });
        self.setState({rowData : data});
      }
      else {
        self.setState({rowData : []})

      }
    });

  }


  onDeleteClick(data){
    var service = new DataService();
    service.deleteOperation(data.Operation)
    .then(resp=> this.loadOperations());
  }

  render() {
    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card className="card-user">

              <CardBody>
              <Form>
                <CustomTables data={this.state.rowData} columns={ViewTrainings.columns} paginationSize={5} edit={true}  remove={true} onDelete={this.onDeleteClick} />
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>


    );
  }
}

export default ViewTrainings;
