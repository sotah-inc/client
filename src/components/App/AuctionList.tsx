import * as React from 'react';
import { ButtonGroup, Spinner, Intent, Navbar, NavbarGroup, Alignment, NavbarDivider } from '@blueprintjs/core';

import RegionToggle from '@app/containers/App/AuctionList/RegionToggle';
import RealmToggle from '@app/containers/App/AuctionList/RealmToggle';
import CountToggle from '@app/containers/App/AuctionList/CountToggle';
import { Auction, Region, Realm } from '@app/types/global';
import { FetchPingLevel } from '@app/types/main';
import { FetchRegionLevel, FetchRealmLevel, FetchAuctionsLevel } from '@app/types/auction';
import { GetAuctionsOptions } from '@app/api/data';
import { Currency, Pagination } from '../util';

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
};

export type DispatchProps = {
  refreshRegions: () => void
  refreshRealms: (region: Region) => void
  refreshAuctions: (opts: GetAuctionsOptions) => void
  setCurrentPage: (page: number) => void
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

    if (prevRealm.slug === currentRealm.slug) {
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
      auctionsPerPage
    } = this.props;

    if (currentRegion !== null) {
      const shouldRefreshRealms = fetchRealmLevel === FetchRealmLevel.initial
        || fetchRealmLevel === FetchRealmLevel.success
        && this.didRegionChange(prevProps.currentRegion, currentRegion);
      if (shouldRefreshRealms) {
        this.props.refreshRealms(currentRegion);

        return;
      }
    }

    if (currentRegion !== null && currentRealm !== null) {
      const didPageChange = currentPage !== prevProps.currentPage;
      const didCountChange = auctionsPerPage !== prevProps.auctionsPerPage;
      const shouldRefreshAuctions = fetchAuctionsLevel === FetchAuctionsLevel.initial
        || fetchAuctionsLevel === FetchAuctionsLevel.success
        && (this.didRealmChange(prevProps.currentRealm, currentRealm)
          || didPageChange
          || didCountChange);
      if (shouldRefreshAuctions) {
        this.props.refreshAuctions({
          regionName: currentRegion.name,
          realmSlug: currentRealm.slug,
          page: currentPage,
          count: auctionsPerPage
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

  renderAuction(auction: Auction | null, index: number) {
    if (auction === null) {
      return (
        <tr key={index}>
          <td>---</td>
          <td>---</td>
          <td>---</td>
          <td>---</td>
          <td>---</td>
          <td>---</td>
        </tr>
      );
    }

    return (
      <tr key={index}>
        <td>{auction.item}</td>
        <td>{auction.quantity}</td>
        <td><Currency amount={auction.bid} /></td>
        <td><Currency amount={auction.buyout} /></td>
        <td>{auction.aucList.length}</td>
        <td>{auction.owner}</td>
      </tr>
    );
  }

  renderAuctions() {
    const { auctions, totalResults, auctionsPerPage, currentPage } = this.props;

    if (auctions.length === 0) {
      return 'No auctions found!';
    }

    if (auctions.length < auctionsPerPage) {
      for (let i = auctions.length; i < auctionsPerPage; i++) {
        auctions[i] = null;
      }
    }

    let pageCount = (totalResults / auctionsPerPage) - 1;
    const remainder = totalResults % auctionsPerPage;
    if (remainder > 0) {
      pageCount = (totalResults - remainder) / auctionsPerPage;
    }

    return (
      <>
        <Navbar>
          <NavbarGroup align={Alignment.LEFT}>
            <CountToggle/>
            <NavbarDivider/>
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
        <table className="pt-html-table pt-html-table-bordered auction-list">
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Bid</th>
              <th>Buyout</th>
              <th>Auctions</th>
              <th>Owner</th>
            </tr>
          </thead>
          <tbody>
            {auctions.map((auction, index) => this.renderAuction(auction, index))}
          </tbody>
        </table>
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
