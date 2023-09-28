import React from "react";

export default function SortIndicator({col, actual}) {
    console.log(col, actual);
    if(col !== actual && "!" + col !== actual) {
        return null;
    }

    if(actual[0] === "!") {
        return "🔼";
    }
    return "🔽";
}