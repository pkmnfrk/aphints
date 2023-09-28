import React, { useState } from "react";
import Random from "util/Random.js";
import SpoilerLog from "spoiler/SpoilerLog.js";

import styles from "./index.icss";
import {by} from "util/sort.js";
import SortIndicator from "./SortIndicator.js";

/**
 * @typedef DumpOptions
 * @property {SpoilerLog} spoiler
 * @property {import("spoiler/World.js").default} world
 */
/**
 * @param {DumpOptions} param0 
 * @returns 
 */
export default function Dump({spoiler, world, onClose}) {
    const [randomSeed, setRandomSeed] = useState(Math.floor(Math.random() * 10000));

    const uncategorized = world.locations.filter(l => !l.region);
    const categorized = world.locations.filter(l => l.region);
    const random = new Random(randomSeed);
    const hints = world.game.produceHints(spoiler, random, world, 0, true);
    hints.sort();
    return (
        <>
            <button onClick={() => setRandomSeed(Math.floor(Math.random() * 10000))}>Refresh</button>
            <p>Current user is {world.name} <button onClick={() => onClose(null)}>Go Back</button></p>
            {uncategorized.length ? <>
            <h2>All Uncategorized Locations</h2>
            {createLocationTable(uncategorized, "uncategorized")}
            </> : null}
            <h2>Sample hints</h2>
            <ul>
                {hints.map((h, ix) => (
                    <li key={ix}>{h}</li>
                ))}
            </ul>
            {categorized.length ? <>
            <h2>All Categorized Locations</h2>
            {createLocationTable(categorized, "categorized")}
            </> : null}

            <h2>Playthrough</h2>
            {Object.entries(world.spheres).map(([sphere, locations], ix) => (
                <div key={ix}>
                    <h3>Sphere {sphere}</h3>
                    {createLocationTable(locations, "playthrough")}
                </div>
            ))}
            
            
        </>
    );
}

function createLocationTable(locations, id) {
    const [sortColumn, setSortColumn] = useState(null);
    const ourLocations = [...locations];
    const dir = (sortColumn && sortColumn[0] === "!") ? "desc" : "asc";
    
    let sortFunction = null;
    switch(sortColumn) {
        case "region":
        case "!region":
            sortFunction = by("region", "location", "check")[dir];
            break;
        case "item":
        case "!item":
            sortFunction = by("item", "for", "type")[dir];
            break;
        case "type":
        case "!type":
            sortFunction = by("type", "for", "item")[dir];
            break;
        case "for":
        case "!for":
            sortFunction = by("for", "type", "item")[dir];
            break;
    }

    if(id === "categorized") {
        console.log("Sort func for", id, "is", sortFunction);
    }

    if(sortFunction) {
        ourLocations.sort(sortFunction);
    }

    const setSort = (c) => {
        if(sortColumn === c) {
            console.log("Now sorting by", "!" + c);
            setSortColumn("!" + c);
        } else {
            console.log("Now sorting by", c);
            setSortColumn(c);
        }
    }
    return (<table className={styles.dataTable}>
        <thead>
            <tr>
                <th onClick={() => setSort("region")}>Region <SortIndicator col="region" actual={sortColumn} /></th>
                <th onClick={() => setSort("region")}>Location</th>
                <th onClick={() => setSort("region")}>Check</th>
                {/* <th>Raw</th> */}
                <th onClick={() => setSort("item")}>Item <SortIndicator col="item" actual={sortColumn} /></th>
                <th onClick={() => setSort("type")}>Type <SortIndicator col="type" actual={sortColumn} /></th>
                <th onClick={() => setSort("for")}>For <SortIndicator col="for" actual={sortColumn} /></th>
            </tr>
        </thead>
        <tbody>
        {ourLocations.map((l, ix) => (
            <tr key={ix}>
                <td>{l.region}</td>
                <td>{l.location}</td>
                <td>{l.check}</td>
                {/* <td>{l.raw}</td> */}
                <td>{l.item}</td>
                <td>{l.type}</td>
                {l.for !== l.world ? <td>{l.for}</td> : null}
            </tr>
        ))}
        </tbody>
    </table>);
}