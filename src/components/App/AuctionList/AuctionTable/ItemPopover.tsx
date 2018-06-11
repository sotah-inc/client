import * as React from 'react';
import { Popover, PopoverInteractionKind, Position } from '@blueprintjs/core';

import { Currency } from '../../../util';

import {
  Item,
  ItemClasses,
  InventoryType,
  ItemBind,
  ItemClassClasses,
  ItemSpellTrigger,
  ItemBonusStat
} from '@app/types/global';
import {
  qualityToColorClass,
  getItemIconUrl,
  getItemTextValue,
  inventoryTypeToString,
  itemStatToString
} from '@app/util';

export type StateProps = {
};

export type DispatchProps = {
};

export type OwnProps = {
  itemClasses: ItemClasses
  item: Item
};

type Props = Readonly<StateProps & DispatchProps & OwnProps>;

export class ItemPopover extends React.Component<Props> {
  renderItemLevel(item: Item) {
    const exludedItemClasses = [ItemClassClasses.Consumable, ItemClassClasses.Battlepet];
    if (exludedItemClasses.indexOf(item.itemClass) > -1) {
      return;
    }

    return (
      <li className="item-level">Item level {item.itemLevel}</li>
    );
  }

  renderBind(item: Item) {
    switch (item.itemBind) {
      case (ItemBind.bindOnPickup):
        return <li>Binds when picked up</li>;
      case (ItemBind.bindOnEquip):
        return <li>Binds when equipped</li>;
      case (ItemBind.none):
      default:
        return;
    }
  }

  renderClass(item: Item) {
    const { itemClasses } = this.props;

    if (!(item.itemClass in itemClasses)) {
      return `Item-class #${item.itemClass}`;
    }
    const iClass = itemClasses[item.itemClass];

    if (!(item.itemSubClass in iClass.subClasses)) {
      return `${iClass.name} sub-class #${item.itemSubClass}`;
    }
    const iSubClass = iClass.subClasses[item.itemSubClass];

    return `${iClass.name} (#${item.itemClass}) - ${iSubClass.name}`;
  }

  renderOnUseContent(item: Item) {
    const onUseSpells = item.itemSpells.filter((v) => v.trigger === ItemSpellTrigger.OnUse);
    const [onUseSpell] = onUseSpells;
    
    let { description } = onUseSpell.spell;
    if (description.length === 0) {
      description = item.description;
    }

    switch (item.itemClass) {
      case ItemClassClasses.Glyph:
        return (
          <>
            Permanently teaches you this glyph:<br /><br />
            {description}<br />
          </>
        );
      default:
        return description;
    }
  }

  renderOnUse(item: Item) {
    if (item.itemSpells.length === 0) {
      return;
    }

    const onUseSpells = item.itemSpells.filter((v) => v.trigger === ItemSpellTrigger.OnUse);
    if (onUseSpells.length === 0) {
      return;
    }

    return (
      <li className="on-use">Use: {this.renderOnUseContent(item)}</li>
    );
  }

  renderRequiredLevel(item: Item) {
    if (item.requiredLevel === 0) {
      return;
    }

    return (
      <li>Requires Level {item.requiredLevel}</li>
    );
  }

  renderInventoryType(item: Item) {
    const { itemClasses } = this.props;

    switch (item.inventoryType) {
      case (InventoryType.None):
        const consumableItemClasses = [ItemClassClasses.Consumable, ItemClassClasses.Battlepet];
        if (consumableItemClasses.indexOf(item.itemClass) > -1) {
          return (
            <li>Consumable</li>
          );
        }

        return;
      default:
        let iSubClassText = '';
        if (item.itemClass in itemClasses) {
          const iClass = itemClasses[item.itemClass];
          if (item.itemSubClass in iClass.subClasses) {
            iSubClassText = iClass.subClasses[item.itemSubClass].name;
          }
        }

        return (
          <li>
            {inventoryTypeToString(item.inventoryType)}
            <span className="postscript">{iSubClassText}</span>
          </li>
        );
    }
  }

  renderLevel(item: Item) {
    if (item.armor === 0) {
      return;
    }

    return (
      <li>{item.armor} Armor</li>
    );
  }

  renderDurability(item: Item) {
    if (item.maxDurability === 0) {
      return;
    }

    return (
      <li>Durability {item.maxDurability} / {item.maxDurability}</li>
    );
  }

