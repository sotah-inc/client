import { withRouter } from "react-router-dom";

import { IOwnProps } from "@app/components/App/ProfessionsLanding";
import { ProfessionsLandingContainer } from "@app/containers/App/ProfessionsLanding";

export const ProfessionsLandingRouteContainer = withRouter<IOwnProps>(ProfessionsLandingContainer);
