import { connect } from "react-redux";

import { IStateProps, Viewport } from "@app/components/App/Viewport";
import { IStoreState } from "@app/types";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const { fetchBootLevel } = state.Main;
    return { fetchBootLevel };
};

export const ViewportContainer = connect<IStateProps>(mapStateToProps)(Viewport);
