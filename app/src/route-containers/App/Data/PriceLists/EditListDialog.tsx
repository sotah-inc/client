import { withRouter } from "react-router-dom";

import { IOwnProps } from "@app/components/App/Data/PriceLists/EditListDialog";
import { EditListDialogContainer } from "@app/containers/App/Data/PriceLists/EditListDialog";

export const EditListDialogRouteContainer = withRouter<IOwnProps>(EditListDialogContainer);
