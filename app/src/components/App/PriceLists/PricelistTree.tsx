import * as React from "react";

import { Classes, Intent, ITreeNode, Spinner, Tree } from "@blueprintjs/core";

import { IGetPricelistsOptions, IGetProfessionPricelistsRequestOptions } from "@app/api/price-lists";
import { ProfessionIcon } from "@app/components/util/ProfessionIcon";
import { TreeContentContainer } from "@app/containers/App/PriceLists/PricelistTree/TreeContent";
import { PricelistIconContainer } from "@app/containers/util/PricelistIcon";
import { IExpansion, IProfession, IProfile, IRealm, IRegion, ItemsMap } from "@app/types/global";
import { AuthLevel, FetchUserPreferencesLevel } from "@app/types/main";
import {
    GetProfessionPricelistsLevel,
    IExpansionProfessionPricelistMap,
    IPricelist,
    ISelectExpansionPayload,
} from "@app/types/price-lists";

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
    authLevel: AuthLevel;
    fetchUserPreferencesLevel: FetchUserPreferencesLevel;
    profile: IProfile | null;
    items: ItemsMap;
}

export interface IDispatchProps {
    changeSelectedList: (list: IPricelist) => void;
    changeSelectedProfession: (profession: IProfession) => void;
    refreshProfessionPricelists: (opts: IGetProfessionPricelistsRequestOptions) => void;
    changeSelectedExpansion: (v: ISelectExpansionPayload) => void;
    resetProfessionsSelections: () => void;
    refreshPricelists: (opts: IGetPricelistsOptions) => void;
}

export type Props = Readonly<IStateProps & IDispatchProps>;

interface ITopOpenMap {
    [key: string]: boolean;
}

interface IState {
    topOpenMap: ITopOpenMap;
}

enum TopOpenKey {
    summary = "summary",
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

    public componentDidMount() {
        const {
            currentRegion,
            currentRealm,
            authLevel,
            fetchUserPreferencesLevel,
            refreshPricelists,
            profile,
        } = this.props;

        if (currentRegion !== null && currentRealm !== null) {
            const hasFinishedLoading =
                authLevel === AuthLevel.authenticated &&
                fetchUserPreferencesLevel === FetchUserPreferencesLevel.success;
            if (hasFinishedLoading) {
                refreshPricelists({ token: profile!.token });
            }
        }
    }

    public componentDidUpdate(prevProps: Props) {
        const { authLevel, fetchUserPreferencesLevel, refreshPricelists, profile, currentRealm } = this.props;

        const shouldRefreshPricelists =
            (prevProps.currentRealm === null && currentRealm !== null) ||
            (prevProps.fetchUserPreferencesLevel === FetchUserPreferencesLevel.fetching &&
                fetchUserPreferencesLevel === FetchUserPreferencesLevel.success);
        if (shouldRefreshPricelists) {
            const hasFinishedLoading =
                authLevel === AuthLevel.authenticated &&
                fetchUserPreferencesLevel === FetchUserPreferencesLevel.success;
            if (hasFinishedLoading) {
                refreshPricelists({ token: profile!.token });
            }
        }
    }

