import axios from 'axios';

class Service {
    constructor(){
        this.getResultset = null;
        this.postResultset = null;
    }

    async retrieveItems (value){
        this.getResultset = await axios.get('http://fakerestapi.azurewebsites.net/api'+value);

        return Promise.resolve(this.getResultset);
    }

    async saveItems(value){
        this.postResultset = await axios.post('http://fakerestapi.azurewebsites.net/api'+value);

        return Promise.resolve(this.postResultset);
    }
}

export default Service;