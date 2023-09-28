import React from "react";
import HintMath from "../util/HintMath.js";

export default function HintTest() {
    const locs = [];
    for(let i = 0; i < 104; i++) {
        locs.push(i);
    }

    return (<table>
        <tbody>
            {locs.map(l => (
                <tr key={l}>
                    <td>{l}</td>
                    <td>{HintMath.hintsForChecks(l, locs.length, 14)}</td>
                </tr>
            ))}
        </tbody>
    </table>);
}