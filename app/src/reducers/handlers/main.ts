import {
    MainActions,
    ReceiveGetBoot,
    ReceiveGetPing,
    ReceiveGetRealms,
    ReceiveGetUserPreferences,
} from "@app/actions/main";
import { IRealm, IRegion } from "@app/api-types/region";
import { IItemClasses, IRealms, IRegions, ISubItemClasses } from "@app/types/global";
import { FetchLevel, IMainState } from "@app/types/main";

import { IKindHandlers, Runner } from "./index";

const handlers: IKindHandlers<IMainState, MainActions> = {
    boot: {
        get: {
            receive: (state: IMainState, action: ReturnType<typeof ReceiveGetBoot>) => {
                if (action.payload === null) {
                    return { ...state, fetchBootLevel: FetchLevel.failure };
                }

                const currentRegion: IRegion = (() => {
                    if (state.userPreferences === null) {
                        return action.payload.regions[0];
                    }

                    const { current_region: preferredRegionName } = state.userPreferences;
                    const foundRegion: IRegion | null = action.payload.regions.reduce((result: IRegion | null, v) => {
                        if (result !== null) {
                            return result;
                        }

                        if (v.name === preferredRegionName) {
                            return v;
                        }

                        return null;
                    }, null);

                    if (foundRegion === null) {
                        return action.payload.regions[0];
                    }

                    return foundRegion;
                })();

                const regions: IRegions = action.payload.regions.reduce(
                    (result, region) => ({ ...result, [region.name]: region }),
                    {},
                );

                const itemClasses: IItemClasses = action.payload.item_classes.classes.reduce(
                    (previousItemClasses: IItemClasses, itemClass) => {
                        const subClasses: ISubItemClasses = itemClass.subclasses.reduce(
                            (previousSubClasses: ISubItemClasses, subItemClass) => {
                                return { ...previousSubClasses, [subItemClass.subclass]: subItemClass };
                            },
                            {},
                        );

                        return { ...previousItemClasses, [itemClass.class]: { ...itemClass, subClasses } };
                    },
                    {},
                );

                return {
                    ...state,
                    currentRegion,
                    expansions: action.payload.expansions,
                    fetchBootLevel: FetchLevel.success,
                    itemClasses,
                    professions: action.payload.professions,
                    regions,
                };
            },
            request: (state: IMainState) => {
                return { ...state, fetchBootLevel: FetchLevel.fetching };
            },
        },
    },
    ping: {
        get: {
            receive: (state: IMainState, action: ReturnType<typeof ReceiveGetPing>) => {
                if (action.payload === false) {
                    return { ...state, fetchPingLevel: FetchLevel.failure };
                }

                return { ...state, fetchPingLevel: FetchLevel.success };
            },
            request: (state: IMainState) => {
                return { ...state, fetchPingLevel: FetchLevel.fetching };
            },
        },
    },
    realms: {
        get: {
            receive: (state: IMainState, action: ReturnType<typeof ReceiveGetRealms>) => {
                if (action.payload === null || action.payload.length === 0) {
                    return { ...state, fetchRealmLevel: FetchLevel.failure };
                }

                const currentRealm: IRealm = (() => {
                    // optionally halting on blank user-preferences
                    if (state.userPreferences === null) {
                        return action.payload[0];
                    }

                    const {
                        current_region: preferredRegionName,
                        current_realm: preferredRealmSlug,
                    } = state.userPreferences;
                    // defaulting to first realm in list if region is different from preferred region
                    if (state.currentRegion!.name !== preferredRegionName) {
                        return action.payload[0];
                    }

                    // gathering preferred realm
                    const foundRealm: IRealm | null = action.payload.reduce((result, v) => {
                        if (result !== null) {
                            return result;
                        }

                        if (v.slug === preferredRealmSlug) {
                            return v;
                        }

                        return null;
                    }, null);

                    // optionally halting on realm non-match against preferred realm name
                    if (foundRealm === null) {
                        return action.payload[0];
                    }

                    // dumping out preferred realm
                    return foundRealm;
                })();

                const realms: IRealms = action.payload.reduce(
                    (result, realm) => ({ ...result, [realm.slug]: realm }),
                    {},
                );

                return { ...state, fetchRealmLevel: FetchLevel.success, realms, currentRealm };
            },
            request: (state: IMainState) => {
                return { ...state, fetchRealmLevel: FetchLevel.fetching };
            },
        },
    },
    userpreferences: {
        get: {
            receive: (state: IMainState, action: ReturnType<typeof ReceiveGetUserPreferences>) => {
                if (action.payload.error !== null) {
                    return { ...state, fetchUserPreferencesLevel: FetchLevel.failure };
                }

                return {
                    ...state,
                    fetchUserPreferencesLevel: FetchLevel.success,
                    userPreferences: action.payload.preference,
                };
            },
            request: (state: IMainState) => {
                return { ...state };
            },
        },
    },
};

export const run: Runner<IMainState, MainActions> = (state: IMainState, action: MainActions): IMainState => {
    const [kind, verb, task] = action.type
        .split("_")
        .reverse()
        .map(v => v.toLowerCase());
    if (!(kind in handlers)) {
        return state;
    }
    const kindHandlers = handlers[kind];

    if (!(verb in kindHandlers)) {
        return state;
    }
    const verbHandlers = kindHandlers[verb];

    if (!(task in verbHandlers)) {
        return state;
    }
    const taskHandler = verbHandlers[task];

    return taskHandler(state, action);
};
