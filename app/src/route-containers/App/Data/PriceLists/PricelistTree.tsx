import { withRouter } from "react-router-dom";

import { IOwnProps } from "@app/components/App/Data/PriceLists/PricelistTree";
import { PricelistTreeContainer } from "@app/containers/App/Data/PriceLists/PricelistTree";

export const PricelistTreeRouteContainer = withRouter<IOwnProps>(PricelistTreeContainer);
