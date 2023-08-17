import React, { useCallback, useEffect, useState } from "react";
import "../index.css";
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
interface EnigmaPatternLockProps {
    pattern: string;
    format?: Array<string>;
    onSuccess: () => void;
    onFailure: () => void;
    onTryDepeletion: (RemainingTries: number) => void;
    totalTries?: number;
    changeKeypad?: boolean;
    formatChangeBtn?: boolean;
}
/**
 * @package react-enigma-pattern-lock
 * React component that displays a pattern input field and a set of buttons.
 * The user can enter a pattern by clicking on the buttons, and the component will check if the entered pattern matches the original pattern.
 * The buttons and the pattern/pin itself can be formatted in different ways by clicking on the "Format" button.
 * @param pattern The pattern set for the authentication purposes it can be a String env variable.
 * @param format? Array of characters that represent the uniquie format pattern if undefined: All formats | []: No formats, the change button wouldn't be visible.
 * @param onSuccess Callback function if the pin is successfully entered.
 * @param onFailure Callback function if incorrect attempts have been made more than the specified totalTries.
 * @param onTryDepeletion Callback function with the number of tries getting depleted to handle the alert on the user side.
 * @param totalTries? Number of tries set to attempt the pin.
 * @param changeKeypad? Boolean if change in format affects the keypad numbers
 * @param formatChangeBtn? Boolean to hide or show the formatChange button default true.
 * 
 * 
 * @returns {JSX.Element} The Enigma pattern authenticator
 */
