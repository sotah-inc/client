import * as React from "react";

import { RouteComponentProps } from "react-router";

import { IExpansion } from "@app/api-types/expansion";
import { IProfession } from "@app/api-types/profession";
import { IRealm, IRegion } from "@app/api-types/region";
import { CreateEntryDialogContainer } from "@app/containers/App/Data/PriceLists/CreateEntryDialog";
import { CreateListDialogContainer } from "@app/containers/App/Data/PriceLists/CreateListDialog";
import { DeleteListDialogContainer } from "@app/containers/App/Data/PriceLists/DeleteListDialog";
import { EditListDialogContainer } from "@app/containers/App/Data/PriceLists/EditListDialog";
import { ActionBarRouteContainer } from "@app/route-containers/App/Data/PriceLists/ActionBar";
import { PricelistTreeRouteContainer } from "@app/route-containers/App/Data/PriceLists/PricelistTree";
import { IRealms, IRegions } from "@app/types/global";
import { AuthLevel, FetchLevel } from "@app/types/main";
import { setTitle } from "@app/util";

import "./PriceLists.scss";

export interface IStateProps {
    authLevel: AuthLevel;

    currentRealm: IRealm | null;
    currentRegion: IRegion | null;
    regions: IRegions;
    fetchRealmLevel: FetchLevel;
    realms: IRealms;
    selectedProfession: IProfession | null;
    selectedExpansion: IExpansion | null;
    professions: IProfession[];
}

export interface IDispatchProps {
    changeIsLoginDialogOpen: (isLoginDialogOpen: boolean) => void;
    changeSelectedProfession: (profession: IProfession) => void;
    fetchRealms: (region: IRegion) => void;
    onRegionChange: (region: IRegion) => void;
    onRealmChange: (realm: IRealm) => void;
    resetProfessionsSelections: () => void;
}

interface IRouteParams {
    region_name: string;
    realm_slug: string;
    profession?: string;
}

export interface IOwnProps extends RouteComponentProps<IRouteParams> {}

type Props = Readonly<IStateProps & IDispatchProps & IOwnProps>;

export class PriceLists extends React.Component<Props> {
    public componentDidMount() {
        const {
            currentRegion,
            match: {
                params: { region_name, realm_slug, profession },
            },
            onRegionChange,
            regions,
            fetchRealmLevel,
            fetchRealms,
            currentRealm,
            selectedProfession,
            resetProfessionsSelections,
        } = this.props;

        if (currentRegion === null) {
            return;
        }

        if (currentRegion.name !== region_name) {
            if (region_name in regions) {
                onRegionChange(regions[region_name]);

                return;
            }

            return;
        }

        switch (fetchRealmLevel) {
            case FetchLevel.initial:
            case FetchLevel.prompted:
                fetchRealms(currentRegion);

                return;
            case FetchLevel.success:
                break;
            default:
                return;
        }

        if (currentRealm === null) {
            return;
        }

        if (currentRealm.slug !== realm_slug) {
            return;
        }

        if (selectedProfession !== null && typeof profession === "undefined") {
            resetProfessionsSelections();

            return;
        }

        this.setTitle();
    }

    public componentDidUpdate(prevProps: Props) {
        const {
            match: {
                params: { region_name, realm_slug, profession },
            },
            history,
            fetchRealmLevel,
            currentRegion,
            fetchRealms,
            currentRealm,
            onRealmChange,
            realms,
            onRegionChange,
            regions,
            selectedProfession,
            changeSelectedProfession,
            professions,
            resetProfessionsSelections,
        } = this.props;

        if (currentRegion === null) {
            return;
        }

        if (currentRegion.name !== region_name) {
            switch (fetchRealmLevel) {
                case FetchLevel.initial:
                    if (region_name in regions) {
                        onRegionChange(regions[region_name]);

                        return;
                    }

                    return;
                case FetchLevel.prompted:
                    fetchRealms(currentRegion);

                    return;
                case FetchLevel.success:
                    if (currentRealm === null) {
                        return;
                    }

                    this.setTitle();
                    history.push(`/data/${currentRegion.name}/${currentRealm.slug}/professions`);

                    return;
                default:
                    return;
            }
        }

        switch (fetchRealmLevel) {
            case FetchLevel.initial:
            case FetchLevel.prompted:
                fetchRealms(currentRegion);

                return;
            case FetchLevel.success:
                break;
            default:
                return;
        }

        if (currentRealm === null) {
            return;
        }

        if (currentRealm.slug !== realm_slug) {
            if (!(realm_slug in realms)) {
                return;
            }

            onRealmChange(realms[realm_slug]);

            return;
        }

        if (typeof profession === "undefined") {
            if (selectedProfession !== null) {
                resetProfessionsSelections();

                return;
            }

            return;
        }

        if (selectedProfession === null || selectedProfession.name !== profession) {
            const foundProfession: IProfession | null = professions.reduce((previousValue, currentValue) => {
                if (previousValue !== null) {
                    return previousValue;
                }

                if (currentValue.name === profession) {
                    return currentValue;
                }

                return null;
            }, null);

            if (foundProfession === null) {
                return;
            }

            changeSelectedProfession(foundProfession);

            return;
        }

        this.setTitle();
    }

    public render() {
        const { authLevel } = this.props;

        if (authLevel === AuthLevel.unauthenticated) {
            return (
                <>
                    <ActionBarRouteContainer />
                    <PricelistTreeRouteContainer />
                </>
            );
        }

        return (
            <>
                <CreateListDialogContainer />
                <CreateEntryDialogContainer />
                <EditListDialogContainer />
                <DeleteListDialogContainer />
                <ActionBarRouteContainer />
                <PricelistTreeRouteContainer />
            </>
        );
    }

    private setTitle() {
        const { currentRegion, currentRealm, selectedProfession, selectedExpansion } = this.props;

        if (currentRegion === null || currentRealm === null) {
            return;
        }

        if (selectedProfession === null) {
            setTitle(`Professions - ${currentRegion.name.toUpperCase()} ${currentRealm.name}`);

            return;
        }

        if (selectedExpansion === null) {
            setTitle(`
                ${selectedProfession.label} - Professions - ${currentRegion.name.toUpperCase()} ${currentRealm.name}`);

            return;
        }

        setTitle(`
            ${selectedExpansion.label} - ${
            selectedProfession.label
        } - Professions - ${currentRegion.name.toUpperCase()} ${currentRealm.name}`);
    }
}
