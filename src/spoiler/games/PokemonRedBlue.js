import Game from "./Game.js";
import LocationItem from "spoiler/LocationItem.js";
import { TYPE_IMPORTANT, TYPE_JUNK, TYPE_PROGRESSION } from "./constants.js";

/** @extends {Game} */
export default class PokemonRedBlue extends Game {
    
    constructor() {
        super("Pokemon Red and Blue");
    }

    static #locationPrefixes = {
        // order is important!
        ["Pokedex"] : "Pokedex",
        ["Evolution"] : "Evolution",

        ["Viridian Forest"] : "Viridian Forest",
        ["Fossil"] : "Mt Moon",
        ["Mt Moon"] : "Mt Moon",
        ["S.S. Anne"] : "S.S. Anne",
        ["Rock Tunnel"] : "Rock Tunnel",
        ["Pokemon Tower"] : "Pokemon Tower",
        ["Rocket Hideout"] : "Rocket Hideout",
        ["Silph Co"] : "Silph Co",
        ["Safari Zone"] : "Safari Zone",
        ["Pokemon Mansion"] : "Pokemon Mansion",
        ["Power Plant"] : "Power Plant",
        ["Seafoam Islands"] : "Seafoam Islands",
        ["Underground Path"] : "Underground Paths",
        ["Victory Road"] : "Victory Road",
        ["Cerulean Cave"] : "Cerulean Cave",
        ["Indigo Plateau Champion's Room"] : "Indigo Plateau",

