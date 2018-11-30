/**
 * Created by Daniel on 26.05.2017.
 */
export class HuntedMonster {
    constructor(settlement, monster) {
        this.huntedResources = [];
        this.settlement = settlement;
        this.monster = monster;
    }
    addStorageItem(storage) {
        if (!storage) {
            console.log('HuntedMonster - addStorageItem: Storage is null');
            return;
        }
        const str = this.huntedResources.find(storageL => storageL.name === storage.name);
        if (str) {
            str.amount++;
        }
        else {
            storage.amount = 1;
            this.huntedResources.push(storage);
        }
    }
}
//# sourceMappingURL=hunted-monster.js.map