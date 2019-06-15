export const fetchPlayerStats = async playerName => {
	const response = await fetch(
		`https://infinite-cove-44078.herokuapp.com/stats?name=${playerName}`,
	);

	const data = await response.json();

	return data;
};
