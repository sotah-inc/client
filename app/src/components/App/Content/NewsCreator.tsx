import * as React from "react";

import { PostFormFormContainer } from "@app/form-containers/App/Content/PostForm";

export class NewsCreator extends React.Component {
    public render() {
        return <div id="content">{this.renderContent()}</div>;
    }

    private renderContent() {
        return <PostFormFormContainer onComplete={v => console.log(v)} />;
    }
}
