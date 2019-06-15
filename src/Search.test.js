import React from "react";
import {
	render,
	fireEvent,
	waitForElement,
	queryByText,
} from "@testing-library/react";
import Search from "./Search";
import { reducer } from "./store";
import { createStore, applyMiddleware } from "redux";
import { searchPlayer } from "./midware";
import { Provider } from "react-redux";

beforeEach(function() {
	global.fetch = jest.fn().mockImplementation(() => {
		const p = new Promise((resolve, reject) => {
			resolve({
				ok: true,
				json: function() {
					return {
						League: {
							Standard: {
								Stats: {
									latest: {
										ppg: "32.3",
										rpg: "4.9",
										apg: "4.5",
									},
								},
							},
						},
					};
				},
			});
		});

		return p;
	});
});

describe("Search", () => {
	const { getByLabelText, getByText, getByTestId, container } = render(
		<Provider store={createStore(reducer, applyMiddleware(searchPlayer))}>
			<Search />
		</Provider>,
	);

	const search = getByLabelText("Search for player stats");
	const searchButton = getByText("Search");

	it("should update input on change", () => {
		fireEvent.change(search, { target: { value: "Kevin Durant" } });
		expect(search.value).toBe("Kevin Durant");
	});

	it("should have a loading state", () => {
		fireEvent.click(searchButton);

		const loading = getByText("Loading");

		expect(loading).toBeTruthy();
	});

	it("should show player stats on the page", async () => {
		const ppg = await waitForElement(() => getByTestId("ppg"));
		const apg = await waitForElement(() => getByTestId("rpg"));
		const rpg = await waitForElement(() => getByTestId("apg"));

		expect(ppg.textContent).toBe("32.3");
		expect(apg.textContent).toBe("4.9");
		expect(rpg.textContent).toBe("4.5");
	});

	it("shouldn't be loading after successful search", () => {
		const loading = queryByText(container, "Loading");

		expect(loading).toBeNull();
	});
});
