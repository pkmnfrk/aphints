import Game from "./Game.js";
import LocationItem from "spoiler/LocationItem.js";

/** @extends {Game} */
export default class Timespinner extends Game {

    static #LocationFormat = /^(?<location>.*): (?<check>.*?)$/;
    static #Boss = /^Killed (?<who>.*)$/;

    static #BossLocations =
    {
        ["Emperor"]: "Emperor's Tower",
        ["Maw"]: "Caves of Banishment",
        ["Twins"]: "Castle Keep",
        ["Aelana"]: "Royal Towers",
        ["Nightmare"]: "Ancient Pyramid"
    };

    constructor() {
        super("Timespinner");
    }

    get wayOfThe() {
        return "Thread of Fate";
    }

    /**
     * @param {LocationItem} item 
     * @param {string} location 
     */
    populateLocation(item, location) {
        let result = Timespinner.#LocationFormat.exec(location);
        if(result) {
            item.region = result.groups.location;
            item.location = item.region;
            item.check = result.groups.check;
            return true;
        }

        result = Timespinner.#Boss.exec(location);
        if(result) {
            item.region = Timespinner.#BossLocations[result.groups.who];
            item.location = item.region;
            item.check = location;
            item.hintableBarren = false;
            item.hintableWay = false;
            return true;
        }
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