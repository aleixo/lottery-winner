/**
 * This class manages the data to be consumed by the api. It transforms the data into well known
 * model
 *
 * @export
 * @class RequestModel
 */
export default class RequestModel {
    static get REPRESENTATIONS() {
        return {
            DIALPLAN_RULES_UUID : 'dialplan_rules_uuid',
        };
    }

    /**
     * Creates an instance of RequestModel.
     *
     * @example
     * new RequestModel({uuid: '111-222-333'})
     *
     * @param {Object} params - The object to be parsed in the model.
     * @memberof RequestModel
     */
    constructor(params) {
        if (!params) {
            return;
        }

        this.REPRESENTATIONS = {
            DIALPLAN_RULES_UUID : 'dialplan_rules_uuid',
        };

        // TODO - Abstract it - DialplanRules
        this.dialplan_rules_uuid = params.dialplan_rules_uuid;
        this.route = params.route;
        this.request_type = params.request_type;
        this.methods = params.methods;
        this.condition_key = params.condition_key;
        this.condition_value = params.condition_value;
        this.rules = params.rules;
        this.enabled = params.enabled;

        this.queryParams = params.queryString || undefined;
    }

    /**
     * Build the http query parameters string if needed.
     *
     * @example
     * instance.buildQueryString()
     *
     * @returns {string} One string with the built query string.
     * @memberof Actions
     */
    buildQueryString() {
        if (!this.queryParams) {
            return '';
        }

        const builtQueryParamsString = [];

        Object.keys(this.queryParams).forEach( (item) => {
            builtQueryParamsString.push(`${item}=${this.queryParams[item]}`);
        });

        return `?${builtQueryParamsString.join('?')}`;
    }

    /**
     * The body of the insert dialplan rule api request.
     *
     * @example
     * const body = instance.inserDialplanBody
     *
     * @readonly
     * @memberof RequestModel
     */
    get insertDialplanBody() {
        return {
            dialplan_rules_uuid : this.dialplan_rules_uuid,
            route : this.route,
            request_type : this.request_type,
            methods : this.methods,
            condition_key : this.condition_key,
            condition_value : this.condition_value,
            rules : this.rules,
            enabled : this.enabled,
        };
    }

    /**
     * The body of the update dialplan rule api request.
     *
     * @example
     * const body = instance.inserDialplanBody
     *
     * @readonly
     * @memberof RequestModel
     */
    get updateDialplanBody() {
        return {
            dialplan_rules_uuid : this.dialplan_rules_uuid,
            route : this.route,
            request_type : this.request_type,
            methods : this.methods,
            condition_key : this.condition_key,
            condition_value : this.condition_value,
            rules : this.rules,
            enabled : this.enabled,
        };
    }
}
