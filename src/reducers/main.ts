import {
  MainState,
  FetchPingLevel,
  defaultMainState
} from '@app/types/main';
import {
  MainActions,
  REQUEST_PING, RECEIVE_PING,
  USER_REGISTER,
  USER_LOGIN
} from '@app/actions/main';

type State = Readonly<MainState> | undefined;

export const main = (state: State, action: MainActions): State => {
  if (state === undefined) {
    return defaultMainState;
  }

  switch (action.type) {
    case REQUEST_PING:
      return { ...state, fetchPingLevel: FetchPingLevel.fetching };
    case RECEIVE_PING:
      if (action.payload === false) {
        return { ...state, fetchPingLevel: FetchPingLevel.failure };
      }
      return { ...state, fetchPingLevel: FetchPingLevel.success };
    case USER_REGISTER:
      return { ...state, profile: action.payload, isRegistered: true };
    case USER_LOGIN:
      return { ...state, profile: action.payload, isLoggedIn: true };
    default:
      return state;
  }
};
