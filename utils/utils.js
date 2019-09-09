// Метод для проверки текстового элемента по regex
let isValidateRegex = (elementValue, regexString) => {
  return new RegExp(regexString).test(elementValue);
};

module.exports = isValidateRegex;
