import Game from "./Game.js";
import LocationItem from "spoiler/LocationItem.js";

/** @extends {Game} */
export default class OcarinaOfTime extends Game {
    constructor() {
        super("Ocarina of Time");
    }



    get generateHints() {
        return false;
    }
}