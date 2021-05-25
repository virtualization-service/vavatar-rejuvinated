export class DataService {
    constructor(name) {
        this.name = name;
    }

    getAllOperations() {
        return this.fetchData(process.env.REACT_APP_DATA_SERVICE + "/operations")
    }

    getAllRecordOperations() {
        return this.fetchData(process.env.REACT_APP_DATA_SERVICE + "recordOperations",{
            method:'GET',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
    }

    getAllActivityLogs() {
        return this.fetchData(process.env.REACT_APP_DATA_SERVICE + "activityLogs",{
            method:'GET',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
    }

    deleteOperation(operation){
        return fetch(process.env.REACT_APP_DATA_SERVICE + "/operation?operation=" + operation, {
            method: 'DELETE',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
    }

    deleteResponse(operation, id){
        return fetch(process.env.REACT_APP_DATA_SERVICE + "/responses?operation=" + operation + "&id=" +id, {
            method: 'DELETE',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
    }

    recordNewOperation(serviceEndpoint) {
        return fetch( process.env.REACT_APP_DATA_SERVICE + "recordNew", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ServiceEndpoint: serviceEndpoint})})
    }

    recordExistingOperation(virtualEndpoint, status, edit) {
        return fetch( process.env.REACT_APP_DATA_SERVICE + "recordExisting", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({VirtualEndpoint: virtualEndpoint, Status: status, Edit: edit })})
    }

    addNewOperation(body) {
        return fetch( process.env.REACT_APP_CONTROLLER_SERVICE + '/virtualization-train', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)})
    }

    getResponses(operation){
        return fetch( process.env.REACT_APP_DATA_SERVICE + '/responses?operation=' +operation);
        
    }

    fetchData(yUrl) {
        return fetch(yUrl)
            .then(response => response.json())
            .then(function (response) {
                return response;
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}


export default DataService;