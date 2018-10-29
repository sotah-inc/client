import * as React from "react";

import { Popover, PopoverInteractionKind, Position } from "@blueprintjs/core";

import {
    IItem,
    IItemBonusStat,
    InventoryType,
    ItemBind,
    ItemClassClasses,
    ItemSpellTrigger,
} from "@app/api-types/item";
import { Currency } from "@app/components/util";
import { IItemClasses } from "@app/types/global";
import {
    getItemIconUrl,
    getItemTextValue,
    inventoryTypeToString,
    itemStatToString,
    qualityToColorClass,
} from "@app/util";

import "./ItemPopover.scss";

export interface IStateProps {
    itemClasses: IItemClasses;
}

export interface IOwnProps {
    item: IItem;

    onItemClick?: () => void;
    itemTextFormatter?: (itemText: string) => string;
}

type Props = Readonly<IStateProps & IOwnProps>;

export class ItemPopover extends React.Component<Props> {
    public static defaultProps: Partial<Props> = {
        itemTextFormatter: (itemText: string) => itemText,
        onItemClick: () => {
            return;
        },
    };

    public renderItemLevel(item: IItem) {
        const exludedItemClasses = [ItemClassClasses.Consumable, ItemClassClasses.Battlepet];
        if (exludedItemClasses.indexOf(item.itemClass) > -1) {
            return;
        }

        return <li className="item-level">Item level {item.itemLevel}</li>;
    }

    public renderBind(item: IItem) {
        switch (item.itemBind) {
            case ItemBind.bindOnPickup:
                return <li>Binds when picked up</li>;
            case ItemBind.bindOnEquip:
                return <li>Binds when equipped</li>;
            case ItemBind.none:
            default:
                return;
        }
    }

    public renderClass(item: IItem) {
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

    public renderOnUseContent(item: IItem) {
        const onUseSpells = item.itemSpells!.filter(v => v.trigger === ItemSpellTrigger.OnUse);
        const [onUseSpell] = onUseSpells;

        let { description } = onUseSpell.spell;
        if (description.length === 0) {
            description = item.description;
        }

        switch (item.itemClass) {
            case ItemClassClasses.Glyph:
                return (
                    <>
                        Permanently teaches you this glyph:
                        <br />
                        <br />
                        {description}
                        <br />
                    </>
                );
            default:
                return description;
        }
    }

    public renderOnUse(item: IItem) {
        if (item.itemSpells === null) {
            return;
        }

        if (item.itemSpells.length === 0) {
            return;
        }

        const onUseSpells = item.itemSpells.filter(v => v.trigger === ItemSpellTrigger.OnUse);
        if (onUseSpells.length === 0) {
            return;
        }

        return <li className="on-use">Use: {this.renderOnUseContent(item)}</li>;
    }

    public renderRequiredLevel(item: IItem) {
        if (item.requiredLevel === 0) {
            return;
        }

        return <li>Requires Level {item.requiredLevel}</li>;
    }

    public renderInventoryType(item: IItem) {
        const { itemClasses } = this.props;

        switch (item.inventoryType) {
            case InventoryType.None:
                const consumableItemClasses = [ItemClassClasses.Consumable, ItemClassClasses.Battlepet];
                if (consumableItemClasses.indexOf(item.itemClass) > -1) {
                    return <li>Consumable</li>;
                }

                return;
            default:
                let iSubClassText = "";
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

    public renderLevel(item: IItem) {
        if (item.armor === 0) {
            return;
        }

        return <li>{item.armor} Armor</li>;
    }

    public renderDurability(item: IItem) {
        if (item.maxDurability === 0) {
            return;
        }

        return (
            <li>
                Durability {item.maxDurability} / {item.maxDurability}
            </li>
        );
    }

    public renderSellPrice(item: IItem) {
        if (item.sellPrice === 0) {
            return;
        }

        return (
            <li>
                Sell price: <Currency amount={item.sellPrice} />
            </li>
        );
    }

    public renderStackable(item: IItem) {
        if (item.stackable <= 1) {
            return;
        }

        return <li>Max Stack: {item.stackable}</li>;
    }

    public renderWeaponInfo(item: IItem) {
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
                    {weaponInfo.damage.min} - {weaponInfo.damage.max} Damage
                    <span className="postscript">Speed {weaponInfo.weaponSpeed.toFixed(1)}</span>
                </li>
                <li>({dpsText} damage per second)</li>
            </>
        );
    }

    public renderItemStat(stat: IItemBonusStat, index: number) {
        return (
            <li key={index}>
                +{stat.amount} {itemStatToString(stat.stat)}
            </li>
        );
    }

    public renderStats(item: IItem) {
        const statItemClasses = [ItemClassClasses.Weapon, ItemClassClasses.Armor];
        if (statItemClasses.indexOf(item.itemClass) === -1) {
            return;
        }

        if (item.bonusStats.length === 0) {
            return <li className="random-stats">&lt;Random enchantment&gt;</li>;
        }

        return item.bonusStats.map((v, i) => this.renderItemStat(v, i));
    }

    public renderDescription(item: IItem) {
        if (item.description.length === 0) {
            return;
        }

        return <li className="description">"{item.description}"</li>;
    }

    public renderCraftingReagent(item: IItem) {
        if (item.itemClass !== ItemClassClasses.Tradeskill) {
            return;
        }

        return (
            <>
                {this.renderDescription(item)}
                <li className="crafting-reagent">Crafting Reagent</li>
            </>
        );
    }

    public renderData(item: IItem) {
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

    public renderPopoverContent(item: IItem) {
        const itemTextClass = qualityToColorClass(item.quality);
        const itemIconUrl = getItemIconUrl(item);
        const itemText = getItemTextValue(item);

        if (itemIconUrl === null) {
            return (
                <div className="item-popover-content">
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
            <div className="item-popover-content">
                <div className="pure-g">
                    <div className="pure-u-1-5">
                        <p className={itemTextClass} style={{ paddingBottom: "17px", marginBottom: 0 }}>
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

    public onItemClick() {
        const { onItemClick } = this.props;
        if (!onItemClick) {
            return;
        }

        onItemClick();
    }

    public itemTextFormatter(itemText: string) {
        const { itemTextFormatter } = this.props;
        if (!itemTextFormatter) {
            return itemText;
        }

        return itemTextFormatter(itemText);
    }

    public renderDisplay(item: IItem) {
        const itemText = this.itemTextFormatter(getItemTextValue(item));
        const itemIconUrl = getItemIconUrl(item);
        if (itemIconUrl === null) {
            return <a onClick={() => this.onItemClick()}>{itemText}</a>;
        }

        return (
            <>
                <img src={itemIconUrl} className="item-icon" /> <a onClick={() => this.onItemClick()}>{itemText}</a>
            </>
        );
    }

    public renderPopoverTarget(item: IItem) {
        return <div className="item-icon-container">{this.renderDisplay(item)}</div>;
    }

    public render() {
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
