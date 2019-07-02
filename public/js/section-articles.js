const articles = [
    {
        name: "Полезная информация от QA.live.study",
        redirectPageClickOnImg: ""
    },

    {
        name: "Тестирование ПО как IT-наука",
        redirectPageClickOnImg: ""
    },

    {
        name: "Тестируем лампочку",
        redirectPageClickOnImg: ""
    },

    {
        name: "Что такое избыточное тестирование?",
        redirectPageClickOnImg: ""
    },

    {
        name: "Фотография дня тестировщика",
        redirectPageClickOnImg: ""
    },

    {
        name: "Кто такой QA Senior и как им стать",
        redirectPageClickOnImg: ""
    },

    {
        name: "Каверзные вопросы айчаров и как на них правильно отвечать",
        redirectPageClickOnImg: ""
    },

    {
        name: "Как правильно готовиться к собеседованию",
        redirectPageClickOnImg: ""
    }
];

const limit = 2;

let showArticles = (array, count) => {
    clearDiv('articles');
    for (let i = 0; i < count; i++) {
        document.getElementById('articles').innerHTML +=
            "<div class='article-item item-transition'>" +
            "   <a href='" + articles[i].redirectPageClickOnImg + "'>" +
            "       <img class='item-img' src='img/section-articles/articles-bg.png' alt=''>" +
            "       <h3 class='item-text'>" + articles[i].name + "</h3>" +
            "   </a>" +
            "</div>";
    }
};

let setStyles = (elementId, state, backgroundColor, cursor) => {
    document.getElementById(elementId).disabled = state;
    document.getElementById(elementId).style.backgroundColor = backgroundColor;
    document.getElementById(elementId).style.cursor = cursor;
};
//
function showAllArticles() {
    if (btnShowAllArticles.value === 'Читать все сатьи ▼') {
        btnShowAllArticles.value = 'Свернуть сатьи ▲';
        showArticles(articles, articles.length);
    } else {
        btnShowAllArticles.value = 'Читать все сатьи ▼';
        showArticles(articles, limit)
    }
}

let btnShowAllArticles = document.getElementById('btnShowAllArticles');
document.addEventListener('DOMContentLoaded', showArticles(articles, limit));

btnShowAllArticles.addEventListener('click', showAllArticles);