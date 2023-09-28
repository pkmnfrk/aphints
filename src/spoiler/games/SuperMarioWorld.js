import Game from "./Game.js";
import LocationItem from "spoiler/LocationItem.js";
import { TYPE_IMPORTANT, TYPE_JUNK, TYPE_PROGRESSION } from "./constants.js";

const REGION_YOSHI = "Yoshi's Island";
const REGION_DONUT = "Donut Plains";
const REGION_VANILLA = "Vanilla Dome";
const REGION_MOUNTAIN = "Cookie Mountain";
const REGION_FOREST = "Forest of Illusion";
const REGION_CHOCO = "Chocolate Island";
const REGION_VALLEY = "Valley of Bowser";
const REGION_SPECIAL = "Special Zone";
const REGION_STAR = "Star Road";

/** @extends {Game} */
export default class SuperMarioWorld extends Game {
    static #locationPrefixes = {
        // order is important!
        ["Yoshi's"] : REGION_YOSHI,
        ["Yellow Switch Palace"] : REGION_YOSHI,
        ["#1 Iggy's Castle"] : REGION_YOSHI,

        ["Donut"] : REGION_DONUT,
        ["Green Switch Palace"] : REGION_DONUT,
        ["#2 Morton's Castle"] : REGION_DONUT,

        ["Vanilla"] : REGION_VANILLA,
        ["Red Switch Palace"] : REGION_VANILLA,
        ["#3 Lemmy's Castle"] : REGION_VANILLA,

        ["Butter"] : REGION_MOUNTAIN,
        ["Cheese"] : REGION_MOUNTAIN,
        ["Soda Lake"] : REGION_MOUNTAIN,
        ["Cookie Mountain"] : REGION_MOUNTAIN,
        ["#4 Ludwig's Castle"] : REGION_MOUNTAIN,

        ["Forest"] : REGION_FOREST,
        ["Blue Switch Palace"] : REGION_FOREST,
        ["#5 Roy's Castle"] : REGION_FOREST,

        ["Choco"] : REGION_CHOCO,
        ["Sunken Ghost Ship"] : REGION_CHOCO,
        ["#6 Wendy's Castle"] : REGION_CHOCO,

        ["Valley"] : REGION_VALLEY,
        ["#7 Larry's Castle"] : REGION_VALLEY,

