const Db = require('./NumbersDb');
const Utils = require('./NumbersUtils');

module.exports = class NumbersController {

    /**
     * Creates an instance of NumbersController.
     */
    constructor() {
        this.db = new Db();
        this.utils = new Utils();
    }

    /**
     * Function to controll the flow to get the new available number to the user.
     *
     * @returns {Object} - The available numbers or recursively calls itself in search for more.
     */
    getNextNumber() {      
        const numbers = this.utils.generateNextNumber();
        return this.areNumbersAvailable(numbers)   
            .then( res => res ? numbers : this.utils.getNextNumber() );
            
    }

    /**
     * Checks if a given ser of numbers are available callind db layer
     * 
     * @param {Object} numbers - The numbers to be checked.
     * @returns {Promise} Resolution with true or false or rejection with error.
     */
    areNumbersAvailable(numbers) {
        return this.db.areNumbersAvailable(numbers);
    }

    /**
     * Asks the db for the next winning probability.
     * 
     */
    getProbability() {
        
    }

    /**
     * Inserts one new number calling the database if numbers are available
     * 
     * @param {Object} numbers - The numbers to be checked.
     * @returns {Promise} Returned promise from db
     */
    insertNumber(numbers) {
        return this.db.areNumbersAvailable(numbers)
        .then( res => {
            if (!res) {
                throw new Error('Ooops... Number already exists in Db.')
            }
            return this.db.insertNumber(numbers)
        } );
    }    
}