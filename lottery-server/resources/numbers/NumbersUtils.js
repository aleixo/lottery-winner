module.exports = class NumbarsUtils {
    /**
     * Creates an instance of NumbarsUtils.
     */
    constructor() {
        this.maxNumber = 50;
        this.minNumber = 0;
        this.maxStar = 11;
        this.minStar = 0;
    }

    /**
     * Generates a set of new numbers
     * 
     * @returns {Object} - One object with all the generated numbers.
     */
    generateNextNumber() {
        return {
            first_number : Math.floor(Math.random() * this.maxNumber) + this.minNumber,
            secound_number : Math.floor(Math.random() * this.maxNumber) + this.minNumber,
            third_number : Math.floor(Math.random() * this.maxNumber) + this.minNumber,
            fourth_number : Math.floor(Math.random() * this.maxNumber) + this.minNumber,
            fifth_number : Math.floor(Math.random() * this.maxNumber) + this.minNumber,
            first_star : Math.floor(Math.random() * this.maxStar) + this.minStar,
            secound_star : Math.floor(Math.random() * this.maxStar) + this.minStar,
        }
    }
}