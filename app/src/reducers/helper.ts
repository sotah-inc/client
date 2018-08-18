import { ICreateProfessionPricelistResponse } from "@app/api/price-lists";
import { IExpansion, IProfessionPricelist } from "@app/types/global";
import {
    IExpansionProfessionPricelistMap,
    IPricelist,
    IPriceListsState,
    MutatePricelistLevel,
} from "@app/types/price-lists";

export const getPricelistIndex = (pricelists: IPricelist[], id: number): number => {
    for (let i = 0; i < pricelists.length; i++) {
        const pricelist = pricelists[i];
        if (pricelist.id === id) {
            return i;
        }
    }

    return -1;
};

export const formatProfessionPricelists = (
    professionPricelists: IProfessionPricelist[],
): IExpansionProfessionPricelistMap => {
    return professionPricelists.reduce((result: IExpansionProfessionPricelistMap, v: IProfessionPricelist) => {
        if (!(v.expansion in result)) {
            result[v.expansion] = [];
        }

        result[v.expansion].push(v);

        return result;
    }, {});
};

export const getFirstExpansionPricelist = (
    expansion: IExpansion,
    pricelistMap: IExpansionProfessionPricelistMap,
): IPricelist | null => {
    if (!(expansion.name in pricelistMap)) {
        return null;
    }

    return pricelistMap[expansion.name][0].pricelist!;
};

export const handleCreateProfessionPricelistSuccess = (
    state: IPriceListsState,
    payload: ICreateProfessionPricelistResponse,
): IPriceListsState => {
    const { selectedExpansion } = state;

    const professionPricelist = {
        ...payload.data!.profession_pricelist,
        pricelist: { ...payload.data!.pricelist, pricelist_entries: payload.data!.entries },
    };

    const professionPricelists = { ...state.professionPricelists };
    if (selectedExpansion !== null) {
        if (selectedExpansion.name in professionPricelists) {
            professionPricelists[selectedExpansion.name].push(professionPricelist);
        } else {
            professionPricelists[selectedExpansion.name] = [professionPricelist];
        }
    }

    return {
        ...state,
        createPricelistErrors: {},
        createPricelistLevel: MutatePricelistLevel.success,
        isAddListDialogOpen: false,
        professionPricelists,
    };
};
