// region types
export type RegionName = string;

export type Region = {
  name: RegionName
  hostname: string
};

export type Regions = {
  [key: string]: Region
};

// item types
export type ItemId = number;

export enum ItemQuality {
  Poor,
  Common,
  Uncommon,
  Rare,
  Epic,
  Legendary,
  Artifact,
  Heirloom
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
  Relic
}

export enum ItemBind { none, bindOnPickup, bindOnEquip }

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
  WowToken = 18
}

type ItemClassClass = number;

type SubItemClassClass = number;

type ItemSpellId = number;

type ItemSpellSpell = {
  id: ItemSpellId
  name: string
  icon: string
  description: string
  castTime: string
};

export enum ItemSpellTrigger {
  OnProc = 'ON_PROC',
  OnUse = 'ON_USE',
  OnLearn = 'ON_LEARN',
  OnLooted = 'ON_LOOTED',
  OnPickup = 'ON_PICKUP',
  OnEquip = 'ON_EQUIP'
}

type ItemSpell = {
  spellId: ItemSpellId
  nCharges: number
  consumable: boolean
  categoryId: number
  trigger: ItemSpellTrigger
  spell: ItemSpellSpell
};

type ItemWeaponDamage = {
  min: number
  max: number
  exactMin: number
  exactMax: number
};

type ItemWeaponInfo = {
  damage: ItemWeaponDamage
  weaponSpeed: number
  dps: number
};

export enum ItemStat {
  Agi = 3,
  Str = 4,
  Int =  5,
  Stam = 7,
  Dodge = 13,
  Parry = 14,
  Crit = 32,
  PvPResil = 35,
  Haste = 36,
  Vers = 40,
  Mastery = 49,
  FireResist = 51,
  NatResist = 55,
  PvpPow = 57,
  AgiOrStr = 72,
  AgiOrInt = 73,
  StrOrInt = 74
}

export const SecondaryItemStats: ItemStat[] = [
  ItemStat.Crit,
  ItemStat.PvPResil,
  ItemStat.Haste
];

export type ItemBonusStat = {
  stat: ItemStat
  amount: number
};

export type Item = {
  id: ItemId
  name: string
  normalized_name: string
  quality: ItemQuality
  icon: string
  itemLevel: number
  itemClass: ItemClassClass
  itemSubClass: SubItemClassClass
  inventoryType: InventoryType
  itemBind: number
  requiredLevel: number
  armor: number
  maxDurability: number
  sellPrice: number
  itemSpells: ItemSpell[] | null
  equippable: boolean
  stackable: number
  weaponInfo: ItemWeaponInfo
  bonusStats: ItemBonusStat[]
  description: string
};

// owner types
export type OwnerName = string;

export type Owner = {
  name: OwnerName
};

// auction types
export type Auction = {
  item: Item
  owner: OwnerName
  ownerRealm: string
  bid: number
  buyout: number
  buyoutPer: number
  quantity: number
  timeLeft: string
  aucList: number[]
};

// error types
export type Errors = {
  [key: string]: string
};

// realm types
export type RealmSlug = string;

export type Realm = {
  regionName: string
  type: string
  population: string
  queue: boolean
  status: boolean
  name: string
  slug: RealmSlug
  battlegroup: string
  locale: string
  timezone: string
  connected_realms: RealmSlug[]
};

export type Realms = {
  [key: string]: Realm
};

// user types
export type User = {
  id: number
  email: string
};

export type Profile = {
  user: User
  token: string
};

export type UserPreferences = {
  id: number
  user_id: number
  current_region: RegionName | null
  current_realm: RealmSlug | null
};

// item-classes
export type SubItemClass = {
  subclass: number
  name: string
};

export type SubItemClasses = {
  [key: number]: SubItemClass
};

export type ItemClass = {
  class: number
  name: string
  subClasses: SubItemClasses
};

export type ItemClasses = {
  [key: number]: ItemClass
};

// item-query types
export type QueryItemResult = {
  item: Item
  target: string
  rank: number
};
