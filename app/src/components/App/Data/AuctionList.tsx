import {
    Alignment,
    ButtonGroup,
    Classes,
    H4,
    Intent,
    Navbar,
    NavbarDivider,
    NavbarGroup,
    NonIdealState,
    Spinner,
} from "@blueprintjs/core";
import * as React from "react";
import { RouteComponentProps } from "react-router";

import { SortDirection, SortKind } from "@app/api-types";
import { IAuction, OwnerName } from "@app/api-types/auction";
import { IQueryAuctionsItem } from "@app/api-types/contracts/data";
import { IPreferenceJson } from "@app/api-types/entities";
import { ItemId } from "@app/api-types/item";
import { IRealm, IRegion } from "@app/api-types/region";
import { IGetAuctionsOptions, IQueryAuctionsOptions } from "@app/api/data";
import { LastModified, Pagination } from "@app/components/util";
import { AuctionTableContainer } from "@app/containers/App/Data/AuctionList/AuctionTable";
import { CountToggleContainer } from "@app/containers/App/Data/AuctionList/CountToggle";
import { QueryAuctionsFilterContainer } from "@app/containers/App/Data/AuctionList/QueryAuctionsFilter";
import { RealmRouteParserContainer } from "@app/containers/util/RealmRouteParser";
import { RealmToggleContainer } from "@app/containers/util/RealmToggle";
import { RegionToggleContainer } from "@app/containers/util/RegionToggle";
import { AuthLevel, FetchLevel } from "@app/types/main";
import { didRealmChange } from "@app/util";

type ListAuction = IAuction | null;

export interface IStateProps {
    currentRegion: IRegion | null;
    currentRealm: IRealm | null;
    fetchAuctionsLevel: FetchLevel;
    auctions: ListAuction[];
    currentPage: number;
    auctionsPerPage: number;
    totalResults: number;
    sortKind: SortKind;
    sortDirection: SortDirection;
    queryAuctionsLevel: FetchLevel;
    selectedQueryAuctionResults: IQueryAuctionsItem[];
    authLevel: AuthLevel;
    fetchUserPreferencesLevel: FetchLevel;
    userPreferences: IPreferenceJson | null;
    activeSelect: boolean;
}

export interface IDispatchProps {
    refreshAuctions: (opts: IGetAuctionsOptions) => void;
    setCurrentPage: (page: number) => void;
    refreshAuctionsQuery: (opts: IQueryAuctionsOptions) => void;
}

interface IRouteParams {
    region_name: string;
    realm_slug: string;
}

export interface IOwnProps extends RouteComponentProps<IRouteParams> {}

type Props = Readonly<IStateProps & IDispatchProps & IOwnProps>;

export class AuctionList extends React.Component<Props> {
    public componentDidMount() {
        const { fetchAuctionsLevel, refreshAuctionsQuery, currentRegion, currentRealm, match } = this.props;

        console.log("AuctionList MOUNTED", match.params);

        if (fetchAuctionsLevel !== FetchLevel.initial) {
            return;
        }

        if (currentRegion === null || currentRealm === null) {
            return;
        }

        this.refreshAuctions();
        refreshAuctionsQuery({
            query: "",
            realmSlug: currentRealm.slug,
            regionName: currentRegion.name,
        });
    }

    public componentDidUpdate(prevProps: Props) {
        this.refreshAuctionsTrigger(prevProps);
        this.refreshAuctionsQueryTrigger(prevProps);
    }

    public render() {
        const {
            currentRegion,
            currentRealm,
            match: {
                params: { region_name, realm_slug },
            },
        } = this.props;

        if (currentRegion === null || currentRealm === null) {
            return (
                <NonIdealState
                    title="Loading"
                    icon={<Spinner className={Classes.LARGE} intent={Intent.NONE} value={0} />}
                />
            );
        }

        return (
            <RealmRouteParserContainer region_name={region_name} realm_slug={realm_slug}>
                {this.renderContent()}
            </RealmRouteParserContainer>
        );
    }

    private renderContent() {
        switch (this.props.fetchAuctionsLevel) {
            case FetchLevel.initial:
                return (
                    <NonIdealState
                        title="Loading"
                        icon={<Spinner className={Classes.LARGE} intent={Intent.NONE} value={0} />}
                    />
                );
            case FetchLevel.fetching:
                return (
                    <NonIdealState
                        title="Loading"
                        icon={<Spinner className={Classes.LARGE} intent={Intent.PRIMARY} />}
                    />
                );
            case FetchLevel.failure:
                return (
                    <NonIdealState
                        title="Fetch auctions failure"
                        description="Auctions could not be fetched"
                        icon="error"
                    />
                );
            case FetchLevel.refetching:
            case FetchLevel.success:
                return this.renderAuctions();
            default:
                return <>You should never see this!</>;
        }
    }

    private refreshAuctionsQueryTrigger(prevProps: Props) {
        const { currentRegion, currentRealm, refreshAuctionsQuery } = this.props;

        if (currentRegion === null || currentRealm === null) {
            return;
        }

        if (!didRealmChange(prevProps.currentRealm, currentRealm)) {
            return;
        }

        refreshAuctionsQuery({
            query: "",
            realmSlug: currentRealm.slug,
            regionName: currentRegion.name,
        });
    }

