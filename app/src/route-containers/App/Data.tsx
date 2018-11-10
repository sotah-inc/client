import { withRouter } from "react-router-dom";

import { Data, IOwnProps } from "@app/components/App/Data";

export const DataRouteContainer = withRouter<IOwnProps>(Data);
