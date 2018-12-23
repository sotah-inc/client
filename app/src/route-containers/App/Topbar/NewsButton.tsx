import { withRouter } from "react-router-dom";

import { IOwnProps } from "@app/components/App/Topbar/NewsButton";
import { NewsButtonContainer } from "@app/containers/App/Topbar/NewsButton";

export const NewsButtonRouteContainer = withRouter<IOwnProps>(NewsButtonContainer);
