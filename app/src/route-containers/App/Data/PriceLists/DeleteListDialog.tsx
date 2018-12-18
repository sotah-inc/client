import { withRouter } from "react-router-dom";

import { IOwnProps } from "@app/components/App/Data/PriceLists/DeleteListDialog";
import { DeleteListDialogContainer } from "@app/containers/App/Data/PriceLists/DeleteListDialog";

export const DeleteListDialogRouteContainer = withRouter<IOwnProps>(DeleteListDialogContainer);
