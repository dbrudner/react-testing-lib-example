import React from "react";
import Form from "./Form";
import Results from "./Results";
import { loadingState } from "./store";
import { connect } from "react-redux";

const SearchInnerComponent = ({ loadingStatus }) => (
	<div>
		<Form />
		{(() => {
			if (loadingStatus === loadingState.NOT_STARTED) {
				return null;
			}

			if (loadingStatus === loadingState.STARTED) {
				return <p>Loading</p>;
			}

			if (loadingStatus === loadingState.FAILED) {
				return <p>No player found</p>;
			}

			if (loadingStatus === loadingState.SUCCEEDED) {
				return <Results />;
			}
		})()}
	</div>
);

export default connect(({ loadingStatus }) => ({ loadingStatus }))(
	SearchInnerComponent,
);