    public render() {
        const { authLevel, currentRealm, currentRegion } = this.props;
        const { topOpenMap } = this.state;

        const nodes: ITreeNode[] = [];
        if (currentRegion !== null && currentRealm !== null) {
            nodes.push({
                id: `top-summary`,
                isSelected: this.isSummarySelected(),
                label: `${currentRegion.name.toUpperCase()}-${currentRealm!.name} Summary`,
            });
        }

        // optionally appending custom-pricelists
        if (authLevel === AuthLevel.authenticated) {
            nodes.push({
                childNodes: this.getPricelistNodes(),
                hasCaret: true,
                icon: "list",
                id: `top-${TopOpenKey.pricelists}`,
                isExpanded: topOpenMap[TopOpenKey.pricelists],
                label: "Custom Pricelists",
            });
        }

        // appending profession-pricelists
        nodes.push({
            childNodes: this.getProfessionNodes(),
            hasCaret: true,
            icon: "list",
            id: `top-${TopOpenKey.professions}`,
            isExpanded: topOpenMap[TopOpenKey.professions],
            label: "Professions",
        });

        return (
            <div style={{ marginTop: "10px" }}>
                <div className="pure-g">
                    <div className="pure-u-1-4 pricelist-tree">
                        <Tree contents={nodes} className={Classes.ELEVATION_0} onNodeClick={v => this.onNodeClick(v)} />
                    </div>
                    <div className="pure-u-3-4">
                        <div style={{ paddingLeft: "10px" }}>
                            <TreeContentContainer />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    private isSummarySelected() {
        const { selectedList, selectedProfession } = this.props;

        return selectedList === null && selectedProfession === null;
    }

    private getProfessionNodes() {
        const { professions } = this.props;

        return professions.map(v => this.getProfessionNode(v));
    }

    private getProfessionNode(v: IProfession) {
        const { selectedProfession, getProfessionPricelistsLevel } = this.props;

        const isSelected = selectedProfession !== null && selectedProfession.name === v.name;
        const result: ITreeNode = {
            className: "profession-node",
            icon: <ProfessionIcon profession={v} />,
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
                        icon: <Spinner size={20} intent={Intent.DANGER} value={1} />,
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
                className: "expansion-node",
                hasCaret: false,
                id: `expansion-${v.name}`,
                isExpanded: true,
                isSelected,
                label: <span style={{ color: v.label_color }}>{v.label}</span>,
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

        const nodes = result.map(v => this.getPricelistNode(v.pricelist!)).sort((a, b) => {
            if (a.label === b.label) {
                return 0;
            }

            return a.label > b.label ? 1 : -1;
        });

        return nodes;
    }

    private getPricelistNode(v: IPricelist) {
        const { selectedList } = this.props;

        const result: ITreeNode = {
            className: "pricelist-node",
            icon: <PricelistIconContainer pricelist={v} />,
            id: `pricelist-${v.id}`,
            isSelected: selectedList !== null && selectedList.id === v.id,
            label: v.name,
        };

        return result;
    }

    private getPricelistNodes(): ITreeNode[] {
        const { pricelists } = this.props;

        if (pricelists.length === 0) {
            return [{ id: "none-none", label: <em>None found.</em> }];
        }

        return pricelists.map(v => this.getPricelistNode(v));
    }

    private onPricelistNodeClick(id: string) {
        const {
            pricelists,
            professionPricelists,
            changeSelectedList,
            changeSelectedExpansion,
            expansions,
        } = this.props;

        // checking user pricelists first
        const list = pricelists.reduce((result, v) => {
            if (result !== null) {
                return result;
            }

            if (v.id.toString() === id) {
                return v;
            }

            return null;
        }, null);
        if (list !== null) {
            changeSelectedList(list);

            return;
        }

        // checking profession pricelists
        for (const expansionName of Object.keys(professionPricelists)) {
            const expansion: IExpansion | null = expansions.reduce((result: IExpansion, v) => {
                if (result !== null) {
                    return result;
                }

                if (v.name === expansionName) {
                    return v;
                }

                return null;
            }, null);

            for (const professionPricelist of professionPricelists[expansionName]) {
                if (professionPricelist.pricelist_id.toString() === id) {
                    changeSelectedExpansion({
                        expansion: expansion!,
                        jumpTo: professionPricelist.pricelist!,
                    });

                    return;
                }
            }
        }
    }

    private onProfessionNodeClick(id: string) {
        const {
            professions,
            changeSelectedProfession,
            refreshProfessionPricelists,
            selectedProfession,
            resetProfessionsSelections,
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

        if (profession === null || (selectedProfession !== null && profession.name === selectedProfession.name)) {
            resetProfessionsSelections();

            return;
        }

        changeSelectedProfession(profession);
        refreshProfessionPricelists({ profession: profession!.name });
    }

    private onTopNodeClick(id: TopOpenKey) {
        const { resetProfessionsSelections } = this.props;
        const { topOpenMap } = this.state;

        if (id === TopOpenKey.summary) {
            resetProfessionsSelections();

            return;
        }

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

        changeSelectedExpansion({ expansion });
    }

    private onNodeClick(node: ITreeNode) {
        const separatorIndex = node.id.toString().indexOf("-");
        if (separatorIndex === -1) {
            return;
        }

        const [kind, id] = [
            node.id.toString().substr(0, separatorIndex),
            node.id.toString().substr(separatorIndex + 1),
        ];
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
