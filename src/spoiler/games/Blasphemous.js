import Game from "./Game.js";
import { TYPE_IMPORTANT, TYPE_JUNK, TYPE_PROGRESSION } from "./constants.js";

const locationMatch = /^(?<region>.*?): (?<check>.*?)$/;

const otherMatches = {
    "Amanecida": ["Amanecida", "Amanecida"],
    "Beginning gift": ["Beginning Gift", "Beginning Gift"],
    "candle": ["Candles", "Candles"],
    "Confessor Dungeon": ["Confessor Dungeon", "Confessor Dungeon"],
    "Skill": ["Skills", "Skills"],
    "His Holiness Escribar": ["Deambulatory of His Holiness", "Deambulatory of His Holiness", false]
}

const regions = {
    "THL": "The Holy Line",
    "WotBC": "Wasteland of the Buried Churches",
    "MD": "Mercy Dreams",
    "DC": "Desecrated Cistern",
    "WOTW": "Where Olive Trees Wither",
    "GotP": "Graveyard of the Peaks",
    "CoOLotCV": "Convent of Our Lady of the Charred Visage",
    "MotED": "Mountains of the Endless Dusk",
    "GA": "Grievance Ascends",
    "PotSS": "Patio of the Silent Steps",
    "MoM": "Mother of Mothers",
    "KotTW": "Knot of the Three Words",
    "AtTotS": "All the Tears of the Sea",
    "LotNW": "Library of the Negated Words",
    "TSC": "The Sleeping Canvases",
    "AR": "Archcathedral Rooftops",
    "DoHH": "Deambulatory of His Holiness",
    "WotHP": "Wall of the Holy Prohibitions",
    "BotSS": "Brotherhood of the Silent Sorrow",
    "EoS": "Echoes of Salt",
    "MaH": "Mourning and Havoc",
    "BotTC": "Bridge of the Three Calvaries",
    "HotD": "Hall of the Dawning",
    "TRPotS": "Resting Place of the Sister",
}

export default class Blasphemous extends Game {
    constructor() {
        super("Blasphemous");
    }

    /**
     * @param {import("../LocationItem.js").default} item 
     * @param {string} location 
     */
    populateLocation(item, location) {
        let results = locationMatch.exec(location);

        if(results) {
            const region = (results.groups.region in regions) ? regions[results.groups.region] : results.groups.region;
            item.region = region;
            item.location = region;
            item.check = results.groups.check;
            return true;
        }

        for(const [matcher, result] of Object.entries(otherMatches)) {
            if(location.indexOf(matcher) !== -1) {
                item.region = result[0];
                item.location = result[1];
                item.check = location;
                if(result[2] === false) {
                    item.hintableWay = false;
                }
                return true;
            }
        }

        item.region = "Unknown";
        item.location = "Misc";
        item.check = location;
        item.hintableBarren = false;
        return true;
    }

}