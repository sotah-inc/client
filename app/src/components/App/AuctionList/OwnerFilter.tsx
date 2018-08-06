import * as React from 'react';
import { Spinner, Menu, MenuItem, Intent, ControlGroup, Button } from '@blueprintjs/core';
import {
  Suggest,
  ItemPredicate,
  ItemListRenderer,
  IItemListRendererProps,
  ItemRenderer,
  IItemRendererProps
} from '@blueprintjs/select';

import { IOwner, OwnerName, IRegion, IRealm } from '@app/types/global';
import { FetchOwnersLevel } from '@app/types/auction';
import { IGetOwnersOptions } from '@app/api/data';

const OwnerFilterSuggest = Suggest.ofType<IOwner>();

export type StateProps = {
  fetchOwnersLevel: FetchOwnersLevel
  owners: IOwner[]
  ownerFilter: OwnerName | null
  currentRegion: IRegion | null
  currentRealm: IRealm | null
};

export type DispatchProps = {
  onOwnerFilterChange: (ownerName: OwnerName | null) => void
    refreshOwners: (opts: IGetOwnersOptions) => void;
};

export interface OwnProps {}

type Props = Readonly<StateProps & DispatchProps & OwnProps>;

type State = Readonly<{
  ownerFilterValue: string
  timerId: NodeJS.Timer | null
}>;

export class OwnerFilter extends React.Component<Props, State> {
  public state: State = {
    ownerFilterValue: '',
    timerId: null
  };

  public itemPredicate: ItemPredicate<IOwner> = (query: string, item: IOwner) => {
    query = query.toLowerCase();
    return item.name.toLowerCase().indexOf(query) >= 0;
  }

  public itemRenderer: ItemRenderer<IOwner> = (owner: IOwner, { handleClick, modifiers, index }: IItemRendererProps) => {
        if (!modifiers.matchesPredicate) {
            return null;
        }

        const intent = Intent.NONE;

        return (
            <MenuItem
                key={index}
                intent={intent}
                className={modifiers.active ? "pt-active" : ""}
                onClick={handleClick}
                text={owner.name}
            />
        );
    };

    public itemListRenderer: ItemListRenderer<IOwner> = (params: IItemListRendererProps<IOwner>) => {
        const { items, itemsParentRef, renderItem } = params;
        const renderedItems = items.map(renderItem).filter(renderedItem => renderedItem !== null);
        if (renderedItems.length === 0) {
            return (
                <Menu ulRef={itemsParentRef}>
                    <li>
                        <h6>Select Owner</h6>
                    </li>
                    <li>
                        <em>No results found.</em>
                    </li>
                </Menu>
            );
        }

        return (
            <Menu ulRef={itemsParentRef}>
                <li>
                    <h6>Select Owner</h6>
                </li>
                {renderedItems}
            </Menu>
        );
    };

    public onFilterSet(owner: IOwner) {
        this.setState({ ownerFilterValue: owner.name });
        this.props.onOwnerFilterChange(owner.name);
    }

    public onFilterChange(ownerFilterValue: string) {
        const { timerId } = this.state;

        if (timerId !== null) {
            clearTimeout(timerId);
        }

        const newTimerId = setTimeout(() => {
            this.props.refreshOwners({
                regionName: this.props.currentRegion!.name,
                realmSlug: this.props.currentRealm!.slug,
                query: ownerFilterValue,
            });
        }, 0.25 * 1000);
        this.setState({ ownerFilterValue, timerId: newTimerId });
    }

    public onFilterClear() {
        this.setState({ ownerFilterValue: "" });
        this.props.onOwnerFilterChange(null);
        this.props.refreshOwners({
            regionName: this.props.currentRegion!.name,
            realmSlug: this.props.currentRealm!.slug,
            query: "",
        });
    }

    public render() {
        const { fetchOwnersLevel, owners } = this.props;
        const { ownerFilterValue } = this.state;

        const canClearFilter = ownerFilterValue !== null && ownerFilterValue !== "";

        switch (fetchOwnersLevel) {
            case FetchOwnersLevel.success:
            case FetchOwnersLevel.refetching:
                return (
                    <ControlGroup>
                        <OwnerFilterSuggest
                            items={owners}
                            itemRenderer={this.itemRenderer}
                            itemListRenderer={this.itemListRenderer}
                            itemPredicate={this.itemPredicate}
                            onItemSelect={(owner: IOwner) => {
                                this.onFilterSet(owner);
                            }}
                            inputValueRenderer={v => v.name}
                            inputProps={{
                                value: ownerFilterValue,
                                onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                                    this.onFilterChange(e.target.value),
                            }}
                        />
                        <Button
                            icon="filter-remove"
                            disabled={!canClearFilter}
                            text="Clear"
                            onClick={() => this.onFilterClear()}
                        />
                    </ControlGroup>
                );
            case FetchOwnersLevel.failure:
                return <Spinner className="pt-small" intent={Intent.DANGER} value={1} />;
            case FetchOwnersLevel.initial:
                return <Spinner className="pt-small" intent={Intent.NONE} value={1} />;
            case FetchOwnersLevel.fetching:
            default:
                return <Spinner className="pt-small" intent={Intent.PRIMARY} />;
        }
    }
}
