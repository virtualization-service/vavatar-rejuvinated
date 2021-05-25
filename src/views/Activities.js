import React from 'react';

import { DataService } from 'services/DataService.js'

import { Card, CardBody, Row, Col, Form } from "reactstrap";

import CustomTables from "views/CustomTables.js"


class Activities extends React.Component {

    static columns = [
        {
            Header: 'Service Url',
            accessor: 'ServiceEndpoint',
        },
        {
            Header: 'Date',
            accessor: 'Date',
        },
        {
            Header: 'Exchange',
            accessor: 'Exchange',
        },
        {
            Header: 'Routing',
            accessor: 'Routing',
        },
        {
            Header: 'Data',
            accessor: 'Data',
        }
    ];

    constructor(props) {
        super(props);

        this.state = {
            rowData: []
        };
        this.loadOperations = this.loadOperations.bind(this);
        this.loadOperations();
    }

    loadOperations() {
        var self = this;

        var service = new DataService()
        var operations = service.getAllActivityLogs();

        operations.then(function (response) {

            if (response) {

                var data = response.map(function (elem) {
                    return { "ServiceEndpoint": elem.ServiceEndPoint, "Date": elem.Date, "Exchange": elem.Exchange, "Routing": elem.RoutingKey, "Data": elem.Message }
                });
                self.setState({ rowData: data });
            }
            else {
                self.setState({ rowData: [] })

            }
        });

    }

    render() {
        return (
            <div className="content">
                <Row>
                    <Col md="12">
                        <Card className="card-user">

                            <CardBody>
                                <Form>
                                    <CustomTables data={this.state.rowData} columns={Activities.columns} paginationSize={5} info={true} />
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>

        );
    }
}

export default Activities;
