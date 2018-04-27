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
        return this.db.areNumbersAvailable(numbers)   
            .then( res => res ? numbers : this.utils.getNextNumber() );
            
    }

    /**
     * Asks the db for the next winning probability.
     * 
     */
    getNextProbability(data) {
        return this.db.getNextProbability(data.game);
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