import { withRouter } from "react-router-dom";

import { IOwnProps } from "@app/components/App/Profile/ManageAccount";
import { ManageAccountContainer } from "@app/containers/App/Profile/ManageAccount";

export const ManageAccountRouteContainer = withRouter<IOwnProps>(ManageAccountContainer);
