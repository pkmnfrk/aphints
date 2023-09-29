import Game from "./Game.js";
import { TYPE_IMPORTANT, TYPE_JUNK, TYPE_PROGRESSION } from "./constants.js";

const locationMatch = /^(?<check>.*?) \((?<region>.*?)\)$/;

export default class LinksAwakening extends Game {
    constructor() {
        super("Links Awakening DX");
    }

    /**
     * @param {import("../LocationItem.js").default} item 
     * @param {string} location 
     */
    populateLocation(item, location) {
        let results = locationMatch.exec(location);

        if(results) {
            item.region = results.groups.region;
            item.location = results.groups.region;
            item.check = results.groups.check;
            return true;
        }
        item.region = "Misc";
        item.location = "Misc";
        item.check = location;
        item.hintableBarren = false;
        return true;
    }

    /**
     * 
     * @param {string} item 
     */
    classifyItem(item) {
        switch(item) {
            case "Ballad of the Wind Fish":
            case "Bananas":
            case "Blue Tunic":
            case "Boomerang":
            case "Bow":
            case "BowWow":
            case "Broom":
            case "Dog Food":
            case "Feather":
            case "Fishing Hook":
            case "Flippers":
            case "Frog's Song of Soul":
            case "Gold Leaf":
            case "Hibiscus":
            case "Hookshot":
            case "Honeycomb":
            case "Letter":
            case "Magic Powder":
            case "Magic Rod":
            case "Magnifying Glass":
            case "Manbo's Mambo":
            case "Max Arrows Upgrade":
            case "Max Bombs Upgrade":
            case "Max Powder Upgrade":
            case "Necklace":
            case "Rooster":
            case "Ocarina":
            case "Pegasus Boots":
            case "Pineapple":
            case "Progressive Power Bracelet":
            case "Progressive Shield":
            case "Progressive Sword":
            case "Red Tunic":
            case "Ribbon":
            case "Scale":
            case "Shovel":
            case "Stick":
            case "Toadstool":
            case "Yoshi Doll":
                return TYPE_IMPORTANT;

            //labelling these as junk since they should not prevent a dungeon from being marked as barren
            case "Conch Horn":
            case "Coral Triangle":
            case "Full Moon Cello":
            case "Organ of Evening Calm":
            case "Sea Lily's Bell":
            case "Surf Harp":
            case "Thunder Drum":
            case "Wind Marimba":
                return TYPE_JUNK;
        }
        if(item.indexOf("Dungeon Map") !== -1 || item.indexOf("Compass") !== -1 || item.indexOf("Stone Beak") !== -1) {
            // have to check this first, or else Key Cavern ruins everything >:(
            return TYPE_JUNK;
        }

        if(item.indexOf("Key") !== -1) {
            return TYPE_IMPORTANT;
        }
        return TYPE_JUNK
    }
}