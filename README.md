<p align="center">
  <img src="https://img.freepik.com/free-vector/vector-security-padlock-chrome-steel-with-dial-isolated-white_1284-48153.jpg?size=626&ext=jpg&uid=R84241264&ga=GA1.1.1605797513.1690805042&semt=ais" alt="Alt Text" width="80" height="80">
</p>

# React Enigma Pattern Lock 🔐

## Used when dealing with Admin Auth if you are bored with simple enter username password screen.

## Provides an easier way to manage the related logic concisely.

### For example you can choose to handle the try depletion logic, on success and on failure events.

## TL;DR;

React component that displays a pattern input field and a set of buttons.
The user can enter a pattern by clicking on the buttons, and the component will check if the entered pattern matches the original pattern.

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

- pattern: The pattern set for the authentication purposes it can be a String env variable.
- format?: Array of characters that represent the uniquie format pattern if undefined: All formats | []: No formats, the change button wouldn't be visible.
- onSuccess: Callback function if the pin is successfully entered.
- onFailure: Callback function if incorrect attempts have been made more than the specified totalTries.
- onTryDepeletion: Callback function with the number of tries getting depleted to handle the alert on the user side.
- totalTries?: Number of tries set to attempt the pin.
- changeKeypad?: Boolean if change in format affects the keypad numbers
- formatChangeBtn?: Boolean to hide or show the formatChange button.

## Use cases:

## Screenshots:
