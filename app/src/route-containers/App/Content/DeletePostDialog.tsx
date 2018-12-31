import { withRouter } from "react-router-dom";

import { IOwnProps } from "@app/components/App/Content/DeletePostDialog";
import { DeletePostDialogContainer } from "@app/containers/App/Content/DeletePostDialog";

export const DeletePostDialogRouteContainer = withRouter<IOwnProps>(DeletePostDialogContainer);
