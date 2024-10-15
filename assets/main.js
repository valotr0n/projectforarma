function handleNavigation(event) {
    event.preventDefault(); 

    const targetId = event.target.id;

    if (targetId === "home-link") {
        console.log("Нажата кнопка: Главная");
    } else if (targetId === "table-link") {
        console.log("Нажата кнопка: Таблица");
    } else if (targetId === "about-link") {
        console.log("Нажата кнопка: О нас");
    }
}

// Назначаем обработчики кликов на ссылки
document.getElementById('home-link').addEventListener('click', handleNavigation);
document.getElementById('table-link').addEventListener('click', handleNavigation);
document.getElementById('about-link').addEventListener('click', handleNavigation);
