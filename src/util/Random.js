import seedrandom from "seedrandom";

export default class Random {
    /**
     * @param {string} seed 
     */
    constructor(seed) {
        this.prng = seedrandom(seed);
    }

    /**
     * Returns a number between 0 and max, exclusive
     * @param {number} max 
     */
    next(max) {
        return Math.floor(this.prng() * max);
    }

    /**
     * shuffles an array to random order
     * @template T
     * @param {Array<T>} arr

     * @returns {Array<T>}
     */
    shuffle(arr) {
        const ret = [];
        const src = [...arr];

        while(src.length) {
            const ix = this.next(src.length);
            ret.push(src[ix]);
            src.splice(ix, 1);
        }

        return ret;
    }
}