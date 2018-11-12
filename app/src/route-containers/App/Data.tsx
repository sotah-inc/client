import { withRouter } from "react-router-dom";

import { IOwnProps } from "@app/components/App/Data";
import { DataContainer } from "@app/containers/App/Data";

export const DataRouteContainer = withRouter<IOwnProps>(DataContainer);
