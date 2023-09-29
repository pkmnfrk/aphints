import Game from "./Game.js";
import LocationItem from "spoiler/LocationItem.js";
import { TYPE_IMPORTANT, TYPE_JUNK, TYPE_PROGRESSION } from "./constants.js";

const pokemon = {
    "Bulbasaur": ["grass", "poison"],
    "Ivysaur": ["grass", "poison"],
    "Venusaur": ["grass", "poison"],
    "Oddish": ["grass", "poison"],
    "Gloom": ["grass", "poison"],
    "Vileplume": ["grass", "poison"],
    "Bellsprout": ["grass", "poison"],
    "Weepinbell": ["grass", "poison"],
    "Victreebel": ["grass", "poison"],
    "Charmander": ["fire"],
    "Charmeleon": ["fire"],
    "Charizard": ["fire", "flying"],
    "Vulpix": ["fire"],
    "Ninetales": ["fire"],
    "Growlithe": ["fire"],
    "Arcanine": ["fire"],
    "Squirtle": ["water"],
    "Wartortle": ["water"],
    "Blastoise": ["water"],
    "Psyduck": ["water"],
    "Golduck": ["water"],
    "Poliwag": ["water"],
    "Poliwhirl": ["water"],
    "Poliwrath": ["water", "fighting"],
    "Caterpie": ["bug"],
    "Metapod": ["bug"],
    "Butterfree": ["bug", "flying"],
    "Weedle": ["bug", "poison"],
    "Kakuna": ["bug", "poison"],
    "Beedrill": ["bug", "poison"],
    "Paras": ["bug", "grass"],
    "Parasect": ["bug", "grass"],
    "Venonat": ["bug", "poison"],
    "Venomoth": ["bug", "poison"],
    "Pidgey": ["normal", "flying"],
    "Pidgeotto": ["normal", "flying"],
    "Pidgeot": ["normal", "flying"],
    "Spearow": ["normal", "flying"],
    "Fearow": ["normal", "flying"],
    "Rattata": ["normal"],
    "Raticate": ["normal"],
    "Clefairy": ["normal"],
    "Clefable": ["normal"],
    "Jigglypuff": ["normal"],
    "Wigglytuff": ["normal"],
    "Meowth": ["normal"],
    "Persian": ["normal"],
    "Ekans": ["poison"],
    "Arbok": ["poison"],
    "Nidoran F": ["poison"],
    "Nidorina": ["poison"],
    "Nidoqueen": ["poison", "ground"],
    "Nidoran M": ["poison"],
    "Nidorino": ["poison"],
    "Nidoking": ["poison"],
    "Zubat": ["poison", "flying"],
    "Golbat": ["poison", "flying"],
    "Pikachu": ["electric"],
    "Raichu": ["electric"],
    "Sandshrew": ["ground"],
    "Sandslash": ["ground"],
    "Diglett": ["ground"],
    "Dugtrio": ["ground"],
    "Mankey": ["fighting"],
    "Primeape": ["fighting"],
    "Machop": ["fighting"],
    "Machoke": ["fighting"],
    "Machamp": ["fighting"],
    "Abra": ["psychic"],
    "Kadabra": ["psychic"],
    "Alakazam": ["psychic"],
    "Tentacool": ["water", "poison"],
    "Tentacruel": ["water", "poison"],
    "Geodude": ["rock", "ground"],
    "Graveler": ["rock", "ground"],
    "Golem": ["rock", "ground"],
    "Ponyta": ["fire"],
    "Rapidash": ["fire"],
    "Slowpoke": ["water"],
    "Slowbro": ["water", "psychic"],
    "Magnemite": ["electric"],
    "Magneton": ["electric"],
    "Farfetchd": ["normal", "flying"],
    "Doduo": ["normal", "flying"],
    "Dodrio": ["normal", "flying"],
    "Seel": ["water"],
    "Dewgong": ["water", "ice"],
    "Grimer": ["poison"],
    "Muk": ["poison"],
    "Shellder": ["water"],
    "Cloyster": ["water", "ice"],
    "Gastly": ["ghost", "poison"],
    "Haunter": ["ghost", "poison"],
    "Gengar": ["ghost", "poison"],
    "Onix": ["rock", "ground"],
    "Drowzee": ["psychic"],
    "Hypno": ["psychic"],
    "Krabby": ["water"],
    "Kingler": ["water"],
    "Voltorb": ["electric"],
    "Electrode": ["electric"],
    "Exeggcute": ["grass", "psychic"],
    "Exeggutor": ["grass", "psychic"],
    "Cubone": ["ground"],
    "Marowak": ["ground"],
    "Hitmonlee": ["fighting"],
    "Hitmonchan": ["fighting"],
    "Lickitung": ["normal"],
    "Koffing": ["poison"],
    "Weezing": ["poison"],
    "Rhyhorn": ["rock", "ground"],
    "Rhydon": ["rock", "ground"],
    "Chansey": ["normal"],
    "Tangela": ["grass"],
    "Kangaskhan": ["normal"],
    "Horsea": ["water"],
    "Seadra": ["water"],
    "Goldeen": ["water"],
    "Seaking": ["water"],
    "Staryu": ["water"],
    "Starmie": ["water", "psychic"],
    "Mr Mime": ["psychic"],
    "Scyther": ["bug", "flying"],
    "Jynx": ["psychic", "ice"],
    "Electabuzz": ["electric"],
    "Magmar": ["fire"],
    "Pinsir": ["bug"],
    "Tauros": ["normal"],
    "Magikarp": ["water"],
    "Gyarados": ["water", "flying"],
    "Lapras": ["water", "ice"],
    "Ditto": ["normal"],
    "Eevee": ["normal"],
    "Vaporeon": ["water"],
    "Jolteon": ["electric"],
    "Flareon": ["fire"],
    "Porygon": ["normal"],
    "Omanyte": ["water", "rock"],
    "Omastar": ["water", "rock"],
    "Kabuto": ["water", "rock"],
    "Kabutops": ["water", "rock"],
    "Aerodactyl": ["rock", "flying"],
    "Snorlax": ["normal"],
    "Articuno": ["ice", "flying"],
    "Zapdos": ["electric", "flying"],
    "Moltres": ["fire", "flying"],
    "Dratini": ["dragon"],
    "Dragonair": ["dragon"],
    "Dragonite": ["dragon", "flying"],
    "Mewtwo": ["psychic"],
    "Mew": ["psychic"],
}

