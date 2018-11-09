import { withRouter } from "react-router-dom";

import { IOwnProps, Root } from "@app/components/App/Root";

export const RootRouteContainer = withRouter<IOwnProps>(Root);
