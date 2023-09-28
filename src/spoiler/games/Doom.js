import Game from "./Game.js";
import LocationItem from "spoiler/LocationItem.js";
import { TYPE_IMPORTANT, TYPE_JUNK, TYPE_PROGRESSION } from "./constants.js";

/** @extends {Game} */
export default class Doom extends Game {
    constructor() {
        super("DOOM 1993");
    }

    get wayOfThe() {
        return "Way of the Slayer";
    }

    get hintCount() {
        return 10;
    }

    get alwaysHints() {
        return {
            shotgun: {
                label: "The Shotgun",
                items: [
                    "Shotgun"
                ]
            },
            backpack: {
                label: "The Backpack",
                items: [
                    "Backpack"
                ]
            }
        }
    }

    /**
     * 
     * @param {LocationItem} item 
     * @param {string} location 
     */
    populateLocation(item, location) {
        const parts = location.split(" - ");
        if(parts.length === 2) {
            item.location = parts[0];
            item.check = parts[1];
            item.region = parts[0];

            // const result = Doom.#levelNumber.exec(location);
            // if(result) {
            //     item.region = parts[0];
            // }
            return true;
        } else {
            console.error(location);

        }


    }
    /**
     * 
     * @param {LocationItem} item 
     */
    filterLocation(item) {
        // if(item.check == "Exit") {
        //     return false;
        // }
        return true;
    }

    canItemBeWay(item) {
        switch(item) {
            // case "Shotgun":
            case "Chaingun":
            case "Rocket launcher":
            case "Plasma Rifle":
            case "BFG9000":
            case "Backpack":
                return false;
            default:
                if(item.indexOf("Complete") !== -1) {
                    return false;
                }
                return true;
        }
    }

    classifyItem(item) {
        switch(item) {
            case "Shotgun":
            case "Chaingun":
            case "Rocket launcher":
            case "Plasma gun":
            case "BFG9000":
            case "Backpack":
                return TYPE_IMPORTANT;
        }

        if(item.indexOf("keycard") !== -1 || item.indexOf("skull") !== -1) {
            return TYPE_IMPORTANT;
        }
        
        if(/\(E\dM\d\)$/.test(item)) {
            return TYPE_PROGRESSION;
        }

        return TYPE_JUNK;
    }
}