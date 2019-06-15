export const loadingState = {
	NOT_STARTED: "NOT_STARTED",
	STARTED: "STARTED",
	SUCCEEDED: "SUCCEEDED",
	FAILED: "FAILED",
};

const initialState = {
	name: "",
	ppg: "",
	apg: "",
	rpg: "",
	error: null,
	loadingStatus: loadingState.NOT_STARTED,
};

export const actions = {
	PLAYER_SEARCH_INITIATED: "PLAYER_SEARCH_INITIATED",
	PLAYER_SEARCH_SUCCEEDED: "PLAYER_SEARCH_SUCCEEDED",
	PLAYER_SEARCH_FAILED: "PLAYER_SEARCH_FAILED",
};

export const updatePlayerStats = stats => {
	const { apg, ppg, rpg } = stats.League.Standard.Stats.latest;

	return {
		type: actions.PLAYER_SEARCH_SUCCEEDED,
		payload: {
			apg,
			ppg,
			rpg,
		},
	};
};

export const fetchPlayerStatsFail = err => ({
	type: actions.PLAYER_SEARCH_FAILED,
	payload: err,
});

export const initiatePlayerSearch = playerName => ({
	type: actions.PLAYER_SEARCH_INITIATED,
	payload: playerName,
});

export const reducer = (state = initialState, { type, payload }) => {
	if (type === actions.PLAYER_SEARCH_FAILED) {
		return {
			...initialState,
			error: true,
			loadingStatus: loadingState.FAILED,
		};
	}

	if (type === actions.PLAYER_SEARCH_SUCCEEDED) {
		return {
			...state,
			...payload,
			error: false,
			loadingStatus: loadingState.SUCCEEDED,
		};
	}

	if (type === actions.PLAYER_SEARCH_INITIATED) {
		return { ...state, error: false, loadingStatus: loadingState.STARTED };
	}

	return state;
};
