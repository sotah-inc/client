import { apiEndpoint } from "@app/api";
import { IQueryAuctionResult } from "@app/types/auction";
import { InventoryType, IRealm, IRegion, Item, ItemQuality, ItemStat } from "@app/types/global";
import { IPricelist } from "@app/types/price-lists";

export const qualityToColorClass = (quality: ItemQuality): string => {
    switch (quality) {
        case ItemQuality.Epic:
            return "epic-text";
        case ItemQuality.Rare:
            return "rare-text";
        case ItemQuality.Uncommon:
            return "uncommon-text";
        case ItemQuality.Poor:
            return "poor-text";
        case ItemQuality.Common:
        default:
            return "common-text";
    }
};

export const getItemIconUrl = (item: Item): string | null => {
    if (item.icon === "") {
        return null;
    }

    return `${apiEndpoint}/item-icons/${item.icon}.jpg`;
};

export const getItemTextValue = (item: Item): string => {
    if (item.name !== "") {
        return item.name;
    }

    return item.id.toString();
};

export const inventoryTypeToString = (iType: InventoryType): string => {
    if (!(iType in InventoryType)) {
        return "n/a";
    }

    switch (iType) {
        case InventoryType.Wrist:
            return "Wrist";
        case InventoryType.Robe:
            return "Chest";
        case InventoryType.OneHand:
            return "One-Hand";
        default:
            return InventoryType[iType];
    }
};

export const itemStatToString = (stat: ItemStat): string => {
    if (!(stat in ItemStat)) {
        return `#${stat}`;
    }

    switch (stat) {
        case ItemStat.Int:
            return "Intellect";
        case ItemStat.Stam:
            return "Stamina";
        case ItemStat.Crit:
            return "Critical Strike";
        case ItemStat.FireResist:
            return "Fire Resistance";
        case ItemStat.NatResist:
            return "Nature Resistance";
        case ItemStat.ShadowResist:
            return "Shadow Resistance";
        case ItemStat.Vers:
            return "Versatility";
        case ItemStat.PvPResil:
            return "PvP Resilience";
        case ItemStat.Agi:
            return "Agility";
        case ItemStat.PvpPow:
            return "PvP Power";
        case ItemStat.Str:
            return "Strength";
        case ItemStat.AgiOrInt:
            return "[Agility or Intellect]";
        case ItemStat.StrOrInt:
            return "[Strength or Intellect]";
        case ItemStat.AgiOrStr:
            return "[Agility or Strength]";
        default:
            return ItemStat[stat];
    }
};

export const getSelectedResultIndex = (result: IQueryAuctionResult, selectedItems: IQueryAuctionResult[]): number => {
    if (selectedItems.length === 0) {
        return -1;
    }

    for (let i = 0; i < selectedItems.length; i++) {
        const selectedItem = selectedItems[i];

        if (selectedItem.item.id > 0) {
            if (result.owner.name !== "") {
                continue;
            }

            if (result.item.id === selectedItem.item.id) {
                return Number(i);
            }
        }

        if (selectedItem.owner.name !== "") {
            if (result.item.id > 0) {
                continue;
            }

            if (result.owner.name === selectedItem.owner.name) {
                return Number(i);
            }
        }
    }

    return -1;
};

export const priceListEntryTabId = (list: IPricelist): string => `tab-${list.id}`;

export const didRegionChange = (prevRegion: IRegion | null, currentRegion: IRegion): boolean => {
    if (prevRegion === null) {
        return true;
    }

    if (prevRegion.name === currentRegion.name) {
        return false;
    }

    return true;
};

export const didRealmChange = (prevRealm: IRealm | null, currentRealm: IRealm): boolean => {
    if (prevRealm === null) {
        return true;
    }

    if (prevRealm.regionName === currentRealm.regionName && prevRealm.slug === currentRealm.slug) {
        return false;
    }

    return true;
};
