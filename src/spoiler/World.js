import Game from "./games/Game.js";
import LocationItem from "./LocationItem.js";

export default class World {
    /** @type {int} */
    slot = 0;
    /** @type {string} */
    name;
    /** @type {Game} */   
    game;
    /** @type {Record<int, LocationItem[]>} */
    spheres = {};
    /** @type {LocationItem[]} */
    locations = [];
    /** @type {Record<string, string>} */
    settings = {};
    /** @type {string[]} */
    unreachableItems = [];

    get checkCount() {
        let ret = 0;
        for(const sphere of Object.values(this.spheres)) {
            ret += sphere.length;
        }
        return ret;
    }

    constructor(slot, name, game) {
        this.slot = slot;
        this.name = name;
        this.game = game;
    }
}