const { euro_millions } = require('../../settings/config.json');
module.exports = class NumbarsUtils {
    /**
     * Used to format numbers using two digits allways
     * 
     * @param {number} numbers - The numbers arry to be formated
     * @returns 
     */
    padTwoDecimalPlaces(numbers) {        
        return numbers.map( item => {
            return (item < 10 ? '0' : '') + item;
        });        
    }

    /**
     * Generate all the permutation for the euro_millions game
     * 
     * @param {number} batchSize - The size to be batched due to large objects.
     * @param {Function} callback - One callback to give back the data and clean the object.
     * @returns 
     */
    generateAllPermutations(batchSize, callback) {        
        const minN = euro_millions.minN;
        const maxN = euro_millions.maxN;
        const minS = euro_millions.minS;
        const maxS = euro_millions.maxS;   

        let numbers = {};   
        
        let i = 0;
        
        for(let n1 = minN; n1 <= maxN; n1++) {
            for(let n2 = minN; n2 <= maxN; n2++) {                
                for(let n3 = minN; n3 <= maxN; n3++) {
                    for(let n4 = minN; n4 <= maxN; n4++) {
                        for(let n5 = minN; n5 <= maxN; n5++) {
                            for(let s1 = minN; s1<= maxS; s1++) {
                                for(let s2 = minN; s2<= maxS; s2++) {                                                                                                  
                                    const key = this.padTwoDecimalPlaces([n1,n2,n3,n4,n5,s1,s2]).join("");                                    
                                    numbers[key] = key;                        
                                    i++;
                                    if (i === batchSize) {
                                        i = 0;
                                        callback(numbers);
                                        numbers = {};                                        
                                    }                                                                                                                                   
                                }
                            }
                        }
                    }
                }
            }
        }                
        return callback(numbers, true)   
    }    
}