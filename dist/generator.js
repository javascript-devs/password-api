"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65, 90);
const LOWERCASE_CHAR_CODES = arrayFromLowToHigh(97, 122);
const NUMBER_CHAR_CODES = arrayFromLowToHigh(48, 57);
const SYMBOL_CHAR_CODES = arrayFromLowToHigh(33, 47)
    .concat(arrayFromLowToHigh(58, 64))
    .concat(arrayFromLowToHigh(91, 96))
    .concat(arrayFromLowToHigh(123, 126));
function generatePassword(includeUppercase, includeSymbols, includeNumbers, characterAmount) {
    let charCodes = LOWERCASE_CHAR_CODES;
    if (includeUppercase)
        charCodes = charCodes.concat(UPPERCASE_CHAR_CODES);
    if (includeSymbols)
        charCodes = charCodes.concat(SYMBOL_CHAR_CODES);
    if (includeNumbers)
        charCodes = charCodes.concat(NUMBER_CHAR_CODES);
    const passwordCharacters = [];
    for (let i = 0; i < characterAmount; i++) {
        const characterCode = charCodes[Math.floor(Math.random() * charCodes.length)];
        passwordCharacters.push(String.fromCharCode(characterCode));
    }
    return passwordCharacters.join("");
}
exports.default = generatePassword;
function arrayFromLowToHigh(low, high) {
    const array = [];
    for (let i = low; i <= high; i++) {
        array.push(i);
    }
    return array;
}
//# sourceMappingURL=generator.js.map