        ["Player's House"] : "Pallet Town",
        ["Rival's House"] : "Pallet Town",
        ["Oak's Lab"] : "Pallet Town",
        ["Pallet"] : "Pallet Town",
        ["Viridian"] : "Viridian City",
        ["Pewter"] : "Pewter City",
        ["Cerulean"] : "Cerulean City",
        ["Bill's House"] : "Route 25",
        ["Vermilion"] : "Vermilion City",
        ["Lavender"] : "Lavender City",
        ["Celadon"] : "Celadon City",
        ["Saffron"] : "Saffron City",
        ["Fuchsia"] : "Fuchsia City",
        ["Cinnabar"] : "Cinnabar Island",
    };

    static #routeMatch = /^(?<location>(?<region>Route \d+)(?: Gate(?: \dF)?| Fly House| Super Rod House)?) - (?<check>.*?)$/;

    get sometimesHints() {
        return {
            hm: {
                label: "A Hidden Machine",
                items: [
                    "HM01 Cut",
                    // "HM02 Fly" ,
                    "HM03 Surf",
                    "HM04 Strength",
                    "HM05 Flash",
                ]
            },

            badge: {
                label: "A badge",
                condition: (world) => world.settings["Badgesanity"] == "Yes",
                items: [
                    "Boulder Badge",
                    "Cascade Badge",
                    "Thunder Badge",
                    "Rainbow Badge",
                    "Soul Badge",
                    "Marsh Badge",
                    "Volcano Badge",
                    "Earth Badge",
                ]
            },

            stone: {
                label: "An evolution stone",
                condition: (world) => world.settings["Stonesanity"] == "Yes" && isDexsanity(world),
                items: [
                    "Water Stone",
                    "Leaf Stone",
                    "Thunder Stone",
                    "Moon Stone",
                ]
            },

            tea: {
                label: "A hot drink",
                condition: (world) => world.settings["Tea"] == "Yes",
                items: [
                    "Tea",
                ]
            },

            key: {
                label: "A key",
                items: [
                    { item: "Plant Key", condition: (world) => world.settings["Extra Key Items"] == "Yes" },
                    { item: "Hideout Key", condition: (world) => world.settings["Extra Key Items"] == "Yes" },
                    { item: "Mansion Key", condition: (world) => world.settings["Extra Key Items"] == "Yes" },
                    { item: "Safari Pass", condition: (world) => world.settings["Extra Key Items"] == "Yes" },
                    "Secret Key",
                    { item: "Silph Scope", label: "A key-like object"},
                    { item: "S.S. Ticket", label: "A key-like object"},
                    "Lift Key",
                    "Card Key",
                ]
            }
        }
    }

    get alwaysHints() {
        return {
            itemfinder: {
                label: "An Item Finder",
                condition: (world) => world.settings["Randomize Hidden Items"] == "On" && world.settings["Require Item Finder"] == "Yes",
                items: [
                    "Item Finder",
                ]
            },

            pokedex: {
                label: "The Pokédex",
                condition: (world) => world.settings["Randomize Pokedex"] == "Randomize" && world.settings["Require Pokedex"] == "Yes",
                items: [
                    "Pokedex",
                ]
            },

            fly: {
                label: "HM02 Fly",
                items: [
                    "HM02 Fly",
                ]
            }
        }
    }

    get wayOfThe() {
        return "Way of the Master";
    }

    /**
     * 
     * @param {LocationItem} item 
     * @param {string} location 
     */
    populateLocation(item, location) {
        const result = PokemonRedBlue.#routeMatch.exec(location);
        if(result) {
            if(location.indexOf("Wild Pokemon") !== -1) {
                return false;
            }

            item.region = result.groups.region;
            item.location = result.groups.location;
            item.check = result.groups.check;
            return true;
        }

        for(const [key, value] of Object.entries(PokemonRedBlue.#locationPrefixes)) {
            if(location.indexOf(key) === 0) {
                if(value === "") {
                    return false;
                }

                if(location.indexOf("Wild Pokemon") !== -1) {
                    return false;
                }

                const parts = location.split(" - ");
                item.region = value;

                if(parts.length > 1) {
                    item.location = parts[0];
                    item.check = parts[1];
                } else {
                    item.check = parts[0];
                }

                if(item.region === "Evolution" || item.region === "Pokedex") {
                    item.hintableBarren = false;
                    item.hintableWay = false;
                }
                if(item.item == "Become Champion") {
                    item.hintableWay = false;
                }

                return true;
            }
        }
    }

    static #pokemonLocationsMatch = /^Pokémon locations (?<who>.*):$/;

    getLineHandler(spoiler, line) {
        const result = PokemonRedBlue.#pokemonLocationsMatch.exec(line);
        if(result) {
            return () => {};
        }
        return null;
    }

    classifyItem(item, world) {
        switch(item) {
            case "Bicycle":
            case "Card Key":
            case "Coin Case":
            case "Dome Fossil":
            case "Fire Stone":
            case "Gold Teeth":
            case "Good Rod":
            case "Helix Fossil":
            case "Hideout Key":
            case "HM01 Cut":
            case "HM02 Fly":
            case "HM03 Surf":
            case "HM04 Strength":
            case "HM05 Flash":
            case "Item Finder":
            case "Leaf Stone":
            case "Lift Key":
            case "Mansion Key":
            case "Master Ball":
            case "Moon Stone":
            case "Oak's Parcel":
            case "Old Amber":
            case "Old Rod":
            case "Plant Key":
            case "Poke Flute":
            case "Safari Pass":
            case "Secret Key":
            case "Silph Scope":
            case "Super Rod":
            case "Tea":
            case "Thunder Stone":
            case "Town Map":
            case "Water Stone":
                return TYPE_IMPORTANT;
            case "Fuji Saved":
            case "Seafoam Exit Boulder":
            case "Seafoam Boss Boulders":
            case "Victory Road Boulder":
            case "Silph Co Liberated":
            case "Help Bill":
                return TYPE_JUNK;
        }

        if(item.indexOf(" Badge") !== -1) {
            if(isBadgesanity(world)) {
                return TYPE_IMPORTANT;
            }
            return TYPE_PROGRESSION;
        }

        if(item.indexOf("Defeat ") === 0) {
            return TYPE_PROGRESSION;
        }

        return TYPE_JUNK;
        // throw new Error("Unknown item " + item);
    }
    
}

const isBadgesanity = (world) => world.settings["Badgesanity"] == "Yes";
const isDexsanity = (world) => world.settings["Dexsanity"] != "disabled" && world.settings["Dexsanity"] != "0";