<p align="center">
  <img src="https://img.freepik.com/free-vector/vector-security-padlock-chrome-steel-with-dial-isolated-white_1284-48153.jpg?size=626&ext=jpg&uid=R84241264&ga=GA1.1.1605797513.1690805042&semt=ais" alt="Alt Text" width="80" height="80">
</p>

# React Enigma Pattern Lock 🔐

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
| P      | 0014 | 1, 2, 3, 4, 5, 6, 7, 8, 9    |
| Q      | 1040 | 1, 0, 3, 2, 5, 4, 7, 6, 9, 8 |
| R      | 0401 | 9, 8, 7, 6, 5, 4, 3, 2, 1    |
| S      | 0401 | 0, 2, 4, 6, 8, 1, 3, 5, 7    |

> **Note**: If the changeKeypad is set to false it will not change the keypad.

## Use cases:

## Screenshots:
