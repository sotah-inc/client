import * as React from "react";

import { Button, Classes, Intent, ITreeNode, NonIdealState, Spinner, Tree } from "@blueprintjs/core";

import { IGetPricelistsOptions } from "@app/api/price-lists";
import { LastModified } from "@app/components/util";
import { PriceListPanelContainer } from "@app/containers/App/PriceLists/PriceListPanel";
import { IProfile, IRealm, IRegion } from "@app/types/global";
import { AuthLevel, FetchUserPreferencesLevel } from "@app/types/main";
import { GetPricelistsLevel, IPricelist } from "@app/types/price-lists";
import { didRealmChange } from "@app/util";

export interface IStateProps {
    pricelists: IPricelist[];
    selectedList: IPricelist | null;
    currentRegion: IRegion | null;
    currentRealm: IRealm | null;
    getPricelistsLevel: GetPricelistsLevel;
    profile: IProfile | null;
    authLevel: AuthLevel;
    fetchUserPreferencesLevel: FetchUserPreferencesLevel;
}

export interface IDispatchProps {
    changeSelectedList: (list: IPricelist) => void;
    changeIsAddListDialogOpen: (isDialogOpen: boolean) => void;
    refreshPricelists: (opts: IGetPricelistsOptions) => void;
}

export type Props = Readonly<IStateProps & IDispatchProps>;

export class Listing extends React.Component<Props> {
    public componentDidMount() {
        const {
            refreshPricelists,
            currentRegion,
            currentRealm,
            profile,
            authLevel,
            fetchUserPreferencesLevel,
            pricelists,
        } = this.props;

        if (currentRealm === null || currentRegion === null) {
            return;
        }

        const shouldRefreshPricelists =
            authLevel === AuthLevel.authenticated &&
            fetchUserPreferencesLevel === FetchUserPreferencesLevel.success &&
            pricelists.length === 0;

        if (shouldRefreshPricelists) {
            refreshPricelists({
                realmSlug: currentRealm.slug,
                regionName: currentRegion.name,
                token: profile!.token,
            });
        }
    }

    public componentDidUpdate(prevProps: Props) {
        const {
            refreshPricelists,
            currentRegion,
            currentRealm,
            profile,
            authLevel,
            fetchUserPreferencesLevel,
        } = this.props;

        if (currentRealm === null || currentRegion === null) {
            return;
        }

        if (authLevel === AuthLevel.authenticated && fetchUserPreferencesLevel === FetchUserPreferencesLevel.success) {
            const shouldRefreshPricelists = didRealmChange(prevProps.currentRealm, currentRealm);
            if (shouldRefreshPricelists) {
                refreshPricelists({
                    realmSlug: currentRealm.slug,
                    regionName: currentRegion.name,
                    token: profile!.token,
                });
            }
        }
    }

    public render() {
        return <div style={{ marginTop: "20px" }}>{this.renderContent()}</div>;
    }

    private renderTreeContent(list: IPricelist | null) {
        const { currentRealm } = this.props;

        if (list === null) {
            return;
        }

        return (
            <>
                <PriceListPanelContainer list={list} />
                <LastModified targetDate={new Date(currentRealm!.last_modified * 1000)} />
            </>
        );
    }

    private onPricelistNodeClick(id: string) {
        const { pricelists, changeSelectedList } = this.props;

        const list = pricelists.reduce((result, v) => {
            if (result !== null) {
                return result;
            }

            if (v.id.toString() === id) {
                return v;
            }

            return null;
        }, null);

        if (list === null) {
            return;
        }

        changeSelectedList(list);
    }

    private onNodeClick(node: ITreeNode) {
        const [kind, id] = node.id.toString().split("-");
        const nodeClickMap = { pricelist: v => this.onPricelistNodeClick(v) };

        if (!(kind in nodeClickMap)) {
            return;
        }

        nodeClickMap[kind](id);
    }

    private renderTree() {
        const { pricelists, selectedList } = this.props;

        const pricelistNodes: ITreeNode[] = pricelists.map(v => {
            const result: ITreeNode = {
                id: `pricelist-${v.id}`,
                isSelected: selectedList !== null && selectedList.id === v.id,
                label: v.name,
            };
            return result;
        });

        const nodes: ITreeNode[] = [
            {
                childNodes: pricelistNodes,
                id: `top-0`,
                isExpanded: true,
                label: "Custom Pricelists",
            },
        ];

        return (
            <div className="pure-g">
                <div className="pure-u-1-5">
                    <Tree contents={nodes} className={Classes.ELEVATION_0} onNodeClick={v => this.onNodeClick(v)} />
                </div>
                <div className="pure-u-4-5">
                    <div style={{ paddingLeft: "10px" }}>{this.renderTreeContent(selectedList)}</div>
                </div>
            </div>
        );
    }

    private renderPricelists() {
        const { pricelists, currentRealm, changeIsAddListDialogOpen } = this.props;

        if (pricelists.length === 0) {
            return (
                <NonIdealState
                    title="No price lists"
                    description={`You have no price lists in ${currentRealm!.name}.`}
                    icon="list"
                    action={
                        <Button
                            className={Classes.FILL}
                            icon="plus"
                            onClick={() => changeIsAddListDialogOpen(true)}
                            text={`Add List to ${currentRealm!.name}`}
                        />
                    }
                />
            );
        }

        return this.renderTree();
    }

    private renderContent() {
        const { getPricelistsLevel } = this.props;

        switch (getPricelistsLevel) {
            case GetPricelistsLevel.initial:
                return (
                    <NonIdealState
                        title="Loading"
                        icon={<Spinner className={Classes.LARGE} intent={Intent.NONE} value={0} />}
                    />
                );
            case GetPricelistsLevel.fetching:
                return (
                    <NonIdealState
                        title="Loading"
                        icon={<Spinner className={Classes.LARGE} intent={Intent.PRIMARY} />}
                    />
                );
            case GetPricelistsLevel.success:
                return this.renderPricelists();
            default:
                break;
        }

        return;
    }
}
