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
  FormGroup
} from "reactstrap";

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CustomTables from "views/CustomTables.js"

class UpdateLearning extends React.Component {

  static columns = 
      [
        {
          Header: 'Sequence',
          accessor: 'sequence',
        },
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
          accessor: 'createdDate',
        }
      ];

  constructor(props){
    super(props);

    this.state = {operations : [], rowData:[]}

    this.loadOperations = this.loadOperations.bind(this);
    this.loadServiceData = this.loadServiceData.bind(this);
    this.loadOperations();
    console.log(this.props.match.params.id);
  }

  loadOperations(){
    var self = this;

    var service = new DataService()
    var operations = service.getAllOperations();

    operations.then(function(response){
      var data = response.map(function(elem){
        return {"Name" : elem, "Operation" : elem, "ServiceEndpoint": elem}
      });
      self.setState({operations : data});
    });
  }

  loadServiceData(operation){

    console.log(operation);
    if(operation !== ''){
      var self = this;

      var service = new DataService()
      service.getResponses(operation)
        .then(response => response.json())
        .then(function (response) {

            var statefuleData = response.map((elem, index) => {
              return {
                sequence : index,
                request : elem.request.raw_data,
                response : elem.response.raw_data,
              }
            })
             self.setState({rowData : [...statefuleData]})
            })
            .catch(function (error) {
                console.log(error);
            });
  
      // operations.then(function(response){
      //   var data = response.toJ
      //   var data = response.map(function(elem){
      //     return {"Name" : elem, "Operation" : elem, "ServiceEndpoint": elem}
      //   });
      //   self.setState({operations : data});
      // });
    }
  }

  render(){
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
                        style={{ width: 500, height :50 }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                </FormGroup>
              
  
  
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md='12'>
                   
                  </Col>
                </Row>
                <Row>
                  <Col>
                  <CustomTables data={this.state.rowData} columns={UpdateLearning.columns} PageSize={5} edit={true} remove={true} paginationSize={5} />
                  </Col>
                </Row>
                
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
  
    );

  }
}


// const UpdateLearning = () => {

//   const columns = React.useMemo(
//     () =>
//       [
//         {
//           Header: 'First Name',
//           accessor: 'make',
//         },
//         {
//           Header: 'Last Name',
//           accessor: 'model',
//         },
//         {
//           Header: 'Last Name',
//           accessor: 'price',
//         },
//         {
//           Header: 'Last Name',
//           accessor: 'year',
//         }
//       ]
//   );

//   const [rowData, setRowData] = useState([
//     { make: "Toyota", model: "Celica", price: 35000, year: 2020 },
//     { make: "Ford", model: "Mondeo", price: 32000, year: 2020 },
//     { make: "Porsche", model: "Boxter", price: 72000, year: 2018 },
//     { make: "Toyota", model: "Celica", price: 35000, year: 2020 },
//     { make: "Ford", model: "Mondeo", price: 32000, year: 2020 },
//     { make: "Porsche", model: "Boxter", price: 72000, year: 2018 },
//     { make: "Toyota", model: "Celica", price: 35000, year: 2020 },
//     { make: "Ford", model: "Mondeo", price: 32000, year: 2020 },
//     { make: "Porsche", model: "Boxter", price: 72000, year: 2018 },
//     { make: "Toyota", model: "Celica", price: 35000, year: 2020 },
//     { make: "Ford", model: "Mondeo", price: 32000, year: 2020 },
//     { make: "Porsche", model: "Boxter", price: 72000, year: 2018 },
//     { make: "Toyota", model: "Celica", price: 35000, year: 2020 },
//     { make: "Ford", model: "Mondeo", price: 32000, year: 2020 },
//     { make: "Porsche", model: "Boxter", price: 72000, year: 2018 },
//     { make: "Toyota", model: "Celica", price: 35000, year: 2020 },
//     { make: "Ford", model: "Mondeo", price: 32000, year: 2020 },
//     { make: "Porsche", model: "Boxter", price: 72000, year: 2018 },
//   ]);

//   return (
//     <div className="content">

//       <Row>
//         <Col md="12">
//           <Card className="card-user">
//             <CardHeader>
//               <FormGroup>
//                 <label>Select Operation</label>
//                 <Autocomplete
//                       options={rowData}
//                       getOptionLabel={(option) => option.make}
//                       style={{ width: 500, height :50 }}
//                       renderInput={(params) => <TextField {...params} />}
//                     />
//               </FormGroup>
            


//             </CardHeader>
//             <CardBody>
//               <Row>
//                 <Col md='12'>
                 
//                 </Col>
//               </Row>
//               <Row>
//                 <Col>
//                 <CustomTables data={rowData} columns={columns} PageSize={5} edit={true} remove={true} paginationSize={5} />
//                 </Col>
//               </Row>
              
//             </CardBody>
//           </Card>
//         </Col>
//       </Row>
//     </div>

//   );
// };


export default UpdateLearning;
