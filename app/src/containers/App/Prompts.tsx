import { connect } from "react-redux";

import { IDispatchProps, IStateProps, Prompts } from "@app/components/App/Prompts";
import { IStoreState } from "@app/types";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const { profile } = state.Main;
    const user = profile === null ? null : profile.user;

    return { user };
};

const mapDispatchToProps: IDispatchProps = {
    hello: () => {
        return;
    },
};

export const PromptsContainer = connect<IStateProps, IDispatchProps>(
    mapStateToProps,
    mapDispatchToProps,
)(Prompts);
