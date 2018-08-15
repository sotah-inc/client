import * as React from "react";

import { Classes, ITreeNode, Tree } from "@blueprintjs/core";

import { LastModified } from "@app/components/util";
import { PriceListPanelContainer } from "@app/containers/App/PriceLists/PriceListPanel";
import { IProfession, IRealm } from "@app/types/global";
import { IPricelist } from "@app/types/price-lists";

export interface IStateProps {
    pricelists: IPricelist[];
    selectedList: IPricelist | null;
    currentRealm: IRealm | null;
    professions: IProfession[];
    selectedProfession: IProfession | null;
}

export interface IDispatchProps {
    changeSelectedList: (list: IPricelist) => void;
    changeSelectedProfession: (profession: IProfession) => void;
}

export type Props = Readonly<IStateProps & IDispatchProps>;

interface ITopOpenMap {
    [key: string]: boolean;
}

interface IState {
    topOpenMap: ITopOpenMap;
}

enum TopOpenKey {
    pricelists = "pricelists",
    professions = "professions",
}

export class PricelistTree extends React.Component<Props, IState> {
    public state: IState = {
        topOpenMap: {
            [TopOpenKey.pricelists]: true,
            [TopOpenKey.professions]: true,
        },
    };

    public render() {
        const { pricelists, selectedList, selectedProfession, professions } = this.props;
        const { topOpenMap } = this.state;

        const pricelistNodes: ITreeNode[] = pricelists.map(v => {
            const result: ITreeNode = {
                id: `pricelist-${v.id}`,
                isSelected: selectedList !== null && selectedList.id === v.id,
                label: v.name,
            };

            return result;
        });

        const professionNodes: ITreeNode[] = professions.map(v => {
            const result: ITreeNode = {
                id: `profession-${v.name}`,
                isSelected: selectedProfession !== null && selectedProfession.name === v.name,
                label: v.label,
            };

            return result;
        });

        const nodes: ITreeNode[] = [
            {
                childNodes: pricelistNodes,
                hasCaret: true,
                icon: "list",
                id: `top-${TopOpenKey.pricelists}`,
                isExpanded: topOpenMap[TopOpenKey.pricelists],
                label: "Custom Pricelists",
            },
            {
                childNodes: professionNodes,
                hasCaret: true,
                icon: "list",
                id: `top-${TopOpenKey.professions}`,
                isExpanded: topOpenMap[TopOpenKey.professions],
                label: "Professions",
            },
        ];

        return (
            <div className="pure-g">
                <div className="pure-u-1-4">
                    <Tree contents={nodes} className={Classes.ELEVATION_0} onNodeClick={v => this.onNodeClick(v)} />
                </div>
                <div className="pure-u-3-4">
                    <div style={{ paddingLeft: "10px" }}>{this.renderTreeContent(selectedList)}</div>
                </div>
            </div>
        );
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

    private onProfessionNodeClick(id: string) {
        const { professions, changeSelectedProfession } = this.props;

        const profession = professions.reduce((result, v) => {
            if (result !== null) {
                return result;
            }

            if (v.name === id) {
                return v;
            }

            return null;
        }, null);

        if (profession === null) {
            return;
        }

        changeSelectedProfession(profession);
    }

    private onTopNodeClick(id: TopOpenKey) {
        const { topOpenMap } = this.state;

        this.setState({ topOpenMap: { ...topOpenMap, [id]: !topOpenMap[id] } });
    }

    private onNodeClick(node: ITreeNode) {
        const [kind, id] = node.id.toString().split("-");
        const nodeClickMap = {
            pricelist: v => this.onPricelistNodeClick(v),
            profession: v => this.onProfessionNodeClick(v),
            top: v => this.onTopNodeClick(v),
        };

        if (!(kind in nodeClickMap)) {
            return;
        }

        nodeClickMap[kind](id);
    }
}