const types = [...new Set(Object.values(pokemon).flat())];

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
            },

            boss: {
                items: [
                    { location: "Rocket Hideout B4F - Giovanni Item", label: "Clearing the Rocket Hideout"},
                    { location: "Lavender Mr. Fuji's House - Mr. Fuji", label: "Exorcising the Pokemon Tower" },
                    { location: "Silph Co 11F - Silph Co President", label: "Liberating Silph Co" },
                ]
            },

            ...Object.fromEntries((() => {
                const ret = [];
                for(const type of types) {
                    const eligible = Object.entries(pokemon).filter(e => e[1].indexOf(type) !== -1).map(p => p[0]);
                    
                    ret.push(["dex-" + type, {
                        label: `Catching a ${type} type Pokemon`,
                        items: eligible.map(e => ({
                            location: "Pokedex - " + e,
                        })),
                        condition: isDexsanity,
                        notJunk: true,
                    }]);
                }

                return ret;
            })()),
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
            },
        }
    }

    get wayOfThe() {
        return "Way of the Master";
    }

    sometimesCount(world) {
        return isDexsanity(world) ? 6 : 3;
    }

    hintCount(world) {
        return isDexsanity(world) ? 23 : 20;
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

    /**
     * @param {LocationItem} item 
     */
    filterLocation(item) {
        return item.region !== "Evolution";
    }
    
}

const isBadgesanity = (world) => world.settings["Badgesanity"] == "Yes";
const isDexsanity = (world) => world.settings["Dexsanity"] != "disabled" && world.settings["Dexsanity"] != "0";