import easing from "easing-utils";

export default class HintMath {
    /**
     * 
     * @param {number} numChecks 
     * @param {number} totalLocations 
     * @param {number} totalHints 
     * @param {import("../spoiler/games/Game").default} game
     * @returns 
     */
    static hintsForChecks(numChecks, totalLocations, totalHints, game) {
        let ret = 0;
        // we want to scale between 0 and 50% of totalLocations
        // console.log(numChecks, totalLocations, totalHints);

        totalLocations *= game.hintScalingPercentage;

        if(numChecks >= totalLocations) {
            return totalHints;
        }
        
        const progress = game.hintScalingFormula(Math.min(1, numChecks / totalLocations));
    
        return Math.floor(progress * totalHints);
    }
    
        /**
     * 
     * @param {number} numChecks 
     * @param {number} totalLocations 
     * @param {number} totalHints 
     * @param {import("../spoiler/games/Game").default} game
     * @returns 
     */
    static checksForHint(numHints, startingChecks, totalLocations, totalHints, game) {
        if(numHints < 1) {
            throw new Error("numHints must be > 0");
        }
    
        // totalLocations /= 2;
    
        for(let i = startingChecks; i <= totalLocations * game.hintScalingPercentage; i++) {
            const hints = this.hintsForChecks(i, totalLocations, totalHints, game);
            // console.log("At", i, "locations out of", totalLocations, "we have", hints, "hints. Desired:", numHints);
            if(hints == numHints) {
                return i;
            }
        }
    
        return +Infinity;
    }
}