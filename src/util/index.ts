import { ItemQuality } from '../types/global';

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