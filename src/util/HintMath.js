import easing from "easing-utils";

export default class HintMath {
    static hintsForChecks(numChecks, totalLocations, totalHints) {
        let ret = 0;
        // we want to scale between 0 and 50% of totalLocations
        // console.log(numChecks, totalLocations, totalHints);

        totalLocations /= 2;

        if(numChecks >= totalLocations) {
            return totalHints;
        }
        
        const progress = easing.linear(Math.min(1, numChecks / totalLocations));
    
        return Math.floor(progress * totalHints);
    }
    
    static checksForHint(numHints, startingChecks, totalLocations, totalHints) {
        if(numHints < 1) {
            throw new Error("numHints must be > 0");
        }
    
        // totalLocations /= 2;
    
        for(let i = startingChecks; i <= totalLocations / 2; i++) {
            const hints = this.hintsForChecks(i, totalLocations, totalHints);
            // console.log("At", i, "locations out of", totalLocations, "we have", hints, "hints. Desired:", numHints);
            if(hints == numHints) {
                return i;
            }
        }
    
        return +Infinity;
    }
}