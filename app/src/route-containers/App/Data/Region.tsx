import { withRouter } from "react-router-dom";

import { IOwnProps } from "@app/components/App/Data/Region";
import { RegionContainer } from "@app/containers/App/Data/Region";

export const RegionRouteContainer = withRouter<IOwnProps>(RegionContainer);
