import { withRouter } from "react-router-dom";

import { IOwnProps } from "@app/components/App/Content/News";
import { NewsContainer } from "@app/containers/App/Content/News";

export const NewsRouteContainer = withRouter<IOwnProps>(NewsContainer);
