import React from 'react';
import { DataService } from 'services/DataService.js'
import { InfoCircle } from 'react-bootstrap-icons' 
import { Modal, Button } from 'react-bootstrap';


class ActivitiesModal extends React.Component {

    constructor() {
        super();
        this.state = {
            show: false
        };
        //Sthis.showDataModal = this.showDataModal.bind(this);
    }
    
    handleModal()
    {
        this.setState({show:!this.state.show});
    }

    showDataModal(row, info) {
        return <td>
        <Button
        onClick = {() => this.handleModal()}
            hidden={!info}
            className="btn-link btn-warn"
            color="primary">
            <InfoCircle />
        </Button>
<Modal show={this.state.show} centered>
<Modal.Header closeButton>
  <Modal.Title>Modal heading</Modal.Title>
</Modal.Header>
<Modal.Body>{row.values.Data}</Modal.Body>
<Modal.Footer>
  <Button variant="secondary">
    Close
  </Button>
  <Button variant="primary">
    Save Changes
  </Button>
</Modal.Footer>
</Modal>
    </td>;

    }
}

export default ActivitiesModal;
