import * as React from "react";

import { Button, Callout, Dialog, Intent } from "@blueprintjs/core";
import { RouteComponentProps } from "react-router";

import { IPostJson } from "@app/api-types/entities";
import { DialogActions, DialogBody } from "@app/components/util";
import { IProfile } from "@app/types/global";
import { FetchLevel } from "@app/types/main";
import { AppToaster } from "@app/util/toasters";

export interface IStateProps {
    profile: IProfile | null;
    isDeletePostDialogOpen: boolean;
    deletePostLevel: FetchLevel;
}

export interface IDispatchProps {
    changeIsDeletePostDialogOpen: (v: boolean) => void;
    deletePost: (token: string, id: number) => void;
}

export interface IOwnProps extends RouteComponentProps<{}> {
    selectedPost: IPostJson;
}

export type Props = Readonly<IStateProps & IDispatchProps & IOwnProps>;

export class DeletePostDialog extends React.Component<Props> {
    public componentDidUpdate(prevProps: Props) {
        const { history, deletePostLevel } = this.props;

        if (prevProps.deletePostLevel !== deletePostLevel) {
            switch (deletePostLevel) {
                case FetchLevel.success:
                    AppToaster.show({
                        icon: "info-sign",
                        intent: Intent.SUCCESS,
                        message: "Your post has been deleted.",
                    });

                    history.replace("/content/news");

                    return;
                default:
                    return;
            }
        }
    }

    public render() {
        const { isDeletePostDialogOpen, changeIsDeletePostDialogOpen, selectedPost, deletePostLevel } = this.props;

        return (
            <Dialog
                isOpen={isDeletePostDialogOpen}
                onClose={() => changeIsDeletePostDialogOpen(isDeletePostDialogOpen)}
                title="Delete List"
                icon="delete"
            >
                <DialogBody>
                    <Callout intent={Intent.DANGER} icon="info-sign">
                        Are you sure you want to delete "{selectedPost.title}"
                    </Callout>
                </DialogBody>
                <DialogActions>
                    <Button text="Cancel" intent={Intent.NONE} onClick={() => this.onDialogCancel()} />
                    <Button
                        type="submit"
                        intent={Intent.DANGER}
                        icon="delete"
                        text={`Delete "${selectedPost.title}"`}
                        onClick={() => this.onDialogConfirm()}
                        disabled={deletePostLevel === FetchLevel.fetching}
                    />
                </DialogActions>
            </Dialog>
        );
    }

    private onDialogCancel() {
        const { changeIsDeletePostDialogOpen } = this.props;

        changeIsDeletePostDialogOpen(false);
    }

    private onDialogConfirm() {
        const { profile, deletePost, selectedPost } = this.props;

        if (profile === null) {
            return;
        }

        deletePost(profile.token, selectedPost.id);
    }
}
