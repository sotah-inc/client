import { withRouter } from "react-router-dom";

import { IOwnProps } from "@app/components/App/Data/PriceLists/ActionBar";
import { ActionBarContainer } from "@app/containers/App/Data/PriceLists/ActionBar";

export const ActionBarRouteContainer = withRouter<IOwnProps>(ActionBarContainer);
