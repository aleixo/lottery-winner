import HttpService from '../HttpService';
import * as Actions from '../Actions';

export default class Numbers extends HttpService {
    constructor(baseUri) {
        super();
        this.numbersActions = new Actions.Numbers(baseUri);
    }

    generate() {
        return this.fetchData(this.numbersActions.generate())
            .then( res => res.json());
    }

    insertNumber() {
        return this.fetchData(this.numbersActions.insertNumber())
            .then( res => res.json());
    }

    statistic() {
        return this.fetchData(this.numbersActions.statistic())
            .then( res => res.json());
    }
}
