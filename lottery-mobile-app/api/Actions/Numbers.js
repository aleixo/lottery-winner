import HttpsService from '../HttpService';
import RequestModel from '../RequestModel';

/**
 * This classes build one Rest action for domains service
 *
 * @export
 * @class DialplanRules
 */
export default class DialplanRules {
    /**
     * Creates an instance of Domains.
     *
     * @example
     * new DialplanRules()
     *
     * @param {string} baseUri - The base uri to build the full endpoint path.
     * @memberof DialplanRules
     */
    constructor(baseUri) {
        this.baseUri = `${baseUri}/dialplan-rules`;
    }

    /**
     * This function builds the action for list all dialplan-rules.
     *
     * @example
     * action.listAll('myToken')
     *
     * @returns {Object} One configured action object to make the API call.
     * @memberof DialplanRules
     */
    listAll() {
        const actionRequest = {
            path: this.baseUri,
            method: HttpsService.verbs.GET,
            header: HttpsService.headers.BASIC,
        };

        return actionRequest;
    }

    /**
     * This function builds the action for the dialplan-rules list by uuid resource.
     *
     * @example
     * actionsInstance.listByUuid('myToken',{prop:'value'})
     *
     * @param {Object} params - The provided requestModel parameters.
     * @returns {Object} One configured action object to make the API call.
     * @memberof DialplanRules
     */
    listByUuid(params) {
        const endpointPath = `/${params[RequestModel.REPRESENTATIONS.DIALPLAN_RULES_UUID]}`;

        const actionRequest = {
            path: this.baseUri + endpointPath,
            method: HttpsService.verbs.GET,
            header: HttpsService.headers.BASIC,
        };

        return actionRequest;
    }

    /**
     * This function builds the action for the dialplan-rules list by uuid resource.
     *
     * @example
     * actionInstance.insert('token', {prop: 'val'})
     *
     * @param {Object} params - The provided requestModel parameters.
     * @returns {Object} One configured action object to make the API call.
     * @memberof DialplanRules
     */
    insert(params) {
        const requestModel = new RequestModel(params);

        const actionRequest = {
            path: this.baseUri,
            method: HttpsService.verbs.POST,
            header: HttpsService.headers.BASIC,
            body: requestModel.insertDialplanBody,
        };
        return actionRequest;
    }

    /**
     * This function builds the action for the dialplan-rules list by uuid resource.
     *
     * @example
     * actionInstance.update('token', {prop: 'val'})
     *
     * @param {Object} params - The provided requestModel parameters.
     * @returns {Object} One configured action object to make the API call.
     * @memberof DialplanRules
     */
    update(params) {
        const requestModel = new RequestModel(params);
        const endpointPath = `/${params[RequestModel.REPRESENTATIONS.DIALPLAN_RULES_UUID]}`;

        const actionRequest = {
            path: this.baseUri + endpointPath,
            method: HttpsService.verbs.PUT,
            header: HttpsService.headers.BASIC,
            body: requestModel.updateDialplanBody,
        };
        return actionRequest;
    }

    /**
     * This function builds the action for the dialplan-rules list by uuid resource.
     *
     * @example
     * actionInstance.delete('token', {prop: 'val'})
     *
     * @param {Object} params - The provided requestModel parameters.
     * @returns {Object} One configured action object to make the API call.
     * @memberof DialplanRules
     */
    delete(params) {
        const endpointPath = `/${params[RequestModel.REPRESENTATIONS.DIALPLAN_RULES_UUID]}`;

        const actionRequest = {
            path: this.baseUri + endpointPath,
            method: HttpsService.verbs.DELETE,
            header: HttpsService.headers.BASIC,
        };
        return actionRequest;
    }
}
