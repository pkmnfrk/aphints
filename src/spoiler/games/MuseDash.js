import Game from "./Game.js";
import { TYPE_IMPORTANT, TYPE_JUNK, TYPE_PROGRESSION } from "./constants.js";

const level = /^(?<region>.*)-\d$/;

/** @extends {Game} */
export default class MuseDash extends Game {
    constructor() {
        super("Muse Dash");
    }

    /**
     * @param {import("../LocationItem.js").default} item 
     * @param {string} location 
     */
    populateLocation(item, location) {
        let result = level.exec(location);
        if(result) {
            const {region} = result.groups;
            item.region = region;
            item.location = region;
            item.check = location;
            return true;
        }
    }

    classifyItem(item) {
        if(/ Trap$/.test(item)) {
            return TYPE_JUNK;
        }
        if(item === "Music Sheet") {
            return TYPE_PROGRESSION;
        }
        return TYPE_IMPORTANT;
    }
}