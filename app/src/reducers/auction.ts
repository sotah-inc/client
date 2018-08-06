import {
    ADD_AUCTIONS_QUERY,
    AuctionActions,
    COUNT_CHANGE,
    PAGE_CHANGE,
    RECEIVE_AUCTIONS,
    RECEIVE_AUCTIONS_QUERY,
    RECEIVE_ITEMCLASSES,
    REMOVE_AUCTIONS_QUERY,
    REQUEST_AUCTIONS,
    REQUEST_AUCTIONS_QUERY,
    REQUEST_ITEMCLASSES,
    SORT_CHANGE,
} from "@app/actions/auction";
import {
    defaultAuctionState,
    FetchAuctionsLevel,
    FetchItemClassesLevel,
    IAuctionState,
    QueryAuctionsLevel,
} from "@app/types/auction";
import { IAuction, ISubItemClasses, ItemClasses } from "@app/types/global";

type State = Readonly<IAuctionState> | undefined;

export const auction = (state: State, action: AuctionActions): State => {
    if (state === undefined) {
        return defaultAuctionState;
    }

    switch (action.type) {
        case REQUEST_AUCTIONS:
            const requestFetchAuctionsLevel =
                state.fetchAuctionsLevel === FetchAuctionsLevel.initial
                    ? FetchAuctionsLevel.fetching
                    : FetchAuctionsLevel.refetching;
            return { ...state, fetchAuctionsLevel: requestFetchAuctionsLevel };
        case RECEIVE_AUCTIONS:
            if (action.payload === null) {
                return { ...state, fetchAuctionsLevel: FetchAuctionsLevel.failure };
            }

            let auctions: IAuction[] = [];
            if (action.payload.auctions !== null) {
                auctions = action.payload.auctions;
            }

            return {
                ...state,
                auctions,
                fetchAuctionsLevel: FetchAuctionsLevel.success,
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
                state.queryAuctionsLevel === QueryAuctionsLevel.initial
                    ? QueryAuctionsLevel.fetching
                    : QueryAuctionsLevel.refetching;
            return { ...state, queryAuctionsLevel };
        case RECEIVE_AUCTIONS_QUERY:
            if (action.payload === null) {
                return { ...state, queryAuctionsLevel: QueryAuctionsLevel.failure };
            }

            return {
                ...state,
                queryAuctionResults: action.payload.items,
                queryAuctionsLevel: QueryAuctionsLevel.success,
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
        case REQUEST_ITEMCLASSES:
            return { ...state, fetchItemClassesLevel: FetchItemClassesLevel.fetching };
        case RECEIVE_ITEMCLASSES:
            if (action.payload === null || action.payload.classes === null) {
                return { ...state, fetchItemClassesLevel: FetchItemClassesLevel.failure };
            }

            const itemClasses: ItemClasses = {};
            for (const itemClass of action.payload.classes) {
                const subClasses: ISubItemClasses = {};
                for (const subItemClass of itemClass.subclasses) {
                    subClasses[subItemClass.subclass] = subItemClass;
                }
                itemClasses[itemClass.class] = {
                    class: itemClass.class,
                    name: itemClass.name,
                    subClasses,
                };
            }

            return { ...state, fetchItemClassesLevel: FetchItemClassesLevel.success, itemClasses };
        default:
            return state;
    }
};
