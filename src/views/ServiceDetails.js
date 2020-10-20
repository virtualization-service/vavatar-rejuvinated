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

import {
  FormInput,
  FormTextarea
} from "shards-react";



// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Input,
  Row,
  Col,
} from "reactstrap";

class ServiceDetails extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      serviceType : (this.state && this.state.serviceType) ?? props.serviceType ,
      inputList : [{key:'', value:''}],
      raw_data:""
    }

    this.handleChange = this.handleChange.bind(this);

  }

  getFormattedData(){
    var headers = {};
    for(var i =0;i < this.state.inputList.length ; i++ ){
      if(this.state.inputList[i].key !== '' && this.state.inputList[i].value !== ''){
        headers[this.state.inputList[i].key] = this.state.inputList[i].value;
      }
    }

    return {
      raw_data : this.state.raw_data,
      headers: headers
    }
  }

  ResetControls(){
    this.setState({
      serviceType : (this.state && this.state.serviceType),
      inputList : [{key:'', value:''}],
      raw_data:""
    })
  }

  DeleteItem(itemList, index) {
    itemList.splice(index, 1);
    this.setState({inputList: [...itemList]});
  }
  
  AddItem(itemList) {
    itemList[itemList.length] = { key: '', value: '' };
    this.setState({inputList: [...itemList]});
  }


  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };


  render() {

    return (
      <>
            <Card className="card-user">
              <CardBody>
                  <Row>
                    <Col className="pr-1" md="8">
                      <FormGroup>
                        <label>{this.state.serviceType} Headers</label>
                      </FormGroup>
                    </Col>
                  </Row>
                  {
                    this.state.inputList.map((elem, index) => (
                      <Row key={'row' + index}>
                        <Col className="pr-1" md="4"  key={'col' + index}>
                          <FormGroup>
                            <FormInput
                              key={'key' + index.toString() +elem.key }
                              placeholder="Header Key"
                              defaultValue={elem.key}
                              onBlur={(event) => {
                                console.log('blurring')
                                //this.state.inputList[index].key = event.target.value;
                                var listOfInputs = [...this.state.inputList];
                                listOfInputs[index].key = event.target.value;
                                this.setState({inputList : listOfInputs })
                                console.log(this.state);
                              }}
                            />
                          </FormGroup>
                        </Col>
                        <Col md="1">
                          :
                        </Col>
                        <Col className="px-1" md="4">
                          <FormGroup>
                            <FormInput
                                key={'value' + index.toString() +elem.value}
                                onBlur={(event) => {
                                    var listOfInputs = [...this.state.inputList];
                                    listOfInputs[index].value = event.target.value;
                                    this.setState({inputList : listOfInputs })
                                  }}
                                  defaultValue={elem.value}
                                  placeholder="Header Value"
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pr-1" md="2">
                          <FormGroup>
                            <Button
                              className="btn-link"
                              color="primary"
                              type="button"
                              hidden={this.state.inputList.length > 1 && this.state.inputList.length  !== index +1 ? true : false}
                              //  onClick= {()=> setInputList( AddItem(inputList) )} >
                              onClick={() => this.AddItem(this.state.inputList)} >
                              <i className="nc-icon nc-simple-add"></i>
                            </Button>
                            <Button
                              className="btn-link"
                              color="primary"
                              type="button"
                              hidden={this.state.inputList.length <= 1 ? true : false}
                              onClick={() => this.DeleteItem(this.state.inputList, index)}
                            >
                              <i className="nc-icon nc-simple-delete"></i>
                            </Button>
                          </FormGroup>
                        </Col>
                      </Row>
                    ))}

                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>{this.state.serviceType} Content</label>
                        <FormTextarea
                         key={this.state.raw_data}
                         defaultValue = {this.state.raw_data}
                          name="raw_data"
                          onBlur={this.handleChange}
                          type="text"
                          style={{ height: '800px' }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
              </CardBody>
            </Card>
    </>
    );
  }
}

export default ServiceDetails;
