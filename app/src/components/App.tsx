import * as React from "react";

import { Classes, Intent } from "@blueprintjs/core";
import { RouteComponentProps } from "react-router-dom";

import { IPreferenceJson } from "@app/api-types/entities";
import { IRealm, IRegion } from "@app/api-types/region";
import { Content } from "@app/components/App/Content";
import { TopbarRouteContainer } from "@app/route-containers/App/Topbar";
import { IProfile } from "@app/types/global";
import { AuthLevel, FetchLevel } from "@app/types/main";
import { didRegionChange } from "@app/util";
import { AppToaster } from "@app/util/toasters";

import "./App.scss";

export interface IStateProps {
    fetchPingLevel: FetchLevel;
    currentRegion: IRegion | null;
    fetchRealmLevel: FetchLevel;
    currentRealm: IRealm | null;
    preloadedToken: string;
    authLevel: AuthLevel;
    isLoginDialogOpen: boolean;
    fetchUserPreferencesLevel: FetchLevel;
    userPreferences: IPreferenceJson | null;
    profile: IProfile | null;
    fetchBootLevel: FetchLevel;
}

export interface IDispatchProps {
    onLoad: () => void;
    reloadUser: (token: string) => void;
    refreshRealms: (region: IRegion) => void;
    changeIsLoginDialogOpen: (isLoginDialogOpen: boolean) => void;
    loadUserPreferences: (token: string) => void;
    changeAuthLevel: (authLevel: AuthLevel) => void;
    boot: () => void;
}

export interface IOwnProps extends RouteComponentProps<{}> {}

export type Props = Readonly<IStateProps & IDispatchProps & IOwnProps>;

type State = Readonly<{
    regionToastKey: string;
}>;

export class App extends React.Component<Props, State> {
    public state: State = {
        regionToastKey: "",
    };

    public didHandleUnauth: boolean = false;

    public componentDidMount() {
        const { onLoad, preloadedToken, reloadUser, changeAuthLevel } = this.props;

        onLoad();

        if (preloadedToken.length === 0) {
            changeAuthLevel(AuthLevel.unauthenticated);
        } else {
            reloadUser(preloadedToken);
        }
    }

    public handleUnauth(prevProps: Props) {
        const {
            isLoginDialogOpen,
            changeIsLoginDialogOpen,
            currentRegion,
            fetchBootLevel,
            fetchRealmLevel,
            refreshRealms,
            preloadedToken,
        } = this.props;

        if (preloadedToken.length > 0 && this.didHandleUnauth === false) {
            if (fetchBootLevel === FetchLevel.success) {
                this.didHandleUnauth = true;

                AppToaster.show({
                    action: {
                        icon: "log-in",
                        intent: Intent.PRIMARY,
                        onClick: () => changeIsLoginDialogOpen(!isLoginDialogOpen),
                        text: "Login",
                    },
                    icon: "info-sign",
                    intent: Intent.WARNING,
                    message: "Your session has expired.",
                });
            }
        }

        if (currentRegion !== null) {
            switch (fetchRealmLevel) {
                case FetchLevel.initial:
                case FetchLevel.prompted:
                    refreshRealms(currentRegion);

                    break;
                case FetchLevel.success:
                    if (didRegionChange(prevProps.currentRegion, currentRegion)) {
                        refreshRealms(currentRegion);
                    }

                    break;
                default:
                    break;
            }
        }
    }

    public handleAuth(prevProps: Props) {
        const {
            fetchUserPreferencesLevel,
            loadUserPreferences,
            profile,
            userPreferences,
            currentRegion,
            fetchRealmLevel,
            refreshRealms,
            authLevel,
        } = this.props;

        if (prevProps.authLevel !== authLevel) {
            const hasBeenAuthorized = [AuthLevel.unauthenticated, AuthLevel.initial].indexOf(prevProps.authLevel) > -1;
            if (hasBeenAuthorized) {
                AppToaster.show({
                    icon: "user",
                    intent: Intent.SUCCESS,
                    message: "You are logged in.",
                });

                if (fetchUserPreferencesLevel === FetchLevel.initial) {
                    loadUserPreferences(profile!.token);
                }
            }
        }

        if (prevProps.fetchUserPreferencesLevel !== fetchUserPreferencesLevel) {
            switch (fetchUserPreferencesLevel) {
                case FetchLevel.failure:
                    AppToaster.show({
                        icon: "user",
                        intent: Intent.WARNING,
                        message: "There was an error loading your preferences.",
                    });

                    break;
                case FetchLevel.success:
                    if (userPreferences === null) {
                        AppToaster.show({
                            icon: "user",
                            intent: Intent.WARNING,
                            message: "You have no preferences.",
                        });

                        break;
                    }

                    break;
                default:
                    break;
            }
        }

        if (currentRegion !== null) {
            switch (fetchRealmLevel) {
                case FetchLevel.prompted:
                    refreshRealms(currentRegion);

                    break;
                case FetchLevel.success:
                    if (didRegionChange(prevProps.currentRegion, currentRegion)) {
                        refreshRealms(currentRegion);
                    }

                    break;
                default:
                    break;
            }
        }
    }

    public componentDidUpdate(prevProps: Props) {
        const { fetchBootLevel, fetchPingLevel, boot, authLevel } = this.props;
        const { regionToastKey } = this.state;

        switch (authLevel) {
            case AuthLevel.unauthenticated:
                this.handleUnauth(prevProps);

                break;
            case AuthLevel.authenticated:
                this.handleAuth(prevProps);

                break;
            default:
                break;
        }

        switch (fetchPingLevel) {
            case FetchLevel.success:
                switch (fetchBootLevel) {
                    case FetchLevel.initial:
                        if (authLevel === AuthLevel.unauthenticated) {
                            const initialToastKey = AppToaster.show({
                                icon: "info-sign",
                                intent: Intent.NONE,
                                message: "Loading regions.",
                            });
                            this.setState({ regionToastKey: initialToastKey });

                            boot();
                        }

                        break;
                    case FetchLevel.prompted:
                        const promptedToastKey = AppToaster.show({
                            icon: "info-sign",
                            intent: Intent.NONE,
                            message: "Loading regions.",
                        });
                        this.setState({ regionToastKey: promptedToastKey });

                        boot();

                        break;
                    case FetchLevel.failure:
                        if (prevProps.fetchBootLevel === FetchLevel.fetching) {
                            AppToaster.show({
                                icon: "info-sign",
                                intent: Intent.DANGER,
                                message: "Failed to fetch regions.",
                            });
                        }

                        break;
                    case FetchLevel.success:
                        if (prevProps.fetchBootLevel !== fetchBootLevel) {
                            if (regionToastKey.length > 0) {
                                setTimeout(() => AppToaster.dismiss(regionToastKey), 5 * 100);
                            }

                            this.setState({ regionToastKey: "" });
                        }

                        break;
                    default:
                        break;
                }

                break;
            default:
                break;
        }
    }

    public renderConnected() {
        return (
            <div id="app" className={`${Classes.DARK} dark-app`}>
                <TopbarRouteContainer />
                <Content />
            </div>
        );
    }

    public render() {
        const { fetchPingLevel } = this.props;
        switch (fetchPingLevel) {
            case FetchLevel.initial:
                return <>Welcome!</>;
            case FetchLevel.fetching:
                return <>Connecting...</>;
            case FetchLevel.failure:
                return <>Could not connect!</>;
            case FetchLevel.success:
                return this.renderConnected();
            default:
                return <>You should never see this!</>;
        }
    }
}
