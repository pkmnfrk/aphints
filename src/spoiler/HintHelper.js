import Game from "./games/Game.js";
import { TYPE_JUNK, TYPE_PROGRESSION } from "./games/constants.js";
import Games from "./games/index.js";
/**
 * @callback conditionTest
 * @param {World} world
 * @returns {boolean}
 */
/**
 * @typedef HintItem
 * @property {string} item
 * @property {conditionTest?} condition
 * @property {string?} label
 */
/**
 * @typedef Hint
 * @property {string?} label
 * @property {conditionTest?} condition
 * @property {(HintItem | string)[]} items
 */


export default class HintHelper {

    /**
     * @param {import("./SpoilerLog").default} spoiler 
     * @param {import("./World").default} world 
     * @param {import("../util/Random").default} random 
     * @param {import("./LocationItem").default[]} hintedLocations 
     * @param {Record<string, Hint>} hints 
     */
    static * createHints(spoiler, world, random, hintedLocations, hints, limit = null) {
        // first, we need to evaluate which hints are actually available
        /**
         * @type {string[][]}
         */ 
        let finalHints = [];

        for(const [key, value] of Object.entries(hints)) {
            if(value.condition && !value.condition(world)) {
                continue;
            }

            const entry = [];
            for(const item of value.items) {
                if(typeof item === "string") {
                    if(world.unreachableItems.indexOf(item) !== -1) {
                        continue;
                    }
                    entry.push([item, value.label]);
                } else {
                    if(item.condition && !item.condition(world)) {
                        continue;
                    }

                    if(world.unreachableItems.indexOf(item.item) !== -1) {
                        continue;
                    }

                    entry.push([item.item, item.label ?? value.label]);
                }
            }

            if(!entry.length) {
                continue;
            }

            finalHints.push(entry);
        }

        if(limit !== null) {
            // console.log("Before limit", finalHints);
            finalHints = random.shuffle(finalHints).slice(0, limit);
        }

        // console.log("About to generate", finalHints);
        for(const hint of finalHints) {
            const realHint = hint[random.next(hint.length)];
            const loc = this.findItem(spoiler, realHint[0], world.name);

            if(loc === null) {
                console.log("Unable to find", realHint[0]);
                continue;
                // debugger;
            }
            if(hintedLocations.indexOf(loc) !== -1) {
                continue;
            }
            hintedLocations.push(loc);
            const text = this.createHint(realHint[1], loc);
            yield text;
        }
    }

    /**
     * @param {import("./SpoilerLog.js").default} spoiler
     * @param {import("./World").default} world 
     * @param {import("../util/Random").default} random 
     * @param {import("./LocationItem").default[]} importantChecks 
     * @param {int} howMany 
     */
    static * createBarrenHints(spoiler, world, random, importantChecks, howMany) {
        
        // const importantRegionAreas = new Set(importantChecks.filter(c => c.region).map(c => c.regionArea));
        const allRegions = [...new Set(world.locations.filter(l => l.region && l.hintableBarren).map(l => l.regionArea))];

        // now, figure out which regions are actually barren
        const allBarrenRegions = random.shuffle(allRegions.filter(r => {
            const checks = world.locations.filter(l => l.region === r);
            for(const check of checks) {
                if(check.type !== TYPE_JUNK) {
                    return false;
                }
            }
            return true;
        }));

        // const allBarrenLocations = random.shuffle([...new Set(world.locations.filter(l => l.hintableBarren).map(l => l.regionArea))].filter((l) => !importantRegionAreas.has(l)));
        const barrenRegions = howMany ? allBarrenRegions.slice(0, howMany) : allBarrenRegions;

        for(const location of barrenRegions) {
            yield `${location} is barren`;
        }
    }

    /**
     * @param {import("./SpoilerLog.js").default} spoiler
     * @param {import("./World").default} world 
     * @param {string[]} ret
     * @param {import("./LocationItem").default[]} importantChecks 
     * @param {import("./LocationItem").default[]} hintedLocations 
     * @param {int} upTo
     */
    static populateWayHints(spoiler, world, ret, importantChecks, hintedLocations, upTo, includeSpoilers) {
        var wayHints = [...this.createWayHints(spoiler, world, importantChecks, hintedLocations, includeSpoilers)];
        // console.log("Way hints", wayHints);
        if(upTo) {
            const num = Math.max(upTo - ret.length, 0);
            // console.log("Up to:", upTo, "- actual hints:", num);
            wayHints.splice(num, 99999);
        }
        
        ret.unshift(...wayHints);
    }
    /**
     * @param {import("./SpoilerLog.js").default} spoiler
     * @param {import("./World").default} world 
     * @param {import("./LocationItem").default[]} importantChecks 
     * @param {import("./LocationItem").default[]} hintedLocations 
     */
    static * createWayHints(spoiler, world, importantChecks, hintedLocations, includeSpoilers) {
        const alreadyHinted = new Set();
        const wayChecks = importantChecks.filter(h => hintedLocations.indexOf(h) === -1);

        for(const check of wayChecks) {
            if(alreadyHinted.has(check.regionArea)) {
                // console.log("Rejecting", check.specificLocation, "because already hinted");
                continue;
            }
            if(!check.hintableWay) {
                // console.log("Rejecting", check.specificLocation, "because marked not hintable");
                continue;
            }

            /** @type {Game} */
            const forGame = spoiler.worlds[check.for].game;
            if(!forGame.canItemBeWay(check.item)) {
                // console.log("Rejecting", check.specificLocation, "because item can't be way");
                continue;
            }
            if(check.type === TYPE_JUNK || check.type === TYPE_PROGRESSION) {
                // don't hint junk (idk why there would be junk here) or only progression items
                // console.log("Rejecting", check.specificLocation, "because", check.type, "is not eleigible");
                continue;
            }
            if(includeSpoilers) {
                yield `${check.regionArea} is ${world.game.wayOfThe} (contains ${check.item}${check.world !== check.for ? ` for ${check.for}` : ""})`;
            } else {
                yield `${check.regionArea} is ${world.game.wayOfThe}`;
            }
            alreadyHinted.add(check.regionArea);
        }
    }

    /**
     * 
     * @param {import("./SpoilerLog").default} spoiler
     * @param {string} item 
     * @param {string} _for 
     */
    static findItem(spoiler, item, _for) {
        for(const loc of Object.values(spoiler.worlds).map(w => w.locations).flat()) {
            if(loc.for === _for && loc.item === item) {
                return loc;
            }
        }
        return null;
    }

    /**
     * 
     * @param {string} hint 
     * @param {import("./LocationItem.js").default} loc 
     */
    static createHint(hint, loc) {
        if(loc.world !== loc.for) {
            return `${hint} can be found in ${loc.world}'s ${loc.regionArea}`;
        }
        return `${hint} can be found in ${loc.regionArea}`;
    }
}
