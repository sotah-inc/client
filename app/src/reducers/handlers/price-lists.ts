import { PriceListsActions, ReceiveCreateProfessionPricelist } from "@app/actions/price-lists";
import { IPricelist, IPriceListsState, MutatePricelistLevel } from "@app/types/price-lists";

import { IKindHandlers, Runner } from "./index";

const handlers: IKindHandlers<IPriceListsState, PriceListsActions> = {
    pricelist: {
        create: {
            request: (state: IPriceListsState) => {
                return { ...state, createPricelistLevel: MutatePricelistLevel.fetching };
            },
            response: (state: IPriceListsState, action: ReturnType<typeof ReceiveCreateProfessionPricelist>) => {
                if (action.payload.errors !== null) {
                    return {
                        ...state,
                        createPricelistErrors: action.payload.errors,
                        createPricelistLevel: MutatePricelistLevel.failure,
                    };
                }

                const nextSelectedPricelist: IPricelist = {
                    ...action.payload.data!.pricelist,
                    pricelist_entries: action.payload.data!.entries,
                };
                const nextPricelists = [...state.pricelists, nextSelectedPricelist];

                return {
                    ...state,
                    createPricelistErrors: {},
                    createPricelistLevel: MutatePricelistLevel.success,
                    isAddListDialogOpen: false,
                    pricelists: nextPricelists,
                    selectedList: nextSelectedPricelist,
                };
            },
        },
    },
};

export const run: Runner<IPriceListsState, PriceListsActions> = (
    state: IPriceListsState,
    action: PriceListsActions,
): IPriceListsState => {
    const [kind, verb, task] = action.type
        .split("_")
        .reverse()
        .map(v => v.toLowerCase());
    if (!(kind in handlers)) {
        return state;
    }
    const kindHandlers = handlers[kind];

    if (!(verb in kindHandlers)) {
        return state;
    }
    const verbHandlers = kindHandlers[verb];

    if (!(task in verbHandlers)) {
        return state;
    }
    const taskHandler = verbHandlers[task];

    return taskHandler(state, action);
};
