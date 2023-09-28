import Game from "./Game.js";
import LocationItem from "spoiler/LocationItem.js";

const REGION_SPRING_EVENTS = "Spring Events";
const REGION_SUMMER_EVENTS = "Summer Events";
const REGION_FALL_EVENTS = "Fall Events";
const REGION_WINTER_EVENTS = "Winter Events";

/** @extends {Game} */
export default class StardewValley extends Game {
    static #Elevator = /^(?:The Mines )?Floor (?<floor>\d+) (?<check>Elevator|Treasure)$/;
    static #TravellingMerchant = /^Travell?ing Merchant (?<day>\w+) (?<check>.*)$/;
    static #Skill = /^Level (?<level>\d+) (?<skill>.*)$/;
    static #Crops = /^Harvest (?<crop>.*)$/;
    static #CommunityCenter = /^Complete (?<what>.*)$/;
    static #Bundle = /^(?<what>.*) Bundle$/;
    static #Museum = /^Museumsanity: (?<count>\d+ )?(?<what>Donations|Artifacts|Minerals|Dwarf Scrolls|Skeleton Front|Skeleton Back|Skeleton Middle|Ancient Seed)$/;
    static #Upgrade = /^(?<mat>\w+) (?<tool>.+) Upgrade$/;
    static #Blueprint = /^(?<what>.+) Blueprint$/;
    static #HelpWanted = /^Help Wanted: (?<what>.+) (?<level>\d+)$/;
    static #RodPurchase = /^Purchase (?<what>.+) Rod$/;
    static #MonthEnd = /^Month End \d+$/;

    static #StoryQuests = {
        // Regular Quests
        ["A Dark Reagent"]: "Wizard",
        ["A Favor For Clint"]: "Clint",
        ["A Soldier's Star"]: "Kent",
        ["A Winter Mystery"]: "Other",
        ["Advancement"]: "Tutorial",
        ["Aquatic Research"]: "Demetrius",
        ["Archaeology"]: "Gunther",
        ["Blackberry Basket"]: "Linus",
        ["Carving Pumpkins"]: "Caroline",
        ["Catch a Lingcod"]: "Willy",
        ["Catch A Squid"]: "Willy",
        ["Clint's Attempt"]: "Clint",
        ["Cow's Delight"]: "Marnie",
        ["Crop Research"]: "Demetrius",
        ["Cryptic Note"]: "Qi",
        ["Dark Talisman"]: "Wizard",
        ["Deeper In The Mine"]: "Marlon",
        ["Exotic Spirits"]: "Gus",
        ["Explore The Mine"]: "Marlon",
        ["Fish Casserole"]: "Jodi",
        ["Fish Stew"]: "Gus",
        ["Forging Ahead"]: "Clint",
        ["Fresh Fruit"]: "Emily",
        ["Getting Started"]: "Tutorial",
        ["Goblin Problem"]: "Witch",
        ["Granny's Gift"]: "Evelyn",
        ["How To Win Friends"]: "Tutorial",
        ["Initiation"]: "Marlon",
        ["Introductions"]: "Tutorial",
        ["Jodi's Request"]: "Jodi",
        ["Knee Therapy"]: "George",
        ["Marnie's Request"]: "Marnie",
        ["Mayor's \"Shorts\""]: "Lewis",
        ["Mayor's Need"]: "Lewis",
        ["Meet The Wizard"]: "Wizard",
        ["Pam Is Thirsty"]: "Pam",
        ["Pam Needs Juice"]: "Pam",
        ["Pierre's Notice"]: "Pierre",
        ["Qi's Challenge"]: "Qi",
        ["Raising Animals"]: "Robin",
        ["Rat Problem"]: "Lewis",
        ["Robin's Lost Axe"]: "Robin",
        ["Robin's Request"]: "Robin",
        ["Smelting"]: "Clint",
        ["Staff Of Power"]: "Wizard",
        ["Strange Note"]: "Other",
        ["The Mysterious Qi"]: "Qi",
        ["The Pirate's Wife"]: "Birdie",
        ["The Skull Key"]: "Qi",
        ["To The Beach"]: "Willy",
        ["Bamboo Pole Cutscene"]: "Willy", // related to above
        ["To The Bottom?"]: "Marlon",
        ["Wanted: Lobster"]: "Gus",
    
