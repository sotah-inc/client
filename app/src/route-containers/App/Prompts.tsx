import { withRouter } from "react-router-dom";

import { IOwnProps } from "@app/components/App/Prompts";
import { PromptsContainer } from "@app/containers/App/Prompts";

export const PromptsRouteContainer = withRouter<IOwnProps>(PromptsContainer);
