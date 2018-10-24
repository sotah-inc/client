import { IPricelistEntryJson, IPricelistJson, IProfessionPricelistJson } from "../../entities";
import { ExpansionName } from "../../expansion";
import { ProfessionName } from "../../profession";

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
    entries: IPricelistEntryJson[];
    pricelist: IPricelistJson;
    profession_pricelist: IProfessionPricelistJson;
}
