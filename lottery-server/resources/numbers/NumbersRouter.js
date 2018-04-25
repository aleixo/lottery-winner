const Controller = require('./NumbersController');
const Worker = require('expressjs-router-worker');

module.exports = class NumbersRouter extends Worker {
    /**
     * Creates an instance of NumbersRouter.
     */
    constructor() {
        super()
        this.controller = new Controller();
        this.entry = '/numbers';
        this.build();
    }

    /**
     * Builds the router registering the routes.
     *
     * @memberof NumbersRouter
     */
    build () {             
        this.registerRoute({            
            method: Worker.VERBS.get,
            controllerAction: this.workerController.getNextNumber,
        });    

        this.registerRoute({            
            method: Worker.VERBS.post,
            controllerAction: this.workerController.insertNumber,
        });    
        
        this.registerRoute({
            path: '/probability',
            method: Worker.VERBS.get,
            controllerAction: this.workerController.getProbability,
        });    
    }       
}