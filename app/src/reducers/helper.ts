import { IPricelistJson, IProfessionPricelistJson } from "@app/api-types/entities";
import { IExpansion } from "@app/api-types/expansion";
import { IExpansionProfessionPricelistMap, IPriceListsState } from "@app/types/price-lists";

export const getPricelistIndex = (pricelists: IPricelistJson[], id: number): number => {
    for (let i = 0; i < pricelists.length; i++) {
        const pricelist = pricelists[i];
        if (pricelist.id === id) {
            return i;
        }
    }

    return -1;
};

export const getProfessionPricelistIndex = (professionPricelists: IProfessionPricelistJson[], id: number): number => {
    for (let i = 0; i < professionPricelists.length; i++) {
        const professionPricelist = professionPricelists[i];
        if (professionPricelist.pricelist.id === id) {
            return i;
        }
    }

    return -1;
};

export const getFirstExpansionPricelist = (
    expansion: IExpansion,
    pricelistMap: IExpansionProfessionPricelistMap,
): IPricelistJson | null => {
    if (!(expansion.name in pricelistMap)) {
        return null;
    }

    return pricelistMap[expansion.name][0].pricelist;
};

export const getProfessionPricelist = (
    state: IPriceListsState,
    pricelist: IPricelistJson,
): IProfessionPricelistJson | null => {
    for (const expansionName of Object.keys(state.professionPricelists)) {
        const professionPricelists = state.professionPricelists[expansionName];
        for (const professionPricelist of professionPricelists) {
            if (professionPricelist.pricelist.id === pricelist.id) {
                return professionPricelist;
            }
        }
    }

    return null;
};
