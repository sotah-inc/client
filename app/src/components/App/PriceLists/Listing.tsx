import * as React from "react";

import { Button, Classes, Intent, NonIdealState, Spinner } from "@blueprintjs/core";

import { IGetPricelistsOptions } from "@app/api/price-lists";
import { PricelistTreeContainer } from "@app/containers/App/PriceLists/Listing/PricelistTree";
import { IProfession, IProfile, IRealm, IRegion } from "@app/types/global";
import { AuthLevel, FetchUserPreferencesLevel } from "@app/types/main";
import { GetPricelistsLevel, IPricelist } from "@app/types/price-lists";
import { didRealmChange } from "@app/util";

export interface IStateProps {
    pricelists: IPricelist[];
    selectedList: IPricelist | null;
    currentRegion: IRegion | null;
    currentRealm: IRealm | null;
    getPricelistsLevel: GetPricelistsLevel;
    profile: IProfile | null;
    authLevel: AuthLevel;
    fetchUserPreferencesLevel: FetchUserPreferencesLevel;
    professions: IProfession[];
    selectedProfession: IProfession | null;
}

export interface IDispatchProps {
    changeSelectedList: (list: IPricelist) => void;
    changeSelectedProfession: (profession: IProfession) => void;
    changeIsAddListDialogOpen: (isDialogOpen: boolean) => void;
    refreshPricelists: (opts: IGetPricelistsOptions) => void;
}

export type Props = Readonly<IStateProps & IDispatchProps>;

export class Listing extends React.Component<Props> {
    public componentDidMount() {
        const {
            refreshPricelists,
            currentRegion,
            currentRealm,
            profile,
            authLevel,
            fetchUserPreferencesLevel,
            pricelists,
        } = this.props;

        if (currentRealm === null || currentRegion === null) {
            return;
        }

        const shouldRefreshPricelists =
            authLevel === AuthLevel.authenticated &&
            fetchUserPreferencesLevel === FetchUserPreferencesLevel.success &&
            pricelists.length === 0;

        if (shouldRefreshPricelists) {
            refreshPricelists({
                realmSlug: currentRealm.slug,
                regionName: currentRegion.name,
                token: profile!.token,
            });
        }
    }

    public componentDidUpdate(prevProps: Props) {
        const {
            refreshPricelists,
            currentRegion,
            currentRealm,
            profile,
            authLevel,
            fetchUserPreferencesLevel,
        } = this.props;

        if (currentRealm === null || currentRegion === null) {
            return;
        }

        if (authLevel === AuthLevel.authenticated && fetchUserPreferencesLevel === FetchUserPreferencesLevel.success) {
            const shouldRefreshPricelists = didRealmChange(prevProps.currentRealm, currentRealm);
            if (shouldRefreshPricelists) {
                refreshPricelists({
                    realmSlug: currentRealm.slug,
                    regionName: currentRegion.name,
                    token: profile!.token,
                });
            }
        }
    }

    public render() {
        return <div style={{ marginTop: "20px" }}>{this.renderContent()}</div>;
    }

    private renderPricelists() {
        const { pricelists, currentRealm, changeIsAddListDialogOpen } = this.props;

        if (pricelists.length === 0) {
            return (
                <NonIdealState
                    title="No price lists"
                    description={`You have no price lists in ${currentRealm!.name}.`}
                    icon="list"
                    action={
                        <Button
                            className={Classes.FILL}
                            icon="plus"
                            onClick={() => changeIsAddListDialogOpen(true)}
                            text={`Add List to ${currentRealm!.name}`}
                        />
                    }
                />
            );
        }

        return <PricelistTreeContainer />;
    }

    private renderContent() {
        const { getPricelistsLevel } = this.props;

        switch (getPricelistsLevel) {
            case GetPricelistsLevel.initial:
                return (
                    <NonIdealState
                        title="Loading"
                        icon={<Spinner className={Classes.LARGE} intent={Intent.NONE} value={0} />}
                    />
                );
            case GetPricelistsLevel.fetching:
                return (
                    <NonIdealState
                        title="Loading"
                        icon={<Spinner className={Classes.LARGE} intent={Intent.PRIMARY} />}
                    />
                );
            case GetPricelistsLevel.success:
                return this.renderPricelists();
            default:
                break;
        }

        return;
    }
}
