import { withRouter } from "react-router-dom";

import { IOwnProps } from "@app/components/App/Topbar";
import { TopbarContainer } from "@app/containers/App/Topbar";

export const TopbarRouteContainer = withRouter<IOwnProps>(TopbarContainer);
