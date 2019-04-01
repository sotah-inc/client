import {
    APPEND_ITEMS,
    CHANGE_ENTRY_CREATELEVEL,
    CHANGE_IS_ADD_ENTRY_DIALOG_OPEN,
    CHANGE_IS_ADD_LIST_DIALOG_OPEN,
    CHANGE_IS_DELETE_LIST_DIALOG_OPEN,
    CHANGE_IS_EDIT_LIST_DIALOG_OPEN,
    CHANGE_SELECTED_LIST,
    CHANGE_SELECTED_PROFESSION,
    NAVIGATE_PROFESSIONNODE,
    PriceListsActions,
    RESET_PROFESSIONS_SELECTIONS,
} from "@app/actions/price-lists";
import { IItem } from "@app/api-types/item";
import { defaultPriceListsState, IPriceListsState } from "@app/types/price-lists";
import { runners } from "./handlers";

type State = Readonly<IPriceListsState>;

export const priceLists = (state: State | undefined, action: PriceListsActions): State => {
    if (state === undefined) {
        return defaultPriceListsState;
    }

    switch (action.type) {
        case NAVIGATE_PROFESSIONNODE:
            return {
                ...state,
                selectedExpansion: action.payload.expansion,
                selectedList: action.payload.pricelist,
                selectedProfession: action.payload.profession,
            };
        case CHANGE_ENTRY_CREATELEVEL:
            return { ...state, entryCreateLevel: action.payload };
        case CHANGE_SELECTED_LIST:
            const isProfessionPricelist: boolean = (() => {
                for (const expansionName of Object.keys(state.professionPricelists)) {
                    for (const v of state.professionPricelists[expansionName]) {
                        if (v.pricelist.id === action.payload.id) {
                            return true;
                        }
                    }
                }

                return false;
            })();

            return {
                ...state,
                selectedExpansion: isProfessionPricelist ? state.selectedExpansion : null,
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
                const item: IItem = action.payload[itemId];
                appendingItems[item.id] = item;
            }

            return { ...state, items: appendingItems };
        case RESET_PROFESSIONS_SELECTIONS:
            return { ...state, selectedProfession: null, selectedExpansion: null, selectedList: null };
        default:
            return runners.pricelist(state, action);
    }
};
