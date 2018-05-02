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
    build() {             
        this.registerRoute({            
            method: Worker.VERBS.get,
            controllerAction: this.workerController.getNextNumber,
        });

        this.registerRoute({      
            path: '/:number',      
            method: Worker.VERBS.delete,
            controllerAction: this.workerController.deleteNumber,
        });    
        
        this.registerRoute({
            path: '/:game/probability',
            method: Worker.VERBS.get,
            controllerAction: this.workerController.getNextProbability,
        });
        
        this.registerRoute({
            path: '/restart',
            method: Worker.VERBS.get,
            controllerAction: this.workerController.restartNumbers,
        });
    }       
}