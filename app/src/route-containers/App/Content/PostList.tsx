import { withRouter } from "react-router-dom";

import { IOwnProps } from "@app/components/App/Content/PostList";
import { PostListContainer } from "@app/containers/App/Content/PostList";

export const PostListRouteContainer = withRouter<IOwnProps>(PostListContainer);
