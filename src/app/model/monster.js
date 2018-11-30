/**
 * Created by Daniel on 28.01.2017.
 */
export class Monster {
    constructor(id, name, isNemesis) {
        this.locations = [];
        this.id = id;
        this.name = name;
        this.isNemesis = isNemesis;
    }
}
export class MonsterLevelResources {
    constructor(level, resources) {
        this.level = level;
        this.resources = resources;
    }
}
export class MonsterResourceAmount {
    constructor(name, amount) {
        console.log(name);
        this.name = name;
        this.amount = amount;
    }
}
//# sourceMappingURL=monster.js.map