import {configureStore} from "@reduxjs/toolkit";

import playerDataReducer from "./features/playerDataSlice.js";

const store = configureStore({
    reducer: {
        playerData: playerDataReducer,
    },
    preloadedState: loadState(),
}, );

store.subscribe(() => {
    saveState(store.getState());
})

function loadState() {
    if(localStorage.apState) {
        return JSON.parse(localStorage.apState);
    }
    return {};
}

function saveState(data) {
    localStorage.apState = JSON.stringify(data);
}

export default store;