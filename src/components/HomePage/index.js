import React, {useEffect, useRef, useState } from "react";
import SpoilerLog from "spoiler/SpoilerLog.js";
import WorldSelector from "components/WorldSelector/index.js";
import World from "components/World/index.js";
import Dump from "components/Dump/index.js";

import styles from "./index.icss";
import Random from "util/Random.js";
import { useDispatch, useSelector } from "react-redux";
import { setSeed, setName, setSlot, unsetSlot } from "features/playerDataSlice.js";

export default function HomePage() {
    /**
     * @var {SpoilerLog} spoiler
     */
    const [spoiler, setSpoiler] = useState();
    const playerData = useSelector(state => state.playerData);
    const dispatch = useDispatch();
    const [connectError, setConnectError] = useState(null);

    const [currentDump, setCurrentDump] = useState(null);
    
    useEffect(() => {
        const onDragOver = (e) => {
            e.preventDefault();
        }

        /** @param {DragEvent} e */
        const onDrop = async (e) => {
            console.log("On drop");
            e.preventDefault();

            if(e.dataTransfer.items) {
                console.log("Items");
                for(const item of e.dataTransfer.items) {
                    if(item.kind === "file") {
                        const file = item.getAsFile();
                        const text = await file.text();
                        localStorage.spoiler = text;
                        const spoiler = SpoilerLog.parse(text);
                        setSpoiler(spoiler);
                        dispatch(setSeed({seed: spoiler.seed}))
                        // console.log(spoiler);
                    }
                }
                
            } else {
                console.log("Files");
                // Use DataTransfer interface to access the file(s)
                [...ev.dataTransfer.files].forEach((file, i) => {
                    console.log(`… file[${i}].name = ${file.name}`);
                });
            }
        };

        if(!spoiler && localStorage.spoiler) {
            const s = SpoilerLog.parse(localStorage.spoiler);
            setSpoiler(s);
            console.log("Spoiler", s);
            dispatch(setSeed({seed: s.seed}))
        }

        document.addEventListener("dragover", onDragOver);
        document.addEventListener("drop", onDrop);

        return () => {
            document.removeEventListener("dragover", onDragOver);
            document.removeEventListener("drop", onDrop);
        };
    }, [])

    

    if(spoiler) {
        const onChooseWorld = (worldName) => {
            const world = spoiler.worlds[worldName];
            dispatch(setSlot({
                slot: world.slot,
                name: worldName,
            }))
            setConnectError(null);
        }

        const onChooseDump = (worldName) => {
            setCurrentDump(worldName);
        }

        const onDisconnect = (e) => {
            dispatch(unsetSlot({}))

            if(e) {
                console.log(e);
                setConnectError(e);
            }
        }

        const onCloseDump = () => {
            setCurrentDump(null);
        }

        const slot = playerData.currentSlot ? playerData.slots[playerData.currentSlot] : null;
        const world = slot ? spoiler.worlds[slot.name] : null;
        
        return (<>
            
            <p>Archipelago Version: {spoiler.archipelagoVersion}</p>
            {
                connectError ? <div>Error connecting to server: {connectError.message ?? "unable to connect"}</div> : null
            }
            <div>
                {
                    world ? 
                    <World spoiler={spoiler} world={world} onDisconnect={onDisconnect} /> :
                    (currentDump ?
                        <Dump spoiler={spoiler} world={spoiler.worlds[currentDump]} onClose={onCloseDump} /> :
                        <WorldSelector spoiler={spoiler} onChooseWorld={onChooseWorld} onChooseDump={onChooseDump} />
                    )
                    
                }
            </div>
            <div>
                <h3>How to use</h3>
                <ul>
                    <li>If connecting to a live game, enter the server host and port. Then click connect, and start doing checks</li>
                    <li>If inspecting data, just click Dump button. No server required for this.</li>
                </ul>
            </div>
        </>);
    } else {
        return <p>Drop a spoiler log</p>
    }
}

/**
 * 
 * @param {import("../../spoiler/World").default} world 
 * @param {number} ix
 * @param {SpoilerLog} spoiler
 * @param {Random} random
 */
function createWorld(world, ix, spoiler, random, ap, collectedItems) {
    const hints = world.game.produceHints(spoiler, random, world);
    const onConnect = () => {
        if(!ap.current) {
            return;
        }

        ap.current.setUserAndGame(world.name, world.game.name).then(() => {
            ap.current.connect();
        });
    }
    const num = collectedItems ? collectedItems.length : 0;
    return (<div key={ix} className={styles.world}>
        <h2>{world.name} ({num})</h2>
        <button onClick={onConnect}>Connect</button>
        <p>{world.game.wayOfThe}</p>

    </div>);
}