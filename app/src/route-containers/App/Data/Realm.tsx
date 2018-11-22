import { withRouter } from "react-router-dom";

import { IOwnProps } from "@app/components/App/Data/Realm";
import { RealmContainer } from "@app/containers/App/Data/Realm";

export const RealmRouteContainer = withRouter<IOwnProps>(RealmContainer);
