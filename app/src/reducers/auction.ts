import {
    ACTIVESELECT_CHANGE,
    ADD_AUCTIONS_QUERY,
    AuctionActions,
    COUNT_CHANGE,
    PAGE_CHANGE,
    RECEIVE_AUCTIONS,
    RECEIVE_AUCTIONS_QUERY,
    REFRESH_AUCTIONS_QUERY,
    REMOVE_AUCTIONS_QUERY,
    REQUEST_AUCTIONS,
    REQUEST_AUCTIONS_QUERY,
    SORT_CHANGE,
} from "@app/actions/auction";
import { IAuction } from "@app/api-types/auction";
import { defaultAuctionState, IAuctionState } from "@app/types/auction";
import { FetchLevel } from "@app/types/main";

type State = Readonly<IAuctionState>;

export const auction = (state: State | undefined, action: AuctionActions): State => {
    if (state === undefined) {
        return defaultAuctionState;
    }

    switch (action.type) {
        case REQUEST_AUCTIONS:
            const requestFetchAuctionsLevel =
                state.fetchAuctionsLevel === FetchLevel.initial ? FetchLevel.fetching : FetchLevel.refetching;
            return { ...state, fetchAuctionsLevel: requestFetchAuctionsLevel };
        case RECEIVE_AUCTIONS:
            if (action.payload === null) {
                return { ...state, fetchAuctionsLevel: FetchLevel.failure };
            }

            const auctions: IAuction[] = (() => {
                if (action.payload.auctions === null) {
                    return [];
                }

                return action.payload.auctions;
            })();

            return {
                ...state,
                auctions,
                fetchAuctionsLevel: FetchLevel.success,
                items: { ...action.payload.items },
                relatedProfessionPricelists: action.payload.professionPricelists,
                totalResults: action.payload.total,
            };
        case PAGE_CHANGE:
            return { ...state, currentPage: action.payload };
        case COUNT_CHANGE:
            return { ...state, auctionsPerPage: action.payload, currentPage: defaultAuctionState.currentPage };
        case SORT_CHANGE:
            const { sortDirection, sortKind } = action.payload;
            return { ...state, currentPage: defaultAuctionState.currentPage, sortDirection, sortKind };
        case REQUEST_AUCTIONS_QUERY:
            const queryAuctionsLevel =
                state.queryAuctionsLevel === FetchLevel.initial ? FetchLevel.fetching : FetchLevel.refetching;
            return { ...state, queryAuctionsLevel };
        case RECEIVE_AUCTIONS_QUERY:
            if (action.payload === null) {
                return { ...state, queryAuctionsLevel: FetchLevel.failure };
            }

            return {
                ...state,
                queryAuctionResults: action.payload.items,
                queryAuctionsLevel: FetchLevel.success,
            };
        case REFRESH_AUCTIONS_QUERY:
            return {
                ...state,
                queryAuctionResults: action.payload,
            };
        case ADD_AUCTIONS_QUERY:
            return {
                ...state,
                selectedQueryAuctionResults: [...state.selectedQueryAuctionResults, action.payload],
            };
        case REMOVE_AUCTIONS_QUERY:
            const removedSelectedQueryAuctionResults = state.selectedQueryAuctionResults.filter(
                (_result, i) => i !== action.payload,
            );
            return { ...state, selectedQueryAuctionResults: removedSelectedQueryAuctionResults };
        case ACTIVESELECT_CHANGE:
            return { ...state, activeSelect: action.payload };
        default:
            return state;
    }
};
