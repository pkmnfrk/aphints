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

    classifyItem(item) {
        switch(item) {
            case "Aubade of the Nameless Guardian":
            case "Campanillero to the Sons of the Aurora":
            case "Cante Jondo of the Three Sisters":
            case "Cantina of the Blue Rose":
            case "Debla to the Lights":
            case "Lorquiana":
            case "Mirabras of the Return to Port":
            case "Romance to the Crimson Mist":
            case "Saeta Dolorosa":
            case "Seguiriya to your Eyes like Stars":
            case "Solea of Excommunication":
            case "Taranto to My Sister":
            case "Tiento to Your Thorned Hairs":
            case "Tirana of the Celestial Bastion":
            case "Verdiales of the Forsaken Hamlet":
            case "Zambra to the Resplendent Crown":
            case "Zarabanda of the Safe Haven":

                return TYPE_IMPORTANT;

            case "Child of Moonlight":
            case "Anklebone of Weston, the Pilgrim":
            case "Calcaneum of Persian, the Bandit":
            case "Capitate of Barock, the Herald":
            case "Cervical Vertebra of Zicher, the Brewmaster":
            case "Clavicle of Dalhuisen, the Schoolchild":
            case "Coccyx of Daniel, the Possessed":
            case "Coxal of June, the Prostitute":
            case "Femur of Karpow, the Bounty Hunter":
            case "Fibula of Rysp, the Ranger":
            case "Frontal of Martinus, the Ropemaker":
            case "Hamate of Vukelich, the Copyist":
            case "Humerus of McMittens, the Nurse":
            case "Hyoid bone of Senex, the Beggar":
            case "Jaw of Ashgan, the Inquisitor":
            case "Kneecap of Sebastien, the Puppeteer":
            case "Lunate of Keiya, the Butcher":
            case "Maxilla of Tarradax, the Cleric":
            case "Metacarpus of Hodges, the Blacksmith":
            case "Metatarsus of Rikusyo, the Traveller":
            case "Nasal Bone of Charles, the Artist":
            case "Navicular of Kahnnyhoo, the Murderer":
            case "Occipital of Tequila, the Metalsmith":
            case "Parietal Bone of Lasser, the Inquisitor":
            case "Phalanx of Aralcarim, the Archivist":
            case "Phalanx of Arthur, the Sailor":
            case "Phalanx of Brannon, the Gravedigger":
            case "Phalanx of Miriam, the Counsellor":
            case "Phalanx of William, the Sceptic":
            case "Phalanx of Zeth, the Prisoner":
            case "Pisiform of Hernandez, the Explorer":
            case "Radius of Helzer, the Poet":
            case "Ribs of Sabnock, the Guardian":
            case "Sacrum of the Dark Warlock":
            case "Scaphoid of Fierce, the Leper":
            case "Scapula of Carlos, the Executioner":
            case "Sternum of Vitas, the Performer":
            case "Temporal of Joel, the Thief":
            case "Tibia of Alsahli, the Mystic":
            case "Trapezium of Jeremiah, the Hangman":
            case "Trapezoid of Yeager, the Jeweller":
            case "Triquetral of Luca, the Tailor":
            case "Ulna of Koke, the Troubadour":
            case "Vertebra of John, the Gambler":
            case "Vertebra of Lindquist, the Forger":
                return TYPE_PROGRESSION;
            
            case "Empty Bile Vessel":
            case "Fervour Upgrade":
            case "Mea Culpa Upgrade":
            case "Quicksilver":
            case "Knot of Rosary Rope":
            case "Life Upgrade":
            case "Thorn Upgrade":
            case "Verses Spun from Gold":
            case "Victory": //lol
            
                return TYPE_JUNK;
        }
        if(item.indexOf("Heart") !== -1) {
            return TYPE_IMPORTANT;
        }
        if(item.indexOf("Tears of Atonement") !== -1) {
            return TYPE_JUNK;
        }
        return TYPE_IMPORTANT;
    }

}