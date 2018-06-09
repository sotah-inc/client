import * as React from 'react';
import { Popover, PopoverInteractionKind } from '@blueprintjs/core';

import SortToggle from '@app/containers/App/AuctionList/SortToggle';
import { Currency } from '../../util';

import {
  Auction,
  Item,
  ItemClasses,
  InventoryType,
  ItemBind,
  ItemClassClasses,
  ItemSpellTrigger,
  ItemBonusStat
} from '@app/types/global';
import { SortKind } from '@app/types/auction';
import {
  qualityToColorClass,
  getItemIconUrl,
  getItemTextValue,
  inventoryTypeToString,
  itemStatToString
} from '@app/util';

type ListAuction = Auction | null;

export type StateProps = {
  auctions: ListAuction[]
  itemClasses: ItemClasses
};

export type DispatchProps = {
};

export type OwnProps = {};

type Props = Readonly<StateProps & DispatchProps & OwnProps>;

export class AuctionTable extends React.Component<Props> {
  renderItemLevel(item: Item) {
    const exludedItemClasses = [ItemClassClasses.Consumable, ItemClassClasses.Battlepet];
    if (exludedItemClasses.indexOf(item.itemClass) > -1) {
      return;
    }

    return (
      <li className="item-level">Item level {item.itemLevel}</li>
    );
  }

  renderItemBind(item: Item) {
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

  renderItemClass(item: Item) {
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

  renderItemArmor(item: Item) {
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

  renderItemStat(stat: ItemBonusStat) {
    return (
      <li>+{stat.amount} {itemStatToString(stat.stat)}</li>
    );
  }

  renderItemStats(item: Item) {
    const statItemClasses = [ItemClassClasses.Weapon, ItemClassClasses.Armor];
    if (statItemClasses.indexOf(item.itemClass) === -1) {
      return;
    }

    if (item.bonusStats.length === 0) {
      return (
        <li className="random-stats">&lt;Random enchantment&gt;</li>
      );
    }

    return item.bonusStats.map((v) => this.renderItemStat(v));
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

  renderItemData(item: Item) {
    return (
      <>
        {this.renderItemLevel(item)}
        {this.renderItemBind(item)}
        {this.renderInventoryType(item)}
        {this.renderWeaponInfo(item)}
        {this.renderItemArmor(item)}
        {this.renderItemStats(item)}
        {this.renderDurability(item)}
        {this.renderOnUse(item)}
        {this.renderRequiredLevel(item)}
        {this.renderCraftingReagent(item)}
        {this.renderStackable(item)}
        {this.renderSellPrice(item)}
      </>
    );
  }

  renderItemPopoverContent(item: Item) {
    const itemTextClass = qualityToColorClass(item.quality);
    const itemIconUrl = getItemIconUrl(item);
    const itemText = getItemTextValue(item);

    if (itemIconUrl === null) {
      return (
        <div className="auction-popover-content">
          <ul>
            <li className={itemTextClass}>{itemText}</li>
            {this.renderItemData(item)}
          </ul>
          <hr />
          <ul>
            <li>{this.renderItemClass(item)}</li>
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
              {this.renderItemData(item)}
            </ul>
            <hr />
            <ul>
              <li>{this.renderItemClass(item)}</li>
              <li>Item id: {item.id}</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  renderItemDisplay(item: Item) {
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

  renderItemPopoverTarget(item: Item) {
    return (
      <div className="item-icon-container">
        {this.renderItemDisplay(item)}
      </div>
    );
  }

  renderItemPopover(item: Item) {
    return (
      <Popover
        content={this.renderItemPopoverContent(item)}
        target={this.renderItemPopoverTarget(item)}
        interactionKind={PopoverInteractionKind.HOVER}
      />
    );
  }

  renderAuction(auction: Auction | null, index: number) {
    if (auction === null) {
      return (
        <tr key={index}>
          <td>---</td>
          <td>---</td>
          <td>---</td>
          <td>---</td>
          <td>---</td>
          <td>---</td>
        </tr>
      );
    }

    return (
      <tr key={index}>
        <td className={qualityToColorClass(auction.item.quality)}>{this.renderItemPopover(auction.item)}</td>
        <td className="quantity-container">{auction.quantity}</td>
        <td className="currency-container"><Currency amount={auction.buyout} /></td>
        <td className="buyout-container"><Currency amount={auction.buyoutPer} /></td>
        <td className="auclist-container">{auction.aucList.length}</td>
        <td className="owner-container">{auction.owner}</td>
      </tr>
    );
  }

  render() {
    const { auctions } = this.props;

    return (
      <table className="pt-html-table pt-html-table-bordered pt-small auction-list">
        <thead>
          <tr>
            <th><SortToggle label="Item" sortKind={SortKind.item} /></th>
            <th><SortToggle label="Quantity" sortKind={SortKind.quantity} /></th>
            <th><SortToggle label="Buyout" sortKind={SortKind.buyout} /></th>
            <th><SortToggle label="BuyoutPer" sortKind={SortKind.buyoutPer} /></th>
            <th><SortToggle label="Auctions" sortKind={SortKind.auctions} /></th>
            <th><SortToggle label="Owner" sortKind={SortKind.owner} /></th>
          </tr>
        </thead>
        <tbody>
          {auctions.map((auction, index) => this.renderAuction(auction, index))}
        </tbody>
      </table>
    );
  }
}