        // Special Orders
        ["Island Ingredients"]: "Caroline",
        ["Cave Patrol"]: "Clint",
        ["Aquatic Overpopulation"]: "Demetrius",
        ["Biome Balance"]: "Demetrius",
        ["Rock Rejuvenation"]: "Emily",
        ["Gifts for George"]: "Evelyn",
        ["Fragments of the past"]: "Gunther",
        ["Gus' Famous Omelet"]: "Gus",
        ["Crop Order"]: "Lewis",
        ["Community Cleanup"]: "Linus",
        ["The Strong Stuff"]: "Pam",
        ["Pierre's Prime Produce"]: "Pierre",
        ["Robin's Project"]: "Robin",
        ["Robin's Resource Rush"]: "Robin",
        ["Juicy Bugs Wanted!"]: "Willy",
        ["Tropical Fish"]: "Willy",
        ["A Curious Substance"]: "Wizard",
        ["Prismatic Jelly"]: "Wizard",
    };

    static #Seasonal = {
        ["Egg Festival: Strawberry Seeds"]: [REGION_SPRING_EVENTS, "Egg Festival"],
        ["Egg Hunt Victory"]: [REGION_SPRING_EVENTS, "Egg Festival"],

        ["Rarecrow #5 (Woman)"]: [REGION_SPRING_EVENTS, "Flower Dance"],
        ["Dance with someone"]: [REGION_SPRING_EVENTS, "Flower Dance"],

        ["Dance of the Moonlight Jellies"]: [REGION_SUMMER_EVENTS, "Dance of the Moonlight Jellies"],
        ["Luau Soup"]: [REGION_SUMMER_EVENTS, "Luau"],

        ["Rarecrow #1 (Turnip Head)"]: [REGION_FALL_EVENTS, "Stardew Valley Fair"],
        ["Fair Stardrop"]: [REGION_FALL_EVENTS, "Stardew Valley Fair"],
        ["Grange Display"]: [REGION_FALL_EVENTS, "Stardew Valley Fair"],
        ["Smashing Stone"]: [REGION_FALL_EVENTS, "Stardew Valley Fair"],

        ["Rarecrow #2 (Witch)"]: [REGION_FALL_EVENTS, "Spirit's Eve"],
        ["Spirit's Eve Maze"]: [REGION_FALL_EVENTS, "Spirit's Eve"],

        ["Rarecrow #4 (Snowman)"]: [REGION_WINTER_EVENTS, "Festival of Ice"],
        ["Win Fishing Competition"]: [REGION_WINTER_EVENTS, "Festival of Ice"],

        ["Secret Santa"]: [REGION_WINTER_EVENTS, "Feast of the Winter Star"],
        ["The Legend of the Winter Star"]: [REGION_WINTER_EVENTS, "Feast of the Winter Star"],

        ["Lupini: Solar Kingdom"]: [REGION_WINTER_EVENTS, "Night Market"],
        ["Lupini: Red Eagle"]: [REGION_WINTER_EVENTS, "Night Market"],
        ["Lupini: Portrait Of A Mermaid"]: [REGION_WINTER_EVENTS, "Night Market"],
        ["Mermaid Pearl"]: [REGION_WINTER_EVENTS, "Night Market"],

        ["Farm Obelisk"]: ["Ginger Island", "Farm Upgrade"],

        ["Large Pack"]: ["The General Store", "Pack Upgrade"],
        ["Deluxe Pack"]: ["The General Store", "Pack Upgrade"],

        ["Galaxy Sword Shrine"]: ["The Desert", "Galaxy Sword Shrine"],

        ["Beach Bridge Repair"]: ["The Beach", "Beach Bridge Repair"],
        ["Collect All Rarecrows"]: ["The Farm", "Collect All Rarecrows"],
        ["Have a Baby"]: ["The Farm", "Have a Baby"],
        ["Have Another Baby"]: ["The Farm", "Have Another Baby"],

        ["The Mines Entrance Cutscene"]: ["The Upper Mines", "The Mines Entrance Cutscene"],
        ["Old Master Cannoli"]: ["The Deep Woods", "Old Master Cannoli"],
        ["Rarecrow #7 (Tanuki)"]: ["The Museum", "Rarecrow #7 (Tanuki)"],
        ["Rarecrow #8 (Tribal Mask)"]: ["The Museum", "Rarecrow #8 (Tribal Mask)"],
        ["Grim Reaper statue"]: ["The Quarry", "Grim Reaper statue"],
        ["Magic Ink"]: ["The Swamp", "Magic Ink"],
        
    };
    
    constructor() {
        super("Stardew Valley");
    }

    get wayOfThe() {
        return "Trail of the Farmer";
    }

    get hintCount() {
        return 20;
    }

    get alwaysHints() {
        return {
            shippingBin: {
                label: "The Shipping Bin",
                items: [
                    "Shipping Bin"
                ]
            }
        }
    }

    /**
     * 
     * @param {LocationItem} item 
     * @param {string} location 
     */
    populateLocation(item, location) {
        if(item.item === "Victory") {
            item.hintableWay = false;
        }

        if(location in StardewValley.#Seasonal) {
            item.region = StardewValley.#Seasonal[location][0];
            item.location = StardewValley.#Seasonal[location][1];
            item.check = location;
            return true;
        }

        if(location in StardewValley.#StoryQuests) {
            item.region = `Quests for ${StardewValley.#StoryQuests[location]}`;
            item.location = "Quests";
            item.check = location;
            return true;
        }

        let result;

        result = StardewValley.#Elevator.exec(location);
        if(result) {
            const floor = parseInt(result.groups.floor, 10);
            if(floor <= 40) {
                item.region = "The Upper Mines";
            } else if(floor <= 80) {
                item.region = "The Mid-level Mines";
            } else {
                item.region = "The Deep Mines";
            }
            item.location = `Floor ${floor}`;
            item.check = result.groups.check;
            return true;
        }

        result = StardewValley.#TravellingMerchant.exec(location);
        if(result) {
            item.region = "Travelling Merchant";
            item.location = result.groups.day;
            item.check = result.groups.check;
            return true;
        }

        result = StardewValley.#Skill.exec(location);
        if(result) {
            item.region = `${result.groups.skill} Skill`;
            item.location = `Levelling`;
            item.check = `Level ${result.groups.level}`;
        }

        result = StardewValley.#Crops.exec(location);
        if(result) {
            item.region = "The Farm";
            item.location = "Crop Harvest";
            item.check = result.groups.crop;
            return true;
        }

        result = StardewValley.#CommunityCenter.exec(location);
        if(result) {
            item.region = "Community Center";
            item.location = "Room";
            item.check = location;
            return true;
        }

        result = StardewValley.#Bundle.exec(location);
        if(result) {
            item.region = "Community Center";
            item.location = "Bundle";
            item.check = location;
            return true;
        }

        result = StardewValley.#Museum.exec(location);
        if(result) {
            item.region = "The Museum";
            item.location = "Donations";
            item.check = `${result.groups.count}${result.groups.what}`;
            return true;
        }

        result = StardewValley.#Upgrade.exec(location);
        if(result) {
            item.region = "The Blacksmith";
            item.location = "Upgrade";
            item.check = location;
            return true;
        }

        result = StardewValley.#Blueprint.exec(location);
        if(result) {
            item.region = "The Carpenter";
            item.location = "Blueprint";
            item.check = location;
            return true;
        }

        result = StardewValley.#HelpWanted.exec(location);
        if(result) {
            item.region = "Help Wanted";
            item.location = result.groups.what
            item.check = `${result.groups.what} ${result.groups.level}`;
            return true;
        }

        result = StardewValley.#RodPurchase.exec(location);
        if(result) {
            item.region = "The Fisherman";
            item.location = "Rod Upgrade";
            item.check = location;
            return true;
        }
        
        result = StardewValley.#MonthEnd.exec(location);
        if(result) {
            item.region = "Month End";
            item.location = "Month End";
            item.check = location;
            item.hintableBarren = false;
            item.hintableWay = false;
            return true;
        }

        if(location === "Reach the Bottom of The Mines") {
            item.region = "The Deep Mines";
            item.location = "Floor 120";
            item.check = location;
            return true;
        }

        item.check = location;

        

    }
    /**
     * 
     * @param {LocationItem} item 
     */
    filterLocation(item) {
        
        return true;
    }

}