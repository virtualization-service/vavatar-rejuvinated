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

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";

class Tables extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      rowData: props.data,
      columnDef: props.columns,
      pageSize : 5
    };
  }

  renderTableHeader() {
    return <tr>
      {this.state.columnDef.map((columnData, index) => {
        return (
          <th>{columnData.displayName}</th>
        )
      })}
    </tr>;

  }

  renderTableData() {
    return <tbody>
      {
        this.state.rowData.map((rowValue, index) => { return this.renderTableRow1(rowValue) })
        /* this.renderTableData()*/
      }
    </tbody>;
  }


  renderTableRow1(singleRowValue) {
    console.log(singleRowValue[this.state.columnDef[0].name]);
    return <tr>
    {this.state.columnDef.map((columnData, index) => {
      return (
        <td>{ singleRowValue[columnData.name] }</td>
      )
    })}
  </tr>;

  }

  render() {
    return (
      <>
      <div>
        <Table responsive>
          <thead className="text-primary">
            {this.renderTableHeader()}
          </thead>
            {
             /* this.state.rowData.map((rowValue, index) => { return this.renderTableRow1(rowValue) })*/
              this.renderTableData()
            }
        </Table>
        <div style={{textAlign:"right"}}>Page 1</div>
        </div>
      </>
    );
  }
}

export default Tables;
