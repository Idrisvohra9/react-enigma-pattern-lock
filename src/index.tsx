import React, { useState } from "react";
import "./App.css";
import Button from "./components/Button";

interface EnigmaPatternLockProps {
  pattern: string;
  format?: [string] | [];
  onSuccess: () => void;
  onFailure: () => void;
  totalTries: number | 5;
  changeKeypad: boolean | true;
  formatChangeBtn: boolean | true;
}
const EnigmaPatternLock: React.FunctionComponent<EnigmaPatternLockProps> = ({
  pattern,
  format,
  onSuccess,
  onFailure,
  totalTries,
  changeKeypad,
  formatChangeBtn
}) => {
  const originalButtonNos = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const allFormats = ["P", "Q", "R", "S"];
  const [currentPattern, setPattern] = useState(pattern);
  const [buttonNumbers, setButtonNumbers] = useState(originalButtonNos);
  const [currentFormatChar, setCurrentFormatChar] = useState("");
  // Initial Format setting logic:
  const [tries, setTries] = useState(0);
  const [enteredPattern, setEnteredPattern] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  if (format === undefined) {
    setCurrentFormatChar(allFormats[currentIndex]);
  } else if (format.length !== 0) {
    if (format.every(char => allFormats.includes(char))) {
      setCurrentFormatChar(format[currentIndex]);
    } else {
      console.warn("Invalid format character: " + format);
    }
  } else {
    setCurrentFormatChar("");
  }
  // Pattern -> String env variable, Format -> Array of currentFormatChar characters undefined: All formats | []: No formats and also the change button wouldn't be visible, onSuccess -> Callback function, onFailure -> Callback function, tries -> Number of tries, changeKeypad -> Boolean

  // "P" => Numeric Ascending Order, 
  // "Q" => shuffles odd with even, 
  // "R" => Reverse, 
  // "S" => first even then odd
  // Q => 1, 0, 3, 2, 5, 4, 7, 6, 9, 8

  if (enteredPattern.length === currentPattern.length) {
    // If success:
    if (currentPattern === enteredPattern) {
      onSuccess();
    } else {
      // If the tries are reached:
      if (tries === totalTries) {
        onFailure();
      }
      setTries(tries + 1);
    }
  }
  // Responsive input calculations:
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
      .toLocaleString()
      .replace(/,/g, "");
    changeButtons(temp);
    setPattern(newPattern);
  }
  function formatQ() {
    const arr = swapOddWithEven(originalButtonNos);
    const patternArr = swapOddWithEven(
      Array.from(pattern, (digit) => parseInt(digit, 10))
    );
    const newPattern = patternArr.toLocaleString().replace(/,/g, "");
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
      .toLocaleString()
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
        .toLocaleString()
        .replace(/,/g, "")
    );
  }
  function shuffleFormat(e: React.MouseEvent<HTMLButtonElement>) {
    // If user has specified format array
    if (format && format.length > 0) {
      setCurrentFormatChar(format[currentIndex])
      setCurrentIndex((currentIndex + 1) % format.length);
    }
    switch (currentFormatChar) {
      case "P":
        formatP();
        break;
      case "Q":
        formatQ();
        break;
      case "R":
        formatR();
        break;
      case "S":
        formatS();
        break;
      default:
        formatChangeBtn = false;
        break;
    }
    const targetElement = e.target as HTMLElement;
    if (targetElement) {
      targetElement.textContent = "🔀 Format";
      targetElement.textContent =
        targetElement.textContent + "(" + format + ")";
    }
  }
  function checkPattern(e: React.MouseEvent<HTMLButtonElement>) {
    const currentVal = e.currentTarget.innerHTML;
    setEnteredPattern((prevValue) => prevValue + currentVal);
  }
  return (
    <div className="enigma-pattern-container">
      <input
        type="password"
        name="text"
        className="input"
        placeholder="Enter Pattern.."
        readOnly
        style={{ width: pattern.length * inputWidthinPercent + "%" }}
        value={enteredPattern}
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
        formatChangeBtn && (
          <button
            className="btn btn-primary mt-3"
            type="button"
            onClick={shuffleFormat}
          >
            🔀 Format
          </button>
        )
      }
    </div>
  );
}

export default EnigmaPatternLock;
// TODO: 1. Warning alerts on tries depletions, 2. changing the classes with bootstrap stuff, 3. Adjusting the width according to the pattern length 4. Documentation, 5. Testing, 6. Publishing