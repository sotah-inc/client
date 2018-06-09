import { apiEndpoint } from '@app/api';
import { ItemQuality, Item, InventoryType } from '@app/types/global';

export const qualityToColorClass = (quality: ItemQuality): string => {
  switch (quality) {
    case ItemQuality.Epic:
      return 'epic-text';
    case ItemQuality.Rare:
      return 'rare-text';
    case ItemQuality.Uncommon:
      return 'uncommon-text';
    case ItemQuality.Poor:
      return 'poor-text';
    case ItemQuality.Common:
    default:
      return 'common-text';
  }
};

export const getItemIconUrl = (item: Item): string | null => {
  if (item.icon === '') {
    return null;
  }

  return `${apiEndpoint}/item-icons/${item.icon}.jpg`;
};

export const getItemTextValue = (item: Item): string => {
  if (item.name !== '') {
    return item.name;
  }

  return item.id.toString();
};

export const inventoryTypeToString = (iType: InventoryType): string => {
  if (!(iType in InventoryType)) {
    return 'n/a';
  }

  switch (iType) {
    case InventoryType.Wrist:
      return 'Wrist';
    case InventoryType.Robe:
      return 'Chest';
    case InventoryType.OneHand:
      return 'One-Hand';
    default:
      return InventoryType[iType];
  }
};