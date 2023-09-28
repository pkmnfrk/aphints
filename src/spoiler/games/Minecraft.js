import Game from "./Game.js";
import LocationItem from "spoiler/LocationItem.js";

/** @extends {Game} */
export default class Minecraft extends Game {

    static #Advancements = {
        ["Minecraft"]: "Story",
        ["Stone Age"]: "Story",
        ["Getting an Upgrade"]: "Story",
        ["Acquire Hardware"]: "Story",
        ["Suit Up"]: "Story",
        ["Not Today, Thank You"]: "Story",
        ["Isn't It Iron Pick"]: "Story",
        ["Diamonds!"]: "Story",
        ["Cover Me With Diamonds"]: "Story",
        ["Enchanter"]: "Story",
        ["Hot Stuff"]: "Story",
        ["Ice Bucket Challenge"]: "Story",
        ["We Need to Go Deeper"]: "Story",
        ["Zombie Doctor"]: "Story",
        ["Eye Spy"]: "Story",
        ["The End?"]: "Story",

        ["Nether"]: "Nether",
        ["Return to Sender"]: "Nether",
        ["Uneasy Alliance"]: "Nether",
        ["Those Were the Days"]: "Nether",
        ["War Pigs"]: "Nether",
        ["Hidden in the Depths"]: "Nether",
        ["Country Lode, Take Me Home"]: "Nether",
        ["Cover Me in Debris"]: "Nether",
        ["Subspace Bubble"]: "Nether",
        ["A Terrible Fortress"]: "Nether",
        ["Spooky Scary Skeleton"]: "Nether",
        ["Withering Heights"]: "Nether",
        ["Bring Home the Beacon"]: "Nether",
        ["Beaconator"]: "Nether",
        ["Into Fire"]: "Nether",
        ["Local Brewery"]: "Nether",
        ["A Furious Cocktail"]: "Nether",
        ["How Did We Get Here?"]: "Nether",
        ["Who is Cutting Onions?"]: "Nether",
        ["Not Quite \"Nine\" Lives"]: "Nether",
        ["Oh Shiny"]: "Nether",
        ["This Boat Has Legs"]: "Nether",
        ["Feels like home"]: "Nether",
        ["Hot Tourist Destinations"]: "Nether",

        ["The End"]: "The End",
        ["Free the End"]: "The End",
        ["The Next Generation"]: "The End",
        ["Remote Getaway"]: "The End",
        ["The City at the End of the Game"]: "The End",
        ["Sky's the Limit"]: "The End",
        ["Great View From Up Here"]: "The End",
        ["The End... Again..."]: "The End",
        ["You Need a Mint"]: "The End",

        ["Adventure"]: "Adventure",
        ["Voluntary Exile"]: "Adventure",
        ["Is It a Bird?"]: "Adventure",
        ["Is It a Balloon?"]: "Adventure",
        ["Is It a Plane?"]: "Adventure",
        ["Hero of the Village"]: "Adventure",
        ["Monster Hunter"]: "Adventure",
        ["A Throwaway Joke"]: "Adventure",
        ["Very Very Frightening"]: "Adventure",
        ["It Spreads"]: "Adventure",
        ["Take Aim"]: "Adventure",
        ["Sniper Duel"]: "Adventure",
        ["Bullseye"]: "Adventure",
        ["Monsters Hunted"]: "Adventure",
        ["Postmortal"]: "Adventure",
        ["What a Deal!"]: "Adventure",
        ["Hired Help"]: "Adventure",
        ["Star Trader"]: "Adventure",
        ["Sticky Situation"]: "Adventure",
        ["Ol' Betsy"]: "Adventure",
        ["Two Birds, One Arrow"]: "Adventure",
        ["Who's the Pillager Now?"]: "Adventure",
        ["Arbalistic"]: "Adventure",
        ["Sweet Dreams"]: "Adventure",
        ["Adventuring Time"]: "Adventure",
        ["Sound of Music"]: "Adventure",
        ["Surge Protector"]: "Adventure",
        ["Caves & Cliffs"]: "Adventure",
        ["Sneak 100"]: "Adventure",
        ["Light as a Rabbit"]: "Adventure",

        ["Husbandry"]: "Husbandry",
        ["Bee Our Guest"]: "Husbandry",
        ["The Parrots and the Bats"]: "Husbandry",
        ["Two by Two"]: "Husbandry",
        ["You've Got a Friend in Me"]: "Husbandry",
        ["Birthday Song"]: "Husbandry",
        ["Best Friends Forever"]: "Husbandry",
        ["A Complete Catalogue"]: "Husbandry",
        ["Fishy Business"]: "Husbandry",
        ["Tactical Fishing"]: "Husbandry",
        ["Total Beelocation"]: "Husbandry",
        ["Bukkit Bukkit"]: "Husbandry",
        ["When the Squad Hops into Town"]: "Husbandry",
        ["With Our Powers Combined!"]: "Husbandry",
        ["A Seedy Place"]: "Husbandry",
        ["A Balanced Diet"]: "Husbandry",
        ["Serious Dedication"]: "Husbandry",
        ["Whatever Floats Your Goat!"]: "Husbandry",
        ["Glow and Behold!"]: "Husbandry",
        ["Wax On"]: "Husbandry",
        ["Wax Off"]: "Husbandry",
        ["The Cutest Predator"]: "Husbandry",
        ["The Healing Power of Friendship"]: "Husbandry",

        ["Getting Wood"]: "Husbandry",
        ["Time to Mine!"]: "Husbandry",
        ["Hot Topic"]: "Husbandry",
        ["Bake Bread"]: "Husbandry",
        ["The Lie"]: "Husbandry",
        ["On a Rail"]: "Husbandry",
        ["Time to Strike!"]: "Husbandry",
        ["Cow Tipper"]: "Husbandry",
        ["When Pigs Fly"]: "Husbandry",
        ["Overkill"]: "Husbandry",
        ["Librarian"]: "Husbandry",
        ["Overpowered"]: "Husbandry",

        ["Ender Dragon"]: "The End",
        ["Wither"]: "Nether",
        ["Ender Pearls"]: "Items",
        ["Blaze Rods"]: "Items",
    };

    constructor() {
        super("Minecraft");
    }
    
    get wayOfThe() {
        return "Way of the Builder";
    }

    get generateHints() {
        return false;
    }

    /**
     * @param {LocationItem} item 
     * @param {string} location 
     */
    populateLocation(item, location) {
        item.check = location;

        if(Minecraft.#Advancements[location]) {
            item.region = Minecraft.#Advancements[location];
            item.location = "Advancement";

            if(item.region === "Items") {
                item.hintableBarren = false;
                item.hintableWay = false;
            }
            return true;
        }

        return false;
    }
}