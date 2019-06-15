import { actions, updatePlayerStats, fetchPlayerStatsFail } from "./store";
import { fetchPlayerStats } from "./fetch";

export const searchPlayer = store => next => async action => {
	if (action.type === actions.PLAYER_SEARCH_INITIATED) {
		next(action);
		const playerStats = await fetchPlayerStats(action.payload);

		if (await playerStats.hasError) {
			next(fetchPlayerStatsFail(playerStats.error));
		}

		next(updatePlayerStats(playerStats));
	} else {
		return next(action);
	}
};
