import { PriceListsActions, ReceiveDeleteProfessionPricelist } from "@app/actions/price-lists";
import { IPriceListsState } from "@app/types/price-lists";

import { IKindHandlers, Runner } from "./index";

const handlers: IKindHandlers<IPriceListsState, PriceListsActions> = {
    professionpricelist: {
        remove: {
            request: (state: IPriceListsState) => {
                return { ...state };
            },
            response: (state: IPriceListsState, action: ReturnType<typeof ReceiveDeleteProfessionPricelist>) => {
                return { ...state };
            },
        },
    },
};

export const run: Runner<IPriceListsState, PriceListsActions> = (
    state: IPriceListsState,
    action: PriceListsActions,
): IPriceListsState => {
    const [kind, verb, task] = action.type.split("_").map(v => v.toLowerCase());
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
