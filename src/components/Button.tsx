import React from 'react'
interface ButtonProps {
    checkPattern: (e: React.MouseEvent<HTMLButtonElement>) => void;
    value: number;
}
const Button: React.FunctionComponent<ButtonProps> = ({ checkPattern, value }) => {
    return (
        <button
            type="button"
            className="btn btn-light px-3 py-2"
            aria-label={`${value}`}
            onClick={checkPattern}
        >{value}</button>
    )
}
export default Button;