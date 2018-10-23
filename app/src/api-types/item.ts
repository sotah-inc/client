export type ItemId = number;

export enum ItemQuality {
    Poor,
    Common,
    Uncommon,
    Rare,
    Epic,
    Legendary,
    Artifact,
    Heirloom,
}

export enum InventoryType {
    None,
    Head,
    Neck,
    Shoulder,
    Shirt,
    Chest,
    Waist,
    Legs,
    Feet,
    Wrist,
    Hands,
    Finger,
    Trinket,
    OneHand,
    Shield,
    Ranged,
    Cloak,
    TwoHand,
    Bag,
    Tabard,
    Robe,
    MainHand,
    OffHand,
    HeldInOffHand,
    Ammo,
    Thrown,
    RangedRight,
    Relic,
}

export enum ItemBind {
    none,
    bindOnPickup,
    bindOnEquip,
}

type ItemClassClass = number;

type SubItemClassClass = number;

type ItemSpellId = number;

interface IItemSpellSpell {
    id: ItemSpellId;
    name: string;
    icon: string;
    description: string;
    castTime: string;
}

export enum ItemSpellTrigger {
    OnProc = "ON_PROC",
    OnUse = "ON_USE",
    OnLearn = "ON_LEARN",
    OnLooted = "ON_LOOTED",
    OnPickup = "ON_PICKUP",
    OnEquip = "ON_EQUIP",
}

interface IItemSpell {
    spellId: ItemSpellId;
    nCharges: number;
    consumable: boolean;
    categoryId: number;
    trigger: ItemSpellTrigger;
    spell: IItemSpellSpell;
}

interface IItemWeaponDamage {
    min: number;
    max: number;
    exactMin: number;
    exactMax: number;
}

interface IItemWeaponInfo {
    damage: IItemWeaponDamage;
    weaponSpeed: number;
    dps: number;
}

interface IItemBonusStat {
    stat: number;
    amount: number;
}

export interface IItem {
    id: ItemId;
    name: string;
    normalized_name: string;
    quality: ItemQuality;
    icon: string;
    itemLevel: number;
    itemClass: ItemClassClass;
    itemSubClass: SubItemClassClass;
    inventoryType: InventoryType;
    itemBind: ItemBind;
    requiredLevel: number;
    armor: number;
    maxDurability: number;
    sellPrice: number;
    itemSpells: IItemSpell[];
    equippable: boolean;
    stackable: number;
    weaponInfo: IItemWeaponInfo;
    bonusStats: IItemBonusStat[];
    description: string;
    icon_url: string;
}

export interface IItemsMap {
    [key: number]: IItem;
}
