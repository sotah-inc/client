import { IExpansion, IProfessionPricelist } from "@app/types/global";
import { IExpansionProfessionPricelistMap, IPricelist, IPriceListsState } from "@app/types/price-lists";

export const getPricelistIndex = (pricelists: IPricelist[], id: number): number => {
    for (let i = 0; i < pricelists.length; i++) {
        const pricelist = pricelists[i];
        if (pricelist.id === id) {
            return i;
        }
    }

    return -1;
};

export const getProfessionPricelistIndex = (professionPricelists: IProfessionPricelist[], id: number): number => {
    for (let i = 0; i < professionPricelists.length; i++) {
        const professionPricelist = professionPricelists[i];
        if (professionPricelist.pricelist_id === id) {
            return i;
        }
    }

    return -1;
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

export const getProfessionPricelist = (state: IPriceListsState, pricelist: IPricelist): IProfessionPricelist | null => {
    for (const expansionName of Object.keys(state.professionPricelists)) {
        const professionPricelists = state.professionPricelists[expansionName];
        for (const professionPricelist of professionPricelists) {
            if (professionPricelist.pricelist_id === pricelist.id) {
                return professionPricelist;
            }
        }
    }

    return null;
};
