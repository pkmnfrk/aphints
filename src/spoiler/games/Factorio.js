import Game from "./Game.js";
import LocationItem from "spoiler/LocationItem.js";

/** @extends {Game} */
export default class Factorio extends Game {
    constructor() {
        super("Factorio");
    }
    
    get wayOfThe() {
        return "Way of the Factory";
    }

    get produceHints() {
        return false;
    }

    /**
     * 
     * @param {LocationItem} item 
     */
    filterLocation(item) {
        if(item.check.indexOf("Automate ") === 0) {
            return false;
        }
        return true;
    }

}