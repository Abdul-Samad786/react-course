//HookCounterOne.js

// useEffect is defined here

import { useState, useEffect } from "react";

function HookCounterOne() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        document.title = `You clicked ${count} times`;
        console.log("button is clickedd");
        
    }, [count]);

    return (
        <div>
            <button onClick={() => setCount((prevCount) => prevCount + 1)}>
                Click {count} times
            </button>
        </div>
    );
}
export default HookCounterOne;