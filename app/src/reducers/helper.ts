import { Pricelist } from "@app/types/price-lists";

export const getPricelistIndex = (pricelists: Pricelist[], id: number): number => {
    for (let i = 0; i < pricelists.length; i++) {
        const pricelist = pricelists[i];
        if (pricelist.id === id) {
            return i;
        }
    }

    return -1;
};
