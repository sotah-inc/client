import * as React from "react";

import { Classes, Intent, ITreeNode, Spinner, Tree } from "@blueprintjs/core";

import { IGetProfessionPricelistsRequestOptions } from "@app/api/price-lists";
import { LastModified } from "@app/components/util";
import { PriceListPanelContainer } from "@app/containers/App/PriceLists/PriceListPanel";
import { IExpansion, IProfession, IRealm, IRegion } from "@app/types/global";
import { GetProfessionPricelistsLevel, IExpansionProfessionPricelistMap, IPricelist } from "@app/types/price-lists";

export interface IStateProps {
    pricelists: IPricelist[];
    selectedList: IPricelist | null;
    currentRegion: IRegion | null;
    currentRealm: IRealm | null;
    professions: IProfession[];
    selectedProfession: IProfession | null;
    getProfessionPricelistsLevel: GetProfessionPricelistsLevel;
    professionPricelists: IExpansionProfessionPricelistMap;
    expansions: IExpansion[];
    selectedExpansion: IExpansion | null;
}

export interface IDispatchProps {
    changeSelectedList: (list: IPricelist) => void;
    changeSelectedProfession: (profession: IProfession) => void;
    refreshProfessionPricelists: (opts: IGetProfessionPricelistsRequestOptions) => void;
    changeSelectedExpansion: (v: IExpansion) => void;
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

    public componentDidUpdate(prevProps: Props) {
        const { getProfessionPricelistsLevel, expansions, changeSelectedExpansion } = this.props;

        const shouldSelectFirstExpansion =
            prevProps.getProfessionPricelistsLevel === GetProfessionPricelistsLevel.fetching &&
            getProfessionPricelistsLevel === GetProfessionPricelistsLevel.success;
        if (shouldSelectFirstExpansion) {
            changeSelectedExpansion(expansions[0]);
        }
    }

    public render() {
        const { selectedList, pricelists } = this.props;
        const { topOpenMap } = this.state;

        const nodes: ITreeNode[] = [
            {
                childNodes: pricelists.map(v => this.getPricelistNode(v)),
                hasCaret: true,
                icon: "list",
                id: `top-${TopOpenKey.pricelists}`,
                isExpanded: topOpenMap[TopOpenKey.pricelists],
                label: "Custom Pricelists",
            },
            {
                childNodes: this.getProfessionNodes(),
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

    private getProfessionNodes() {
        const { professions } = this.props;

        return professions.map(v => this.getProfessionNode(v));
    }

    private getProfessionNode(v: IProfession) {
        const { selectedProfession, getProfessionPricelistsLevel } = this.props;

        const isSelected = selectedProfession !== null && selectedProfession.name === v.name;
        const result: ITreeNode = {
            id: `profession-${v.name}`,
            isSelected,
            label: v.label,
        };
        if (!isSelected) {
            return result;
        }

        result.isExpanded = true;
        result.hasCaret = false;

        switch (getProfessionPricelistsLevel) {
            case GetProfessionPricelistsLevel.initial:
                result.childNodes = [
                    {
                        icon: <Spinner size={20} value={0} intent={Intent.NONE} />,
                        id: "loading-0",
                        label: <span style={{ marginLeft: "5px" }}>Loading</span>,
                    },
                ];

                break;
            case GetProfessionPricelistsLevel.fetching:
                result.childNodes = [
                    {
                        icon: <Spinner size={20} intent={Intent.PRIMARY} />,
                        id: "loading-0",
                        label: <span style={{ marginLeft: "5px" }}>Loading</span>,
                    },
                ];

                break;
            case GetProfessionPricelistsLevel.failure:
                result.childNodes = [
                    {
                        icon: <Spinner size={20} intent={Intent.DANGER} />,
                        id: "loading-0",
                        label: <span style={{ marginLeft: "5px" }}>Failed to load profession pricelists!</span>,
                    },
                ];

                break;
            case GetProfessionPricelistsLevel.success:
                result.childNodes = this.getExpansionNodes();

                break;
            default:
                break;
        }

        return result;
    }

    private getExpansionNodes(): ITreeNode[] {
        const { expansions, selectedExpansion } = this.props;

        return expansions.map(v => {
            const isSelected = selectedExpansion !== null && selectedExpansion.name === v.name;
            const result: ITreeNode = {
                childNodes: this.getProfessionPricelistNodes(v),
                hasCaret: false,
                id: `expansion-${v.name}`,
                isExpanded: true,
                isSelected,
                label: v.label,
            };

            return result;
        });
    }

    private getProfessionPricelistNodes(expansion: IExpansion): ITreeNode[] {
        const { professionPricelists, selectedExpansion } = this.props;

        const isSelected = selectedExpansion !== null && expansion.name === selectedExpansion.name;

        if (expansion === null || !(expansion.name in professionPricelists)) {
            if (!isSelected) {
                return [];
            }

            return [{ id: "none-none", label: <em>None found.</em> }];
        }

        const result = professionPricelists[expansion.name];
        if (result.length === 0) {
            if (!isSelected) {
                return [];
            }

            return [{ id: "none-none", label: <em>None found.</em> }];
        }

        return result.map(v => this.getPricelistNode(v.pricelist!));
    }

    private getPricelistNode(v: IPricelist) {
        const { selectedList } = this.props;

        const result: ITreeNode = {
            id: `pricelist-${v.id}`,
            isSelected: selectedList !== null && selectedList.id === v.id,
            label: v.name,
        };

        return result;
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
        const { pricelists, professionPricelists, changeSelectedList } = this.props;

        const consolidatedProfessionPricelists: IPricelist[] = Object.keys(professionPricelists).reduce(
            (result: IPricelist[], key) => [...result, ...professionPricelists[key].map(v => v.pricelist!)],
            [],
        );
        const searchablePricelists: IPricelist[] = [...pricelists, ...consolidatedProfessionPricelists];
        const list = searchablePricelists.reduce((result, v) => {
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
        const {
            professions,
            changeSelectedProfession,
            refreshProfessionPricelists,
            currentRegion,
            currentRealm,
        } = this.props;

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
        refreshProfessionPricelists({
            profession: profession!.name,
            realm: currentRealm!.slug,
            region: currentRegion!.name,
        });
    }

    private onTopNodeClick(id: TopOpenKey) {
        const { topOpenMap } = this.state;

        this.setState({ topOpenMap: { ...topOpenMap, [id]: !topOpenMap[id] } });
    }

    private onExpansionClick(id: string) {
        const { expansions, changeSelectedExpansion } = this.props;

        const expansion = expansions.reduce((result, v) => {
            if (result !== null) {
                return result;
            }

            if (v.name === id) {
                return v;
            }

            return null;
        }, null);

        if (expansion === null) {
            return;
        }

        changeSelectedExpansion(expansion);
    }

    private onNodeClick(node: ITreeNode) {
        const [kind, id] = node.id.toString().split("-");
        const nodeClickMap = {
            expansion: v => this.onExpansionClick(v),
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
