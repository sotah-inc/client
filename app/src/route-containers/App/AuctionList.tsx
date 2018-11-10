import { withRouter } from "react-router-dom";

import { IOwnProps } from "@app/components/App/AuctionList";
import { AuctionsListContainer } from "@app/containers/App/AuctionList";

export const AuctionListRouteContainer = withRouter<IOwnProps>(AuctionsListContainer);
