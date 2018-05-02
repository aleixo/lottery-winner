export default class HttpService {
    /**
     * One getter with the available http VERBS.
     *
     * @example
     * HttpService.verbs.GET
     *
     * @readonly
     * @static
     * @memberof HttpService
     */
    static get verbs() {
        return {
            GET: 'GET',
            PUT: 'PUT',
            POST: 'POST',
            DELETE: 'DELETE',
        };
    }

    /**
     * One getter with the available http headers.
     *
     * @example
     * HttpService.headers.BASIC
     *
     * @readonly
     * @static
     * @memberof HttpService
     */
    static get headers() {
        return {
            BASIC : {
                'Content-Type': 'application/json',
            },
        };
    }

    /**
     * Utility function to fetch API data .
     *
     * @example
     * this.fetchData({})
     *
     * @param {Object} action - The action object with the request configuration.
     * @returns {Promise} One promise from fetch request.
     * @memberof RestClient
     */
    fetchData(action) {
        const requestOptions = {
            method: action.method,
            headers: action.header,
        };

        if (action.body) {
            requestOptions.body = JSON.stringify(action.body);
        }
        return fetch(action.path, requestOptions);
    }
}
