import { withRouter } from "react-router-dom";

import { IOwnProps } from "@app/components/App";
import { AppContainer } from "@app/containers/App";

export const AppRouteContainer = withRouter<IOwnProps>(AppContainer);
