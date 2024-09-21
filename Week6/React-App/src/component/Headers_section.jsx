
// doing using react.memo
import React from "react"

const Headers= React.memo(function Headers(props){
    return <div>
        Welcome {props.title};
    </div>
})

export default Headers