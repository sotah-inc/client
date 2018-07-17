import * as React from 'react';
import { ButtonGroup, Spinner, Intent, Navbar, NavbarGroup, Alignment, NavbarDivider } from '@blueprintjs/core';

import RegionToggle from '@app/containers/util/RegionToggle';
import RealmToggle from '@app/containers/util/RealmToggle';
import CountToggle from '@app/containers/App/AuctionList/CountToggle';
import QueryAuctionsFilter from '@app/containers/App/AuctionList/QueryAuctionsFilter';
import AuctionTable from '@app/containers/App/AuctionList/AuctionTable';
import { Auction, Region, Realm, OwnerName, ItemId, UserPreferences } from '@app/types/global';
import { AuthLevel, FetchUserPreferencesLevel } from '@app/types/main';
import {
  FetchAuctionsLevel,
  SortKind,
  SortDirection,
  QueryAuctionsLevel,
  QueryAuctionResult,
  FetchItemClassesLevel
} from '@app/types/auction';
import { GetAuctionsOptions, QueryAuctionsOptions } from '@app/api/data';
import { Pagination } from '@app/components/util';
import { didRealmChange } from '@app/util';

type ListAuction = Auction | null;

export type StateProps = {
  currentRegion: Region | null
  currentRealm: Realm | null
  fetchAuctionsLevel: FetchAuctionsLevel
  auctions: ListAuction[]
  currentPage: number
  auctionsPerPage: number
  totalResults: number
  sortKind: SortKind
  sortDirection: SortDirection
  queryAuctionsLevel: QueryAuctionsLevel
  selectedQueryAuctionResults: QueryAuctionResult[]
  fetchItemClassesLevel: FetchItemClassesLevel
  authLevel: AuthLevel
  fetchUserPreferencesLevel: FetchUserPreferencesLevel
  userPreferences: UserPreferences | null
};

export type DispatchProps = {
  refreshAuctions: (opts: GetAuctionsOptions) => void
  setCurrentPage: (page: number) => void
  refreshAuctionsQuery: (opts: QueryAuctionsOptions) => void
  refreshItemClasses: () => void
};

export type OwnProps = {};

type Props = Readonly<StateProps & DispatchProps & OwnProps>;

export class AuctionList extends React.Component<Props> {
  componentDidMount() {
    const { fetchAuctionsLevel, refreshAuctionsQuery, currentRegion, currentRealm } = this.props;

    if (fetchAuctionsLevel === FetchAuctionsLevel.initial) {
      if (currentRegion !== null && currentRealm !== null) {
        this.refreshAuctions();
        refreshAuctionsQuery({
          regionName: currentRegion.name,
          realmSlug: currentRealm.slug,
          query: ''
        });
      }
    }
  }

  refreshAuctions() {
    const {
      currentRegion,
      currentRealm,
      currentPage,
      auctionsPerPage,
      sortDirection,
      sortKind,
      selectedQueryAuctionResults,
      refreshAuctions
    } = this.props;

    if (currentRegion === null || currentRealm === null) {
      return;
    }

    const ownerFilters: OwnerName[] = selectedQueryAuctionResults
      .filter((v) => v.owner.name !== '')
      .map((v) => v.owner.name);
    const itemFilters: ItemId[] = selectedQueryAuctionResults
      .filter((v) => v.item.name !== '')
      .map((v) => v.item.id);
    refreshAuctions({
      regionName: currentRegion.name,
      realmSlug: currentRealm.slug,
      page: currentPage,
      count: auctionsPerPage,
      sortDirection, sortKind,
      ownerFilters, itemFilters
    });
  }

  componentDidUpdate(prevProps: Props) {
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
      fetchUserPreferencesLevel
    } = this.props;

    if (fetchItemClassesLevel === FetchItemClassesLevel.initial) {
      this.props.refreshItemClasses();
    }

    if (currentRegion !== null && currentRealm !== null) {
      const didPageChange = currentPage !== prevProps.currentPage;
      const didCountChange = auctionsPerPage !== prevProps.auctionsPerPage;
      const didSortChange = prevProps.sortDirection !== sortDirection
        || prevProps.sortKind !== this.props.sortKind;
      const didSqaResultsChange = prevProps.selectedQueryAuctionResults.length
        !== selectedQueryAuctionResults.length;
      const didOptionsChange = didRealmChange(prevProps.currentRealm, currentRealm)
        || didPageChange
        || didCountChange
        || didSortChange
        || didSqaResultsChange;
      const shouldRefreshAuctions = fetchAuctionsLevel === FetchAuctionsLevel.initial
        || fetchAuctionsLevel === FetchAuctionsLevel.success
        && didOptionsChange;

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
          regionName: currentRegion.name,
          realmSlug: currentRealm.slug,
          query: ''
        });
      }
    }
  }

  renderRefetchingSpinner() {
    const { fetchAuctionsLevel } = this.props;
    if (fetchAuctionsLevel !== FetchAuctionsLevel.refetching) {
      return null;
    }

    return (
      <Spinner className="pt-small" intent={Intent.PRIMARY} />
    );
  }

  renderAuctionsFooter() {
    const { currentPage } = this.props;
    const pageCount = this.getPageCount();

    return (
      <p style={{textAlign: 'center'}}>Page {currentPage + 1} of {pageCount + 1}</p>
    );
  }

  getPageCount() {
    const { totalResults, auctionsPerPage } = this.props;

    let pageCount = 0;
    if (totalResults > 0) {
      pageCount = (totalResults / auctionsPerPage) - 1;
      const remainder = totalResults % auctionsPerPage;
      if (remainder > 0) {
        pageCount = (totalResults - remainder) / auctionsPerPage;
      }
    }

    return pageCount;
  }

  renderAuctions() {
    const { auctions, totalResults, auctionsPerPage, currentPage } = this.props;

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
        <QueryAuctionsFilter />
        <Navbar>
          <NavbarGroup align={Alignment.LEFT}>
            <CountToggle />
            <NavbarDivider />
            <Pagination
              pageCount={pageCount}
              currentPage={currentPage}
              pagesShown={5}
              onPageChange={(page) => this.props.setCurrentPage(page)}
            />
            {this.renderRefetchingSpinner()}
          </NavbarGroup>
          <NavbarGroup align={Alignment.RIGHT}>
            <ButtonGroup>
              <RealmToggle />
              <RegionToggle />
            </ButtonGroup>
          </NavbarGroup>
        </Navbar>
        <AuctionTable />
        {this.renderAuctionsFooter()}
      </>
    );
  }

  render() {
    switch (this.props.fetchAuctionsLevel) {
      case FetchAuctionsLevel.initial:
      case FetchAuctionsLevel.fetching:
        return <>Loading...</>;
      case FetchAuctionsLevel.failure:
        return <>Could not fetch auctions!</>;
      case FetchAuctionsLevel.refetching:
      case FetchAuctionsLevel.success:
        return this.renderAuctions();
      default:
        return <>You should never see this!</>;
    }
  }
}
