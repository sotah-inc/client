import * as React from "react";

import { Classes, Intent, NonIdealState, Spinner } from "@blueprintjs/core";
import { RouteComponentProps } from "react-router";

import { IPricelistJson } from "@app/api-types/entities";
import { IExpansion } from "@app/api-types/expansion";
import { IProfession } from "@app/api-types/profession";
import { IRealm, IRegion } from "@app/api-types/region";
import { CreateEntryDialogContainer } from "@app/containers/App/Data/PriceLists/CreateEntryDialog";
import { ActionBarRouteContainer } from "@app/route-containers/App/Data/PriceLists/ActionBar";
import { CreateListDialogRouteContainer } from "@app/route-containers/App/Data/PriceLists/CreateListDialog";
import { DeleteListDialogRouteContainer } from "@app/route-containers/App/Data/PriceLists/DeleteListDialog";
import { EditListDialogRouteContainer } from "@app/route-containers/App/Data/PriceLists/EditListDialog";
import { PricelistTreeRouteContainer } from "@app/route-containers/App/Data/PriceLists/PricelistTree";
import { IRealms, IRegions } from "@app/types/global";
import { AuthLevel, FetchLevel } from "@app/types/main";
import { IExpansionProfessionPricelistMap } from "@app/types/price-lists";
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
    expansions: IExpansion[];
    getProfessionPricelistsLevel: FetchLevel;
    selectedList: IPricelistJson | null;
    professionPricelists: IExpansionProfessionPricelistMap;
    pricelists: IPricelistJson[];
}

export interface IDispatchProps {
    changeIsLoginDialogOpen: (isLoginDialogOpen: boolean) => void;
    changeSelectedExpansion: (expansion: IExpansion) => void;
    changeSelectedList: (list: IPricelistJson) => void;
    changeSelectedProfession: (profession: IProfession) => void;
    fetchRealms: (region: IRegion) => void;
    onRegionChange: (region: IRegion) => void;
    onRealmChange: (realm: IRealm) => void;
    resetProfessionsSelections: () => void;
}

interface IRouteParams {
    region_name: string;
    realm_slug: string;
    profession_name?: string;
    expansion_name?: string;
    pricelist_slug?: string;
}

export interface IOwnProps extends RouteComponentProps<IRouteParams> {}

type Props = Readonly<IStateProps & IDispatchProps & IOwnProps>;

export class PriceLists extends React.Component<Props> {
    public componentDidMount() {
        const {
            currentRegion,
            match: {
                params: { region_name },
            },
            onRegionChange,
            regions,
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

        this.handleWithRegion();
    }

    public componentDidUpdate() {
        const {
            match: {
                params: { region_name },
            },
            currentRegion,
            onRegionChange,
            regions,
            fetchRealmLevel,
            fetchRealms,
            currentRealm,
            history,
            selectedProfession,
            selectedExpansion,
            selectedList,
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

                    const urlParts = ["data", currentRegion.name, currentRealm.slug, "professions"];
                    if (selectedProfession === null) {
                        if (selectedList !== null && selectedList.slug !== null) {
                            urlParts.push(...["user", selectedList.slug]);
                        }
                    } else {
                        urlParts.push(selectedProfession.name);

                        if (selectedExpansion !== null) {
                            urlParts.push(selectedExpansion.name);
                        }
                        if (selectedList !== null && selectedList.slug !== null) {
                            urlParts.push(selectedList.slug);
                        }
                    }
                    history.push(`/${urlParts.join("/")}`);

                    return;
                default:
                    return;
            }
        }

        this.handleWithRegion();
    }

