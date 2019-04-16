import { withRouter } from "react-router-dom";

import { IOwnProps } from "@app/components/App/Profile";
import { ProfileContainer } from "@app/containers/App/Profile";

export const ProfileRouteContainer = withRouter<IOwnProps>(ProfileContainer);
