import {
    PriceListsActions,
    ReceiveCreatePricelist,
    ReceiveCreateProfessionPricelist,
    ReceiveDeletePricelist,
    ReceiveDeleteProfessionPricelist,
    ReceiveGetPricelists,
    ReceiveGetProfessionPricelists,
    ReceiveUpdatePricelist,
} from "@app/actions/price-lists";
import { getPricelistIndex, getProfessionPricelistIndex } from "@app/reducers/helper";
import { IProfessionPricelist, ItemsMap } from "@app/types/global";
import {
    DeletePricelistLevel,
    GetPricelistsLevel,
    GetProfessionPricelistsLevel,
    IExpansionProfessionPricelistMap,
    IPricelist,
    IPriceListsState,
    MutatePricelistLevel,
} from "@app/types/price-lists";

import { IKindHandlers, Runner } from "./index";

const handlers: IKindHandlers<IPriceListsState, PriceListsActions> = {
    pricelist: {
        create: {
            receive: (state: IPriceListsState, action: ReturnType<typeof ReceiveCreatePricelist>) => {
                if (action.payload.errors !== null) {
                    return {
                        ...state,
                        createPricelistErrors: action.payload.errors,
                        createPricelistLevel: MutatePricelistLevel.failure,
                    };
                }

                const selectedList: IPricelist = {
                    ...action.payload.data!.pricelist,
                    pricelist_entries: action.payload.data!.entries,
                };

                return {
                    ...state,
                    createPricelistErrors: {},
                    createPricelistLevel: MutatePricelistLevel.success,
                    isAddListDialogOpen: false,
                    pricelists: [...state.pricelists, selectedList],
                    selectedList,
                };
            },
            request: (state: IPriceListsState) => {
                return { ...state, createPricelistLevel: MutatePricelistLevel.fetching };
            },
        },
        delete: {
            receive: (state: IPriceListsState, action: ReturnType<typeof ReceiveDeletePricelist>) => {
                if (action.payload === null) {
                    return { ...state, deletePricelistLevel: DeletePricelistLevel.failure };
                }

                const deletedIndex = getPricelistIndex(state.pricelists, action.payload);
                const pricelists: IPricelist[] = (() => {
                    if (deletedIndex === 0) {
                        return [...state.pricelists.slice(1)];
                    }

                    return [...state.pricelists.slice(0, deletedIndex), ...state.pricelists.slice(deletedIndex + 1)];
                })();
                const selectedList: IPricelist | null = (() => {
                    if (pricelists.length === 0) {
                        return null;
                    }

                    const isLastDeleted = deletedIndex === pricelists.length;
                    return isLastDeleted ? pricelists[deletedIndex - 1] : pricelists[deletedIndex];
                })();

                return {
                    ...state,
                    deletePricelistLevel: DeletePricelistLevel.success,
                    isDeleteListDialogOpen: false,
                    pricelists,
                    selectedList,
                };
            },
            request: (state: IPriceListsState): IPriceListsState => {
                return { ...state, deletePricelistLevel: DeletePricelistLevel.fetching };
            },
        },
        update: {
            receive: (state: IPriceListsState, action: ReturnType<typeof ReceiveUpdatePricelist>) => {
                if (action.payload.response.errors !== null) {
                    return {
                        ...state,
                        updatePricelistErrors: action.payload.response.errors,
                        updatePricelistLevel: MutatePricelistLevel.failure,
                    };
                }

                const replacedIndex = getPricelistIndex(state.pricelists, action.payload.response.data!.pricelist.id);
                const selectedList: IPricelist = {
                    ...action.payload.response.data!.pricelist,
                    pricelist_entries: action.payload.response.data!.entries,
                };
                const pricelists: IPricelist[] = (() => {
                    if (replacedIndex === 0) {
                        return [selectedList, ...state.pricelists.slice(1)];
                    }

                    return [
                        ...state.pricelists.slice(0, replacedIndex),
                        selectedList,
                        ...state.pricelists.slice(replacedIndex + 1),
                    ];
                })();

                return {
                    ...state,
                    ...action.payload.meta,
                    pricelists,
                    selectedList,
                    updatePricelistErrors: {},
                    updatePricelistLevel: MutatePricelistLevel.success,
                };
            },
            request: (state: IPriceListsState) => {
                return { ...state, updatePricelistLevel: MutatePricelistLevel.fetching };
            },
        },
    },
    pricelists: {
        get: {
            receive: (state: IPriceListsState, action: ReturnType<typeof ReceiveGetPricelists>) => {
                const items: ItemsMap = { ...state.items, ...action.payload.items };
                const pricelists = action.payload.pricelists;
                const selectedList: IPricelist | null = (() => {
                    if (pricelists.length === 0) {
                        return null;
                    }

                    return pricelists[0];
                })();

                return {
                    ...state,
                    getPricelistsLevel: GetPricelistsLevel.success,
                    items,
                    pricelists,
                    selectedList,
                };
            },
            request: (state: IPriceListsState) => {
                return { ...state, getPricelistsLevel: GetPricelistsLevel.fetching };
            },
        },
    },
    professionpricelist: {
        create: {
            receive: (state: IPriceListsState, action: ReturnType<typeof ReceiveCreateProfessionPricelist>) => {
                if (action.payload.errors !== null) {
                    return {
                        ...state,
                        createPricelistErrors: action.payload.errors,
                        createPricelistLevel: MutatePricelistLevel.failure,
                    };
                }

                const selectedList: IPricelist = {
                    ...action.payload.data!.pricelist,
                    pricelist_entries: action.payload.data!.entries,
                };
                const professionPricelist: IProfessionPricelist = {
                    ...action.payload.data!.profession_pricelist,
                    pricelist: selectedList,
                };
                const professionPricelists: IExpansionProfessionPricelistMap = (() => {
                    const expansionName = state.selectedExpansion!.name;
                    const result: IProfessionPricelist[] = (() => {
                        if (!(expansionName in state.professionPricelists)) {
                            return [professionPricelist];
                        }

                        return [...state.professionPricelists[expansionName], professionPricelist];
                    })();

                    return {
                        ...state.professionPricelists,
                        [expansionName]: result,
                    };
                })();

                return {
                    ...state,
                    createPricelistErrors: {},
                    createPricelistLevel: MutatePricelistLevel.success,
                    isAddListDialogOpen: false,
                    professionPricelists,
                    selectedList,
                };
            },
            request: (state: IPriceListsState) => {
                return { ...state, createPricelistLevel: MutatePricelistLevel.fetching };
            },
        },
        delete: {
            receive: (state: IPriceListsState, action: ReturnType<typeof ReceiveDeleteProfessionPricelist>) => {
                if (action.payload === null) {
                    return { ...state, deletePricelistLevel: DeletePricelistLevel.failure };
                }

                const expansionName = state.selectedExpansion!.name;
                const prevResult = state.professionPricelists[expansionName];
                const deletedIndex = getProfessionPricelistIndex(prevResult, action.payload);
                const nextResult: IProfessionPricelist[] = (() => {
                    if (deletedIndex === 0) {
                        return [...prevResult.slice(1)];
                    }

                    return [...prevResult.slice(0, deletedIndex), ...prevResult.slice(deletedIndex + 1)];
                })();
                const professionPricelists: IExpansionProfessionPricelistMap = {
                    ...state.professionPricelists,
                    [expansionName]: nextResult,
                };
                const selectedList: IPricelist | null = (() => {
                    if (nextResult.length === 0) {
                        return null;
                    }

                    const isLastDeleted = deletedIndex === nextResult.length;
                    return isLastDeleted
                        ? nextResult[deletedIndex - 1].pricelist!
                        : nextResult[deletedIndex].pricelist!;
                })();

                return {
                    ...state,
                    deletePricelistLevel: DeletePricelistLevel.success,
                    isDeleteListDialogOpen: false,
                    professionPricelists,
                    selectedList,
                };
            },
            request: (state: IPriceListsState) => {
                return { ...state, deletePricelistLevel: DeletePricelistLevel.fetching };
            },
        },
        update: {},
    },
    professionpricelists: {
        get: {
            receive: (state: IPriceListsState) => {
                return {
                    ...state,
                    getProfessionPricelistsLevel: GetProfessionPricelistsLevel.fetching,
                    professionPricelists: {},
                };
            },
            request: (state: IPriceListsState, action: ReturnType<typeof ReceiveGetProfessionPricelists>) => {
                if (action.payload.errors !== null) {
                    return { ...state, getProfessionPricelistsLevel: GetProfessionPricelistsLevel.failure };
                }

                const professionPricelists: IExpansionProfessionPricelistMap = action.payload.data!.profession_pricelists.reduce(
                    (result: IExpansionProfessionPricelistMap, v: IProfessionPricelist) => {
                        if (!(v.expansion in result)) {
                            result[v.expansion] = [];
                        }
                        result[v.expansion].push(v);

                        return result;
                    },
                    {},
                );

                return {
                    ...state,
                    getProfessionPricelistsLevel: GetProfessionPricelistsLevel.success,
                    items: { ...state.items, ...action.payload.data!.items },
                    professionPricelists,
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
