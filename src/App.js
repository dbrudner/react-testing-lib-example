import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { reducer } from "./store";
import { composeWithDevTools } from "redux-devtools-extension";
import { searchPlayer } from "./midware";
import Search from "./Search";

const store = createStore(
	reducer,
	composeWithDevTools(applyMiddleware(searchPlayer)),
);

const App = () => (
	<Provider store={store}>
		<h1>Mark Jackson lol</h1>
		<Search />
	</Provider>
);

export default App;