const EnigmaPatternLock: React.FunctionComponent<EnigmaPatternLockProps> = ({
    pattern,
    format,
    onSuccess,
    onFailure,
    onTryDepeletion,
    totalTries = 5,
    changeKeypad = true,
    formatChangeBtn = true,
}) => {
    const originalButtonNos = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const allFormats = ["P", "Q", "R", "S"];
    const [currentPattern, setPattern] = useState(pattern);
    const [buttonNumbers, setButtonNumbers] = useState(originalButtonNos);
    const [currentFormatChar, setCurrentFormatChar] = useState("P");
    // Initial Format setting logic:
    const [remainingTries, setRemainingTries] = useState(totalTries);
    const [enteredPattern, setEnteredPattern] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const formatMapping: Record<string, () => void> = {
        P: formatP,
        Q: formatQ,
        R: formatR,
        S: formatS,
    };

    // Pattern -> String env variable, Format -> Array of currentFormatChar characters undefined: All formats | []: No formats and also the change button wouldn't be visible, onSuccess -> Callback function, onFailure -> Callback function, remainingTries -> Number of remainingTries, changeKeypad -> Boolean

    // "P" => Numeric Ascending Order, 
    // "Q" => shuffles odd with even, 
    // "R" => Reverse, 
    // "S" => first even then odd
    // Q => 1, 0, 3, 2, 5, 4, 7, 6, 9, 8

    // Check pattern logic
    const checkPatternLogic = useCallback(() => {
        if (enteredPattern.length === currentPattern.length) {
            if (currentPattern === enteredPattern) {
                onSuccess();
            } else {
                if (remainingTries > 1) {
                    const newRemainingTries = remainingTries - 1;
                    setRemainingTries(newRemainingTries);
                    onTryDepeletion(newRemainingTries);
                    setEnteredPattern("");
                } else {
                    onFailure();
                }
            }
        }
    }, [currentPattern, enteredPattern, remainingTries, onSuccess, onFailure, onTryDepeletion]);

    //   // Responsive input calculations:
    const inputWidthinPercent =
        window.innerWidth > 400
            ? window.innerWidth >= 400 && window.innerWidth <= 900
                ? 10
                : 6
            : 18;
    function changeButtons(newButtonNumbers: number[]): void {
        if (changeKeypad) {
            setButtonNumbers(newButtonNumbers);
        }
    }
    function formatP() {
        const temp = buttonNumbers;
        temp.sort((a, b) => a - b);
        const newPattern = Array.from(pattern, digits => parseInt(digits, 10))
            .sort((a, b) => a - b)
            .toString()
            .replace(/,/g, "");
        changeButtons(temp);
        setPattern(newPattern);
    }
    function formatQ() {
        const arr = swapOddWithEven(originalButtonNos);
        const patternArr = swapOddWithEven(
            Array.from(pattern, (digit) => parseInt(digit, 10))
        );
        const newPattern = patternArr.toString().replace(/,/g, "");
        changeButtons(arr);
        setPattern(newPattern);
    }
    function swapOddWithEven(arr: Array<number>) {
        const oddNumbers = [];
        const evenNumbers = [];

        for (const num of arr) {
            if (num % 2 === 0) {
                evenNumbers.push(num);
            } else {
                oddNumbers.push(num);
            }
        }

        const shuffledArray = [];
        const maxLength = Math.max(oddNumbers.length, evenNumbers.length);

        for (let i = 0; i < maxLength; i++) {
            if (oddNumbers[i] !== undefined) {
                shuffledArray.push(oddNumbers[i]);
            }
            if (evenNumbers[i] !== undefined) {
                shuffledArray.push(evenNumbers[i]);
            }
        }
        return shuffledArray;
    }
    function formatR() {
        const temp = originalButtonNos.reverse();
        const newPattern = Array.from(pattern)
            .reverse()
            .toString()
            .replace(/,/g, "");
        changeButtons(temp);
        setPattern(newPattern);
    }
    function firstEvenLastOdd(arr: Array<number>) {
        const evenPart = [];
        const oddPart = [];
        for (let i = 0; i < arr.length; i++) {
            // If even add it
            if (arr[i] % 2 === 0) {
                evenPart.push(arr[i]);
            } else {
                oddPart.push(arr[i]);
            }
        }
        const resultArr = evenPart.concat(oddPart);
        return resultArr;
    }
    function formatS() {
        changeButtons(firstEvenLastOdd(originalButtonNos));
        setPattern(
            firstEvenLastOdd(Array.from(pattern, (digit) => parseInt(digit, 10)))
                .toString()
                .replace(/,/g, "")
        );
    }
    function applyFormat(arr: Array<string>) {
        const nextFormatChar = arr[currentIndex];
        setCurrentFormatChar(nextFormatChar);
        setCurrentIndex(currentIndex + 1);
        // console.log(currentIndex);
        const formatFunction = formatMapping[nextFormatChar];
        formatFunction();
        if (currentIndex === arr.length - 1) {
            setCurrentIndex(0);
        }
    }
    const shuffleFormat = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            // If format array of characters is provided
            if (format && format.length > 0) {
                applyFormat(format);
                // If it is not provided
            } else if (!format) {
                applyFormat(allFormats);
            }

            const targetElement = e.target as HTMLElement;
            if (targetElement) {
                targetElement.textContent = "🔀 Format";
                targetElement.textContent =
                    targetElement.textContent + "(" + currentFormatChar + ")";
            }
        },
        [currentFormatChar, currentIndex, format]
    );

    const checkPattern = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            const currentVal = e.currentTarget.innerHTML;
            setEnteredPattern((prevValue) => prevValue + currentVal);
        },
        []
    );
    useEffect(() => {

        // Call the pattern checking logic here
        checkPatternLogic();
        // If format is not specified make the first format action to be the first format character
        if (!format) {
            setCurrentFormatChar(allFormats[currentIndex]);
            // If the format array of characters is provided consider all the formats to be applied one by one:
        } else if (format.length !== 0) {
            // Check if the format array characters is included in the format array
            if (format.every(char => allFormats.includes(char))) {
                setCurrentFormatChar(format[currentIndex]);
            } else {
                console.error("Invalid format character: " + format);
            }
        } else {
            setCurrentFormatChar("");
        }
    }, [checkPatternLogic, currentIndex, format]);

    return (
        <div className="enigma-pattern-container">
            <input
                type="password"
                name="text"
                className="enigma-input"
                placeholder="Enter Pattern.."
                readOnly
                value={enteredPattern}
                style={{ width: pattern.length * inputWidthinPercent + "%" }}

            />
            <div className="btns-container">
                {buttonNumbers.map((num, i) => (
                    <Button value={num} key={i} checkPattern={checkPattern} />
                ))}
            </div>
            <button
                className="btn btn-danger mt-3"
                type="reset"
                onClick={() => setEnteredPattern("")}
            >
                ↩ Clear
            </button>
            {
                formatChangeBtn && format?.length ? (
                    <button
                        className="btn btn-primary mt-3"
                        type="button"
                        onClick={shuffleFormat}
                    >
                        🔀 Format
                    </button>
                ) : ""
            }
        </div>
    );
}

export default EnigmaPatternLock;
