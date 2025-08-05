import { MobBase, Zone } from "@/types/mobs";

export const GAME_MOBS = {
    zombie: {
        id: "zombie",
        name: "Zombie",
        description: "A slow, undead creature that attacks at night.",
        texture: "mob:zombie",
        displaySize: 1,
        type: "undead",
        baseHp: 20,
        baseAttack: 5,
        baseDefense: 2,
        baseAttackSpeed: 1.0,
    },
    baby_zombie: {
        id: "baby_zombie",
        name: "Baby Zombie",
        description: "A small, fast undead creature that attacks relentlessly.",
        texture: "mob:zombie",
        displaySize: 0.7,
        type: "undead",
        baseHp: 10,
        baseAttack: 3,
        baseDefense: 1,
        baseAttackSpeed: 1.5,
    },
    giant: {
        id: "giant",
        name: "Giant",
        description: "A massive creature that towers over everything.",
        texture: "mob:zombie",
        displaySize: 2.5,
        type: "undead",
        baseHp: 100,
        baseAttack: 10,
        baseDefense: 5,
        baseAttackSpeed: 0.5,
    },
    spider: {
        id: "spider",
        name: "Spider",
        description:
            "A creepy crawler that can climb walls and attack from above.",
        texture: "mob:spider",
        displaySize: 0.8,
        type: "arthropod",
        baseHp: 16,
        baseAttack: 4,
        baseDefense: 2,
        baseAttackSpeed: 1.2,
    },
} as const satisfies Record<string, MobBase>;

export const ZONES: Zone[] = [
    {
        id: "forest",
        name: "Forest",
        mobs: [
            {
                mob: { ...GAME_MOBS.zombie },
                spawnChance: 60,
                lootTable: [
                    { items: [{ id: "rope", quantity: 1 }], chance: 50 },
                ],
            },
            { mob: { ...GAME_MOBS.baby_zombie }, spawnChance: 30 },
            { mob: { ...GAME_MOBS.giant }, spawnChance: 10 },
        ],
    },
    {
        id: "cave",
        name: "Cave",
        mobs: [{ mob: { ...GAME_MOBS.spider }, spawnChance: 100 }],
    },
    // TODO: Complete and add more zones
];
