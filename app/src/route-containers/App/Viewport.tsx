import { withRouter } from "react-router-dom";

import { IOwnProps } from "@app/components/App/Viewport";
import { ViewportContainer } from "@app/containers/App/Viewport";

export const ViewportRouteContainer = withRouter<IOwnProps>(ViewportContainer);
