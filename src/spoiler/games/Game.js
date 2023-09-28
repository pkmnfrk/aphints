import LocationItem from "spoiler/LocationItem.js";
import SpoilerLog from "spoiler/SpoilerLog.js";
import World from "spoiler/World.js";
import HintHelper from "../HintHelper.js";
import {TYPE_IMPORTANT} from "./constants.js";

export default class Game {
    #id;
    constructor(id) {
        this.#id = id;
    }

    get name() {
        return this.#id;
    }

    get wayOfThe() {
        return "Way of the Hero";
    }

    get generateHints() {
        return true;
    }

    /**
     * @returns {Record<string, import("../HintHelper.js").Hint>}
     */
    get sometimesHints() {
        return {}
    }

    /**
     * @returns {Record<string, import("../HintHelper.js").Hint>}
     */
    get alwaysHints() {
        return {}
    }

    get hintCount() {
        return 20;
    }

    get minHintCount() {
        return 10;
    }

    get maxHintCount() {
        return 15;
    }

    get barrenCount() {
        return 3;
    }

    /**
     * @param {LocationItem} item 
     * @param {string} location 
     */
    populateLocation(item, location) {
        Game.defaultAddLocation(item, location);
        return true;
    }

    /**
     * @param {LocationItem} item 
     * @param {string} location 
     */
    filterLocation(item) {
        return true;
    }

    static defaultAddLocation(item, location) {
        item.check = location;
    }

    /**
     * @param {SpoilerLog} spoiler 
     * @param {string} line 
     * @returns 
     */
    getLineHandler(spoiler, line) {
        return null;
    }

    /**
     * 
     * @param {SpoilerLog} spoiler 
     * @param {import("../../util/Random.js").default} random 
     * @param {World} world 
     */
    produceHints(spoiler, random, world, totalHints = 0, includeSpoilers = false) {
        const ret = [];
        const hintedLocations = [];

        const importantChecks = random.shuffle(Object.values(world.spheres).flat());

        const always = [...HintHelper.createHints(spoiler, world, random, hintedLocations, this.alwaysHints)];
        const sometimes = [...HintHelper.createHints(spoiler, world, random, hintedLocations, this.sometimesHints, totalHints !== 0 ? 3 : null)];

        const barren = HintHelper.createBarrenHints(spoiler, world, random, importantChecks, totalHints !== 0 ? this.barrenCount : 0);

        ret.push(...always);
        ret.push(...sometimes);
        ret.push(...barren);

        HintHelper.populateWayHints(spoiler, world, ret, importantChecks, hintedLocations, totalHints, includeSpoilers);
        

        return ret;
    }

    /**
     * 
     * @param {World} world 
     * @param {import("archipelago.js").SlotData} room 
     * @param {import("archipelago.js").DataPackage} dataPackage
     */
    loadContextFromRoom(world, room, dataPackage) {

    }

    /**
     * 
     * @param {string} item 
     * @returns {boolean}
     */
    canItemBeWay(item) {
        return true;
    }

    /**
     * 
     * @param {string} item 
     * @param {World} world 
     * @returns 
     */
    classifyItem(item, world) {
        return TYPE_IMPORTANT;
    }
}

