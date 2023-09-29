import Game from "./Game.js";
import LocationItem from "spoiler/LocationItem.js";
import { TYPE_IMPORTANT, TYPE_JUNK, TYPE_PROGRESSION } from "./constants.js";
import { easeOutSine } from "easing-utils";

const REGION_CARDIA = "Cardia Islands";
const REGION_CHAOS = "Temple of Fiends";
const REGION_CONERIA = "Coneria";
const REGION_CRESCENT = "Crescent Lake";
const REGION_CARAVAN = "Desert Caravan";
const REGION_DWARF = "Dwarf Cave";
const REGION_EARTH = "Earth Cave";
const REGION_ELF = "Elfland";
const REGION_GAIA = "Gaia";
const REGION_ICE = "Ice Cave";
const REGION_LEFEIN = "Lefein";
const REGION_MARSH = "Marsh Cave";
const REGION_MELMOND = "Melmond";
const REGION_MIRAGE = "Mirage Tower";
const REGION_NORTHWEST = "Northwest Castle";
const REGION_ORDEALS = "Castle of Ordeals";
const REGION_PRAVOKA = "Pravoka";
const REGION_SEA = "Sea Shrine";
const REGION_SKY = "Sky Castle";
const REGION_TITAN = "Titan's Tunnel";
const REGION_VOLCANO = "Gurgu Volcano";
const REGION_WATERFALL = "Waterfall Cave";

/** @extends {Game} */
export default class FinalFantasy extends Game {
    static #locationPrefixes = {
        ["Astos"]: REGION_NORTHWEST,
        ["Bikke"]: REGION_PRAVOKA,
        ["CanoeSage"]: REGION_CRESCENT,
        ["Cardia"]: REGION_CARDIA,
        ["Coneria"]: REGION_CONERIA,
        ["CubeBot"]: REGION_WATERFALL,
        ["DwarfCave"]: REGION_DWARF,
        ["EarthCave"]: REGION_EARTH,
        ["ElfPrince"]: REGION_ELF,
        ["Elfland"]: REGION_ELF,
        ["Fairy"]: REGION_CARAVAN,
        ["Gaia"]: REGION_GAIA,
        ["IceCave"]: REGION_ICE,
        ["King"]: REGION_CONERIA,
        ["Lefein"]: REGION_LEFEIN,
        ["MarshCave"]: REGION_MARSH,
        ["Matoya"]: [REGION_PRAVOKA, "Matoya's Cave"],
        ["Melmond"]: REGION_MELMOND,
        ["MirageTower"]: REGION_MIRAGE,
        ["Nerrick"]: REGION_DWARF,
        ["NorthwestCastle"]: REGION_NORTHWEST,
        ["Ordeals"]: REGION_ORDEALS,
        ["Princess"]: REGION_CONERIA,
        ["Sarda"]: REGION_TITAN,
        ["SeaShrine"]: REGION_SEA,
        ["SkyPalace"]: REGION_SKY,
        ["Smith"]: REGION_DWARF,
        ["Terminated Chaos"]: REGION_CHAOS,
        ["TitansTunnel"]: REGION_TITAN,
        ["ToF"]: REGION_CHAOS,
        ["Volcano"]: REGION_VOLCANO,
        ["Waterfall"]: REGION_WATERFALL,

    };

    constructor() {
        super("Final Fantasy");
    }

    get wayOfThe() {
        return "Path of the Crystals";
    }

    // get hintCount() {
    //     return 8;
    // }

    // get minHintCount() {
    //     return 5;
    // }
    
    // get barrenCount() {
    //     return 2;
    // }

    // get hintScalingPercentage() {
    //     return 0.4;
    // }

    // get hintScalingFormula() {
    //     return easeOutSine;
    // }
    /**
     * 
     * @param {LocationItem} item 
     * @param {string} location 
     */
    populateLocation(item, location) {
        if(item.item == "Terminated Chaos") {
            item.hintableWay = false;
        }
        for(const [key, value] of Object.entries(FinalFantasy.#locationPrefixes)) {
            if(location.indexOf(key) === 0) {
                if(value === "") {
                    return false;
                }

                if(Array.isArray(value)) {
                    item.region = value[0];
                    item.location = value[1];
                } else {
                    item.region = value;
                    item.location = value;
                }
                item.check = location;

                return true;
            }
        }
    }

    classifyItem(item, world) {
        switch(item) {
            case "Adamant":
            case "Airship":
            case "Bottle":
            case "Canal":
            case "Canoe":
            case "Chime":
            case "Crown":
            case "Cube":
            case "Floater":
            case "Lute":
            case "Key":
            case "Oxyale":
            case "Rod":
            case "Ruby":
            case "Ship":
            case "Slab":
            case "Tail":
            case "Tnt":
                return TYPE_IMPORTANT;
            case "Shard":
                return TYPE_PROGRESSION;
        }

        return TYPE_JUNK;
    }
}