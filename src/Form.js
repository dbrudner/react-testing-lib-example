import React, { useState } from "react";
import { connect } from "react-redux";
import { initiatePlayerSearch } from "./store";

const InnerSearchComponent = ({ initiatePlayerSearch }) => {
	const [player, setPlayer] = useState("");

	const submit = () => initiatePlayerSearch(player);

	return (
		<form
			onSubmit={e => {
				e.preventDefault();
				initiatePlayerSearch(player);
			}}
		>
			<label htmlFor="player-search">Search for player stats</label>
			<input
				id="player-search"
				value={player}
				onChange={e => setPlayer(e.target.value)}
			/>
			<button type="submit">Search</button>
		</form>
	);
};

export default connect(
	null,
	{ initiatePlayerSearch },
)(InnerSearchComponent);
