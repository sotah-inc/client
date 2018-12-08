import { withRouter } from "react-router-dom";

import { IOwnProps } from "@app/components/App/AuctionsLanding";
import { AuctionsLandingContainer } from "@app/containers/App/AuctionsLanding";

export const AuctionsLandingRouteContainer = withRouter<IOwnProps>(AuctionsLandingContainer);
