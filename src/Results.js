import React from "react";
import { connect } from "react-redux";

const ResultsInnerComponent = ({ apg, rpg, ppg }) => (
	<div>
		<h2>Results</h2>
		<table>
			<thead>
				<tr>
					<th>apg</th>
					<th>rpg</th>
					<th>ppg</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td data-testid="apg">{apg}</td>
					<td data-testid="rpg">{rpg}</td>
					<td data-testid="ppg">{ppg}</td>
				</tr>
			</tbody>
		</table>
	</div>
);

export default connect(state => state)(ResultsInnerComponent);
