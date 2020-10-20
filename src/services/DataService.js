export class DataService {
    constructor(name) {
        this.name = name;
    }

    getAllOperations() {
        return this.fetchData(process.env.REACT_APP_DATA_SERVICE + "/operations")
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

    addNewOperation(body) {
        return fetch( process.env.REACT_APP_CONTROLLER_SERVICE, {
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