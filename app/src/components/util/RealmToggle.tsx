import * as React from "react";

import { Button, Classes, H6, Intent, Menu, MenuItem, Spinner } from "@blueprintjs/core";
import {
    IItemListRendererProps,
    IItemRendererProps,
    ItemListRenderer,
    ItemPredicate,
    ItemRenderer,
    Select,
} from "@blueprintjs/select";

import { ICreatePreferencesRequest, IUpdatePreferencesRequest } from "@app/api-types/contracts/user/preferences";
import { IPreferenceJson } from "@app/api-types/entities";
import { IRealm, IRegion } from "@app/api-types/region";
import { IProfile, IRealms } from "@app/types/global";
import { AuthLevel, FetchLevel } from "@app/types/main";
import { didRealmChange } from "@app/util";

const RealmToggleSelect = Select.ofType<IRealm>();

export interface IStateProps {
    realms: IRealms;
    currentRealm: IRealm | null;
    fetchRealmLevel: FetchLevel;
    userPreferences: IPreferenceJson | null;
    authLevel: AuthLevel;
    profile: IProfile | null;
    currentRegion: IRegion | null;
}

type persistUserPreferencesFunc = (token: string, body: ICreatePreferencesRequest | IUpdatePreferencesRequest) => void;

export interface IDispatchProps {
    onRealmChange: (realm: IRealm) => void;
    createUserPreferences: (token: string, body: ICreatePreferencesRequest) => void;
    updateUserPreferences: (token: string, body: IUpdatePreferencesRequest) => void;
}

type Props = Readonly<IStateProps & IDispatchProps>;

export class RealmToggle extends React.Component<Props> {
    public componentDidUpdate(prevProps: Props) {
        const {
            currentRealm,
            authLevel,
            userPreferences,
            profile,
            createUserPreferences,
            updateUserPreferences,
            currentRegion,
        } = this.props;

        if (authLevel === AuthLevel.authenticated && currentRealm !== null && currentRegion !== null) {
            const persistUserPreferences: persistUserPreferencesFunc = (() => {
                if (userPreferences !== null) {
                    return updateUserPreferences;
                }

                return createUserPreferences;
            })();

            if (didRealmChange(prevProps.currentRealm, currentRealm)) {
                persistUserPreferences(profile!.token, {
                    current_realm: currentRealm.slug,
                    current_region: currentRegion.name,
                });
            }
        }
    }

    public itemPredicate: ItemPredicate<IRealm> = (query: string, item: IRealm) => {
        query = query.toLowerCase();
        return item.name.toLowerCase().indexOf(query) >= 0 || item.battlegroup.toLowerCase().indexOf(query) >= 0;
    };

    public itemRenderer: ItemRenderer<IRealm> = (
        realm: IRealm,
        { handleClick, modifiers, index }: IItemRendererProps,
    ) => {
        if (!modifiers.matchesPredicate) {
            return null;
        }

        const { currentRealm } = this.props;
        const intent = currentRealm !== null && realm.slug === currentRealm.slug ? Intent.PRIMARY : Intent.NONE;

        return (
            <MenuItem
                key={index}
                intent={intent}
                className={modifiers.active ? Classes.ACTIVE : ""}
                label={realm.battlegroup}
                onClick={handleClick}
                text={realm.name}
            />
        );
    };

    public itemListRenderer: ItemListRenderer<IRealm> = (params: IItemListRendererProps<IRealm>) => {
        const { items, itemsParentRef, renderItem } = params;
        const renderedItems = items.map(renderItem).filter(renderedItem => renderedItem !== null);
        return (
            <Menu ulRef={itemsParentRef}>
                <li>
                    <H6>Select Realm</H6>
                </li>
                {renderedItems}
            </Menu>
        );
    };

    public render() {
        const { realms, onRealmChange, currentRealm, fetchRealmLevel } = this.props;

        switch (fetchRealmLevel) {
            case FetchLevel.success:
                const items = Object.keys(realms).map(realmName => realms[realmName]);
                let highlightedRealm = items[0];
                if (currentRealm !== null) {
                    highlightedRealm = currentRealm;
                }

                return (
                    <RealmToggleSelect
                        items={items}
                        itemRenderer={this.itemRenderer}
                        itemListRenderer={this.itemListRenderer}
                        itemPredicate={this.itemPredicate}
                        onItemSelect={onRealmChange}
                        resetOnSelect={true}
                        resetOnClose={true}
                    >
                        <Button text={highlightedRealm.name} rightIcon="double-caret-vertical" />
                    </RealmToggleSelect>
                );
            case FetchLevel.failure:
                return <Spinner className={Classes.SMALL} intent={Intent.DANGER} value={1} />;
            case FetchLevel.initial:
                return <Spinner className={Classes.SMALL} intent={Intent.NONE} value={1} />;
            case FetchLevel.fetching:
            default:
                return <Spinner className={Classes.SMALL} intent={Intent.PRIMARY} />;
        }
    }
}
