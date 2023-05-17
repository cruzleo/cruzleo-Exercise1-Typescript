"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.movingZeros = exports.changeString = exports.validateISBN = exports.searchResult = exports.displayList = exports.addCity = void 0;
class CityDir {
    constructor(cityName, country, population) {
        this.cityName = cityName;
        this.country = country;
        this.population = population;
    }
}
let cityDirArray = [];
let list = document.getElementById("cityList");
const addCity = (cityName, country, population) => {
    const cityDir = new CityDir(cityName, country, population);
    cityDirArray.push(cityDir);
    localStorage.setItem("cityDirectory", JSON.stringify(cityDirArray));
    // clearing input fields
    const cityNameField = document.getElementById("cityName");
    const countryField = document.getElementById("country");
    const populationField = document.getElementById("population");
    cityNameField.value = "";
    countryField.value = "";
    populationField.value = "";
    (0, exports.displayList)(cityDirArray);
};
exports.addCity = addCity;
cityDirArray = JSON.parse(localStorage.getItem("cityDirectory") || "[]");
const displayList = (cityArray) => {
    if (list) {
        while (list.hasChildNodes() && list.firstChild) {
            list.removeChild(list.firstChild);
        }
    }
    cityArray.forEach((data) => {
        let li = document.createElement("li");
        li.innerText = `City: "${data.cityName}" Country: "${data.country}" Population: ${data.population}`;
        list === null || list === void 0 ? void 0 : list.appendChild(li);
    });
};
exports.displayList = displayList;
(0, exports.displayList)(cityDirArray);
const searchResult = (search) => {
    const filteredList = cityDirArray.filter((data) => {
        return (data.cityName.toLowerCase().includes(search.toLowerCase()) ||
            data.country.toLowerCase().includes(search.toLowerCase()));
    });
    (0, exports.displayList)(filteredList);
};
exports.searchResult = searchResult;
// 2. ISBN - 10 Validation
const validateISBN = (isbn) => {
    const isbnField = document.getElementById("isbn");
    isbnField.value = "";
    let result = document.getElementById("isbnResult");
    const isbnStr = isbn.replace(/[-\s]/g, "");
    let parag = document.createElement("p");
    if (isbnStr.length !== 10) {
        parag.innerText = `${isbnStr} is not a valid ISBN`;
        result === null || result === void 0 ? void 0 : result.appendChild(parag);
    }
    let sum = 0;
    for (let i = 0; i < isbnStr.length; i++) {
        let num = 0;
        if (isbnStr[i].toLowerCase() === "x") {
            sum += 10 * 10;
        }
        else {
            num = parseInt(isbnStr[i], 10);
            if (isNaN(num)) {
                parag.innerText = `${isbnStr} is not a valid ISBN`;
                result === null || result === void 0 ? void 0 : result.appendChild(parag);
            }
        }
        sum += num * (i + 1);
    }
    if (sum % 11 === 0) {
        parag.innerText = `${isbnStr} is a valid ISBN`;
        result === null || result === void 0 ? void 0 : result.appendChild(parag);
    }
    else {
        parag.innerText = `${isbnStr} is not a valid ISBN`;
        result === null || result === void 0 ? void 0 : result.appendChild(parag);
    }
};
exports.validateISBN = validateISBN;
// 3. Change it up!
const changeString = (input) => {
    const inputField = document.getElementById("wordInput");
    inputField.value = "";
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const vowels = "aeiou";
    let result = "";
    for (let i = 0; i < input.length; i++) {
        let char = input[i].toLowerCase();
        if (alphabet.includes(char)) {
            const currentIndex = alphabet.indexOf(char);
            const nextIndex = (currentIndex + 1) % 26; // Wrap around from 'z' to 'a'
            char = alphabet[nextIndex];
        }
        if (vowels.includes(char)) {
            char = char.toUpperCase();
        }
        result += char;
    }
    let changeResult = document.getElementById("changeResult");
    let parag = document.createElement("p");
    parag.innerText = `Result: ${result}`;
    changeResult === null || changeResult === void 0 ? void 0 : changeResult.appendChild(parag);
    console.log(result);
    return result;
};
exports.changeString = changeString;
// 4. Moving zeroes to the end
const movingZeros = (input) => {
    let result = [];
    let index = 0;
    for (let i = 0; i < input.length; i++) {
        if (input[i] !== 0) {
            result[index++] = input[i];
        }
    }
    while (index < input.length) {
        result[index++] = 0;
    }
    return result;
};
exports.movingZeros = movingZeros;
console.log((0, exports.movingZeros)([false, 1, 0, 1, 2, 0, 1, 3, "a"]));
console.log((0, exports.movingZeros)([0, 0, 0, 1, false, 0, "b", 3, "a", 2]));
