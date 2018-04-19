import * as React from 'react';
import { ButtonGroup, Spinner, Intent } from '@blueprintjs/core';
import * as ReactPaginate from 'react-paginate';

import RegionToggle from '@app/containers/App/AuctionList/RegionToggle';
import RealmToggle from '@app/containers/App/AuctionList/RealmToggle';
import { Auction, Region, Realm } from '@app/types/global';
import { FetchPingLevel } from '@app/types/main';
import { FetchRegionLevel, FetchRealmLevel, FetchAuctionsLevel } from '@app/types/auction';
import { GetAuctionsOptions } from '@app/api/data';
import { Currency } from '../util/Currency';

export type StateProps = {
  fetchPingLevel: FetchPingLevel
  fetchRegionLevel: FetchRegionLevel
  currentRegion: Region | null
  fetchRealmLevel: FetchRealmLevel
  currentRealm: Realm | null
  fetchAuctionsLevel: FetchAuctionsLevel
  auctions: Auction[]
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
      const shouldRefreshAuctions = fetchAuctionsLevel === FetchAuctionsLevel.initial
        || fetchAuctionsLevel === FetchAuctionsLevel.success
          && this.didRealmChange(prevProps.currentRealm, currentRealm);
      if (shouldRefreshAuctions) {
        this.props.refreshAuctions({
          regionName: currentRegion.name,
          realmSlug: currentRealm.slug,
          page: currentPage,
          count: auctionsPerPage
        });
      }
    }

    const didPageChange = currentPage !== prevProps.currentPage;
    if (currentRegion !== null && currentRealm !== null && didPageChange) {
      this.props.refreshAuctions({
        regionName: currentRegion.name,
        realmSlug: currentRealm.slug,
        page: currentPage,
        count: auctionsPerPage
      });
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

  renderAuction(auction: Auction, index: number) {
    return (
      <tr key={index}>
        <td>{auction.ownerRealm}</td>
        <td>{auction.owner}</td>
        <td>{auction.item}</td>
        <td>{auction.quantity}</td>
        <td><Currency amount={auction.bid} /></td>
        <td><Currency amount={auction.buyout} /></td>
        <td>{auction.aucList.length}</td>
      </tr>
    );
  }

  renderAuctions() {
    const { auctions, totalResults, auctionsPerPage, currentPage } = this.props;

    if (auctions.length === 0) {
      return 'No auctions found!';
    }

    const pageCount = Number((totalResults / auctionsPerPage).toFixed(0));

    return (
      <>
        <ButtonGroup>
          <RealmToggle />
          <RegionToggle />
        </ButtonGroup>
        <table className="pt-html-table">
          <thead>
            <tr>
              <th>Realm</th>
              <th>Owner</th>
              <th>Item</th>
              <th>Quantity</th>
              <th>Bid</th>
              <th>Buyout</th>
              <th>Auctions</th>
            </tr>
          </thead>
          <tbody>
            {auctions.map((auction, index) => this.renderAuction(auction, index))}
          </tbody>
        </table>
        <ReactPaginate
          pageCount={pageCount}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          forcePage={currentPage}
          onPageChange={(v) => {
            console.log(v);
            this.props.setCurrentPage(v.selected);
          }}
          pageLinkClassName="pt-button page-link"
          previousLinkClassName="pt-button next-link"
          nextLinkClassName="pt-button prev-link"
          breakClassName="pt-button pt-disabled"
          containerClassName="pt-button-group paginate-container"
          activeClassName="active-page"
        />
        {this.renderRefetchingSpinner()}
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
