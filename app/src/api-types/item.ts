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

export enum ItemClassClasses {
    Consumable = 0,
    Container = 1,
    Weapon = 2,
    Gem = 3,
    Armor = 4,
    Reagent = 5,
    Projectile = 6,
    Tradeskill = 7,
    Recipe = 9,
    Quiver = 11,
    Quest = 12,
    Key = 13,
    Misc = 15,
    Glyph = 16,
    Battlepet = 17,
    WowToken = 18,
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

export enum ItemStat {
    Agi = 3,
    Str = 4,
    Int = 5,
    Stam = 7,
    Dodge = 13,
    Parry = 14,
    Crit = 32,
    PvPResil = 35,
    Haste = 36,
    Vers = 40,
    Mastery = 49,
    FireResist = 51,
    ShadowResist = 54,
    NatResist = 55,
    PvpPow = 57,
    AgiOrStr = 72,
    AgiOrInt = 73,
    StrOrInt = 74,
}

export const SecondaryItemStats: ItemStat[] = [ItemStat.Crit, ItemStat.PvPResil, ItemStat.Haste];

export interface IItemBonusStat {
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
    itemSpells: IItemSpell[] | null;
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
