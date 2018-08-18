import { IExpansion, IProfessionPricelist } from "@app/types/global";
import { IExpansionProfessionPricelistMap, IPricelist } from "@app/types/price-lists";

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

    return pricelistMap[expansion.name][0].pricelist;
};
