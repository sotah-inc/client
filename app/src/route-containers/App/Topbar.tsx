import { withRouter } from "react-router-dom";

import { OwnProps } from "@app/components/App/Topbar";
import Topbar from "@app/containers/App/Topbar";

export default withRouter<OwnProps>(Topbar);
