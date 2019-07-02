let clearDiv = (selector) => {
    document.getElementById(selector).innerHTML = "";
};

let isAttributePresent = (elementId, attribute) => {
    return document.getElementById(elementId).hasAttribute(attribute);
};