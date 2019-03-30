import moment from "moment";

import { apiEndpoint } from "@app/api";
import { IQueryAuctionsItem } from "@app/api-types/contracts/data";
import { IExpansion } from "@app/api-types/expansion";
import { IItem, InventoryType, ItemQuality, ItemStat } from "@app/api-types/item";
import { IRealm, IRegion } from "@app/api-types/region";

const hostname = window.location.hostname;
export const title: string = hostname === "localhost" ? "SotAH (DEV)" : "Secrets of the Auction House";
export const setTitle = (prefix: string) => {
    document.title = `${prefix} - ${title}`;
};

export const currencyToText = (amount: number): string => {
    if (amount === 0) {
        return "0g";
    }

    const copper = Math.floor(amount % 100);
    amount = amount / 100;
    const silver = Math.floor(amount % 100);
    const gold = Math.floor(amount / 100);

    const copperOutput = copper > 0 ? `${copper.toFixed()}c` : null;
    const silverOutput = silver > 0 ? `${silver.toFixed()}s` : null;
    const goldOutput = gold > 0 ? `${Number(gold.toFixed(0)).toLocaleString()}g` : null;
    const output = [goldOutput, silverOutput, copperOutput].filter(v => v !== null).join(" ");

    return output;
};

export const unixTimestampToText = (unixTimestamp: number): string => {
    const date = new Date(unixTimestamp * 1000);
    return moment(date).format("MMM D");
};

export const getColor = (index: number): string => {
    const choices = [
        "#2965CC",
        "#29A634",
        "#D99E0B",
        "#D13913",
        "#8F398F",
        "#00B3A4",
        "#DB2C6F",
        "#9BBF30",
        "#96622D",
        "#7157D9",
    ];

    return choices[index % choices.length];
};

export const qualityToColorClass = (quality: ItemQuality): string => {
    switch (quality) {
        case ItemQuality.Legendary:
            return "legendary-text";
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

export const getItemIconUrl = (item: IItem): string | null => {
    if (item.icon_object_name !== "") {
        return `https://item-icons.sotah.info/${item.icon_object_name}`;
    }

    if (item.icon_url !== "") {
        return item.icon_url;
    }

    if (item.icon === "") {
        return null;
    }

    return `${apiEndpoint}/item-icons/${item.icon}.jpg`;
};

export const getItemTextValue = (item: IItem): string => {
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
        case InventoryType.HeldInOffHand:
            return "Held in Off-hand";
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

export const getSelectedResultIndex = (result: IQueryAuctionsItem, selectedItems: IQueryAuctionsItem[]): number => {
    if (selectedItems.length === 0) {
        return -1;
    }

    for (let i = 0; i < selectedItems.length; i++) {
        const selectedItem = selectedItems[i];

        if (selectedItem.item !== null) {
            if (result.owner !== null) {
                continue;
            }

            if (result.item !== null && result.item.id === selectedItem.item.id) {
                return Number(i);
            }
        }

        if (selectedItem.owner !== null) {
            if (result.item !== null) {
                continue;
            }

            if (result.owner !== null && result.owner.name === selectedItem.owner.name) {
                return Number(i);
            }
        }
    }

    return -1;
};

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

export const getPrimaryExpansion = (expansions: IExpansion[]): IExpansion => {
    return expansions.reduce((previousValue: IExpansion, currentValue: IExpansion) => {
        if (currentValue.primary) {
            return currentValue;
        }

        return previousValue;
    }, expansions[0]);
};
