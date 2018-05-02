const MongoDecorator = require('../../MongoDecorator.js');
const Utils = require('./NumbersUtils');
const { mongo } = require('../../settings/config.json');
module.exports = class NumbersMongo {

    constructor() {
        this.utils = new Utils();
        this.url = 'mongodb://diogo_aleixo:dmaaac3@ds261969.mlab.com:61969/heroku_21f9wz06';     
        this.mongoWrapper = new MongoDecorator(mongo);   
        this.database = 'heroku_21f9wz06';
        this.collections = {
            numbers: 'euro_millions_numbers',
            statistics: 'statistics'
        }
    }

    restartNumbers() {        
        let numbers = []; 
        let promissesInsert = [];               
        return this.mongoWrapper.removeCollectionDocs(this.collections.numbers, this.database)
        .then( () => {
            this.utils.generateAllPermutations(mongo.batchSize, (numbersBatch, finish) => {                     
                promissesInsert.push(this.mongoWrapper.insert(numbersBatch, this.collections.numbers,this.database));
                if (finish) {                                                            
                    Promise.all(promissesInsert)
                    .then( () => this.getAllKeysLength())
                    .then( res => this.updateInitialProbabilities(res))                                            
                }                                                             
            });  
        });             
    }

    updateInitialProbabilities(res) {        
        return this.mongoWrapper.updateOne({
            missingRows : res,
            total_combinations : res
        },{ missingRows : 0 },this.collections.statistics,this.database)
    }
    
    getAllKeysLength() {
        return this.mongoWrapper.find({},this.collections.numbers,this.database)
            .then( result => {
                let count = 0;
                result.forEach( item => {
                    count += Object.keys(item).length;
                })                              
                return count;
            })
    }

    restartStatistics() {        
        const statistics = {                        
            missingRows : 0,
            missingRowsPercentage: 100,
            each_probability : 0.000000013110394,
            total_combinations : 76275360
        }

        return this.mongoWrapper.removeCollectionDocs(this.collections.statistics, this.database)
            .then( () => this.mongoWrapper.insert(statistics, this.collections.statistics,this.database));                
    }

    getNextNumber() {   
        let chosenNumber = '';       
        return this.mongoWrapper.find({},this.collections.numbers,this.database)
            .then( result => {                
                const docsNum = result.length;                    
                const docTarget = Math.floor(Math.random() * docsNum) + 0;                
                const docKeysLimit = Object.keys(result[docTarget]).length
                const docKeysTarget = Math.floor(Math.random() * docKeysLimit) + 0;;
                chosenNumber = Object.keys(result[docTarget])[docKeysTarget];
                return chosenNumber;       
            })
    }  

    deleteNumber(number) {   
        let totalNumbers = 0;   
        let matchedCount = 0;  
        return this.mongoWrapper.updateUnset({[number] : number}, { [number] : number }, this.collections.numbers,this.database )
            .then( res => {
                matchedCount = res;
                return this.getAllKeysLength()
            })                        
            .then( allKeys => {
                totalNumbers = allKeys;
                return this.getNextProbability();
            })
            .then( gotProb => {                                        
                    return this.mongoWrapper.updateOne({
                        missingRows : totalNumbers,  
                        missingRowsPercentage : (totalNumbers * 100) / gotProb.total_combinations
                    },{},this.collections.statistics,this.database)
                })   
            .then( res => matchedCount);                                            
    }  

    getNextProbability() {
        return this.mongoWrapper.find({},this.collections.statistics,this.database)
            .then( res => res[0]);
    }
}