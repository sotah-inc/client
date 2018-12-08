import { withRouter } from "react-router-dom";

import { IOwnProps, Viewport } from "@app/components/App/Viewport";

export const ViewportRouteContainer = withRouter<IOwnProps>(Viewport);
