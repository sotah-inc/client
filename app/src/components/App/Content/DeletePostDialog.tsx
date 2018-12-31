import * as React from "react";

import { Button, Callout, Dialog, Intent } from "@blueprintjs/core";
import { RouteComponentProps } from "react-router";

import { IDeletePostOptions } from "@app/actions/posts";
import { IPostJson } from "@app/api-types/entities";
import { DialogActions, DialogBody } from "@app/components/util";
import { IProfile } from "@app/types/global";
import { FetchLevel } from "@app/types/main";
import { AppToaster } from "@app/util/toasters";

export interface IStateProps {
    profile: IProfile | null;
    isDeletePostDialogOpen: boolean;
    deletePostLevel: FetchLevel;
    currentPost: IPostJson | null;
}

export interface IDispatchProps {
    changeIsDeletePostDialogOpen: (v: IDeletePostOptions) => void;
    deletePost: (token: string, id: number) => void;
}

export interface IOwnProps extends RouteComponentProps<{}> {}

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
        const { isDeletePostDialogOpen, changeIsDeletePostDialogOpen, currentPost, deletePostLevel } = this.props;

        if (currentPost === null) {
            return null;
        }

        return (
            <Dialog
                isOpen={isDeletePostDialogOpen}
                onClose={() => changeIsDeletePostDialogOpen({ post: currentPost, opened: isDeletePostDialogOpen })}
                title="Delete List"
                icon="delete"
            >
                <DialogBody>
                    <Callout intent={Intent.DANGER} icon="info-sign">
                        Are you sure you want to delete "{currentPost.title}"
                    </Callout>
                </DialogBody>
                <DialogActions>
                    <Button text="Cancel" intent={Intent.NONE} onClick={() => this.onDialogCancel()} />
                    <Button
                        type="submit"
                        intent={Intent.DANGER}
                        icon="delete"
                        text={`Delete "${currentPost.title}"`}
                        onClick={() => this.onDialogConfirm()}
                        disabled={deletePostLevel === FetchLevel.fetching}
                    />
                </DialogActions>
            </Dialog>
        );
    }

    private onDialogCancel() {
        const { changeIsDeletePostDialogOpen, currentPost } = this.props;

        if (currentPost === null) {
            return;
        }

        changeIsDeletePostDialogOpen({ post: currentPost, opened: false });
    }

    private onDialogConfirm() {
        const { profile, deletePost, currentPost } = this.props;

        if (profile === null || currentPost === null) {
            return;
        }

        deletePost(profile.token, currentPost.id);
    }
}
