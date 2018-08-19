import {
    APPEND_ITEMS,
    CHANGE_ENTRY_CREATELEVEL,
    CHANGE_IS_ADD_ENTRY_DIALOG_OPEN,
    CHANGE_IS_ADD_LIST_DIALOG_OPEN,
    CHANGE_IS_DELETE_LIST_DIALOG_OPEN,
    CHANGE_IS_EDIT_LIST_DIALOG_OPEN,
    CHANGE_SELECTED_EXPANSION,
    CHANGE_SELECTED_LIST,
    CHANGE_SELECTED_PROFESSION,
    PriceListsActions,
    RECEIVE_CREATE_PROFESSION_PRICELIST,
    RECEIVE_DELETE_PRICELIST,
    RECEIVE_DELETE_PROFESSION_PRICELIST,
    RECEIVE_GET_PRICELISTS,
    RECEIVE_PROFESSION_PRICELISTS,
    REQUEST_CREATE_PROFESSION_PRICELIST,
    REQUEST_DELETE_PRICELIST,
    REQUEST_DELETE_PROFESSION_PRICELIST,
    REQUEST_GET_PRICELISTS,
    REQUEST_PROFESSION_PRICELISTS,
} from "@app/actions/price-lists";
import { Item } from "@app/types/global";
import {
    defaultPriceListsState,
    DeletePricelistLevel,
    GetPricelistsLevel,
    GetProfessionPricelistsLevel,
    IPricelist,
    IPriceListsState,
    MutatePricelistLevel,
} from "@app/types/price-lists";
import { runners } from "./handlers";
import {
    formatProfessionPricelists,
    getFirstExpansionPricelist,
    getPricelistIndex,
    handleCreateProfessionPricelistSuccess,
    handleDeleteProfessionPricelistSuccess,
} from "./helper";

type State = Readonly<IPriceListsState> | undefined;

export const priceLists = (state: State, action: PriceListsActions): State => {
    if (state === undefined) {
        return defaultPriceListsState;
    }

    switch (action.type) {
        case REQUEST_CREATE_PROFESSION_PRICELIST:
            return { ...state, createPricelistLevel: MutatePricelistLevel.fetching };
        case RECEIVE_CREATE_PROFESSION_PRICELIST:
            if (action.payload.errors !== null) {
                return {
                    ...state,
                    createPricelistErrors: action.payload.errors,
                    createPricelistLevel: MutatePricelistLevel.failure,
                };
            }

            return handleCreateProfessionPricelistSuccess(state, action.payload);
        case REQUEST_DELETE_PRICELIST:
        case REQUEST_DELETE_PROFESSION_PRICELIST:
            return { ...state, deletePricelistLevel: DeletePricelistLevel.fetching };
        case RECEIVE_DELETE_PRICELIST:
            if (action.payload === null) {
                return { ...state, deletePricelistLevel: DeletePricelistLevel.failure };
            }

            const deletedIndex = getPricelistIndex(state.pricelists, action.payload!);

            let onDeletePricelists = [
                ...state.pricelists.slice(0, deletedIndex),
                ...state.pricelists.slice(deletedIndex + 1),
            ];
            if (deletedIndex === 0) {
                onDeletePricelists = [...state.pricelists.slice(1)];
            }

            let onDeleteSelectedList: IPricelist | null = null;
            if (onDeletePricelists.length > 0) {
                const isLastDeleted = deletedIndex === onDeletePricelists.length;
                onDeleteSelectedList = isLastDeleted
                    ? onDeletePricelists[deletedIndex - 1]
                    : onDeletePricelists[deletedIndex];
            }

            return {
                ...state,
                deletePricelistLevel: DeletePricelistLevel.success,
                isDeleteListDialogOpen: false,
                pricelists: onDeletePricelists,
                selectedList: onDeleteSelectedList,
            };
        case RECEIVE_DELETE_PROFESSION_PRICELIST:
            if (action.payload === null) {
                return { ...state, deletePricelistLevel: DeletePricelistLevel.failure };
            }

            return handleDeleteProfessionPricelistSuccess(state, action.payload);
        case REQUEST_GET_PRICELISTS:
            return {
                ...state,
                getPricelistsLevel: GetPricelistsLevel.fetching,
            };
        case RECEIVE_GET_PRICELISTS:
            let receivedSelectedList: IPricelist | null = null;
            if (Object.keys(action.payload.pricelists).length > 0) {
                receivedSelectedList = action.payload.pricelists[Object.keys(action.payload.pricelists)[0]];
            }

            return {
                ...state,
                getPricelistsLevel: GetPricelistsLevel.success,
                items: { ...state.items, ...action.payload.items },
                pricelists: action.payload.pricelists,
                selectedList: receivedSelectedList,
            };
        case CHANGE_ENTRY_CREATELEVEL:
            return { ...state, entryCreateLevel: action.payload };
        case CHANGE_SELECTED_LIST:
            let isProfessionPricelist = false;
            for (const expansionName of Object.keys(state.professionPricelists)) {
                for (const v of state.professionPricelists[expansionName]) {
                    if (v.pricelist_id === action.payload.id) {
                        isProfessionPricelist = true;

                        break;
                    }
                }
            }

            return {
                ...state,
                selectedList: action.payload,
                selectedProfession: isProfessionPricelist ? state.selectedProfession : null,
            };
        case CHANGE_SELECTED_PROFESSION:
            return { ...state, selectedProfession: action.payload };
        case CHANGE_IS_ADD_LIST_DIALOG_OPEN:
            return { ...state, isAddListDialogOpen: action.payload };
        case CHANGE_IS_EDIT_LIST_DIALOG_OPEN:
            return { ...state, isEditListDialogOpen: action.payload };
        case CHANGE_IS_DELETE_LIST_DIALOG_OPEN:
            return { ...state, isDeleteListDialogOpen: action.payload };
        case CHANGE_IS_ADD_ENTRY_DIALOG_OPEN:
            return { ...state, isAddEntryDialogOpen: action.payload };
        case APPEND_ITEMS:
            const appendingItems = { ...state.items };
            for (const itemId of Object.keys(action.payload)) {
                const item: Item = action.payload[itemId];
                appendingItems[item.id] = item;
            }

            return { ...state, items: appendingItems };
        case REQUEST_PROFESSION_PRICELISTS:
            return {
                ...state,
                getProfessionPricelistsLevel: GetProfessionPricelistsLevel.fetching,
                professionPricelists: {},
            };
        case RECEIVE_PROFESSION_PRICELISTS:
            if (action.payload.errors !== null) {
                return { ...state, getProfessionPricelistsLevel: GetProfessionPricelistsLevel.failure };
            }

            return {
                ...state,
                getProfessionPricelistsLevel: GetProfessionPricelistsLevel.success,
                items: { ...state.items, ...action.payload.data!.items },
                professionPricelists: formatProfessionPricelists(action.payload.data!.profession_pricelists),
            };
        case CHANGE_SELECTED_EXPANSION:
            let expansionSelectedList: IPricelist | null = null;
            if (action.payload.jumpTo) {
                expansionSelectedList = action.payload.jumpTo;
            } else {
                expansionSelectedList =
                    getFirstExpansionPricelist(action.payload.expansion, state.professionPricelists) ||
                    state.selectedList;
            }

            return {
                ...state,
                selectedExpansion: action.payload.expansion,
                selectedList: expansionSelectedList,
            };
        default:
            return runners.pricelist(state, action);
    }
};
