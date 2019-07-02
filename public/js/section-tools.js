const tools = [
    // "img/section-tools/android.png",
    "img/section-tools/android_testing.png",
    "img/section-tools/chrome-dev-tools.png",
    "img/section-tools/cucumber.png",
    "img/section-tools/firebug.png",
    // "img/section-tools/ios.png",
    "img/section-tools/java.png",
    "img/section-tools/jmeter.png",
    "img/section-tools/js.png",
    "img/section-tools/junit.png",
    "img/section-tools/maven.png",
    "img/section-tools/postman.png",
    "img/section-tools/python.png",
    "img/section-tools/se.png",
    "img/section-tools/selenide.png",
    "img/section-tools/soapui.png",
    "img/section-tools/testng.png"
];

let showTools = (array) => {
    clearDiv('tools');
    for (let i = 0; i < array.length; i++) {
        document.getElementById('tools').innerHTML +=
            "<img src='" + array[i] + "' class='tools-img' alt='Tool' width='300' height='50%' style='opacity: 1;'/>";
    }
};

document.addEventListener('DOMContentLoaded', showTools(tools));