        ["Star Road"] : REGION_STAR,
        ["Gnarly"] : REGION_SPECIAL,
        ["Tubular"] : REGION_SPECIAL,
        ["Way Cool"] : REGION_SPECIAL,
        ["Awesome"] : REGION_SPECIAL,
        ["Groovy"] : REGION_SPECIAL,
        ["Mondo"] : REGION_SPECIAL,
        ["Outrageous"] : REGION_SPECIAL,
        ["Funky"] : REGION_SPECIAL,
    };

    //commented slots are ones that are not shuffled (star roads, back door, etc)
    static #slotRegions = {
        0x28: [REGION_YOSHI, "Yoshi's House"],
        0x29: [REGION_YOSHI, "Yoshi's Island 1"],
        0x14: [REGION_YOSHI, "Yellow Switch Palace",],
        0x2A: [REGION_YOSHI, "Yoshi's Island 2"],
        0x27: [REGION_YOSHI, "Yoshi's Island 3"],
        0x26: [REGION_YOSHI, "Yoshi's Island 4"],
        0x25: [REGION_YOSHI, "#1 Iggy's Castle"],

        0x15: [REGION_DONUT, "Donut Plains 1"],
        0x09: [REGION_DONUT, "Donut Plains 2"],
        0x0A: [REGION_DONUT, "Donut Secret 1"],
        0x08: [REGION_DONUT, "Green Switch Palace"],
        0x04: [REGION_DONUT, "Donut Ghost House"],
        0x13: [REGION_DONUT, "Donut Secret House"],
        0x05: [REGION_DONUT, "Donut Plains 3"],
        0x06: [REGION_DONUT, "Donut Plains 4"],
        0x2F: [REGION_DONUT, "Donut Secret 2"],
        0x07: [REGION_DONUT, "#2 Morton's Castle"],
        0x03: [REGION_DONUT, "Top Secret Area"],
        // 0x16: [REGION_DONUT, "Star Road"],

        0x3E: [REGION_VANILLA, "Vanilla Dome 1"],
        0x3C: [REGION_VANILLA, "Vanilla Dome 2"],
        0x2D: [REGION_VANILLA, "Vanilla Secret 1"],
        0x2B: [REGION_VANILLA, "Vanilla Ghost House"],
        0x2E: [REGION_VANILLA, "Vanilla Dome 3"],
        0x3D: [REGION_VANILLA, "Vanilla Dome 4"],
        0x3F: [REGION_VANILLA, "Red Switch Palace"],
        0x01: [REGION_VANILLA, "Vanilla Secret 2"],
        0x02: [REGION_VANILLA, "Vanilla Secret 3"],
        0x0B: [REGION_VANILLA, "Vanilla Fortress"],
        0x40: [REGION_VANILLA, "#3 Lemmy's Castle"],
        // 0x2C: [REGION_VANILLA, "Star Road"],

        0x0C: [REGION_MOUNTAIN, "Butter Bridge 1"],
        0x0D: [REGION_MOUNTAIN, "Butter Bridge 2"],
        0x0F: [REGION_MOUNTAIN, "Cheese Bridge"],
        0x11: [REGION_MOUNTAIN, "Soda Lake"],
        0x10: [REGION_MOUNTAIN, "Cookie Mountain"],
        0x0E: [REGION_MOUNTAIN, "#4 Ludwig's Castle"],
        // 0x12: [REGION_MOUNTAIN, "Star Road"],

        0x42: [REGION_FOREST, "Forest of Illusion 1"],
        0x44: [REGION_FOREST, "Forest of Illusion 2"],
        0x47: [REGION_FOREST, "Forest of Illusion 3"],
        0x43: [REGION_FOREST, "Forest of Illusion 4"],
        0x41: [REGION_FOREST, "Forest Ghost House"],
        0x46: [REGION_FOREST, "Forest Secret"],
        0x45: [REGION_FOREST, "Blue Switch Palace"],
        0x1F: [REGION_FOREST, "Forest Fortress"],
        0x20: [REGION_FOREST, "#5 Roy's Castle"],
        // 0x1E: [REGION_FOREST, "Star Road"],

        0x22: [REGION_CHOCO, "Chocolate Island 1"],
        0x24: [REGION_CHOCO, "Chocolate Island 2"],
        0x23: [REGION_CHOCO, "Chocolate Island 3"],
        0x1D: [REGION_CHOCO, "Chocolate Island 4"],
        0x1C: [REGION_CHOCO, "Chocolate Island 5"],
        0x21: [REGION_CHOCO, "Choco-Ghost House"],
        0x1B: [REGION_CHOCO, "Chocolate Fortress"],
        0x3B: [REGION_CHOCO, "Chocolate Secret"],
        0x1A: [REGION_CHOCO, "#6 Wendy's Castle"],

        0x18: [REGION_VALLEY, "Sunken Ghost Ship"],
        0x3A: [REGION_VALLEY, "Valley of Bowser 1"],
        0x39: [REGION_VALLEY, "Valley of Bowser 2"],
        0x37: [REGION_VALLEY, "Valley of Bowser 3"],
        0x33: [REGION_VALLEY, "Valley of Bowser 4"],
        0x38: [REGION_VALLEY, "Valley Ghost House"],
        0x35: [REGION_VALLEY, "Valley Fortress"],
        0x34: [REGION_VALLEY, "#7 Larry's Castle"],
        // 0x31: [REGION_VALLEY, "Front Door"],
        // 0x81: [REGION_VALLEY, "Front Door"],
        // 0x32: [REGION_VALLEY, "Back Door"],
        // 0x82: [REGION_VALLEY, "Back Door"],
        // 0x30: [REGION_VALLEY, "Star Road"],

        // 0x5B: [REGION_STAR, "Star Road"],
        0x58: [REGION_STAR, "Star Road 1"],
        // 0x53: [REGION_STAR, "Star Road"],
        0x54: [REGION_STAR, "Star Road 2"],
        // 0x52: [REGION_STAR, "Star Road"],
        0x56: [REGION_STAR, "Star Road 3"],
        // 0x57: [REGION_STAR, "Star Road"],
        0x59: [REGION_STAR, "Star Road 4"],
        // 0x5C: [REGION_STAR, "Star Road"],
        0x5A: [REGION_STAR, "Star Road 5"],
        // 0x55: [REGION_STAR, "Star Road"],

        // 0x4D: [REGION_SPECIAL],
        0x4E: [REGION_SPECIAL, "Gnarly"],
        0x4F: [REGION_SPECIAL, "Tubular"],
        0x50: [REGION_SPECIAL, "Way Cool"],
        0x51: [REGION_SPECIAL, "Awesome"],
        0x4C: [REGION_SPECIAL, "Groovy"],
        0x4B: [REGION_SPECIAL, "Mondo"],
        0x4A: [REGION_SPECIAL, "Outrageous"],
        0x49: [REGION_SPECIAL, "Funky"],
        // 0x48: [REGION_SPECIAL],
    }
    
    constructor() {
        super("Super Mario World");
    }

    get wayOfThe() {
        return "Road of the Stars";
    }

    get hintCount() {
        return 8;
    }

    get minHintCount() {
        return 5;
    }
    
    get barrenCount() {
        return 2;
    }

    /**
     * 
     * @param {LocationItem} item 
     * @param {string} location 
     */
    populateLocation(item, location) {
        // if(item.item == "Boss Token" || item.item == "The Princess") {
        //     return false;
        // }

        if(item.item == "Yoshi Egg" || item.item == "Boss Token") {
            item.hintableWay = false;
        }
        for(const [key, value] of Object.entries(SuperMarioWorld.#locationPrefixes)) {
            if(location.indexOf(key) === 0) {
                if(value === "") {
                    return false;
                }

                const parts = location.split(" - ");
                item.region = value;
                item.location = parts[0];

                if(parts.length > 1) {
                    item.check = parts[1];
                } else {
                    item.check = parts[0];
                }

                return true;
            }
        }
    }

    /**
     * 
     * @param {import("spoiler/World.js").default} world
     * @param {import("archipelago.js").SlotData} context 
     * @param {import("archipelago.js").DataPackage} dataPackage
     */
    loadContextFromRoom(world, context, dataPackage) {
        // console.log(world.locations);
        if(context.active_levels) {
            for(const [level_id, slot_id] of Object.entries(context.active_levels)) {
                const level_slot = SuperMarioWorld.#slotRegions[parseInt(level_id, 10)];
                const region_slot = SuperMarioWorld.#slotRegions[parseInt(slot_id, 10)];

                if(!level_slot || !region_slot) {
                    // console.log("Level slot", level_id, level_slot)
                    // console.log("Region slot", slot_id, region_slot);
                    continue;
                }
                // console.log(level_id, slot_id);
                
                const level_name = level_slot[1];
                const slot_region = region_slot[0];
                
                // find all locations with the sepcified level, and switch the regions
                let changed = false;
                for(const loc of world.locations) {
                    if(loc.location === level_name) {
                        loc.region = slot_region;
                        changed = true;
                    }
                }
                // if(!changed) {
                //     console.log("Did not change", level_name);
                // }
                // console.log(level_name, "is in region", slot_region);
            }
        }
    }

    /**
     * 
     * @param {string} item 
     * @returns {boolean}
     */
    canItemBeWay(item) {
        switch(item) {
            case "Yoshi Egg":
            case "Boss Token":
            case "The Princess":
            case "1-Up Mushroom":
                return false;
            default:
                console.log(item, "can be way of the hero");
                return true;
        }
    }

    classifyItem(item) {
        switch(item) {
            case "1-Up Mushroom":
                return TYPE_JUNK;
            case "Yoshi Egg":
            case "Boss Token":
            case "The Princess":
                return TYPE_PROGRESSION;
            case "Run":
            case "Jump":
            case "Carry":
            case "Yoshi":
            case "Swim":
            case "Climb":
            case "Spin Jump":
            case "P-Switch":
            case "P-Balloon":
            case "Red Switch Palace":
            case "Yellow Switch Palace":
            case "Green Switch Palace":
            case "Blue Switch Palace":
            case "Super Star Activate":
            case "Progressive Powerup":
                return TYPE_IMPORTANT;
            default:
                throw new Error("Unknown item " + item);
        }
    }
}