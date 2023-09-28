import { createSlice } from "@reduxjs/toolkit";

export const playerDataSlice = createSlice({
    name: "playerData",
    initialState: {
        seed: null,
        slots: {},
        currentSlot: 0,
        server: "archipelago.gg",
        port: 38281,
        numHints: 0,
    },

    reducers: {
        setSeed(state, action) {
            if(state.seed !== action.payload.seed) {
                state.seed = action.payload.seed;
                state.slots = {};
            }
            return state;
        },

        setName(state, action) {
            const {slot = state.currentSlot, name} = action.payload;

            if(!state.slots[slot]) {
                state.slots[slot] = {
                    name,
                    checkedLocations: [],
                    numHints: 0,
                }
            }
            state.slots[slot].name = name;
            
            return state;
        },

        setSlot(state, action) {
            const {slot, name} = action.payload;

            state.currentSlot = slot;

            if(!state.slots[slot]) {
                state.slots[slot] = {
                    name,
                    checkedLocations: [],
                    numHints: 0,
                }
            } else {
                if(name) {
                    state.slots[slot].name = name;
                }
            }

            return state;
        },

        unsetSlot(state, action) {
            state.currentSlot = null;
            return state;
        },

        unsetSeed(state, action) {
            state.seed = null;
            state.currentSlot = 0;
            state.slots = {};
            return state;
        },

        checkLocation(state, action) {
            const {slot: targetSlot, location} = action.payload;

            const slot = targetSlot ? targetSlot : state.currentSlot;

            if(!state.slots[slot]) {
                state.slots[slot] = {
                    name: null,
                    checkedLocations: [
                        location
                    ],
                    numHints: 0,
                }
            } else {
                if(state.slots[slot].checkedLocations.indexOf(location) === -1) {
                    state.slots[slot].checkedLocations.push(location);
                }
            }

            return state;
        },

        setServerInfo(state, action) {
            state.server = action.payload.server;
            state.port = action.payload.port;
        },

        setNumHints(state, action) {
            const {slot = state.currentSlot, numHints} = action.payload;

            if(!state.slots[slot]) {
                state.slots[slot] = {
                    name: null,
                    checkedLocations: [],
                    numHints,
                }
            } else {
                state.slots[slot].numHints = numHints;
            }
        }
    }
});


export const { setSeed, unsetSeed, setSlot, setName, checkLocation, setServerInfo, setNumHints, unsetSlot } = playerDataSlice.actions;

export default playerDataSlice.reducer;
