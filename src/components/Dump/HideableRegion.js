import React, { useState } from "react";

export default function HideableRegion({children, title, subtitle, defaultOpen=true}) {
    const [shown, setShown] = useState(defaultOpen);
    const onClick = () => {
        setShown(!shown);
    }
    const butan = (<button onClick={onClick}>{shown ? "Hide" : "Show"}</button>)

    return (<>
            {title ? <h2>{title} {butan}</h2> : null}
            {subtitle ? <h3>{subtitle} {title ? null : butan}</h3> : null}
            
            {shown ? <div>{children}</div> : null}
        </>
    )
}