  renderSellPrice(item: Item) {
    if (item.sellPrice === 0) {
      return;
    }

    return (
      <li>
        Sell price: <Currency amount={item.sellPrice} />
      </li>
    );
  }

  renderStackable(item: Item) {
    if (item.stackable <= 1) {
      return;
    } 

    return (
      <li>Max Stack: {item.stackable}</li>
    );
  }

  renderWeaponInfo(item: Item) {
    if (item.weaponInfo.dps === 0) {
      return;
    }

    const { weaponInfo } = item;
    const { dps } = weaponInfo;
    let dpsText = dps.toString();
    if (dps !== Number(dps.toFixed(0))) {
      dpsText = dps.toFixed(1);
    }

    return (
      <>
        <li>
          {weaponInfo.damage.min}-{weaponInfo.damage.max} Damage
          <span className="postscript">Speed {weaponInfo.weaponSpeed}</span>
        </li>
        <li>({dpsText} damage per second)</li>
      </>
    );
  }

  renderItemStat(stat: ItemBonusStat, index: number) {
    return (
      <li key={index}>+{stat.amount} {itemStatToString(stat.stat)}</li>
    );
  }

  renderStats(item: Item) {
    const statItemClasses = [ItemClassClasses.Weapon, ItemClassClasses.Armor];
    if (statItemClasses.indexOf(item.itemClass) === -1) {
      return;
    }

    if (item.bonusStats.length === 0) {
      return (
        <li className="random-stats">&lt;Random enchantment&gt;</li>
      );
    }

    return item.bonusStats.map((v, i) => this.renderItemStat(v, i));
  }

  renderCraftingReagent(item: Item) {
    if (item.itemClass !== ItemClassClasses.Tradeskill) {
      return;
    }

    if (item.description !== '') {
      return (
        <li>"{item.description}"</li>
      );
    }

    return (
      <li className="crafting-reagent">Crafting Reagent</li>
    );
  }

  renderData(item: Item) {
    return (
      <>
        {this.renderItemLevel(item)}
        {this.renderBind(item)}
        {this.renderInventoryType(item)}
        {this.renderWeaponInfo(item)}
        {this.renderLevel(item)}
        {this.renderStats(item)}
        {this.renderDurability(item)}
        {this.renderOnUse(item)}
        {this.renderRequiredLevel(item)}
        {this.renderCraftingReagent(item)}
        {this.renderStackable(item)}
        {this.renderSellPrice(item)}
      </>
    );
  }

  renderPopoverContent(item: Item) {
    const itemTextClass = qualityToColorClass(item.quality);
    const itemIconUrl = getItemIconUrl(item);
    const itemText = getItemTextValue(item);

    if (itemIconUrl === null) {
      return (
        <div className="auction-popover-content">
          <ul>
            <li className={itemTextClass}>{itemText}</li>
            {this.renderData(item)}
          </ul>
          <hr />
          <ul>
            <li>{this.renderClass(item)}</li>
            <li>Item id: {item.id}</li>
          </ul>
        </div>
      );
    }

    return (
      <div className="auction-popover-content">
        <div className="pure-g">
          <div className="pure-u-1-5">
            <p className={itemTextClass} style={{paddingBottom: '17px', marginBottom: 0}}>
              <img src={itemIconUrl} className="item-icon" />
            </p>
          </div>
          <div className="pure-u-4-5">
            <ul>
              <li className={itemTextClass}>{itemText}</li>
              {this.renderData(item)}
            </ul>
            <hr />
            <ul>
              <li>{this.renderClass(item)}</li>
              <li>Item id: {item.id}</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  renderDisplay(item: Item) {
    const itemText = getItemTextValue(item);
    const itemIconUrl = getItemIconUrl(item);
    if (itemIconUrl === null) {
      return itemText;
    }

    return (
      <>
        <img src={itemIconUrl} className="item-icon" /> {itemText}
      </>
    );
  }

  renderPopoverTarget(item: Item) {
    return (
      <div className="item-icon-container">
        {this.renderDisplay(item)}
      </div>
    );
  }

  render() {
    const { item } = this.props;

    return (
      <Popover
        content={this.renderPopoverContent(item)}
        target={this.renderPopoverTarget(item)}
        interactionKind={PopoverInteractionKind.HOVER}
        position={Position.RIGHT}
      />
    );
  }
}