    public render() {
        const {
            authLevel,
            match: {
                params: { profession_name },
            },
            professions,
        } = this.props;

        if (typeof profession_name !== "undefined") {
            const hasProfession: boolean = professions.reduce((previousValue, currentValue) => {
                if (previousValue !== false) {
                    return previousValue;
                }

                if (currentValue.name === profession_name) {
                    return true;
                }

                return false;
            }, false);

            if (!hasProfession) {
                return (
                    <NonIdealState
                        title="Profession not found"
                        description={`Profession ${profession_name} could not be found`}
                        icon={<Spinner className={Classes.LARGE} intent={Intent.DANGER} value={1} />}
                    />
                );
            }
        }

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
                <CreateListDialogRouteContainer />
                <CreateEntryDialogContainer />
                <EditListDialogRouteContainer />
                <DeleteListDialogRouteContainer />
                <ActionBarRouteContainer />
                <PricelistTreeRouteContainer />
            </>
        );
    }

    private handleWithRegion() {
        const {
            match: {
                params: { realm_slug },
            },
            fetchRealmLevel,
            currentRegion,
            fetchRealms,
            currentRealm,
            onRealmChange,
            realms,
        } = this.props;

        if (currentRegion === null) {
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
            if (!(realm_slug in realms)) {
                return;
            }

            onRealmChange(realms[realm_slug]);

            return;
        }

        this.handleWithRealm();
    }

    private handleWithRealm() {
        const {
            match: {
                params: { profession_name, pricelist_slug },
            },
            currentRegion,
            currentRealm,
            selectedProfession,
            selectedExpansion,
            selectedList,
            changeSelectedProfession,
            professions,
            resetProfessionsSelections,
            pricelists,
            changeSelectedList,
        } = this.props;

        if (currentRegion === null || currentRealm === null) {
            return;
        }

        if (typeof profession_name === "undefined") {
            if (typeof pricelist_slug === "undefined") {
                if (selectedProfession !== null || selectedExpansion !== null || selectedList !== null) {
                    resetProfessionsSelections();

                    return;
                }

                return;
            }

            const foundList: IPricelistJson | null = pricelists.reduce((prevValue, curValue) => {
                if (prevValue !== null) {
                    return prevValue;
                }

                if (curValue.slug === pricelist_slug) {
                    return curValue;
                }

                return null;
            }, null);
            if (foundList === null) {
                return;
            }

            if (selectedList === null || foundList.id !== selectedList.id) {
                changeSelectedList(foundList);

                return;
            }

            this.setTitle();

            return;
        }

        if (selectedProfession === null || selectedProfession.name !== profession_name) {
            const foundProfession: IProfession | null = professions.reduce((previousValue, currentValue) => {
                if (previousValue !== null) {
                    return previousValue;
                }

                if (currentValue.name === profession_name) {
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

        this.handleWithProfession();
    }

    private handleWithProfession() {
        const {
            match: {
                params: { expansion_name },
            },
            currentRegion,
            currentRealm,
            selectedProfession,
            selectedExpansion,
            expansions,
            changeSelectedExpansion,
            getProfessionPricelistsLevel,
        } = this.props;

        if (currentRegion === null || currentRealm === null || selectedProfession === null) {
            return;
        }

        switch (getProfessionPricelistsLevel) {
            case FetchLevel.success:
                break;
            default:
                return;
        }

        if (typeof expansion_name === "undefined") {
            this.setTitle();

            return;
        }

        if (selectedExpansion === null || selectedExpansion.name !== expansion_name) {
            const foundExpansion: IExpansion | null = expansions.reduce((previousValue, currentValue) => {
                if (previousValue !== null) {
                    return previousValue;
                }

                if (currentValue.name === expansion_name) {
                    return currentValue;
                }

                return null;
            }, null);

            if (foundExpansion === null) {
                return;
            }

            changeSelectedExpansion(foundExpansion);

            return;
        }

        this.handleWithExpansion();
    }

    private handleWithExpansion() {
        const {
            match: {
                params: { pricelist_slug },
            },
            history,
            currentRegion,
            currentRealm,
            selectedProfession,
            selectedExpansion,
            selectedList,
            professionPricelists,
            changeSelectedList,
        } = this.props;

        if (
            currentRegion === null ||
            currentRealm === null ||
            selectedProfession === null ||
            selectedExpansion === null
        ) {
            return;
        }

        if (
            !(selectedExpansion.name in professionPricelists) ||
            professionPricelists[selectedExpansion.name].length === 0
        ) {
            return;
        }

        if (typeof pricelist_slug === "undefined") {
            const preselectedList: IPricelistJson | null = (() => {
                const sorted = professionPricelists[selectedExpansion.name].sort((a, b) => {
                    if (a.pricelist.name === b.pricelist.name) {
                        return 0;
                    }

                    return a.pricelist.name > b.pricelist.name ? 1 : -1;
                });

                return sorted[0].pricelist;
            })();

            if (preselectedList === null) {
                return;
            }

            const url = [
                "data",
                currentRegion.name,
                currentRealm.slug,
                "professions",
                selectedProfession.name,
                selectedExpansion.name,
                preselectedList.slug,
            ].join("/");
            history.replace(`/${url}`);

            return;
        }

        const foundList: IPricelistJson | null = professionPricelists[selectedExpansion.name].reduce(
            (prevValue, curValue) => {
                if (prevValue !== null) {
                    return prevValue;
                }

                if (curValue.pricelist.slug === pricelist_slug) {
                    return curValue.pricelist;
                }

                return null;
            },
            null,
        );
        if (foundList === null) {
            return;
        }

        if (selectedList === null || foundList.id !== selectedList.id) {
            changeSelectedList(foundList);

            return;
        }

        this.handleWithPricelist();
    }

    private handleWithPricelist() {
        this.setTitle();
    }

    private setTitle() {
        const { currentRegion, currentRealm, selectedProfession, selectedExpansion, selectedList } = this.props;

        if (currentRegion === null || currentRealm === null) {
            return;
        }

        if (selectedProfession === null) {
            if (selectedList === null) {
                setTitle(`Professions - ${currentRegion.name.toUpperCase()} ${currentRealm.name}`);

                return;
            }

            const userPricelistTitle = [
                selectedList.name,
                "Professions",
                currentRegion.name.toUpperCase(),
                currentRealm.name,
            ].join(" - ");
            setTitle(userPricelistTitle);

            return;
        }

        if (selectedExpansion === null) {
            setTitle(`
                ${selectedProfession.label} - Professions - ${currentRegion.name.toUpperCase()} ${currentRealm.name}`);

            return;
        }

        if (selectedList === null) {
            setTitle(`
                ${selectedExpansion.label} - ${
                selectedProfession.label
            } - Professions - ${currentRegion.name.toUpperCase()} ${currentRealm.name}`);

            return;
        }

        const title = [
            selectedList.name,
            selectedExpansion.label,
            selectedProfession.label,
            "Professions",
            currentRegion.name.toUpperCase(),
            currentRealm.name,
        ].join(" - ");
        setTitle(title);
    }
}
