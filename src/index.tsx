import React, { useCallback, useEffect, useState } from "react";
import "./styles/index.css";
interface ButtonProps {
    checkPin: (e: React.MouseEvent<HTMLButtonElement>) => void;
    value: number;
}
const Button: React.FunctionComponent<ButtonProps> = ({ checkPin, value }): React.JSX.Element => {
    return (
        <button
            type="button"
            className="btn btn-light px-3 py-2"
            aria-label={`${value}`}
            onClick={checkPin}
        >{value}</button>
    )
}
interface EnigmaPinLockProps {
    pin: string | undefined;
    format?: Array<string>;
    letterSpacing?: number;
    onSuccess: () => void;
    onFailure: () => void;
    onTryDepeletion: (RemainingTries: number) => void;
    totalTries?: number;
    getRemainingTries?: (RemainingTries: number) => void;
    changeKeypad?: boolean;
    formatChangeBtn?: boolean;
}
/**
 * @package react-enigma-pin-lock
 * React component that displays a pin input field and a set of buttons.
 * The user can enter a pin by clicking on the buttons, and the component will check if the entered pin matches the original pin.
 * The buttons and the pin itself can be formatted in different ways by clicking on the "Format" button.
 * @param pin The pin set for the authentication purposes it can be a String env variable.
 * @param format? Array of characters that represent the uniquie format pin if undefined: All formats | []: No formats, the change button wouldn't be visible.
 * @param onSuccess Callback function if the pin is successfully entered.
 * @param onFailure Callback function if incorrect attempts have been made more than the specified totalTries.
 * @param onTryDepeletion Callback function with the number of tries getting depleted to handle the alert on the user side.
 * @param totalTries? Number of tries set to attempt the pin.
 * @param changeKeypad? Boolean if change in format affects the keypad numbers
 * @param formatChangeBtn? Boolean to hide or show the formatChange button default true.
 * 
 * 
 * @returns {JSX.Element} The Enigma pin authenticator
 */
const EnigmaPinLock: React.FunctionComponent<EnigmaPinLockProps> = ({
    pin = "",
    format,
    letterSpacing = 2.3,
    onSuccess,
    onFailure,
    onTryDepeletion,
    getRemainingTries,
    totalTries = 5,
    changeKeypad = true,
    formatChangeBtn = true,
}): React.JSX.Element => {
    const originalButtonNos = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const allFormats = ["P", "Q", "R", "S"];
    const [currentPin, setPin] = useState(pin);
    const [buttonNumbers, setButtonNumbers] = useState(originalButtonNos);
    const [currentFormatChar, setCurrentFormatChar] = useState("P");
    // Initial Format setting logic:
    const [remainingTries, setRemainingTries] = useState(Number(localStorage.getItem("remainingTries")) || totalTries);
    const [enteredPin, setEnteredPin] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const formatMapping: Record<string, () => void> = {
        P: formatP,
        Q: formatQ,
        R: formatR,
        S: formatS,
    };
    // "P" => Numeric Ascending Order, 
    // "Q" => shuffles odd with even, 
    // "R" => Reverse, 
    // "S" => first even then odd
    // Q => 1, 0, 3, 2, 5, 4, 7, 6, 9, 8

    // Check pin logic
    const checkPinLogic = useCallback(() => {
        if (enteredPin.length === currentPin.length) {
            if (currentPin === enteredPin) {
                onSuccess();
            } else {
                if (remainingTries > 1) {
                    const newRemainingTries = remainingTries - 1;
                    setRemainingTries(newRemainingTries);
                    localStorage.setItem("remainingTries", String(newRemainingTries));
                    onTryDepeletion(newRemainingTries);
                    setEnteredPin("");
                } else {
                    onFailure();
                }
            }
        }
    }, [currentPin, enteredPin, remainingTries, onSuccess, onFailure, onTryDepeletion]);

    function changeButtons(newButtonNumbers: number[]): void {
        if (changeKeypad) {
            setButtonNumbers(newButtonNumbers);
        }
    }
    function formatP() {
        const temp = buttonNumbers;
        temp.sort((a, b) => a - b);
        const newPin = Array.from(pin, digits => parseInt(digits, 10))
            .sort((a, b) => a - b)
            .toString()
            .replace(/,/g, "");
        changeButtons(temp);
        setPin(newPin);
    }
    function formatQ() {
        const arr = swapOddWithEven(originalButtonNos);
        const PinArr = swapOddWithEven(
            Array.from(pin, (digit) => parseInt(digit, 10))
        );
        const newPin = PinArr.toString().replace(/,/g, "");
        changeButtons(arr);
        setPin(newPin);
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
        const newPin = Array.from(pin)
            .reverse()
            .toString()
            .replace(/,/g, "");
        changeButtons(temp);
        setPin(newPin);
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
        setPin(
            firstEvenLastOdd(Array.from(pin, (digit) => parseInt(digit, 10)))
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

    const checkPin = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            const currentVal = e.currentTarget.innerHTML;
            setEnteredPin((prevValue) => prevValue + currentVal);
        },
        []
    );
    useEffect(() => {
        getRemainingTries?.(remainingTries);
        if (!pin) {
            console.error("No pin provided in the EnigmaPin component. Please provide a pin.");
        } else {
            if (pin.length > 8) {
                console.warn("Using a pin this long is not recommended.")
            }
            else if (pin.length < 4) {
                console.warn("Using a pin this short is not recommended.")
            } else {
                // Call the pin checking logic here
                checkPinLogic();
            }
        }
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
    }, [checkPinLogic, currentIndex, format]);

    return (
        <div className="enigma-pin-container">
            <input
                type="password"
                name="text"
                className="enigma-input"
                placeholder="Enter Pin.."
                readOnly
                value={enteredPin}
                style={{ letterSpacing: `${letterSpacing}rem` }}

            />
            <div className="btns-container">
                {buttonNumbers.map((num, i) => (
                    <Button value={num} key={i} checkPin={checkPin} />
                ))}
            </div>
            <button
                className="btn btn-danger mt-3"
                type="reset"
                onClick={() => setEnteredPin("")}
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

export default EnigmaPinLock;
