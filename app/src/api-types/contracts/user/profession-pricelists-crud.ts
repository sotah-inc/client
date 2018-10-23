import { Pricelist } from "../../../entities/pricelist";
import { PricelistEntry } from "../../../entities/pricelist-entry";
import { ProfessionPricelist } from "../../../entities/profession-pricelist";
import { ExpansionName } from "../../../types/expansion";
import { ProfessionName } from "../../../types/profession";

export interface ICreateProfessionPricelistRequest {
    pricelist: {
        name: string;
    };
    entries: Array<{
        id?: number;
        item_id: number;
        quantity_modifier: number;
    }>;
    profession_name: ProfessionName;
    expansion_name: ExpansionName;
}

export interface ICreateProfessionPricelistResponse {
    entries: PricelistEntry[];
    pricelist: Pricelist;
    profession_pricelist: ProfessionPricelist;
}
