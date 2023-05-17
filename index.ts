// 1. City Directory
interface CityDirectoryInterface {
  cityName: string;
  country: string;
  population: number;
}

class CityDir implements CityDirectoryInterface {
  cityName: string;
  country: string;
  population: number;

  constructor(cityName: string, country: string, population: number) {
    this.cityName = cityName;
    this.country = country;
    this.population = population;
  }
}

let cityDirArray: CityDirectoryInterface[] = [];
let list = document.getElementById("cityList");

export const addCity = (
  cityName: string,
  country: string,
  population: number
) => {
  const cityDir = new CityDir(cityName, country, population);
  cityDirArray.push(cityDir);
  localStorage.setItem("cityDirectory", JSON.stringify(cityDirArray));

  // clearing input fields
  const cityNameField = document.getElementById("cityName") as HTMLInputElement;
  const countryField = document.getElementById("country") as HTMLInputElement;
  const populationField = document.getElementById(
    "population"
  ) as HTMLInputElement;
  cityNameField.value = "";
  countryField.value = "";
  populationField.value = "";
  displayList(cityDirArray);
};

cityDirArray = JSON.parse(localStorage.getItem("cityDirectory") || "[]");
export const displayList = (cityArray: CityDirectoryInterface[]) => {
  if (list) {
    while (list.hasChildNodes() && list.firstChild) {
      list.removeChild(list.firstChild);
    }
  }

  cityArray.forEach((data) => {
    let li = document.createElement("li");
    li.innerText = `City: "${data.cityName}" Country: "${data.country}" Population: ${data.population}`;
    list?.appendChild(li);
  });
};
displayList(cityDirArray);

export const searchResult = (search: string) => {
  const filteredList = cityDirArray.filter((data) => {
    return (
      data.cityName.toLowerCase().includes(search.toLowerCase()) ||
      data.country.toLowerCase().includes(search.toLowerCase())
    );
  });
  displayList(filteredList);
};

// 2. ISBN - 10 Validation
export const validateISBN = (isbn: string) => {
  const isbnField = document.getElementById("isbn") as HTMLInputElement;
  isbnField.value = "";

  let result = document.getElementById("isbnResult");
  const isbnStr: string = isbn.replace(/[-\s]/g, "");

  let parag = document.createElement("p");

  if (isbnStr.length !== 10) {
    parag.innerText = `${isbnStr} is not a valid ISBN`;
    result?.appendChild(parag);
  }

  let sum: number = 0;
  for (let i = 0; i < isbnStr.length; i++) {
    let num: number = 0;
    if (isbnStr[i].toLowerCase() === "x") {
      sum += 10 * 10;
    } else {
      num = parseInt(isbnStr[i], 10);
      if (isNaN(num)) {
        parag.innerText = `${isbnStr} is not a valid ISBN`;
        result?.appendChild(parag);
      }
    }
    sum += num * (i + 1);
  }

  if (sum % 11 === 0) {
    parag.innerText = `${isbnStr} is a valid ISBN`;
    result?.appendChild(parag);
  } else {
    parag.innerText = `${isbnStr} is not a valid ISBN`;
    result?.appendChild(parag);
  }
};

// 3. Change it up!
export const changeString = (input: string): string => {
  const inputField = document.getElementById("wordInput") as HTMLInputElement;
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
  changeResult?.appendChild(parag);

  console.log(result);
  return result;
};

// 4. Moving zeroes to the end
export const movingZeros = (input: any[]): any[] => {
  let result: any[] = [];
  let index: number = 0;

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

console.log(movingZeros([false, 1, 0, 1, 2, 0, 1, 3, "a"]));
console.log(movingZeros([0, 0, 0, 1, false, 0, "b", 3, "a", 2]));
