import { withRouter } from "react-router-dom";

import { IOwnProps } from "@app/components/App/Content/PostForm";
import { PostFormContainer } from "@app/containers/App/Content/PostForm";

export const PostFormRouteContainer = withRouter<IOwnProps>(PostFormContainer);
