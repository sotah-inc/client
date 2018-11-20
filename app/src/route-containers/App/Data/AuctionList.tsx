import { withRouter } from "react-router-dom";

import { IOwnProps } from "@app/components/App/Data/AuctionList";
import { AuctionsListContainer } from "@app/containers/App/Data/AuctionList";

export const AuctionListRouteContainer = withRouter<IOwnProps>(AuctionsListContainer);
