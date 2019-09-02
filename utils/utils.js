// Метод для проверки текстового элемента по regex
let validateRegex = (elementValue, regexString) => {
    return new RegExp(regexString).test(elementValue);
};

module.exports = validateRegex;