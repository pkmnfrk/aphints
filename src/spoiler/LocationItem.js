export default class LocationItem {
    region = "";
    location = "";
    check = "";
    world = "";
    for = "";
    item = "";
    type = "";
    raw = "";
    hintableBarren = true;
    hintableWay = true;

    get specificLocation() {
        if(this.region) {
            return `${this.region}->${this.location}->${this.check}`;
        } else if(this.location) {
            return `${this.location}->${this.check}`;
        } else if(this.check) {
            return this.check;
        }
        return this.raw;
    }

    get generalLocation() {
        if(this.region) {
            return `${this.region}->${this.location}`;
        } else if(this.location) {
            return this.location;
        } else if(this.check) {
            return this.check;
        }
        return this.raw;
    }

    get regionArea() {
        if(this.region) {
            return this.region;
        } else if(this.location) {
            return this.location;
        } else if(this.check) {
            return this.check;
        }
        return this.raw;
    }

    constructor(world, _for, item, type, raw) {
        this.world = world;
        this.for = _for;
        this.item = item;
        this.type = type;
        this.raw = raw;
    }

    get [Symbol.toStringTag]() {
        return this.specificLocation;
    }

    /**
     * 
     * @param {LocationItem} a 
     * @param {LocationItem} b 
     */
    static sortMethod(a, b) {
        if(a === b) return 0;
        if(a.region < b.region) {
            return -1;
        } else if(a.region > b.region) {
            return 1;
        }

        if(a.location < b.location) {
            return -1;
        } else if(a.location > b.location) {
            return 1;
        }

        if(a.check < b.check) {
            return -1;
        } else if(a.check > b.check) {
            return 1;
        }

        return 0;
    }
}