import { withRouter } from "react-router-dom";

import { IProps, LinkButton } from "@app/components/util/LinkButton";

export const LinkButtonRouteContainer = withRouter<IProps>(LinkButton);
