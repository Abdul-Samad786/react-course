import React, { useId, forwardRef } from "react";
function Select(
    {
        options = [],
        label,
        className = "",
        ...props
    },
    ref
) {
    const id = useId();

    return (
        <div className="w-full">
            {label && (
                <label htmlFor={id}>
                    {label}
                </label>
            )}

            <select
                id={id}
                ref={ref}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}z`}
                {...props}
                
            >
                {options?.map((option)=>{
                    <optin key={option} value={option}>{option}</optin>
                })}

            </select>
        </div>
    );
};

export default forwardRef(Select);