    private refreshAuctionsTrigger(prevProps: Props) {
        const {
            fetchAuctionsLevel,
            currentRegion,
            currentRealm,
            currentPage,
            auctionsPerPage,
            sortDirection,
            selectedQueryAuctionResults,
            authLevel,
            fetchUserPreferencesLevel,
            activeSelect,
        } = this.props;

        if (currentRegion === null || currentRealm === null) {
            return;
        }

        const didOptionsChange: boolean = (() => {
            if (didRealmChange(prevProps.currentRealm, currentRealm)) {
                return true;
            }

            if (currentPage !== prevProps.currentPage) {
                return true;
            }

            if (auctionsPerPage !== prevProps.auctionsPerPage) {
                return true;
            }

            if (prevProps.sortDirection !== sortDirection) {
                return true;
            }

            if (prevProps.sortKind !== this.props.sortKind) {
                return true;
            }

            if (activeSelect && prevProps.selectedQueryAuctionResults.length !== selectedQueryAuctionResults.length) {
                return true;
            }

            if (prevProps.activeSelect !== activeSelect) {
                return true;
            }

            return false;
        })();

        switch (fetchAuctionsLevel) {
            case FetchLevel.initial:
                break;
            case FetchLevel.success:
                if (!didOptionsChange) {
                    return;
                }

                break;
            default:
                return;
        }

        switch (authLevel) {
            case AuthLevel.unauthenticated:
                break;
            case AuthLevel.authenticated:
                if (fetchUserPreferencesLevel !== FetchLevel.success) {
                    return;
                }

                break;
            default:
                return;
        }

        this.refreshAuctions();
    }

    private refreshAuctions() {
        const {
            currentRegion,
            currentRealm,
            currentPage,
            auctionsPerPage,
            sortDirection,
            sortKind,
            selectedQueryAuctionResults,
            refreshAuctions,
        } = this.props;

        if (currentRegion === null || currentRealm === null) {
            return;
        }

        const ownerFilters: OwnerName[] = selectedQueryAuctionResults
            .filter(v => v.owner !== null)
            .map(v => v.owner!.name);
        const itemFilters: ItemId[] = selectedQueryAuctionResults.filter(v => v.item !== null).map(v => v.item!.id);
        refreshAuctions({
            realmSlug: currentRealm.slug,
            regionName: currentRegion.name,
            request: {
                count: auctionsPerPage,
                itemFilters,
                ownerFilters,
                page: currentPage,
                sortDirection,
                sortKind,
            },
        });
    }

    private renderRefetchingSpinner() {
        const { fetchAuctionsLevel } = this.props;
        if (fetchAuctionsLevel !== FetchLevel.refetching) {
            return null;
        }

        return <Spinner className={Classes.SMALL} intent={Intent.PRIMARY} />;
    }

    private renderAuctionsFooter() {
        const { currentRealm } = this.props;

        return (
            <>
                <LastModified targetDate={new Date(currentRealm!.last_modified * 1000)} />
            </>
        );
    }

    private getPageCount() {
        const { totalResults, auctionsPerPage } = this.props;

        let pageCount = 0;
        if (totalResults > 0) {
            pageCount = totalResults / auctionsPerPage - 1;
            const remainder = totalResults % auctionsPerPage;
            if (remainder > 0) {
                pageCount = (totalResults - remainder) / auctionsPerPage;
            }
        }

        return pageCount;
    }

    private renderAuctions() {
        const { auctions, totalResults, auctionsPerPage, currentPage, setCurrentPage } = this.props;

        // optionally appending blank auction lines
        if (totalResults > 0) {
            if (auctionsPerPage === 10 && auctions.length < auctionsPerPage) {
                for (let i = auctions.length; i < auctionsPerPage; i++) {
                    auctions[i] = null;
                }
            }
        }

        const pageCount = this.getPageCount();

        return (
            <>
                <H4>Search</H4>
                <QueryAuctionsFilterContainer />
                <Navbar>
                    <NavbarGroup align={Alignment.LEFT}>
                        <CountToggleContainer />
                        <NavbarDivider />
                        <Pagination
                            pageCount={pageCount}
                            currentPage={currentPage}
                            pagesShown={5}
                            onPageChange={setCurrentPage}
                        />
                        <div style={{ marginLeft: "10px" }}>{this.renderRefetchingSpinner()}</div>
                    </NavbarGroup>
                    <NavbarGroup align={Alignment.RIGHT}>
                        <ButtonGroup>
                            <RealmToggleContainer />
                            <RegionToggleContainer />
                        </ButtonGroup>
                    </NavbarGroup>
                </Navbar>
                <AuctionTableContainer />
                <p style={{ textAlign: "center", margin: "10px auto" }}>
                    Page {currentPage + 1} of {pageCount + 1}
                </p>
                {this.renderAuctionsFooter()}
            </>
        );
    }
}
