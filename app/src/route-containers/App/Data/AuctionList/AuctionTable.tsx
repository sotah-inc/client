import { withRouter } from "react-router-dom";

import { IOwnProps } from "@app/components/App/Data/AuctionList/AuctionTable";
import { AuctionTableContainer } from "@app/containers/App/Data/AuctionList/AuctionTable";

export const AuctionTableRouteContainer = withRouter<IOwnProps>(AuctionTableContainer);
