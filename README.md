<p align="center">
  <img src="https://img.freepik.com/free-vector/vector-security-padlock-chrome-steel-with-dial-isolated-white_1284-48153.jpg?size=626&ext=jpg&uid=R84241264&ga=GA1.1.1605797513.1690805042&semt=ais" alt="Alt Text" width="80" height="80">
</p>

# React Enigma Pin Lock 🔐

- Used when dealing with Admin Auth if you are bored with simple enter username password screen.

- Provides an easier way to manage the related logic concisely.

- For example you can choose to handle the try depletion logic, on success and on failure events.

- Easily customizable: Uses default classes to apply custom css

## TL;DR;

React component that displays a pattern input field and a set of buttons.
[See Screenshots](#screenshots)

The user can enter a pattern by clicking on the buttons, and the component will check if the entered pattern matches the original pattern.
[See Use cases](#use-cases)

The buttons and the pattern/pin itself can be formatted in different ways by clicking on the "Format" button.

## Installation

npm:

```shell
npm i react-enigma-pattern-lock
```

yarn:

```shell
yarn add react-enigma-pattern-lock
```

## Props:

| Property        | Description                                                                                                                                                                                           | Type     |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| pin             | The pin set for authentication purposes (String env variable) 4 to 8 characters                                                                                                                       | String   |
| format          | Array of format characters representing the unique format of pin [See Format Characters](#format-characters) (optional)                                                                               | Array    |
| letterSpacing   | A value of letter spacing in unit 'rem' to make the letters fit perfectly as per your prefrence in the input field (Optional) default 2.3                                                                                                      | Number   |
| onSuccess       | Callback function to be executed on successful pin entry                                                                                                                                              | Function |
| onFailure       | Callback function executed when incorrect attempts exceed totalTries                                                                                                                                  | Function |
| onTryDepeletion | Callback function with the depleted number of tries for user-side alert                                                                                                                               | Function |
| totalTries      | Number of tries allowed for pin entry (optional default 5)                                                                                                                                            | Number   |
| changeKeypad    | Boolean indicating if format change affects keypad numbers (optional default true)                                                                                                                    | Boolean  |
| formatChangeBtn | Boolean to show/hide the formatChange button (optional default true) the button on click switches between the format characters and changes the format as per the provided characters in format prop. | Boolean  |

## Format Characters:

    "P" => Numeric Ascending Order,
    "Q" => Shuffles odd with even,
    "R" => Reverse,
    "S" => First even then odd

To understand format characters let us assume that the pin is **"1040"**. And the prop **changeKeypad** is set to true.

| Format | Pin  | Keypad Numbers               |
| ------ | ---- | ---------------------------- |
| P      | 0014 | 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 |
| Q      | 1040 | 1, 0, 3, 2, 5, 4, 7, 6, 9, 8 |
| R      | 0401 | 9, 8, 7, 6, 5, 4, 3, 2, 1, 0 |
| S      | 0401 | 0, 2, 4, 6, 8, 1, 3, 5, 7, 9 |

> **Note**: If the changeKeypad is set to false it will not change the keypad.

## Use cases:

Basic Code to get started:

```js
// Imports:
import EnigmaPatternLock from "react-enigma-pin-lock";
import "react-enigma-pin-lock/dist/styles/bundle.css";

// Component:
<EnigmaPatternLock
  pin="1020"
  totalTries={5}
  onSuccess={() => alert("Success")}
  onFailure={() => alert("Failure")}
  onTryDepeletion={(remainingTries) =>
    console.log("Tries remain: " + remainingTries)
  }
  formatChangeBtn
  letterSpacing={2}
  format={["P", "Q", "R", "S"]}
/>;
```

## Screenshots:

![Screenshot](https://github.com/Idrisvohra9/react-enigma-pattern-lock/raw/main/external-assets/Screenshot%201.png)
![Screenshot](https://github.com/Idrisvohra9/react-enigma-pattern-lock/raw/main/external-assets/Screenshot%202.png)
![Screenshot](https://github.com/Idrisvohra9/react-enigma-pattern-lock/raw/main/external-assets/Screenshot%203.png)
![Screenshot](https://github.com/Idrisvohra9/react-enigma-pattern-lock/raw/main/external-assets/Screenshot%204.png)
![Screenshot](https://github.com/Idrisvohra9/react-enigma-pattern-lock/raw/main/external-assets/Screenshot%205.png)
![Screenshot](https://github.com/Idrisvohra9/react-enigma-pattern-lock/raw/main/external-assets/Screenshot%206.png)

## <a href="https://github.com/Idrisvohra9/">Drop a follow or star

<img src="https://img.freepik.com/free-icon/github_318-698188.jpg?t=st=1692356345~exp=1692356945~hmac=8f6d91c75f74f99f8c65d96305f378bc79fc748eb7e66dd77e3056ccb3b6e7ee" width="30" alt="Github"/>
</a>

## <a href="https://www.npmjs.com/package/react-enigma-pin-lock">Check out NPM Package

<svg viewBox="0 0 780 250" width="30"><path fill="#231F20" d="M240,250h100v-50h100V0H240V250z M340,50h50v100h-50V50z M480,0v200h100V50h50v150h50V50h50v150h50V0H480z M0,200h100V50h50v150h50V0H0V200z"></path></svg>
</a>
