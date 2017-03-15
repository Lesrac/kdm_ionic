"use strict";
var resource_1 = require('../model/resource');
var equals_1 = require('../model/visitor/equals');
var greater_than_equals_1 = require('../model/visitor/greater_than_equals');
var innovation_1 = require('../model/innovation');
var storage_1 = require('../model/storage');
var armor_1 = require('../model/armor');
var equipment_1 = require('../model/equipment');
/**
 * Created by Daniel on 28.01.2017.
 */
exports.SETTLEMENTS = [];
exports.NEMESISMONSTERS = [
    {
        name: 'Butcher',
        level: 1,
        isNemesis: true,
        isHuntable: true,
        defeatedLevelOne: false,
        defeatedLevelTwo: false,
        defeatedLevelThree: false,
        resources: null,
        huntedResources: [],
        locations: [],
    },
    {
        name: 'King\'s Man',
        level: 1,
        isNemesis: true,
        isHuntable: false,
        defeatedLevelOne: false,
        defeatedLevelTwo: false,
        defeatedLevelThree: false,
        resources: null,
        huntedResources: [],
        locations: [],
    },
    {
        name: 'The Hand',
        level: 1,
        isNemesis: true,
        isHuntable: false,
        defeatedLevelOne: false,
        defeatedLevelTwo: false,
        defeatedLevelThree: false,
        resources: null,
        huntedResources: [],
        locations: [],
    },
];
exports.RESSOURCES = [
    {
        name: 'Monster Bone',
        description: 'A bone suitable for crafting.',
        amount: 0,
        type: resource_1.ResourceType.Basic,
        existingCards: 4,
        tags: [storage_1.StorageTag.bone],
    },
    {
        name: 'Monster Hide',
        description: 'The skin of a beast.',
        amount: 0,
        type: resource_1.ResourceType.Basic,
        existingCards: 6,
        tags: [storage_1.StorageTag.hide],
    },
    {
        name: 'Broken Lantern',
        description: 'Remains of an extinguished lantern.',
        amount: 0,
        type: resource_1.ResourceType.Basic,
        existingCards: 1,
        tags: [storage_1.StorageTag.scrap],
    },
    {
        name: '???',
        description: 'You have no idea what monster bit this is. Can be used as bone, organ or hide',
        amount: 0,
        type: resource_1.ResourceType.Basic,
        existingCards: 2,
        tags: [storage_1.StorageTag.hide, storage_1.StorageTag.bone, storage_1.StorageTag.consumable, storage_1.StorageTag.organ],
    },
    {
        name: 'Skull',
        description: 'When you gain this, a survivors of your choice gains +1 insanity.',
        amount: 0,
        type: resource_1.ResourceType.Basic,
        existingCards: 1,
        tags: [storage_1.StorageTag.bone],
    },
    {
        name: 'Monster Organ',
        description: "If you consume this, archive this card. Roll 1d10. \n    On a result of 6+, you contract a parasite. \n    Archive all consumable gear in your gear grid now.",
        amount: 0,
        type: resource_1.ResourceType.Basic,
        existingCards: 3,
        tags: [storage_1.StorageTag.organ, storage_1.StorageTag.consumable],
    },
    {
        name: 'Love Juice',
        description: "During the settlement phase, you may archive this to Intimacy. \n    Nominated survivors must be able to consume.",
        amount: 0,
        type: resource_1.ResourceType.Basic,
        existingCards: 2,
        tags: [storage_1.StorageTag.organ, storage_1.StorageTag.consumable],
    },
    {
        name: 'Elder Cat Teeth',
        description: '',
        amount: 0,
        type: resource_1.ResourceType.Strange,
        existingCards: 1,
        tags: [],
    },
    {
        name: 'White Fur',
        description: '',
        amount: 0,
        type: resource_1.ResourceType.WhiteLion,
        existingCards: 4,
        tags: [],
    },
];
exports.QUARRIES = [
    {
        name: 'White Lion',
        level: 1,
        isNemesis: false,
        isHuntable: true,
        defeatedLevelOne: false,
        defeatedLevelTwo: false,
        defeatedLevelThree: false,
        resources: [],
        huntedResources: [],
        locations: [],
    },
    {
        name: 'Screaming Antelope',
        level: 1,
        isNemesis: false,
        isHuntable: false,
        defeatedLevelOne: false,
        defeatedLevelTwo: false,
        defeatedLevelThree: false,
        resources: [],
        huntedResources: [],
        locations: [],
    },
    {
        name: 'Phoenix',
        level: 1,
        isNemesis: false,
        isHuntable: false,
        defeatedLevelOne: false,
        defeatedLevelTwo: false,
        defeatedLevelThree: false,
        resources: [],
        huntedResources: [],
        locations: [],
    },
];
exports.WEAPONS = [
    {
        name: 'Bone Axe',
        description: 'Frail',
        amount: 0,
        speed: 2,
        accuracy: 6,
        strength: 3,
        tags: [storage_1.StorageTag.weapon, storage_1.StorageTag.bone, storage_1.StorageTag.axe, storage_1.StorageTag.melee],
        affinities: new Map([
            [equipment_1.Affinity.red, [equipment_1.Direction.left]],
        ]),
    },
    {
        name: 'Bone Blade',
        description: 'Frail',
        amount: 0,
        speed: 2,
        accuracy: 6,
        strength: 2,
        tags: [storage_1.StorageTag.weapon, storage_1.StorageTag.bone, storage_1.StorageTag.sword, storage_1.StorageTag.melee],
        affinities: new Map([
            [equipment_1.Affinity.red, [equipment_1.Direction.left]],
        ]),
    },
    {
        name: 'Bone Dagger',
        description: 'On a perfect hit',
        amount: 0,
        speed: 3,
        accuracy: 7,
        strength: 1,
        tags: [storage_1.StorageTag.weapon, storage_1.StorageTag.bone, storage_1.StorageTag.dagger, storage_1.StorageTag.melee],
        affinities: new Map([
            [equipment_1.Affinity.red, [equipment_1.Direction.left]],
        ]),
    },
    {
        name: 'Bone Darts',
        description: 'Range: 6.',
        amount: 0,
        speed: 1,
        accuracy: 7,
        strength: 3,
        tags: [storage_1.StorageTag.weapon, storage_1.StorageTag.bone, storage_1.StorageTag.thrown, storage_1.StorageTag.ranged],
        affinities: new Map([
            [equipment_1.Affinity.red, [equipment_1.Direction.left]],
        ]),
    },
    {
        name: 'Bone Pickaxe',
        description: 'Frail',
        amount: 0,
        speed: 1,
        accuracy: 8,
        strength: 2,
        tags: [storage_1.StorageTag.item, storage_1.StorageTag.bone, storage_1.StorageTag.tool],
        affinities: new Map([
            [equipment_1.Affinity.green, [equipment_1.Direction.up]],
        ]),
    },
    {
        name: 'Bone Sickle',
        description: 'Frail',
        amount: 0,
        speed: 2,
        accuracy: 8,
        strength: 1,
        tags: [storage_1.StorageTag.item, storage_1.StorageTag.bone, storage_1.StorageTag.tool],
        affinities: new Map([
            [equipment_1.Affinity.green, [equipment_1.Direction.up]],
        ]),
    },
];
exports.ARMORS = [
    {
        name: 'Skull Helm',
        description: 'When you suffer a severe head injury, the Skull Helm is destroyed. Archive this card.',
        amount: 0,
        value: 3,
        space: armor_1.ArmorSpace.head,
        tags: [storage_1.StorageTag.armor, storage_1.StorageTag.bone, storage_1.StorageTag.fragile],
        affinities: new Map([
            [equipment_1.Affinity.red, [equipment_1.Direction.down]],
        ]),
    },
];
exports.MONSTERRESOURCES = [
    {
        monster: exports.QUARRIES[0],
        storage: null,
        amount: 4,
        monsterLevel: 1,
        resourceType: resource_1.ResourceType.Basic,
    },
    {
        monster: exports.QUARRIES[0],
        storage: null,
        amount: 4,
        monsterLevel: 1,
        resourceType: resource_1.ResourceType.WhiteLion,
    },
    {
        monster: exports.QUARRIES[0],
        storage: null,
        amount: 4,
        monsterLevel: 2,
        resourceType: resource_1.ResourceType.Basic,
    },
    {
        monster: exports.QUARRIES[0],
        storage: null,
        amount: 6,
        monsterLevel: 2,
        resourceType: resource_1.ResourceType.WhiteLion,
    },
    {
        monster: exports.QUARRIES[0],
        storage: null,
        amount: 4,
        monsterLevel: 3,
        resourceType: resource_1.ResourceType.Basic,
    },
    {
        monster: exports.QUARRIES[0],
        storage: null,
        amount: 8,
        monsterLevel: 3,
        resourceType: resource_1.ResourceType.WhiteLion,
    },
    {
        monster: exports.QUARRIES[0],
        storage: null,
        amount: 4,
        monsterLevel: 3,
        resourceType: null,
    },
];
exports.STORYEVENTS = [
    {
        title: 'First Words',
        description: "The nominated survivor steps forward and gains + 1 courage. \n    They lead the other survivors to learn to speak to one another! \n    They discuss their situation, realizing they must hunt to live. \n    Add the White Lion to the Quarry list on the settlement record sheet. \n    Your settlement gains the Language innovation. \n    Search the Innovation cards for Language and place it face up in your play area \n    and record it on your settlement sheet. \n    Language is your first innovation, and it will spark the creation of the innovation deck. \n    Build the Innovation deck now .",
    },
    {
        title: 'Build the Innovation Deck',
        description: "The innovation deck represents the potential cultural and technological growth of your settlement. \n    It will grow throughout the campaign as you gain new innovation cards. \n    Find the 6 innovation cards with language consequence listed under their title: \n    Ammonia, Drums, Hovel, Inner Lantern, Paint, and Symposium. \n    Shuttle these 6 cards together to form your settlement's innovation deck. \n    Place it face down in the designated space on the settlement board. \n    The innovation deck is persistent. \n    Make sure to preserve the unique combination of cards in your deck between play sessions. \n    Finished with their work, the settlement gathers around its Glowing Center",
    },
    {
        title: 'Glowing Center',
        description: "Armed with language, the nominated survivor aptly names the glowing center of their home \n    The Lantern Hoard. The settlement gains the Lantern Hoard Settlement Location. \n    Search the large Settlement Location cards for the Lantern Hoard and place it face up in your play area. \n    The Lantern Hoard is the source of all innovations and further locations the settlement will develop. \n    The nominated survivor sits in front of the Lantern Hoard in awe and gains + 1 understanding. \n    They must skip the next hunt phase as they ponder the meaning of existence. \n    Check off the skip hunt box on the survivor's record sheet. \n    They cannot be selected as a departing survivor this phase.",
    },
    {
        title: 'The First Harvest',
        description: "The settlement decides to harvest the body for resources. \n    The settlement gains the Death Principle: Cannibalize. \n    Find and place the card on the settlement board and note it on the settlement record sheet. \n    After adding the card to the settlement, Roll 1d10. ldlO Result 1 -s \n    The settlement ritualistically divides the corpse with a sharp stone and grimly consumes the dead flesh. \n    Gain a Founding Stone starting gear. All departing survivors gain +3 insanity. 6 - 10 Nominate a survivor. \n    The survivor fanatically tears the corpse open and deeply drinks its blood. \n    They decide that for every new creature they eat, they will become stronger. \n    The survivor gains +1 permanent speed.",
    },
    {
        title: 'The First Grave',
        description: "The settlement decides to build a small monument to mark their loss. \n    The settlement gains the Death Principle: Graves. \n    Find and place the card on the settlement board and note it on the settlement record sheet. \n    After adding the card to the settlement, Roll 1d10. \n    ldlO Result 1 - 5 The settlement gathers around the grave, \n    each taking a moment to reflect the loss and their place in the darkness. \n    All departing survivors gain +l survival and +l understanding. 6 -10 Nominate a survivor. \n    With tears in their eyes, the survivor takes a shard of rock from the grave and marks themselves with it. \n    They cherish this mark forever. The survivor gains +l permanent luck.",
    },
];
exports.EVENTS = [
    {
        name: 'Returning Survivors',
        reached: false,
        todo: 'Nominate a survivors to utter the First Words',
        storyEvents: exports.STORYEVENTS.slice(0, 3),
    },
    {
        name: 'Endless Screams',
        reached: false,
        todo: '',
        storyEvents: [],
    },
    {
        name: 'Nemesis Encounter - Butcher',
        reached: false,
        todo: '',
        storyEvents: [],
    },
    {
        name: 'Hands of Heat',
        reached: false,
        todo: '',
        storyEvents: [],
    },
    {
        name: 'Armored Strangers',
        reached: false,
        todo: '',
        storyEvents: [],
    },
    {
        name: 'Phoenix Feather',
        reached: false,
        todo: '',
        storyEvents: [],
    },
    {
        name: 'Nemesis Encounter - King\'s Man',
        reached: false,
        todo: '',
        storyEvents: [],
    },
    {
        name: 'Regal Visit',
        reached: false,
        todo: '',
        storyEvents: [],
    },
    {
        name: 'Principle: Conviction',
        reached: false,
        todo: '',
        storyEvents: [],
    },
    {
        name: 'Nemesis Encounter',
        reached: false,
        todo: '',
        storyEvents: [],
    },
    {
        name: 'Watched',
        reached: false,
        todo: '',
        storyEvents: [],
    },
    {
        name: 'Nemesis Encounter - Level 3',
        reached: false,
        todo: '',
        storyEvents: [],
    },
    {
        name: 'Nemesis Encounter - Watcher',
        reached: false,
        todo: '',
        storyEvents: [],
    },
];
exports.MILESTONES = [
    {
        name: 'Principle: New Life',
        tag: 'First child is born',
        reached: false,
        todo: 'The group must decide how to raise their young. Choose one.',
        storyEvents: [],
        value: 1,
        identifier: 'child',
        visitor: new equals_1.Equals(),
        accept: function (compareValue) {
            return this.visitor.visit(this, compareValue);
        },
    },
    {
        name: 'Principle: Death',
        tag: 'First time death count is updated',
        reached: false,
        todo: 'The group must decide what to do with their first survivors corpse. Choose one.',
        storyEvents: exports.STORYEVENTS.slice(3, 5),
        value: 1,
        identifier: 'death',
        visitor: new equals_1.Equals(),
        accept: function (compareValue) {
            return this.visitor.visit(this, compareValue);
        },
    },
    {
        name: 'Principle: Society',
        tag: 'Populations reaches 15',
        reached: false,
        todo: '',
        storyEvents: [],
        value: 15,
        identifier: 'population',
        visitor: new greater_than_equals_1.GreaterThanEquals(),
        accept: function (compareValue) {
            return this.visitor.visit(this, compareValue);
        },
    },
    {
        name: 'Principle: Hooded Knight',
        tag: 'Settlement has 5 innovations',
        reached: false,
        todo: '',
        storyEvents: [],
        value: 5,
        identifier: 'innovation',
        visitor: new greater_than_equals_1.GreaterThanEquals(),
        accept: function (compareValue) {
            return this.visitor.visit(this, compareValue);
        },
    },
    {
        name: 'Principle: Game Over',
        tag: 'Population reaches 0',
        reached: false,
        todo: '',
        storyEvents: [],
        value: 0,
        identifier: 'population',
        visitor: new equals_1.Equals(),
        accept: function (compareValue) {
            return this.visitor.visit(this, compareValue);
        },
    },
];
exports.DEFAULTTIMELINE = [
    { position: 1, reached: false, lanternEvent: exports.EVENTS.find(function (x) { return x.name === 'Returning Survivors'; }) },
    { position: 2, reached: false, lanternEvent: exports.EVENTS.find(function (x) { return x.name === 'Endless Screams'; }) },
    { position: 3, reached: false, lanternEvent: null },
    { position: 4, reached: false, lanternEvent: exports.EVENTS.find(function (x) { return x.name === 'Nemesis Encounter - Butcher'; }) },
    { position: 5, reached: false, lanternEvent: exports.EVENTS.find(function (x) { return x.name === 'Hands of Heat'; }) },
    { position: 6, reached: false, lanternEvent: exports.EVENTS.find(function (x) { return x.name === 'Armored Strangers'; }) },
    { position: 7, reached: false, lanternEvent: exports.EVENTS.find(function (x) { return x.name === 'Phoenix Feather'; }) },
    { position: 8, reached: false, lanternEvent: null },
    { position: 9, reached: false, lanternEvent: exports.EVENTS.find(function (x) { return x.name === 'Nemesis Encounter - King\'s Man'; }) },
    { position: 10, reached: false, lanternEvent: null },
    { position: 11, reached: false, lanternEvent: exports.EVENTS.find(function (x) { return x.name === 'Regal Visit'; }) },
    { position: 12, reached: false, lanternEvent: exports.EVENTS.find(function (x) { return x.name === 'Principle: Conviction'; }) },
    { position: 13, reached: false, lanternEvent: null },
    { position: 14, reached: false, lanternEvent: null },
    { position: 15, reached: false, lanternEvent: null },
    { position: 16, reached: false, lanternEvent: exports.EVENTS.find(function (x) { return x.name === 'Nemesis Encounter'; }) },
    { position: 17, reached: false, lanternEvent: null },
    { position: 18, reached: false, lanternEvent: null },
    { position: 19, reached: false, lanternEvent: exports.EVENTS.find(function (x) { return x.name === 'Nemesis Encounter'; }) },
    { position: 20, reached: false, lanternEvent: exports.EVENTS.find(function (x) { return x.name === 'Watched'; }) },
    { position: 21, reached: false, lanternEvent: null },
    { position: 22, reached: false, lanternEvent: null },
    { position: 23, reached: false, lanternEvent: exports.EVENTS.find(function (x) { return x.name === 'Nemesis Encounter - Level 3'; }) },
    { position: 24, reached: false, lanternEvent: null },
    { position: 25, reached: false, lanternEvent: exports.EVENTS.find(function (x) { return x.name === 'Nemesis Encounter - Watcher'; }) },
    { position: 27, reached: false, lanternEvent: null },
    { position: 28, reached: false, lanternEvent: null },
    { position: 26, reached: false, lanternEvent: null },
    { position: 29, reached: false, lanternEvent: null },
    { position: 30, reached: false, lanternEvent: null },
    { position: 31, reached: false, lanternEvent: null },
    { position: 32, reached: false, lanternEvent: null },
    { position: 33, reached: false, lanternEvent: null },
    { position: 34, reached: false, lanternEvent: null },
    { position: 35, reached: false, lanternEvent: null },
    { position: 36, reached: false, lanternEvent: null },
    { position: 37, reached: false, lanternEvent: null },
    { position: 38, reached: false, lanternEvent: null },
    { position: 39, reached: false, lanternEvent: null },
    { position: 40, reached: false, lanternEvent: null },
];
exports.SETTLEMENTLOCATIONS = [
    { name: 'Lantern Hoard', built: true, storages: [] },
    { name: 'Bone Smith', built: false, storages: [] },
    { name: 'Skinnery', built: false, storages: [] },
    { name: 'Organ Grinder', built: false, storages: [] },
    { name: 'Weapon Crafter', built: false, storages: [] },
    { name: 'Leather Worker', built: false, storages: [] },
    { name: 'Stone Circle', built: false, storages: [] },
    { name: 'Barber Surgeon', built: false, storages: [] },
    { name: 'Plumery', built: false, storages: [] },
    { name: 'Blacksmith', built: false, storages: [] },
    { name: 'Mask Maker', built: false, storages: [] },
];
exports.INNOVATIONS = [
    {
        name: 'Language',
        description: 'Survival Limit +1. All survivors gain the Encourage survival action.',
        consequence: innovation_1.InnovationTag.LANGUAGE_CONSEQUENCE,
        tags: [innovation_1.InnovationTag.STARTING_INNOVATION],
    },
    {
        name: 'Paint',
        description: 'The settlement swells with creative energy. All survivors gain the Dash survival action.',
        consequence: innovation_1.InnovationTag.LANGUAGE_CONSEQUENCE,
        tags: [innovation_1.InnovationTag.LANGUAGE_CONSEQUENCE, innovation_1.InnovationTag.ART],
    },
    {
        name: 'Ammonia',
        description: "A pungent, bilious substance ideal for crafting leather and treating wounds.\n    Departing survivors gain +1 survival.",
        consequence: innovation_1.InnovationTag.AMMONIA_CONSEQUENCE,
        tags: [innovation_1.InnovationTag.LANGUAGE_CONSEQUENCE, innovation_1.InnovationTag.SCIENCE],
    },
    {
        name: 'Bloodletting',
        description: 'Endeavor and table',
        consequence: null,
        tags: [innovation_1.InnovationTag.AMMONIA_CONSEQUENCE, innovation_1.InnovationTag.SCIENCE],
    },
];
exports.DISORDERS = [
    {
        name: 'Absent Seizures',
        description: 'No one knows where your mind goes when you\'re gone, not even you. The first time you would suffer a brain injury each showdown, you are instead knocked down and forget a fighting art (erase it).',
    }
];
exports.FIGHTINGARTS = [
    {
        name: 'Abyssal Sadist',
        description: 'The first time you wound the monster each attack, gain +1 survival and +1 insanity. Ignore the effects of the Fear of the Dark and Prey disorders.',
    }
];
