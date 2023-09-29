import Games from "./games/index.js";
import TextReader from "util/TextReader.js";
import World from "./World.js";
import LocationItem from "./LocationItem.js";
import Game from "./games/Game.js";

let lastPlayerName = localStorage.lastPlayerName;

export default class SpoilerLog {
    /** @type {string} */
    archipelagoVersion = "unknown";
    /** @type {string} */
    seed = "unknown";
    /** @type {Record<string, World>} */
    worlds = {};

    static parse(text, needNameCallback) {
        const reader = new TextReader(text);
        const spoiler = new SpoilerLog();

        let handler = SpoilerLog.#handleHeaderLine;

        let line = reader.readLine();
        let tempData = {
            needNameCallback,
        };
        // console.log(needNameCallback);
        while(line !== null) {
            switch(line) {
                case "Playthrough:":
                    handler = this.#handlePlaythroughLine;
                    break;
                case "Locations:":
                    handler = this.#handleLocationLine;
                    break;
                case "Unreachable Items:":
                    handler = this.#handleUnreachableLine;
                    break;
                case "Paths:":
                    handler = null;
                    break;
                default:
                    for(const world of Object.values(spoiler.worlds)) {
                        const newHandler = world.game.getLineHandler(spoiler, line);
                        if(newHandler) {
                            handler = newHandler;
                            break;
                        }
                    }

                    handler?.call(this, spoiler, line, tempData);

            }
            line = reader.readLine();
        }

        return spoiler;
    }

    static #seedLine = /^Archipelago Version (?<version>.+)\s*-\s*Seed: (?<seed>\d+)$/;
    static #keyValueLine = /^(?<key>.*):\s*(?<value>.*)$/;
    /**
     * @param {SpoilerLog} spoiler 
     * @param {string} line 
     * @param {Record<string, any>} tempData
     */
    static #handleHeaderLine(spoiler, line, tempData) {
        let result = this.#seedLine.exec(line);
        if(result) {
            spoiler.archipelagoVersion = result.groups.version;
            spoiler.seed = result.groups.seed;
            return;
        }

        result = this.#keyValueLine.exec(line);
        if(result) {
            const {key, value} = result.groups;

            if(key.indexOf("Player ") === 0) {
                tempData.playerId = parseInt(key.substring(7), 10);
                tempData.playerName = value;
                tempData.currentWorld = null;
                return;
            }

            if(key === "Game") {
                if(!tempData.playerName) {
                    if(tempData.needNameCallback) {
                        tempData.playerName = tempData.needNameCallback();
                        localStorage.lastPlayerName = tempData.playerName;
                        lastPlayerName = tempData.playerName;
                    }

                    if(!lastPlayerName) {
                        tempData.playerName = "default";
                    }
                }

                
                const {playerId = 1, playerName = lastPlayerName} = tempData;
                let game = Games.getGame(value);
                tempData.currentWorld = new World(playerId, playerName, game);
                spoiler.worlds[playerName] = tempData.currentWorld;
                return;
            }

            if(tempData.currentWorld) {
                tempData.currentWorld.settings[key] = value;
            }
        }
    }

    static #sphereLine = /^(?<sphere>\d+): {$/;
    static #checkLine = /^\s+(?<location>.*) \((?<checkWorld>\S+)\): (?<item>.*) \((?<itemWorld>\S+)\)$/;
    static #checkLineSP = /^\s+(?<location>.*): (?<item>.*)$/;

    /**
     * @param {SpoilerLog} spoiler 
     * @param {string} line 
     * @param {Record<string, any>} tempData
     */
    static #handlePlaythroughLine(spoiler, line, tempData) {
        let result = this.#sphereLine.exec(line);
        if(result) {
            tempData.sphere = parseInt(result.groups.sphere);
            return;
        }

        result = this.#checkLine.exec(line);
        if(!result) {
            result = this.#checkLineSP.exec(line);
        }
        if(result) {
            const { location, checkWorld = lastPlayerName, item, itemWorld = lastPlayerName } = result.groups;

            const world = spoiler.worlds[checkWorld];
            //const sphereItem = new LocationItem(checkWorld, itemWorld, item, line);
            const sphereItem = world.locations.filter(l => l.raw === location)[0];
            if(!sphereItem) {
                // console.log("Can't find location for", location, "(", world.name, ")");
                return;
            }
            if(!(tempData.sphere in world.spheres)) {
                world.spheres[tempData.sphere] = [];
            }

            world.spheres[tempData.sphere].push(sphereItem);
            return;
        }
    }

    static #locationLine = /^(?<location>.*) \((?<checkWorld>\S+)\): (?<item>.*?) \((?<itemWorld>\S+)\)$/;
    static #locationLineSP = /^(?<location>.*): (?<item>.*?)?$/;

    /**
     * @param {SpoilerLog} spoiler 
     * @param {string} line 
     * @param {Record<string, any>} tempData
     */
    static #handleLocationLine(spoiler, line, tempData) {
        let result = this.#locationLine.exec(line);
        if(!result) {
            result = this.#locationLineSP.exec(line);
        }
        if(result) {
            const { location, checkWorld = lastPlayerName, item, itemWorld = lastPlayerName } = result.groups;
            const world = spoiler.worlds[checkWorld];
            const forWorld = spoiler.worlds[itemWorld];
            const locationItem = new LocationItem(checkWorld, itemWorld, item, forWorld.game.classifyItem(item, forWorld), location);
            

            if(!world.game.populateLocation(locationItem, location)) {
                Game.defaultAddLocation(locationItem, location);
            }

            if(!world.game.filterLocation(locationItem)) {
                return;
            }

            world.locations.push(locationItem);
        }

    }

    /**
     * @param {SpoilerLog} spoiler 
     * @param {string} line 
     * @param {Record<string, any>} tempData
     */
    static #handleUnreachableLine(spoiler, line, tempData) {
        let result = this.#locationLine.exec(line);
        if(!result) {
            result = this.#locationLineSP.exec(line);
        }
        if(result) {
            const { item: location, itemWorld:checkWorld = lastPlayerName } = result.groups;
            const world = spoiler.worlds[checkWorld];

            world.unreachableItems.push(location);
        }
    }
}
