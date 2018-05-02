import * as Resources from './Resources';
import conf from './configs.json';
/**
 * This class exposes the rest methods from the API
 *
 * @export
 * @class RestClient
 */
export default class RestClient {
    /**
     * Creates an instance of RestClient.
     *
     * @example
     * new RestClinet()
     *
     * @memberof RestClient
     */
    constructor() {
        this.buildUri(conf);
        this.dialpanRulesResource = new Resources.Numbers(this.baseUri);
    }

    /**
     * This function builds the baseUri.
     *
     * @example
     *  buildUri(conf)
     *
     * @param {Object} configs - One object with the configurations for the base Uri.
     * @memberof RestClient
     */
    buildUri(configs) {
        this.host = configs.host;
        this.protocol = configs.protocol;
        this.port = configs.port;

        this.baseUri = `${this.protocol}://${this.host}:${this.port}`;
    }
    
    /**
     * Exposes the numbers available methods.
     *
     * @example
     * instance.numbers.getStatistics()
     *
     * @readonly
     * @memberof RestClient
     */
    get numbers() {
        return {
            generateNew : () => this.numbersResource.generate(),
            insertNumber : () => this.numbersResource.insertNumber(),
            getStatistics : () => this.numbersResource.statistics(),
        }
    }
}
