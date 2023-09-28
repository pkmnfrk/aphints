import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {setServerInfo} from "features/playerDataSlice.js";
import HintTest from "../HintTest.js";

import styles from "./index.icss";

export default function WorldSelector({spoiler, onChooseWorld, onChooseDump}) {
    const dispatch = useDispatch();
    const playerData = useSelector(state => state.playerData);

    const onServerChange = (value) => {
        dispatch(setServerInfo({
            server: value,
            port: playerData.port,
        }));
    };

    const onPortChange = (value) => {
        value = parseInt(value, 10);
        dispatch(setServerInfo({
            server: playerData.server,
            port: value,
        }));
    }

    return (
    <>
        <div>
            Host: <input type="text" defaultValue={playerData.server} onChange={(e) => onServerChange(e.currentTarget.value)} />&nbsp;
            Port: <input type="text" defaultValue={playerData.port} onChange={(e) => onPortChange(e.currentTarget.value)} style={{width: 60}}/><br/>
        </div>
        <table className={styles.table}>
            <thead>
            <tr>
                <th>Player</th>
                <th>Game</th>
                <th>Connect</th>
                <th>Dump</th>
            </tr>
            </thead>
            <tbody>
            {Object.values(spoiler.worlds).map((world, ix) => (
                <tr key={ix}>
                    <td>{world.name}</td>
                    <td>{world.game.name}</td>
                    {world.game.generateHints ? (
                        <td><button onClick={() => onChooseWorld(world.name)}>Connect</button></td>
                    ) : (
                        <td>Not supported</td>
                    )}
                    <td><button onClick={() => onChooseDump(world.name)}>Dump</button></td>
                </tr>
            ))}
            </tbody>
        </table>
    </>);

}