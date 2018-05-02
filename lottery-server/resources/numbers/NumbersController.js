const Db = require('./NumbersDb');
const Utils = require('./NumbersUtils');
const Mongo = require('./NumbersMongo');
module.exports = class NumbersController {

    /**
     * Creates an instance of NumbersController.
     */
    constructor() {
        this.db = new Db();
        this.utils = new Utils();
        this.mongo = new Mongo();
    }

    restartNumbers() {
        return this.mongo.restartNumbers()
            .then( () => this.mongo.restartStatistics())
            .then( () => {
                return {message : 'RESTART IS STILL RUNNING. GOT TIME?'};
            })            
    }

    /**
     * Function to controll the flow to get the new available number to the user.
     *
     * @returns {Object} - The available numbers or recursively calls itself in search for more.
     */
    getNextNumber() {       
        return this.mongo.getNextNumber()
            .then( result => {
                return {
                    message : 'GOT NUMBER',
                    number : result,             
                }
            });                    
    }

    /**
     * Asks the db for the next winning probability.
     * 
     */
    getNextProbability(data) {
        return this.mongo.getNextProbability(data.game);
    }

    /**
     * Inserts one new number calling the database if numbers are available
     * 
     * @param {Object} numbers - The numbers to be checked.
     * @returns {Promise} Returned promise from db
     */
    deleteNumber(data) {
       return this.mongo.deleteNumber(data.number)
            .then( result => {
                return {message : result ? 'Deleted' : 'Nothing to delete'};
            })
    }    
}