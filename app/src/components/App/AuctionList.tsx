import {
    Alignment,
    ButtonGroup,
    Classes,
    Intent,
    Navbar,
    NavbarDivider,
    NavbarGroup,
    NonIdealState,
    Spinner,
} from "@blueprintjs/core";
import * as React from "react";

import { IGetAuctionsOptions, IQueryAuctionsOptions } from "@app/api/data";
import { LastModified, Pagination } from "@app/components/util";
import { AuctionTableContainer } from "@app/containers/App/AuctionList/AuctionTable";
import { CountToggleContainer } from "@app/containers/App/AuctionList/CountToggle";
import { QueryAuctionsFilterContainer } from "@app/containers/App/AuctionList/QueryAuctionsFilter";
import { RealmToggleContainer } from "@app/containers/util/RealmToggle";
import { RegionToggleContainer } from "@app/containers/util/RegionToggle";
import {
    FetchAuctionsLevel,
    FetchItemClassesLevel,
    IQueryAuctionResult,
    QueryAuctionsLevel,
    SortDirection,
    SortKind,
} from "@app/types/auction";
import { IAuction, IRealm, IRegion, ItemId, IUserPreferences, OwnerName } from "@app/types/global";
import { AuthLevel, FetchUserPreferencesLevel } from "@app/types/main";
import { didRealmChange } from "@app/util";

type ListAuction = IAuction | null;

export interface IStateProps {
    currentRegion: IRegion | null;
    currentRealm: IRealm | null;
    fetchAuctionsLevel: FetchAuctionsLevel;
    auctions: ListAuction[];
    currentPage: number;
    auctionsPerPage: number;
    totalResults: number;
    sortKind: SortKind;
    sortDirection: SortDirection;
    queryAuctionsLevel: QueryAuctionsLevel;
    selectedQueryAuctionResults: IQueryAuctionResult[];
    fetchItemClassesLevel: FetchItemClassesLevel;
    authLevel: AuthLevel;
    fetchUserPreferencesLevel: FetchUserPreferencesLevel;
    userPreferences: IUserPreferences | null;
}

export interface IDispatchProps {
    refreshAuctions: (opts: IGetAuctionsOptions) => void;
    setCurrentPage: (page: number) => void;
    refreshAuctionsQuery: (opts: IQueryAuctionsOptions) => void;
    refreshItemClasses: () => void;
}

type Props = Readonly<IStateProps & IDispatchProps>;

export class AuctionList extends React.Component<Props> {
    public componentDidMount() {
        const { fetchAuctionsLevel, refreshAuctionsQuery, currentRegion, currentRealm } = this.props;

        if (fetchAuctionsLevel === FetchAuctionsLevel.initial) {
            if (currentRegion !== null && currentRealm !== null) {
                this.refreshAuctions();
                refreshAuctionsQuery({
                    query: "",
                    realmSlug: currentRealm.slug,
                    regionName: currentRegion.name,
                });
            }
        }
    }

    public componentDidUpdate(prevProps: Props) {
        const {
            fetchAuctionsLevel,
            currentRegion,
            currentRealm,
            currentPage,
            auctionsPerPage,
            sortDirection,
            selectedQueryAuctionResults,
            fetchItemClassesLevel,
            refreshAuctionsQuery,
            authLevel,
            fetchUserPreferencesLevel,
        } = this.props;

        if (fetchItemClassesLevel === FetchItemClassesLevel.initial) {
            this.props.refreshItemClasses();
        }

        if (currentRegion !== null && currentRealm !== null) {
            const didPageChange = currentPage !== prevProps.currentPage;
            const didCountChange = auctionsPerPage !== prevProps.auctionsPerPage;
            const didSortChange =
                prevProps.sortDirection !== sortDirection || prevProps.sortKind !== this.props.sortKind;
            const didSqaResultsChange =
                prevProps.selectedQueryAuctionResults.length !== selectedQueryAuctionResults.length;
            const didOptionsChange =
                didRealmChange(prevProps.currentRealm, currentRealm) ||
                didPageChange ||
                didCountChange ||
                didSortChange ||
                didSqaResultsChange;
            const shouldRefreshAuctions =
                fetchAuctionsLevel === FetchAuctionsLevel.initial ||
                (fetchAuctionsLevel === FetchAuctionsLevel.success && didOptionsChange);

            if (shouldRefreshAuctions) {
                if (authLevel === AuthLevel.unauthenticated) {
                    this.refreshAuctions();
                } else if (authLevel === AuthLevel.authenticated) {
                    if (fetchUserPreferencesLevel === FetchUserPreferencesLevel.success) {
                        this.refreshAuctions();
                    }
                }
            }

            const shouldRefreshAuctionsQuery = didRealmChange(prevProps.currentRealm, currentRealm);
            if (shouldRefreshAuctionsQuery) {
                refreshAuctionsQuery({
                    query: "",
                    realmSlug: currentRealm.slug,
                    regionName: currentRegion.name,
                });
            }
        }
    }

    public render() {
        switch (this.props.fetchAuctionsLevel) {
            case FetchAuctionsLevel.initial:
                return (
                    <NonIdealState
                        title="Loading"
                        icon={<Spinner className={Classes.LARGE} intent={Intent.NONE} value={0} />}
                    />
                );
            case FetchAuctionsLevel.fetching:
                return (
                    <NonIdealState
                        title="Loading"
                        icon={<Spinner className={Classes.LARGE} intent={Intent.PRIMARY} />}
                    />
                );
            case FetchAuctionsLevel.failure:
                return (
                    <NonIdealState
                        title="Fetch auctions failure"
                        description="Auctions could not be fetched"
                        icon="error"
                    />
                );
            case FetchAuctionsLevel.refetching:
            case FetchAuctionsLevel.success:
                return this.renderAuctions();
            default:
                return <>You should never see this!</>;
        }
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
            .filter(v => v.owner.name !== "")
            .map(v => v.owner.name);
        const itemFilters: ItemId[] = selectedQueryAuctionResults.filter(v => v.item.name !== "").map(v => v.item.id);
        refreshAuctions({
            count: auctionsPerPage,
            itemFilters,
            ownerFilters,
            page: currentPage,
            realmSlug: currentRealm.slug,
            regionName: currentRegion.name,
            sortDirection,
            sortKind,
        });
    }

    private renderRefetchingSpinner() {
        const { fetchAuctionsLevel } = this.props;
        if (fetchAuctionsLevel !== FetchAuctionsLevel.refetching) {
            return null;
        }

        return <Spinner className={Classes.SMALL} intent={Intent.PRIMARY} />;
    }

    private renderAuctionsFooter() {
        const { currentPage, currentRealm } = this.props;
        const pageCount = this.getPageCount();

        return (
            <>
                <p style={{ textAlign: "center" }}>
                    Page {currentPage + 1} of {pageCount + 1}
                </p>
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
                        {this.renderRefetchingSpinner()}
                    </NavbarGroup>
                    <NavbarGroup align={Alignment.RIGHT}>
                        <ButtonGroup>
                            <RealmToggleContainer />
                            <RegionToggleContainer />
                        </ButtonGroup>
                    </NavbarGroup>
                </Navbar>
                <AuctionTableContainer />
                {this.renderAuctionsFooter()}
            </>
        );
    }
}
