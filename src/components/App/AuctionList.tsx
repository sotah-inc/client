import * as React from 'react';
import { ButtonGroup, Spinner, Intent, Navbar, NavbarGroup, Alignment, NavbarDivider } from '@blueprintjs/core';

import RegionToggle from '@app/containers/App/AuctionList/RegionToggle';
import RealmToggle from '@app/containers/App/AuctionList/RealmToggle';
import CountToggle from '@app/containers/App/AuctionList/CountToggle';
import QueryAuctionsFilter from '@app/containers/App/AuctionList/QueryAuctionsFilter';
import AuctionTable from '@app/containers/App/AuctionList/AuctionTable';
import { Auction, Region, Realm, OwnerName, ItemId } from '@app/types/global';
import { FetchPingLevel } from '@app/types/main';
import {
  FetchRegionLevel,
  FetchRealmLevel,
  FetchAuctionsLevel,
  SortKind,
  SortDirection,
  QueryAuctionsLevel,
  QueryAuctionResult,
  FetchItemClassesLevel
} from '@app/types/auction';
import { GetAuctionsOptions, QueryAuctionsOptions } from '@app/api/data';
import { Pagination } from '../util';

type ListAuction = Auction | null;

export type StateProps = {
  fetchPingLevel: FetchPingLevel
  fetchRegionLevel: FetchRegionLevel
  currentRegion: Region | null
  fetchRealmLevel: FetchRealmLevel
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
};

export type DispatchProps = {
  refreshRegions: () => void
  refreshRealms: (region: Region) => void
  refreshAuctions: (opts: GetAuctionsOptions) => void
  setCurrentPage: (page: number) => void
  refreshAuctionsQuery: (opts: QueryAuctionsOptions) => void
  refreshItemClasses: () => void
};

export type OwnProps = {};

type Props = Readonly<StateProps & DispatchProps & OwnProps>;

export class AuctionList extends React.Component<Props> {
  didRegionChange(prevRegion: Region | null, currentRegion: Region): boolean {
    if (prevRegion === null) {
      return true;
    }

    if (prevRegion.name === currentRegion.name) {
      return false;
    }

    return true;
  }

  didRealmChange(prevRealm: Realm | null, currentRealm: Realm): boolean {
    if (prevRealm === null) {
      return true;
    }

    if (prevRealm.regionName === currentRealm.regionName && prevRealm.slug === currentRealm.slug) {
      return false;
    }

    return true;
  }

  componentDidMount() {
    const {
      fetchPingLevel,
      fetchRegionLevel
    } = this.props;

    if (fetchPingLevel === FetchPingLevel.success && fetchRegionLevel === FetchRegionLevel.initial) {
      this.props.refreshRegions();

      return;
    }
  }

  componentDidUpdate(prevProps: Props) {
    const {
      fetchRealmLevel,
      fetchAuctionsLevel,
      currentRegion,
      currentRealm,
      currentPage,
      auctionsPerPage,
      sortDirection,
      sortKind,
      selectedQueryAuctionResults,
      fetchItemClassesLevel
    } = this.props;

    if (currentRegion !== null) {
      const shouldRefreshRealms = fetchRealmLevel === FetchRealmLevel.initial
        || fetchRealmLevel === FetchRealmLevel.success
        && this.didRegionChange(prevProps.currentRegion, currentRegion);
      if (shouldRefreshRealms) {
        this.props.refreshRealms(currentRegion);
      }
    }

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
      const shouldRefreshAuctions = fetchAuctionsLevel === FetchAuctionsLevel.initial
        || fetchAuctionsLevel === FetchAuctionsLevel.success
        && (this.didRealmChange(prevProps.currentRealm, currentRealm)
          || didPageChange
          || didCountChange
          || didSortChange
          || didSqaResultsChange);

      if (shouldRefreshAuctions) {
        const ownerFilters: OwnerName[] = selectedQueryAuctionResults
          .filter((v) => v.owner.name !== '')
          .map((v) => v.owner.name);
        const itemFilters: ItemId[] = selectedQueryAuctionResults
          .filter((v) => v.item.name !== '')
          .map((v) => v.item.id);
        this.props.refreshAuctions({
          regionName: currentRegion.name,
          realmSlug: currentRealm.slug,
          page: currentPage,
          count: auctionsPerPage,
          sortDirection, sortKind,
          ownerFilters, itemFilters
        });
      }

      const shouldRefreshAuctionsQuery = this.didRealmChange(prevProps.currentRealm, currentRealm);
      if (shouldRefreshAuctionsQuery) {
        this.props.refreshAuctionsQuery({
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
