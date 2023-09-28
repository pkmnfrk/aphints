import React, { useEffect, useRef, useState } from "react";
//import Archipelago from "components/Archipelago2.js";
import { useArchipelago } from "features/useArchipelago.js";
import {checkLocation, setSlot, setNumHints} from "features/playerDataSlice.js";
import { useDispatch, useSelector } from "react-redux";
import Random from "util/Random.js";
import HintMath from "../../util/HintMath.js";
import SpoilerLog from "spoiler/SpoilerLog.js";

/**
 * @typedef WorldOptions
 * @property {SpoilerLog} spoiler
 * @property {import("spoiler/World.js").default} world
 */
/**
 * @param {WorldOptions} param0 
 * @returns 
 */
export default function World({spoiler, world, onDisconnect}) {
    const playerData = useSelector(state => state.playerData);
    const slot = useSelector(state => state.playerData.slots[state.playerData.currentSlot]);
    const checkedLocations = slot.checkedLocations;

    const dispatch = useDispatch();
    const [hints] = useState(() => {
        const random = new Random(spoiler.seed);
        return random.shuffle(world.game.produceHints(spoiler, random, world, world.game.hintCount));
    });
    const [ready, setReady] = useState(false);

    const onCollectedItem = (slot, location, item) => {
        // console.log("onCollectedItem", slot, location, playerData.slot);
        if(location < 0) {
            // -1 = cheat console
            // -2 = server
            // idk what these are, but they are not relevant
            return;
        }
        dispatch(checkLocation({
            slot,
            location,
        }));
    };

    /** @param {import("archipelago.js").ConnectedPacket} data */
    const onAuthenticated = (data) => {
        setReady(true);

        world.game.loadContextFromRoom(world, data.slot_data, apClient.data.package[world.game.name]);
    };

    const apClient = useArchipelago(playerData.server, playerData.port, world.game.name, world.name, onAuthenticated, onCollectedItem, onDisconnect);
    const desiredHints = HintMath.hintsForChecks(checkedLocations.length, world.locations.length, hints.length);
    const producedHints = hints.slice(0, desiredHints);
    const nextHint = producedHints.length < hints.length ? HintMath.checksForHint(producedHints.length + 1, checkedLocations.length, world.locations.length, hints.length) : null;

    // console.log("Hints", desiredHints, nextHint);
    const dataPackage = apClient.data.package.get(world.game.name)

    useEffect(() => {
        const start = slot.numHints??0; 
        if(ready && start !== desiredHints) {
            for(let i = start; i < desiredHints; i++) {
                const msg = `${world.name} has discovered a hint: ${hints[i]}`;
                console.log("Saying?", msg);
                apClient.say(msg);
            }
            dispatch(setNumHints({ numHints: desiredHints }))
        }
    }, [ready, slot.numHints, desiredHints])
    const locations = world.locations.map(l => l.specificLocation);
    locations.sort();

    return (
        <>
            <p>Current user is {world.name} <button onClick={() => onDisconnect(null)}>Disconnect</button></p>
            <p>You have found {checkedLocations.length} out of {world.locations.length} locations. {nextHint ? <>Next hint at {nextHint} locations.</>:null}</p>
            {producedHints.length > 0 ? <><p>You have discovered the following {producedHints.length} hints (out of {hints.length}):</p>
                <ol>
                    {producedHints.map((h, i) => <li key={i}>{h}</li>)}
                </ol>
            </> : null}

            {/*
            {dataPackage && checkedLocations.length > 0 ? (<>
            <h2>Checked Locations</h2>
            <ul>
                {checkedLocations.map((l, ix) => (
                    <li key={ix}>{dataPackage.location_id_to_name[l] ?? l}</li>
                ))}
            </ul>
            </>) : null}
                */}
        </>
    );
}
