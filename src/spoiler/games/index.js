import Game from "./Game.js";

import Doom from "./Doom.js";
import Factorio from "./Factorio.js";
import FinalFantasy from "./FinalFantasy.js";
import LinksAwakening from "./LinksAwakening.js";
import Minecraft from "./Minecraft.js";
import OcarinaOfTime from "./OcarinaOfTime.js";
import PokemonRedBlue from "./PokemonRedBlue.js";
import StardewValley from "./StardewValley.js";
import SuperMarioWorld from "./SuperMarioWorld.js";
import Timespinner from "./Timespinner.js";


export default class Games {
    static #games = {};

    static #addGame(game) {
        this.#games[game.name] = game;
    }

    static {
        this.#addGame(new Doom());
        this.#addGame(new Factorio());
        this.#addGame(new FinalFantasy());
        this.#addGame(new LinksAwakening());
        this.#addGame(new Minecraft());
        this.#addGame(new OcarinaOfTime());
        this.#addGame(new PokemonRedBlue());
        this.#addGame(new StardewValley());
        this.#addGame(new SuperMarioWorld());
        this.#addGame(new Timespinner());
    }

    /**
     * 
     * @param {string} id 
     * @returns {Game}
     */
    static getGame(id) {
        if(id in this.#games) {
            return this.#games[id];
        }

        const dummy = new Game(id);
        this.#games[id] = dummy;

        return dummy;
    }
}