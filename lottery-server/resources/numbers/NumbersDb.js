const Worker = require('pg-worker');
const { postgresql } = require('../../settings/config.json');


module.exports = class NumbersController extends Worker {
    /**
     * Creates an instance of NumbersController and passes database configs to super
     */
    constructor() {
        super(postgresql);
    }
        
    /**
     * Checks if a given pair of numbers is available to be used.
     * 
     * @param {Object} numbers - One object with all the number,
     * @returns {Promise} Resolve or rejects according to the database result. In case of resolution, 
        will be one boolean stating that numbers are or not available
     */
    areNumbersAvailable(numbers) {    
        const query = `SELECT COUNT(id) FROM euro_millions WHERE
                    first_number = $1
                    AND secound_number = $2 
                    AND third_number = $3 
                    AND fourth_number = $4
                    AND fifth_number = $5 
                    AND first_star = $6 
                    AND secound_star = $7`;
        const params = [
            numbers.first_number,
            numbers.secound_number,
            numbers.third_number,
            numbers.fourth_number,
            numbers.fifth_number,
            numbers.first_star,
            numbers.secound_star
        ];
        return this.booleanQuery(query, params)            
    }    

    /**
     * TGis function calls database to get the next winning probability
     * 
     * @returns {Promise} The resutned database promise
     */
    getProbability() {
        const query = '';
        const params = [];
        return this.query(query, params);
    }

    /**
     * This function inserts one new number on the database.
     * 
     * @param {Object} numbers - One object representing the numbers.
     * @returns {Promise} The returned db promise.
     */
    insertNumber(numbers) {
        const query = `INSERT INTO euro_millions 
                    (first_number, secound_number, third_number, fourth_number, fifth_number, first_star, secound_star)
                    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`;
        const params = [
            numbers.first_number,
            numbers.secound_number,
            numbers.third_number,
            numbers.fourth_number,
            numbers.fifth_number,
            numbers.first_star,
            numbers.secound_star
        ];
        return this.query(query, params);
    }    
}