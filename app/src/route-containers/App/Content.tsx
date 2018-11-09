import { withRouter } from "react-router-dom";

import { Content, IOwnProps } from "@app/components/App/Content";

export const ContentRouteContainer = withRouter<IOwnProps>(Content);
