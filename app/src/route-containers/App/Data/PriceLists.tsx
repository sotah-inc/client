import { withRouter } from "react-router-dom";

import { IOwnProps } from "@app/components/App/Data/PriceLists";
import { PriceListsContainer } from "@app/containers/App/Data/PriceLists";

export const PriceListsRouteContainer = withRouter<IOwnProps>(PriceListsContainer);
