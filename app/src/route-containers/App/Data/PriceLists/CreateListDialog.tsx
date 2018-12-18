import { withRouter } from "react-router-dom";

import { IOwnProps } from "@app/components/App/Data/PriceLists/CreateListDialog";
import { CreateListDialogContainer } from "@app/containers/App/Data/PriceLists/CreateListDialog";

export const CreateListDialogRouteContainer = withRouter<IOwnProps>(CreateListDialogContainer);
