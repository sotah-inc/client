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

const renderItemLevel = (item: IItem) => {
    const exludedItemClasses = [ItemClassClasses.Consumable, ItemClassClasses.Battlepet];
    if (exludedItemClasses.indexOf(item.itemClass) > -1) {
        return;
    }

    return <li className="item-level">Item level {item.itemLevel}</li>;
};

const renderBind = (item: IItem) => {
    switch (item.itemBind) {
        case ItemBind.bindOnPickup:
            return <li>Binds when picked up</li>;
        case ItemBind.bindOnEquip:
            return <li>Binds when equipped</li>;
        case ItemBind.none:
        default:
            return null;
    }
};

const renderClass = (item: IItem, itemClasses: IItemClasses) => {
    if (!(item.itemClass in itemClasses)) {
        return `Item-class #${item.itemClass}`;
    }
    const iClass = itemClasses[item.itemClass];

    if (!(item.itemSubClass in iClass.subclasses)) {
        return `${iClass.name} sub-class #${item.itemSubClass}`;
    }
    const iSubClass = iClass.subclasses[item.itemSubClass];

    return `${iClass.name} (#${item.itemClass}) - ${iSubClass.name}`;
};

const renderOnUseContent = (item: IItem) => {
    const onUseSpells = item.itemSpells!.filter(v => v.trigger === ItemSpellTrigger.OnUse);
    const [onUseSpell] = onUseSpells;

    let { description } = onUseSpell.spell;
    if (description.length === 0) {
        description = item.description;
    }

    if (item.itemClass === ItemClassClasses.Glyph) {
        return (
            <>
                Permanently teaches you this glyph:
                <br />
                <br />
                {description}
                <br />
            </>
        );
    } else {
        return description;
    }
};

const renderOnUse = (item: IItem) => {
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

    return <li className="on-use">Use: {renderOnUseContent(item)}</li>;
};

const renderRequiredLevel = (item: IItem) => {
    if (item.requiredLevel === 0) {
        return;
    }

    return <li>Requires Level {item.requiredLevel}</li>;
};

const renderInventoryType = (item: IItem, itemClasses: IItemClasses) => {
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
                if (item.itemSubClass in iClass.subclasses) {
                    iSubClassText = iClass.subclasses[item.itemSubClass].name;
                }
            }

            return (
                <li>
                    {inventoryTypeToString(item.inventoryType)}
                    <span className="postscript">{iSubClassText}</span>
                </li>
            );
    }
};

const renderLevel = (item: IItem) => {
    if (item.armor === 0) {
        return;
    }

    return <li>{item.armor} Armor</li>;
};

const renderDurability = (item: IItem) => {
    if (item.maxDurability === 0) {
        return;
    }

    return (
        <li>
            Durability {item.maxDurability} / {item.maxDurability}
        </li>
    );
};

const renderSellPrice = (item: IItem) => {
    if (item.sellPrice === 0) {
        return;
    }

    return (
        <li>
            Sell price: <Currency amount={item.sellPrice} />
        </li>
    );
};

const renderStackable = (item: IItem) => {
    if (item.stackable <= 1) {
        return;
    }

    return <li>Max Stack: {item.stackable}</li>;
};

const renderWeaponInfo = (item: IItem) => {
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
};

const renderItemStat = (stat: IItemBonusStat, index: number) => {
    return (
        <li key={index}>
            +{stat.amount} {itemStatToString(stat.stat)}
        </li>
    );
};

const renderStats = (item: IItem) => {
    const statItemClasses = [ItemClassClasses.Weapon, ItemClassClasses.Armor];
    if (statItemClasses.indexOf(item.itemClass) === -1) {
        return;
    }

    if (item.bonusStats.length === 0) {
        return <li className="random-stats">&lt;Random enchantment&gt;</li>;
    }

    return item.bonusStats.map(renderItemStat);
};

const renderDescription = (item: IItem) => {
    if (item.description.length === 0) {
        return;
    }

    return <li className="description">"{item.description}"</li>;
};

const renderCraftingReagent = (item: IItem) => {
    if (item.itemClass !== ItemClassClasses.Tradeskill) {
        return;
    }

    return (
        <>
            {renderDescription(item)}
            <li className="crafting-reagent">Crafting Reagent</li>
        </>
    );
};

const renderData = (item: IItem, itemClasses: IItemClasses) => {
    return (
        <>
            {renderItemLevel(item)}
            {renderBind(item)}
            {renderInventoryType(item, itemClasses)}
            {renderWeaponInfo(item)}
            {renderLevel(item)}
            {renderStats(item)}
            {renderDurability(item)}
            {renderOnUse(item)}
            {renderRequiredLevel(item)}
            {renderCraftingReagent(item)}
            {renderStackable(item)}
            {renderSellPrice(item)}
        </>
    );
};

const renderPopoverContent = (item: IItem, itemClasses: IItemClasses) => {
    const itemTextClass = qualityToColorClass(item.quality);
    const itemIconUrl = getItemIconUrl(item);
    const itemText = getItemTextValue(item);

    if (itemIconUrl === null) {
        return (
            <div className="item-popover-content">
                <ul>
                    <li className={itemTextClass}>{itemText}</li>
                    {renderData(item, itemClasses)}
                </ul>
                <hr />
                <ul>
                    <li>{renderClass(item, itemClasses)}</li>
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
                        {renderData(item, itemClasses)}
                    </ul>
                    <hr />
                    <ul>
                        <li>{renderClass(item, itemClasses)}</li>
                        <li>Item id: {item.id}</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export class ItemPopover extends React.Component<Props> {
    public static defaultProps: Partial<Props> = {
        itemTextFormatter: (itemText: string) => itemText,
        onItemClick: () => {
            return;
        },
    };

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
        const { item, itemClasses } = this.props;

        return (
            <Popover
                content={renderPopoverContent(item, itemClasses)}
                target={this.renderPopoverTarget(item)}
                interactionKind={PopoverInteractionKind.HOVER}
                position={Position.RIGHT}
            />
        );
    }
}
